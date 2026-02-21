import { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";

const USERS_AUTH = [
  { username: "akaneamaamomo", password: "qL3y,w62??mw" },
  { username: "momecongeo",    password: "]tWa8@N93*8>" },
];

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleLogin() {
    const match = USERS_AUTH.find(u => u.username === username && u.password === password);
    if (match) {
      sessionStorage.setItem("auth_user", username);
      onLogin(username);
    } else {
      setError("Usuario o contraseña incorrectos");
      setTimeout(() => setError(""), 2500);
    }
  }

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(135deg,#0a0a14 0%,#0d1a2e 50%,#0a1a0f 100%)",
      fontFamily:"'Courier New',monospace"
    }}>
      <div style={{
        width:360, background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(0,255,100,0.25)", borderRadius:16,
        padding:"40px 36px", boxShadow:"0 0 60px rgba(0,255,100,0.08)"
      }}>
        <div style={{textAlign:"center", marginBottom:32}}>
          <div style={{fontSize:42, marginBottom:10}}>📋</div>
          <div style={{fontSize:10, letterSpacing:4, color:"#00ff64", textTransform:"uppercase"}}>Acceso Restringido</div>
          <h1 style={{margin:"6px 0 0", fontSize:20, fontWeight:900, color:"#fff"}}>CONTROL DE SUBS</h1>
        </div>

        <label style={{display:"block", fontSize:9, letterSpacing:2, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", marginBottom:5}}>Usuario</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => e.key==="Enter" && handleLogin()}
          placeholder="Ingresa tu usuario..."
          autoFocus
          style={{
            width:"100%", marginBottom:14, padding:"10px 13px", borderRadius:8,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)",
            color:"#fff", fontFamily:"'Courier New',monospace", fontSize:13, boxSizing:"border-box"
          }}
        />

        <label style={{display:"block", fontSize:9, letterSpacing:2, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", marginBottom:5}}>Contraseña</label>
        <div style={{position:"relative", marginBottom:24}}>
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key==="Enter" && handleLogin()}
            placeholder="Ingresa tu contraseña..."
            style={{
              width:"100%", padding:"10px 40px 10px 13px", borderRadius:8,
              background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)",
              color:"#fff", fontFamily:"'Courier New',monospace", fontSize:13, boxSizing:"border-box"
            }}
          />
          <button onClick={() => setShowPass(s=>!s)} style={{
            position:"absolute", right:10, top:"50%", transform:"translateY(-50%)",
            background:"none", border:"none", color:"rgba(255,255,255,0.35)",
            cursor:"pointer", fontSize:16, padding:0
          }}>{showPass ? "🙈" : "👁️"}</button>
        </div>

        {error && (
          <div style={{marginBottom:14, padding:"9px 14px", borderRadius:8, background:"rgba(255,80,80,0.12)", border:"1px solid rgba(255,80,80,0.3)", color:"#ff5050", fontSize:12, textAlign:"center"}}>
            ⚠️ {error}
          </div>
        )}

        <button onClick={handleLogin} style={{
          width:"100%", padding:"12px 0", borderRadius:10, border:"none",
          background:"linear-gradient(135deg,#00c853,#00ff64)",
          color:"#000", cursor:"pointer", fontFamily:"'Courier New',monospace",
          fontWeight:900, fontSize:14, letterSpacing:2
        }}>
          ENTRAR →
        </button>
      </div>
    </div>
  );
}

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const RANKS = [
  { id: "guerrero",        label: "Guerrero",        emoji: "⚔️",  color: "#a0a0a0", tier: 1 },
  { id: "elite",           label: "Élite",            emoji: "🛡️",  color: "#4fc3f7", tier: 2 },
  { id: "maestro",         label: "Maestro",          emoji: "🔵",  color: "#29b6f6", tier: 3 },
  { id: "gran_maestro",    label: "Gran Maestro",     emoji: "💠",  color: "#0288d1", tier: 4 },
  { id: "epico",           label: "Épico",            emoji: "🟣",  color: "#ab47bc", tier: 5 },
  { id: "leyenda",         label: "Leyenda",          emoji: "🌟",  color: "#ffa726", tier: 6 },
  { id: "mitico",          label: "Mítico",           emoji: "🔥",  color: "#ef5350", tier: 7 },
  { id: "honor_mitico",    label: "Honor Mítico",     emoji: "💎",  color: "#26c6da", tier: 8 },
  { id: "gloria_mitica",   label: "Gloria Mítica",    emoji: "👑",  color: "#ffd700", tier: 9 },
  { id: "inmortal_mitico", label: "Inmortal Mítico",  emoji: "🏆",  color: "#ff6b9d", tier: 10 },
];

