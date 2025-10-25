# ProjectSync Frontend (Angular)

> **Branch:** `develop`  
> This branch contains the latest development code. For stable releases, refer to the `main` branch.
---

## About the Project

Frontend interface for Team Latte's **ProjectSync**, built with **Angular**. It displays multiple projects and allows users to create, update, delete, and search projects through an intuitive interface.

This repository contains the client-side (frontend) code only.

## Quick start

Prerequisites:
- Node.js (recommended: 18 or later)
- npm (comes with Node.js)

Install dependencies:

```bash
npm install
```

Run the development server (hot reload):

```bash
npm start
# or
ng serve
```

Open your browser to http://localhost:4200/ (default Angular dev server port).

## Build for production

Create a production-ready build (output in `dist/`):

```bash
npm run build
```

Serve the built files with any static file server (for example `serve`, `http-server`, nginx, etc.).

## Project structure (important files)

- `src/` — application source
  - `main.ts` — app bootstrap
  - `index.html` — root HTML
  - `styles.css` — global styles
  - `app/` — application code
    - `app.ts`, `app.routes.ts`, `app.config.ts` — app wiring and routes
    - `projects/` — feature area for projects
      - `project-service.ts` — project data service
      - `project.ts` — project model
      - `project-list/`, `project-card/`, `project-filter/`, `project-modal/` — components

See the source tree in the repository for more details.

## Tailwind/PostCSS

This project includes Tailwind CSS and PostCSS in dependencies (`tailwindcss`, `@tailwindcss/postcss`, `@tailwindcss/forms`, `postcss`). If you add or change Tailwind configuration, make sure to rebuild the project.

## Troubleshooting

- If the Angular CLI (`ng`) isn't found, install it globally for convenience:

```bash
npm install -g @angular/cli
```

- If you hit build or dependency errors, try removing `node_modules` and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```
