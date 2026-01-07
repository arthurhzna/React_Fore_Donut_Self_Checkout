# Foredonat — Frontend

Overview
--------
This frontend was bootstrapped with Create React App (CRA) and is implemented using TypeScript and React. The application opens a WebSocket connection (see `src/App.tsx`) and uses services in `src/services/` to fetch tray data from the backend.

Project files of note
---------------------
- `package.json` — dependencies and npm scripts (`start`, `build`, `test`, `eject`).
- `tsconfig.json` — TypeScript configuration.
- `src/` — source code.
- `public/` — static public files.
- `build/` — output after `npm run build`.

Available scripts
-----------------
- `npm start` — runs the development server (`react-scripts start`).
- `npm run build` — creates a production build (`react-scripts build`) into `build/`.
- `npm test` — runs tests (`react-scripts test`).
- `npm run eject` — ejects CRA configuration into the project (irreversible).

Development
-----------
Install dependencies and start the dev server:

```bash
npm ci
npm start
```

Open `http://localhost:3000`.

Production build
----------------
Run:

```bash
npm run build
```

The compiled production assets will be in `build/`.

Linting and TypeScript
----------------------
- ESLint configuration is provided by `react-scripts` and referenced in `package.json` under `eslintConfig`.
- TypeScript configuration is located at `frontend/tsconfig.json`.

Notes
-----
- Build and tooling configuration provided by `react-scripts` are not checked into this repository.

This README contains factual information about the project's structure and how to run and build it.