const MEDALS = [
  { id: "mvp_win",     label: "MVP Ganador",      emoji: "🥇", points: +50, winner: true,  color: "#ffd700" },
  { id: "gold_win",    label: "Oro Ganador",       emoji: "🟡", points: +30, winner: true,  color: "#ffb300" },
  { id: "silver_win",  label: "Plata Ganadora",    emoji: "🥈", points: +10, winner: true,  color: "#90caf9" },
  { id: "bronze_win",  label: "Bronce Ganador",    emoji: "🥉", points:  +5, winner: true,  color: "#cd7f32" },
  { id: "mvp_lose",    label: "MVP Perdedor",      emoji: "💪", points:  -5, winner: false, color: "#80cbc4" },
  { id: "gold_lose",   label: "Oro Perdedor",       emoji: "🟠", points: -15, winner: false, color: "#ffa040" },
  { id: "silver_lose", label: "Plata Perdedora",   emoji: "🩶", points: -20, winner: false, color: "#b0bec5" },
  { id: "bronze_lose", label: "Bronce Perdedor",   emoji: "🟤", points: -30, winner: false, color: "#8d6e63" },
];

const BASE_SCORE = 1000;

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getRank(id) { return RANKS.find(r => r.id === id) || RANKS[0]; }
function getMedal(id) { return MEDALS.find(m => m.id === id); }

