# Control de Subs

Aplicación de registro de suscriptores con sistema de emparejamiento, puntuación y asistencia.





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
