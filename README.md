# Control de Subs

Aplicación de registro de suscriptores con sistema de emparejamiento, puntuación y asistencia.

## Cómo desplegar en Vercel (gratis)

### Opción A — Sin instalar nada (recomendada)

1. Crea una cuenta en [github.com](https://github.com) si no tienes
2. Crea un repositorio nuevo llamado `control-subs`
3. Sube todos estos archivos al repositorio
4. Ve a [vercel.com](https://vercel.com) y entra con tu cuenta de GitHub
5. Click en **Add New Project** → selecciona `control-subs`
6. Click en **Deploy** — en 2 minutos tendrás tu URL

### Opción B — Desde tu computadora

```bash
# Instalar dependencias
npm install

# Probar en local
npm run dev
# Abre http://localhost:5173

# Construir para producción
npm run build
```

## Notas

- Los datos se guardan en el navegador de cada persona (localStorage)
- Los datos se reinician si se borra el caché del navegador
- La puntuación se reinicia cada mes automáticamente (por diseño)
