# Shopping Cart State Management Comparison

This repository contains three implementations of the same shopping cart application to compare React Context (naive + optimized), Zustand, and Redux Toolkit.

Folders
- `context-version/naive` — single `AppContext` implementation (naive)
- `context-version/optimized` — split `Cart/User/UI` contexts (optimized)
- `zustand-version` — Zustand store with selectors
- `redux-version` — Redux Toolkit slices and store
- `profiling/` — profiler screenshots (placeholders)
- `bundle-analysis/` — bundle visualizer screenshots (placeholders)
- `tools/` — helper scripts (`compute_gzip.js`, `serve_and_capture.js`, `capture-render-counts.js`)

Quick start (dev)

1. Install dependencies for each app:

```powershell
cd context-version/naive
npm install
npm run dev
# open http://localhost:5173
```

Repeat for `context-version/optimized`, `zustand-version`, and `redux-version` (use different ports if needed).

2. Build each app for production:

```powershell
cd context-version/naive
npm run build
# artifacts in dist/
```

3. Run automated capture (requires `puppeteer` installed in repo):

```powershell
# from repo root
npm install --save-dev puppeteer
node .\tools\serve_and_capture.js --dist context-version/naive/dist --port 5173 --out tools/results/context-naive.json
```

Docker (production preview for Redux version)

```powershell
docker-compose up --build -d
# open http://localhost:8080
```

Results and next steps
- Fill `RESULTS.md` with measured bundle sizes, profiler screenshots, and the decision guide.

Contact
- If you want me to push to a specific GitHub repo, provide the remote URL or configure `origin` and I will commit and push.
