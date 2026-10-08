# Lista de tareas

Lista de tareas (To-Do) en React con filtros completas/pendientes y persistencia en localStorage.

**Demo:** https://mballesterdev.github.io/react-todo-list/

## Funcionalidades

- Añadir, completar y eliminar tareas
- Filtros: todas / completas / pendientes
- Persistencia automática en `localStorage`

## Tecnologías

React 19 · Vite · TypeScript · Tailwind CSS 4

## Uso en local

```bash
npm install
npm run dev
```

## Despliegue en GitHub Pages

El proyecto ya está configurado para GitHub Pages:

- `vite.config.ts` define `base: '/react-todo-list/'` (el nombre del repositorio).
- `package.json` incluye `homepage` y los scripts `predeploy` y `deploy` (paquete `gh-pages`).

Para publicar una nueva versión:

```bash
npm run deploy
```

Esto genera `dist/` y lo sube a la rama `gh-pages`. En el repositorio, **Settings → Pages** debe tener como origen la rama `gh-pages` y la carpeta `/ (root)`.
