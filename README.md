# SYNAPSE

## Real-Time Software Intelligence Engine

SYNAPSE is a native desktop application that analyzes local codebases, visualizes software architecture, detects dependencies, monitors project structure, and provides health diagnostics — all in a futuristic, cinematic interface.

![SYNAPSE](https://img.shields.io/badge/SYNAPSE-v0.1.0-00d9ff?style=for-the-badge&labelColor=050811)
![Tauri](https://img.shields.io/badge/Tauri-2.x-FFC131?style=for-the-badge&logo=tauri&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-Backend-000000?style=for-the-badge&logo=rust&logoColor=white)

---

## Features

- **Native Desktop App** — Built with Tauri 2 + Rust for a lightweight, secure desktop experience
- **Project Import** — Native folder picker to import any local project directory
- **Filesystem Scanner** — Rust-powered scanner that analyzes project structure, files, and folders
- **Framework Detection** — Automatically detects 15+ frameworks (React, Next.js, Vite, Tauri, Express, NestJS, etc.)
- **Dependency Extraction** — Parses `package.json` for all dependency types
- **Architecture Graph** — Interactive React Flow visualization of project architecture
- **Node Inspector** — Click any node to inspect its type, risk level, path, and metadata
- **Health Score** — Computed health score based on project best practices
- **Docker Integration** — Detects Docker files and checks Docker CLI availability
- **Security-First** — Read-only scanning, `.env` contents are never read or displayed

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Shell | Tauri 2 |
| Backend | Rust |
| Frontend | React 19, TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Graph | React Flow |
| Icons | Lucide React |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [Tauri CLI](https://tauri.app/start/)
- System dependencies for Tauri (see [Tauri Prerequisites](https://tauri.app/start/prerequisites/))

### Linux (Fedora/Ubuntu)

```bash
# Fedora
sudo dnf install webkit2gtk4.1-devel openssl-devel curl wget file libappindicator-gtk3-devel librsvg2-devel

# Ubuntu
sudo apt install libwebkit2gtk-4.1-dev libssl-dev curl wget file libayatana-appindicator3-dev librsvg2-dev
```

---

## Setup

```bash
# Clone the repository
git clone https://github.com/Tusharxhub/Synape.git
cd Synape

# Install frontend dependencies
npm install

# Run in development mode
npm run tauri:dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server only |
| `npm run build` | TypeScript check + Vite production build |
| `npm run tauri:dev` | Start full Tauri desktop app in dev mode |
| `npm run tauri:build` | Build production desktop app |

### Fedora/Wayland Note

The `tauri:dev` script includes `WEBKIT_DISABLE_DMABUF_RENDERER=1` to work around a known WebKit rendering issue on Wayland. If you encounter display issues, you can also try:

```bash
GDK_BACKEND=x11 npm run tauri:dev
```

---

## Project Structure

```
Synape/
├── src/                          # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── graph/                # React Flow graph components
│   │   │   ├── ArchitectureCanvas.tsx
│   │   │   ├── SynapseNode.tsx
│   │   │   └── GraphLegend.tsx
│   │   ├── layout/
│   │   │   └── AppShell.tsx
│   │   └── panels/
│   │       ├── ProjectOverview.tsx
│   │       ├── InspectorPanel.tsx
│   │       ├── DockerPanel.tsx
│   │       └── DependencyPanel.tsx
│   ├── hooks/
│   │   ├── useProjectImport.ts
│   │   └── useGraphSelection.ts
│   ├── lib/
│   │   ├── tauri.ts              # Tauri API bridge
│   │   ├── graph.ts              # Graph layout logic
│   │   └── format.ts             # Formatting utilities
│   ├── types/
│   │   └── synapse.ts            # TypeScript type definitions
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
│
├── src-tauri/                    # Backend (Rust)
│   └── src/
│       ├── lib.rs                # Tauri app entry
│       ├── main.rs
│       ├── commands/
│       │   ├── scan_project.rs   # Project scan command
│       │   └── docker.rs         # Docker check command
│       ├── scanner/
│       │   ├── filesystem.rs     # Filesystem walker
│       │   ├── package_json.rs   # package.json parser
│       │   ├── framework.rs      # Framework detector
│       │   ├── graph.rs          # Architecture graph generator
│       │   └── health.rs         # Health score calculator
│       └── models/
│           └── project.rs        # Data models (Serde)
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## How It Works

1. **Import** — Click "Import Project" to open the native folder picker
2. **Scan** — Rust backend scans the filesystem (skipping `node_modules`, `.git`, etc.)
3. **Analyze** — Detects framework, package manager, dependencies, Docker files
4. **Visualize** — Generates an architecture graph with up to 120 prioritized nodes
5. **Inspect** — Click any node to see its metadata, risk level, and path
6. **Assess** — View health score based on project best practices

---

## Security

SYNAPSE is designed as a **read-only** analysis tool:

- ✅ Only reads filesystem metadata and structure
- ✅ `.env` files are detected but contents are **never** read or displayed
- ✅ No destructive commands are ever executed
- ✅ Docker check only runs `docker --version`
- ✅ No network requests, no cloud backend
- ✅ No automatic script execution

---

## License

MIT

---

Built by [Tushar Kanti Dey](https://github.com/Tusharxhub)