// ── Weighted random pick ──────────────────────────────────────────────
function weightedPick(users, gamesPlayed, count) {
  if (users.length <= count) return [...users];
  const pool = [...users];
  const result = [];
  for (let i = 0; i < count; i++) {
    const weights = pool.map(u => {
      const g = gamesPlayed[u.id] || 0;
      return Math.max(1, 20 - g * 2); // fewer games = higher weight
    });
    const total = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * total;
    let idx = 0;
    for (; idx < weights.length - 1; idx++) {
      rand -= weights[idx];
      if (rand <= 0) break;
    }
    result.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return result;
}

export default function App() {
  const now = new Date();
  const [authUser, setAuthUser] = useState(() => sessionStorage.getItem("auth_user") || null);

  function handleLogin(username) { setAuthUser(username); }
  function handleLogout() { sessionStorage.removeItem("auth_user"); setAuthUser(null); }

  if (!authUser) return <LoginScreen onLogin={handleLogin} />;

  return <MainApp authUser={authUser} onLogout={handleLogout} />;
}

function MainApp({ authUser, onLogout }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [tab, setTab] = useState("partidas");

  // data
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [scores, setScores] = useState({});       // {userId: number}
  const [gamesPlayed, setGamesPlayed] = useState({}); // {userId: number}
  const [matches, setMatches] = useState([]);     // [{id, date, players:[{userId,medal}]}]
  const [loading, setLoading] = useState(true);

  // form / modals
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", type: "comprada", rank: "guerrero" });
  const [editId, setEditId] = useState(null);

  // matchmaking
  const [selectedPlayers, setSelectedPlayers] = useState(null); // [{...user, medal: null}]
  const [matchDone, setMatchDone] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const days = getDaysInMonth(year, month);
  const usersKey = `users_v1`;
  const attendKey = `attendance_${year}_${month}`;
  const scoresKey = `scores_${year}_${month}`;
  const gamesKey  = `games_${year}_${month}`;
  const matchKey  = `matches_${year}_${month}`;

  useEffect(() => { loadAll(); }, [year, month]);

  function loadAll() {
    setLoading(true);
    try { const r = localStorage.getItem(usersKey);   if (r) setUsers(JSON.parse(r)); } catch {}
    try { const r = localStorage.getItem(attendKey);  if (r) setAttendance(JSON.parse(r)); else setAttendance({}); } catch { setAttendance({}); }
    try { const r = localStorage.getItem(scoresKey);  if (r) setScores(JSON.parse(r));   else setScores({}); } catch { setScores({}); }
    try { const r = localStorage.getItem(gamesKey);   if (r) setGamesPlayed(JSON.parse(r)); else setGamesPlayed({}); } catch { setGamesPlayed({}); }
    try { const r = localStorage.getItem(matchKey);   if (r) setMatches(JSON.parse(r)); else setMatches([]); } catch { setMatches([]); }
    setLoading(false);
  }

  const saveUsers   = u => { setUsers(u);       localStorage.setItem(usersKey,  JSON.stringify(u)); };
  const saveAttend  = a => { setAttendance(a);  localStorage.setItem(attendKey, JSON.stringify(a)); };
  const saveScores  = s => { setScores(s);      localStorage.setItem(scoresKey, JSON.stringify(s)); };
  const saveGames   = g => { setGamesPlayed(g); localStorage.setItem(gamesKey,  JSON.stringify(g)); };
  const saveMatches = m => { setMatches(m);     localStorage.setItem(matchKey,  JSON.stringify(m)); };

  function getScore(userId) { return scores[userId] ?? BASE_SCORE; }
  function getGames(userId) { return gamesPlayed[userId] || 0; }

  // attendance helpers
  function toggleDay(userId, day) {
    const key = `${userId}_${day}`;
    const newA = { ...attendance, [key]: attendance[key] ? 0 : 1 };
    saveAttend(newA);
  }
  function getDay(userId, day) { return attendance[`${userId}_${day}`] || 0; }
  function getDayTotal(day) { return users.reduce((s, u) => s + getDay(u.id, day), 0); }
  function getUserTotal(userId) { let t = 0; for (let d = 1; d <= days; d++) t += getDay(userId, d); return t; }

  // user CRUD
  function handleSubmit() {
    if (!form.name.trim()) return;
    if (editId) {
      saveUsers(users.map(x => x.id === editId ? { ...x, ...form } : x));
      setEditId(null);
    } else {
      saveUsers([...users, { id: Date.now().toString(), name: form.name.trim(), type: form.type, rank: form.rank }]);
    }
    setForm({ name: "", type: "comprada", rank: "guerrero" });
    setShowForm(false);
  }
  function deleteUser(id) { if (!confirm("¿Eliminar?")) return; saveUsers(users.filter(u => u.id !== id)); }
  function startEdit(u) { setForm({ name: u.name, type: u.type, rank: u.rank || "guerrero" }); setEditId(u.id); setShowForm(true); }

  // matchmaking
  function randomize() {
    if (users.length < 4) return alert("Necesitas al menos 4 usuarios registrados.");
    setSpinning(true);
    setTimeout(() => {
      const picked = weightedPick(users, gamesPlayed, 4);
      setSelectedPlayers(picked.map(u => ({ ...u, medal: null })));
      setMatchDone(false);
      setSpinning(false);
    }, 800);
  }

  function setMedal(idx, medalId) {
    setSelectedPlayers(prev => prev.map((p, i) => i === idx ? { ...p, medal: medalId } : p));
  }

  function confirmMatch() {
    if (!selectedPlayers || selectedPlayers.some(p => !p.medal)) return alert("Asigna una medalla a cada jugador.");
    const newScores = { ...scores };
    const newGames  = { ...gamesPlayed };
    const matchPlayers = selectedPlayers.map(p => {
      const med = getMedal(p.medal);
      newScores[p.id] = Math.max(0, (newScores[p.id] ?? BASE_SCORE) + med.points);
      newGames[p.id]  = (newGames[p.id] || 0) + 1;
      return { userId: p.id, medal: p.medal, pointsDelta: med.points };
    });
    const newMatch = { id: Date.now().toString(), date: new Date().toISOString(), players: matchPlayers };
    saveScores(newScores);
    saveGames(newGames);
    saveMatches([newMatch, ...matches]);
    setMatchDone(true);
  }

  function deleteMatch(matchId) {
    if (!confirm("¿Eliminar esta partida? Los puntos NO se revertirán.")) return;
    saveMatches(matches.filter(m => m.id !== matchId));
  }

  // export
  function exportExcel() {
    const wb = XLSX.utils.book_new();
    // Sheet 1: Asistencia
    const h1 = ["Usuario","Tipo","Rango",...Array.from({length:days},(_,i)=>`Día ${i+1}`),"TOTAL DÍAS"];
    const r1 = users.map(u=>[u.name, u.type==="regalada"?"Regalada":"Comprada", getRank(u.rank||"guerrero").label,...Array.from({length:days},(_,i)=>getDay(u.id,i+1)),getUserTotal(u.id)]);
    const ws1 = XLSX.utils.aoa_to_sheet([h1,...r1,["TOTAL/DÍA","","",...Array.from({length:days},(_,i)=>getDayTotal(i+1)),""]]);
    XLSX.utils.book_append_sheet(wb, ws1, `Asistencia ${MONTHS[month]}`);
    // Sheet 2: Puntuaciones
    const sorted = [...users].sort((a,b)=>getScore(b.id)-getScore(a.id));
    const h2 = ["#","Usuario","Rango","Puntuación","Partidas"];
    const r2 = sorted.map((u,i)=>[i+1, u.name, getRank(u.rank||"guerrero").label, getScore(u.id), getGames(u.id)]);
    const ws2 = XLSX.utils.aoa_to_sheet([h2,...r2]);
    XLSX.utils.book_append_sheet(wb, ws2, `Puntuaciones ${MONTHS[month]}`);
    // Sheet 3: Historial partidas
    const h3 = ["Fecha","Jugador","Medalla","Puntos"];
    const r3 = matches.flatMap(m => m.players.map(p => {
      const u = users.find(x=>x.id===p.userId);
      const med = getMedal(p.medal);
      return [new Date(m.date).toLocaleDateString("es"), u?.name||"?", med?.label||"?", p.pointsDelta];
    }));
    const ws3 = XLSX.utils.aoa_to_sheet([h3,...r3]);
    XLSX.utils.book_append_sheet(wb, ws3, `Partidas ${MONTHS[month]}`);
    const out = XLSX.write(wb, { bookType:"xlsx", type:"array" });
    const url = URL.createObjectURL(new Blob([out],{type:"application/octet-stream"}));
    const a = document.createElement("a"); a.href=url; a.download=`subs_${MONTHS[month]}_${year}.xlsx`; a.click();
    URL.revokeObjectURL(url);
  }

  const sortedUsers = [...users].sort((a,b)=>getUserTotal(a.id)-getUserTotal(b.id));
  const scoreSorted = [...users].sort((a,b)=>getScore(b.id)-getScore(a.id));

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0a0a14 0%,#0d1a2e 50%,#0a1a0f 100%)", fontFamily:"'Courier New',monospace", color:"#e0ffe8" }}>

      {/* Header */}
      <div style={{ background:"rgba(0,255,100,0.05)", borderBottom:"1px solid rgba(0,255,100,0.2)", padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:10, letterSpacing:4, color:"#00ff64", textTransform:"uppercase" }}>Sistema de Registro</div>
          <h1 style={{ margin:"2px 0 0", fontSize:22, fontWeight:900, color:"#fff" }}>📋 CONTROL DE SUBS</h1>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
          <select value={month} onChange={e=>setMonth(+e.target.value)} style={selStyle}>
            {MONTHS.map((m,i)=><option key={i} value={i}>{m}</option>)}
          </select>
          <select value={year} onChange={e=>setYear(+e.target.value)} style={selStyle}>
            {[2024,2025,2026,2027].map(y=><option key={y}>{y}</option>)}
          </select>
          <button onClick={exportExcel} style={btn("#00ff64","#000")}>⬇ Excel</button>
          <button onClick={()=>{setForm({name:"",type:"comprada",rank:"guerrero"});setEditId(null);setShowForm(true);}} style={btn("#00cfff","#000")}>+ Usuario</button>
          <div style={{borderLeft:"1px solid rgba(255,255,255,0.1)",paddingLeft:8,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>👤 {authUser}</span>
            <button onClick={onLogout} style={{background:"rgba(255,80,80,0.1)",border:"1px solid rgba(255,80,80,0.25)",color:"#ff5050",borderRadius:7,padding:"6px 12px",cursor:"pointer",fontFamily:"'Courier New',monospace",fontSize:11,fontWeight:700}}>Salir</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", flexWrap:"wrap", borderBottom:"1px solid rgba(0,255,100,0.1)" }}>
        {[
          {label:"Jugadores", value:users.length,        color:"#00cfff"},
          {label:"Compradas", value:users.filter(u=>u.type==="comprada").length, color:"#ffd700"},
          {label:"Regaladas", value:users.filter(u=>u.type==="regalada").length, color:"#ff6b9d"},
          {label:"Partidas",  value:matches.length,      color:"#a78bfa"},
        ].map((s,i)=>(
          <div key={i} style={{ padding:"10px 20px", borderRight:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:2, textTransform:"uppercase" }}>{s.label}</div>
            <div style={{ fontSize:24, fontWeight:900, color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid rgba(0,255,100,0.1)", paddingLeft:24 }}>
        {[
          {id:"partidas", label:"⚔️ Partidas"},
          {id:"ranking",  label:"🏆 Ranking"},
          {id:"tabla",    label:"📊 Asistencia"},
          {id:"usuarios", label:"👥 Usuarios"},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:"10px 18px", background:"none", border:"none",
            borderBottom: tab===t.id ? "2px solid #00ff64" : "2px solid transparent",
            color: tab===t.id ? "#00ff64" : "rgba(255,255,255,0.35)",
            cursor:"pointer", fontFamily:"'Courier New',monospace", fontSize:11, letterSpacing:1, fontWeight:700
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding:"20px 24px" }}>
        {loading ? (
          <div style={{textAlign:"center",padding:60,color:"#00ff64",letterSpacing:3}}>CARGANDO...</div>
        ) : tab==="partidas" ? (
          <PartidasTab
            users={users} selectedPlayers={selectedPlayers} matchDone={matchDone}
            spinning={spinning} matches={matches} scores={scores} gamesPlayed={gamesPlayed}
            randomize={randomize} setMedal={setMedal} confirmMatch={confirmMatch}
            deleteMatch={deleteMatch} getScore={getScore} getGames={getGames}
          />
        ) : tab==="ranking" ? (
          <RankingTab users={scoreSorted} getScore={getScore} getGames={getGames} />
        ) : tab==="tabla" ? (
          <TablaTab users={sortedUsers} days={days} getDay={getDay} toggleDay={toggleDay} getDayTotal={getDayTotal} getUserTotal={getUserTotal} month={month} year={year} />
        ) : (
          <UsersTab users={sortedUsers} onEdit={startEdit} onDelete={deleteUser} getScore={getScore} getGames={getGames} getUserTotal={getUserTotal} />
        )}
      </div>

      {/* User form modal */}
      {showForm && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100 }}
          onClick={e=>e.target===e.currentTarget&&setShowForm(false)}>
          <div style={{ background:"#0d1a2e",border:"1px solid rgba(0,255,100,0.3)",borderRadius:12,padding:28,width:400,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 0 40px rgba(0,255,100,0.1)" }}>
            <h2 style={{ margin:"0 0 20px",color:"#00ff64",fontSize:15,letterSpacing:2 }}>{editId?"✏️ EDITAR":"➕ NUEVO"} USUARIO</h2>
            <label style={lbl}>Nombre</label>
            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Nombre..." style={inp} autoFocus />
            <label style={lbl}>Tipo de Sub</label>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {["comprada","regalada"].map(t=>(
                <button key={t} onClick={()=>setForm(f=>({...f,type:t}))} style={{
                  flex:1,padding:"10px 0",borderRadius:8,border:"1px solid",
                  borderColor:form.type===t?(t==="comprada"?"#ffd700":"#ff6b9d"):"rgba(255,255,255,0.12)",
                  background:form.type===t?(t==="comprada"?"rgba(255,215,0,0.12)":"rgba(255,107,157,0.12)"):"transparent",
                  color:form.type===t?(t==="comprada"?"#ffd700":"#ff6b9d"):"rgba(255,255,255,0.35)",
                  cursor:"pointer",fontFamily:"'Courier New',monospace",fontSize:12,fontWeight:700
                }}>{t==="comprada"?"💳 Comprada":"🎁 Regalada"}</button>
              ))}
            </div>
            <label style={lbl}>Rango</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:20}}>
              {RANKS.map(r=>(
                <button key={r.id} onClick={()=>setForm(f=>({...f,rank:r.id}))} style={{
                  padding:"7px 10px",borderRadius:7,border:"1px solid",
                  borderColor:form.rank===r.id?r.color:"rgba(255,255,255,0.1)",
                  background:form.rank===r.id?`${r.color}22`:"rgba(255,255,255,0.02)",
                  color:form.rank===r.id?r.color:"rgba(255,255,255,0.35)",
                  cursor:"pointer",fontFamily:"'Courier New',monospace",fontSize:11,fontWeight:700,
                  textAlign:"left",display:"flex",alignItems:"center",gap:6,
                  boxShadow:form.rank===r.id?`0 0 8px ${r.color}44`:"none"
                }}><span>{r.emoji}</span>{r.label}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowForm(false)} style={{flex:1,padding:"9px 0",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontFamily:"'Courier New',monospace",fontWeight:700}}>Cancelar</button>
              <button onClick={handleSubmit} style={{...btn("#00ff64","#000"),flex:1,padding:"9px 0"}}>{editId?"Guardar":"Crear"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Partidas Tab ──────────────────────────────────────────────────────
function PartidasTab({ users, selectedPlayers, matchDone, spinning, matches, getScore, getGames, randomize, setMedal, confirmMatch, deleteMatch }) {
  const allAssigned = selectedPlayers && selectedPlayers.every(p=>p.medal);

  return (
    <div>
      {/* Randomizer */}
      <div style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(167,139,250,0.25)",borderRadius:14,padding:24,marginBottom:24 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20 }}>
          <div>
            <div style={{ fontSize:10,letterSpacing:3,color:"#a78bfa",textTransform:"uppercase" }}>Emparejamiento Inteligente</div>
            <div style={{ fontSize:18,fontWeight:900,color:"#fff",marginTop:2 }}>⚔️ Selección de Jugadores</div>
            <div style={{ fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2 }}>Prioriza jugadores con menos partidas previas</div>
          </div>
          <button onClick={randomize} disabled={spinning} style={{
            padding:"12px 28px",borderRadius:10,border:"none",
            background: spinning ? "rgba(167,139,250,0.3)" : "linear-gradient(135deg,#7c3aed,#a78bfa)",
            color:"#fff",cursor:spinning?"not-allowed":"pointer",
            fontFamily:"'Courier New',monospace",fontWeight:900,fontSize:14,letterSpacing:1,
            boxShadow:"0 0 20px rgba(167,139,250,0.4)",transition:"all 0.2s"
          }}>
            {spinning ? "🎲 Sorteando..." : "🎲 RANDOMIZAR"}
          </button>
        </div>

        {selectedPlayers && (
          <div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12,marginBottom:16 }}>
              {selectedPlayers.map((p,i)=>{
                const rank = RANKS.find(r=>r.id===(p.rank||"guerrero"))||RANKS[0];
                const med = p.medal ? getMedal(p.medal) : null;
                return (
                  <div key={p.id} style={{
                    background:`linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))`,
                    border:`1px solid ${med ? (med.winner?"rgba(0,255,100,0.35)":"rgba(255,80,80,0.35)") : "rgba(255,255,255,0.1)"}`,
                    borderRadius:10,padding:14
                  }}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <span style={{fontSize:20}}>{rank.emoji}</span>
                      <div>
                        <div style={{fontWeight:900,color:"#fff",fontSize:14}}>{p.name}</div>
                        <div style={{fontSize:10,color:rank.color}}>{rank.label}</div>
                      </div>
                      <div style={{marginLeft:"auto",textAlign:"right"}}>
                        <div style={{fontSize:16,fontWeight:900,color:"#a78bfa"}}>⭐{getScore(p.id)}</div>
                        <div style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>🎮 {getGames(p.id)} partidas</div>
                      </div>
                    </div>
                    {!matchDone && (
                      <div>
                        <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:2,marginBottom:6}}>MEDALLA</div>
                        <div style={{fontSize:9,color:"rgba(0,255,100,0.5)",letterSpacing:1,marginBottom:4}}>▲ GANADOR</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
                          {MEDALS.filter(m=>m.winner).map(m=>(
                            <button key={m.id} onClick={()=>setMedal(i,m.id)} style={{
                              padding:"4px 8px",borderRadius:6,border:"1px solid",
                              borderColor:p.medal===m.id?m.color:"rgba(255,255,255,0.08)",
                              background:p.medal===m.id?`${m.color}22`:"transparent",
                              color:p.medal===m.id?m.color:"rgba(255,255,255,0.3)",
                              cursor:"pointer",fontFamily:"'Courier New',monospace",fontSize:10,
                              fontWeight:700,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"
                            }}>
                              <span>{m.emoji}</span><span>{m.label}</span>
                            </button>
                          ))}
                        </div>
                        <div style={{fontSize:9,color:"rgba(255,80,80,0.5)",letterSpacing:1,marginBottom:4}}>▼ PERDEDOR</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                          {MEDALS.filter(m=>!m.winner).map(m=>(
                            <button key={m.id} onClick={()=>setMedal(i,m.id)} style={{
                              padding:"4px 8px",borderRadius:6,border:"1px solid",
                              borderColor:p.medal===m.id?m.color:"rgba(255,255,255,0.08)",
                              background:p.medal===m.id?`${m.color}22`:"transparent",
                              color:p.medal===m.id?m.color:"rgba(255,255,255,0.3)",
                              cursor:"pointer",fontFamily:"'Courier New',monospace",fontSize:10,
                              fontWeight:700,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"
                            }}>
                              <span>{m.emoji}</span><span>{m.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {matchDone && med && (
                      <div style={{
                        padding:"8px 12px",borderRadius:8,textAlign:"center",
                        background:`${med.color}22`,border:`1px solid ${med.color}55`,
                        color:med.color,fontWeight:900,fontSize:13
                      }}>
                        {med.emoji} {med.label}
                        <span style={{marginLeft:8,fontSize:12,color:med.points>0?"#00ff64":"#ff5050"}}>
                          {med.points>0?"+":""}{med.points} pts
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {!matchDone && (
              <button onClick={confirmMatch} disabled={!allAssigned} style={{
                width:"100%",padding:"12px 0",borderRadius:10,border:"none",
                background:allAssigned?"linear-gradient(135deg,#00c853,#00ff64)":"rgba(255,255,255,0.07)",
                color:allAssigned?"#000":"rgba(255,255,255,0.2)",
                cursor:allAssigned?"pointer":"not-allowed",
                fontFamily:"'Courier New',monospace",fontWeight:900,fontSize:14,letterSpacing:2
              }}>
                ✅ CONFIRMAR RESULTADO
              </button>
            )}
            {matchDone && (
              <div style={{textAlign:"center",padding:"12px",color:"#00ff64",fontSize:14,fontWeight:900,letterSpacing:2}}>
                🎉 ¡PARTIDA REGISTRADA! PUNTOS ACTUALIZADOS
              </div>
            )}
          </div>
        )}
        {!selectedPlayers && (
          <div style={{textAlign:"center",padding:"30px 0",color:"rgba(255,255,255,0.2)",fontSize:13}}>
            Presiona RANDOMIZAR para seleccionar 4 jugadores
          </div>
        )}
      </div>

      {/* Match history */}
      <div>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>
          Historial de partidas — {matches.length} jugadas
        </div>
        {matches.length===0 && (
          <div style={{textAlign:"center",padding:40,color:"rgba(255,255,255,0.15)",fontSize:13}}>Sin partidas aún</div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {matches.map((m,mi)=>(
            <div key={m.id} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>
                  🕒 {new Date(m.date).toLocaleDateString("es",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}
                </div>
                <button onClick={()=>deleteMatch(m.id)} style={{background:"rgba(255,80,80,0.1)",border:"1px solid rgba(255,80,80,0.2)",color:"#ff5050",borderRadius:6,padding:"3px 10px",cursor:"pointer",fontSize:11}}>🗑 Borrar</button>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {m.players.map(p=>{
                  const u = users.find(x=>x.id===p.userId);
                  const med = getMedal(p.medal);
                  const rank = u ? getRank(u.rank||"guerrero") : RANKS[0];
                  return u ? (
                    <div key={p.userId} style={{
                      display:"flex",alignItems:"center",gap:6,padding:"5px 10px",borderRadius:8,
                      background:med?.winner?"rgba(0,255,100,0.08)":"rgba(255,80,80,0.08)",
                      border:`1px solid ${med?.winner?"rgba(0,255,100,0.2)":"rgba(255,80,80,0.2)"}`
                    }}>
                      <span style={{fontSize:14}}>{rank.emoji}</span>
                      <span style={{fontSize:12,color:"#fff",fontWeight:700}}>{u.name}</span>
                      <span style={{fontSize:13}}>{med?.emoji}</span>
                      <span style={{fontSize:11,fontWeight:900,color:p.pointsDelta>=0?"#00ff64":"#ff5050"}}>
                        {p.pointsDelta>=0?"+":""}{p.pointsDelta}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Ranking Tab ───────────────────────────────────────────────────────
function RankingTab({ users, getScore, getGames }) {
  if (!users.length) return <EmptyState emoji="🏆" text="Sin jugadores" />;
  const medals = ["🥇","🥈","🥉"];
  return (
    <div>
      <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>
        Clasificación del mes — puntuación base {BASE_SCORE} pts
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {users.map((u,i)=>{
          const rank = getRank(u.rank||"guerrero");
          const score = getScore(u.id);
          const diff = score - BASE_SCORE;
          const pct = Math.min(100, Math.max(0, score/20));
          return (
            <div key={u.id} style={{
              display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:10,
              background: i===0?"rgba(255,215,0,0.07)": i===1?"rgba(192,192,192,0.05)": i===2?"rgba(205,127,50,0.05)":"rgba(255,255,255,0.02)",
              border:`1px solid ${i===0?"rgba(255,215,0,0.3)":i===1?"rgba(192,192,192,0.2)":i===2?"rgba(205,127,50,0.2)":"rgba(255,255,255,0.07)"}`
            }}>
              <div style={{fontSize:20,minWidth:28,textAlign:"center"}}>{medals[i]||`#${i+1}`}</div>
              <span style={{fontSize:18}}>{rank.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:900,color:"#fff",fontSize:14}}>{u.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                  <div style={{flex:1,height:4,background:"rgba(255,255,255,0.08)",borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pct}%`,background: score>=BASE_SCORE?"#00ff64":"#ff5050",borderRadius:2,transition:"width 0.5s"}}/>
                  </div>
                  <span style={{fontSize:9,color:"rgba(255,255,255,0.3)",whiteSpace:"nowrap"}}>🎮 {getGames(u.id)} partidas</span>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:20,fontWeight:900,color: score>=BASE_SCORE?"#00ff64":score>=700?"#ffa726":"#ff5050"}}>{score}</div>
                <div style={{fontSize:10,color:diff>=0?"#00ff64":"#ff5050",fontWeight:700}}>
                  {diff>=0?"+":""}{diff} pts
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Tabla Tab ─────────────────────────────────────────────────────────
function TablaTab({ users, days, getDay, toggleDay, getDayTotal, getUserTotal, month, year }) {
  if (!users.length) return <EmptyState emoji="📭" text="Sin usuarios registrados" />;
  const today = new Date();
  const isCurr = today.getMonth()===month && today.getFullYear()===year;
  const todayN = today.getDate();
  return (
    <div style={{overflowX:"auto"}}>
      <table style={{borderCollapse:"collapse",width:"100%",fontSize:11}}>
        <thead>
          <tr>
            <th style={{...th,position:"sticky",left:0,background:"#0a0a14",minWidth:130,textAlign:"left",zIndex:2}}>USUARIO</th>
            <th style={{...th,minWidth:95,background:"#0a0a14"}}>RANGO</th>
            <th style={{...th,minWidth:80,background:"#0a0a14"}}>TIPO</th>
            {Array.from({length:days},(_,i)=>{
              const isT = isCurr && todayN===i+1;
              return <th key={i} style={{...th,width:30,color:isT?"#00ff64":"rgba(255,255,255,0.4)",background:isT?"rgba(0,255,100,0.08)":undefined,borderBottom:isT?"2px solid #00ff64":undefined}}>{i+1}</th>;
            })}
            <th style={{...th,background:"rgba(0,207,255,0.08)",color:"#00cfff",borderLeft:"1px solid rgba(0,207,255,0.2)"}}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u,ri)=>{
            const rank = getRank(u.rank||"guerrero");
            const bg = ri%2===0?"#0c0c18":"#0a0a14";
            return (
              <tr key={u.id}>
                <td style={{...td,position:"sticky",left:0,background:bg,fontWeight:700,color:"#fff",zIndex:1}}>{u.name}</td>
                <td style={{...td,textAlign:"center"}}>
                  <span style={{fontSize:11,color:rank.color,whiteSpace:"nowrap"}}>{rank.emoji} {rank.label}</span>
                </td>
                <td style={{...td,textAlign:"center"}}>
                  <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:u.type==="comprada"?"rgba(255,215,0,0.12)":"rgba(255,107,157,0.12)",color:u.type==="comprada"?"#ffd700":"#ff6b9d"}}>
                    {u.type==="comprada"?"💳":"🎁"}
                  </span>
                </td>
                {Array.from({length:days},(_,i)=>{
                  const v = getDay(u.id,i+1);
                  const isT = isCurr && todayN===i+1;
                  return (
                    <td key={i} style={{...td,textAlign:"center",padding:3,background:isT?"rgba(0,255,100,0.04)":undefined}}>
                      <button onClick={()=>toggleDay(u.id,i+1)} style={{
                        width:26,height:26,borderRadius:5,border:"none",
                        background:v?"rgba(0,255,100,0.2)":"rgba(255,255,255,0.04)",
                        color:v?"#00ff64":"rgba(255,255,255,0.12)",
                        cursor:"pointer",fontSize:12,fontWeight:900,
                        boxShadow:v?"0 0 6px rgba(0,255,100,0.25)":"none",
                        display:"flex",alignItems:"center",justifyContent:"center",margin:"auto"
                      }}>{v}</button>
                    </td>
                  );
                })}
                <td style={{...td,textAlign:"center",fontWeight:900,fontSize:14,color:"#00cfff",borderLeft:"1px solid rgba(0,207,255,0.15)"}}>{getUserTotal(u.id)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr style={{borderTop:"2px solid rgba(0,255,100,0.25)"}}>
            <td colSpan={3} style={{...td,fontWeight:700,color:"#00ff64",fontSize:10,letterSpacing:2,position:"sticky",left:0,background:"#0a0a14",zIndex:1}}>TOTAL / DÍA</td>
            {Array.from({length:days},(_,i)=>(
              <td key={i} style={{...td,textAlign:"center",fontWeight:900,color:"#00ff64",fontSize:13}}>{getDayTotal(i+1)}</td>
            ))}
            <td style={{...td,textAlign:"center",fontWeight:900,fontSize:15,color:"#fff",borderLeft:"1px solid rgba(0,207,255,0.15)"}}>
              {users.reduce((s,u)=>s+getUserTotal(u.id),0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── Users Tab ─────────────────────────────────────────────────────────
function UsersTab({ users, onEdit, onDelete, getScore, getGames, getUserTotal }) {
  if (!users.length) return <EmptyState emoji="👤" text="Sin usuarios aún" />;
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
      {users.map(u=>{
        const rank = getRank(u.rank||"guerrero");
        const score = getScore(u.id);
        const diff = score - BASE_SCORE;
        return (
          <div key={u.id} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:900,color:"#fff",fontSize:14,marginBottom:6}}>{u.name}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:700,background:`${rank.color}22`,color:rank.color}}>{rank.emoji} {rank.label}</span>
                  <span style={{padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:700,background:u.type==="comprada"?"rgba(255,215,0,0.12)":"rgba(255,107,157,0.12)",color:u.type==="comprada"?"#ffd700":"#ff6b9d"}}>{u.type==="comprada"?"💳 Comprada":"🎁 Regalada"}</span>
                </div>
                <div style={{display:"flex",gap:10,marginTop:8,fontSize:11}}>
                  <span style={{color:diff>=0?"#00ff64":"#ff5050",fontWeight:900}}>⭐ {score} ({diff>=0?"+":""}{diff})</span>
                  <span style={{color:"rgba(255,255,255,0.3)"}}>🎮 {getGames(u.id)}P</span>
                  <span style={{color:"rgba(0,207,255,0.7)"}}>✓ {getUserTotal(u.id)}D</span>
                </div>
              </div>
              <div style={{display:"flex",gap:5,marginLeft:8}}>
                <button onClick={()=>onEdit(u)} style={{background:"rgba(0,207,255,0.1)",border:"1px solid rgba(0,207,255,0.25)",color:"#00cfff",borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:12}}>✏️</button>
                <button onClick={()=>onDelete(u.id)} style={{background:"rgba(255,80,80,0.1)",border:"1px solid rgba(255,80,80,0.25)",color:"#ff5050",borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:12}}>🗑</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState({ emoji, text }) {
  return (
    <div style={{textAlign:"center",padding:80,color:"rgba(255,255,255,0.15)"}}>
      <div style={{fontSize:44,marginBottom:12}}>{emoji}</div>
      <div style={{letterSpacing:3,textTransform:"uppercase",fontSize:13}}>{text}</div>
    </div>
  );
}

function getMedal(id) { return MEDALS.find(m=>m.id===id); }
function getRank(id) { return RANKS.find(r=>r.id===id)||RANKS[0]; }

// ── Shared styles ─────────────────────────────────────────────────────
const selStyle = { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", padding:"7px 11px", borderRadius:7, fontFamily:"'Courier New',monospace", fontSize:12, cursor:"pointer" };
const btn = (bg,color) => ({ background:bg, color, padding:"8px 16px", borderRadius:8, border:"none", fontFamily:"'Courier New',monospace", fontWeight:700, fontSize:12, cursor:"pointer", letterSpacing:1 });
const lbl = { display:"block", marginBottom:5, fontSize:9, letterSpacing:2, color:"rgba(255,255,255,0.35)", textTransform:"uppercase" };
const inp = { width:"100%", marginBottom:14, padding:"9px 12px", borderRadius:8, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", fontFamily:"'Courier New',monospace", fontSize:13, boxSizing:"border-box" };
const th = { padding:"9px 4px", background:"#0a0a14", color:"rgba(255,255,255,0.4)", fontWeight:700, fontSize:10, letterSpacing:1, textAlign:"center", borderBottom:"1px solid rgba(255,255,255,0.08)", whiteSpace:"nowrap" };
const td = { padding:"6px 4px", borderBottom:"1px solid rgba(255,255,255,0.03)" };
