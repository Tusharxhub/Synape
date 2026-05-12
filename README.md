# SYNAPSE

## Real-Time Software Intelligence Engine

**SYNAPSE** is a native desktop application that scans local software projects, understands their structure, visualizes architecture as an interactive graph, detects engineering signals, and helps developers explore codebases visually.

> **SYNAPSE turns a codebase into a living architecture map.**

---

## ✨ Features

- **Native project folder import** — Open any local software project
- **Safe filesystem scanning** — Read-only analysis, no destructive operations
- **Project metadata extraction** — Files, folders, size, structure
- **Dependency extraction** — Parses `package.json` (dependencies, devDependencies, peer, optional)
- **Framework detection** — Auto-detects 20+ frameworks (Next.js, React, Vite, Tauri, Express, NestJS, Prisma, Rust, Go, and more)
- **Docker detection** — Detects Dockerfile, docker-compose files, Docker CLI availability
- **Architecture graph** — Interactive React Flow visualization with custom nodes
- **Floating node inspector** — Click any node for detailed metadata
- **Command palette** — `Ctrl+K` to search files, nodes, dependencies, and run actions
- **Project overview sidebar** — Stats, framework, package manager, Git, Docker, .env status
- **Health score** — Project health scoring (0–100) with detailed breakdown
- **Clean folder structure** — Modular Rust backend + React frontend
- **Safe error handling** — Graceful error states for all failure modes
- **Premium UI** — Calm, futuristic interface inspired by Linear, Raycast, and Figma

---

## 🛠️ Tech Stack

### Desktop
- [Tauri](https://tauri.app) — Native desktop framework
- [Rust](https://www.rust-lang.org) — Backend systems language

### Frontend
- [React](https://react.dev) — UI framework
- [TypeScript](https://www.typescriptlang.org) — Type-safe JavaScript
- [Vite](https://vitejs.dev) — Fast build tool
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [React Flow](https://reactflow.dev) — Graph visualization
- [Lucide React](https://lucide.dev) — Icon library

### Rust Backend
- `walkdir` — Recursive filesystem traversal
- `serde` / `serde_json` — Serialization
- `tauri-plugin-dialog` — Native file picker

---

## 📦 Setup

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- [Rust](https://rustup.rs) (latest stable)
- System dependencies for Tauri ([see Tauri prerequisites](https://v2.tauri.app/start/prerequisites/))

### Install

```bash
git clone https://github.com/Tusharxhub/Synape.git
cd Synape
npm install
```

### Development

```bash
npm run tauri:dev
```

> **Fedora / Wayland note:** The `tauri:dev` script includes `WEBKIT_DISABLE_DMABUF_RENDERER=1` via `cross-env` to fix WebKitGTK rendering issues on Wayland.

### Build

```bash
npm run tauri:build
```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + Vite build |
| `npm run tauri:dev` | Launch Tauri desktop app (dev) |
| `npm run tauri:build` | Build production desktop app |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

---

## 🏗️ Architecture

```
SYNAPSE/
├── src/                        # React frontend
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   ├── components/
│   │   ├── graph/              # Architecture graph components
│   │   │   ├── ArchitectureCanvas.tsx
│   │   │   ├── GraphEmptyState.tsx
│   │   │   ├── GraphLegend.tsx
│   │   │   └── SynapseNode.tsx
│   │   ├── layout/             # Shell, top bar, command palette
│   │   │   ├── AppShell.tsx
│   │   │   ├── CommandBar.tsx
│   │   │   └── CommandPalette.tsx
│   │   ├── panels/             # Sidebar panels
│   │   │   ├── ContextualInspector.tsx
│   │   │   ├── DependencyPanel.tsx
│   │   │   ├── DockerPanel.tsx
│   │   │   ├── HealthPanel.tsx
│   │   │   └── ProjectOverview.tsx
│   │   └── ui/                 # Shared UI primitives
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── StatusDot.tsx
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities
│   ├── styles/                 # Global CSS
│   └── types/                  # TypeScript type definitions
│
├── src-tauri/                  # Rust backend
│   └── src/
│       ├── lib.rs              # Tauri app setup
│       ├── main.rs             # Entry point
│       ├── commands/           # Tauri IPC commands
│       │   ├── scan_project.rs
│       │   └── docker.rs
│       ├── scanner/            # Core scanning modules
│       │   ├── filesystem.rs
│       │   ├── package_json.rs
│       │   ├── framework.rs
│       │   ├── graph.rs
│       │   └── health.rs
│       └── models/             # Data structures
│           └── project.rs
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🛡️ Security

- **Read-only scanning** — SYNAPSE never modifies, executes, or deletes any files
- **No .env exposure** — `.env` file existence is detected, but contents are never read or displayed
- **No cloud backend** — All processing happens locally on your machine
- **No authentication** — Desktop-only, no accounts required
- **No script execution** — Project scripts are never run

---

## 🗺️ Roadmap

### v0.1 (Current)
- [x] Native project folder import
- [x] Rust filesystem scanner
- [x] Dependency extraction
- [x] Framework detection
- [x] Docker detection
- [x] Architecture graph visualization
- [x] Floating node inspector
- [x] Command palette
- [x] Health score
- [x] Premium UI

### v0.2 (Planned)
- [ ] Import/export graph data
- [ ] File-level dependency graph (imports/exports)
- [ ] Multiple project tabs
- [ ] Recent projects persistence
- [ ] Code complexity metrics
- [ ] Customizable graph layout algorithms
- [ ] Light theme option

### v0.3 (Future)
- [ ] Git history visualization
- [ ] Branch comparison
- [ ] Real-time file watching
- [ ] Plugin system
- [ ] Performance profiling view

---

## 👤 Author

**Tushar Kanti Dey**

- 🌐 Portfolio: [tushardevx01.tech](https://www.tushardevx01.tech)
- 🐙 GitHub: [@Tusharxhub](https://github.com/Tusharxhub)
- 📧 Email: [thetushardev0@gmail.com](mailto:thetushardev0@gmail.com)
- 📸 Instagram: [@tushardevx01](https://www.instagram.com/tushardevx01/)

---

## 📄 License

This project is private. All rights reserved.
