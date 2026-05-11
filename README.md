
<div align="center">

# 🧬 SYNAPSE

### Real-Time Software Intelligence Engine




<p>
  SYNAPSE is a native software intelligence engine that transforms codebases into living, interactive, real-time architecture systems.
</p>

<p>
  It does not just analyze software. It lets you <b>see software breathe, evolve, mutate, and communicate.</b>
</p>

<br />

![Status](https://img.shields.io/badge/status-active_development-7c3aed?style=for-the-badge)
![Built With](https://img.shields.io/badge/built_with-rust_+_react_+_python-06b6d4?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-linux_native-111827?style=for-the-badge)
![Vision](https://img.shields.io/badge/vision-engineering_visualized-22c55e?style=for-the-badge)

</div>

---

## 🧠 What Is SYNAPSE?

SYNAPSE is a **native desktop software intelligence engine** designed to help developers understand complex software systems through real-time visual analysis.

Modern software is invisible.

You cannot see:
- how modules depend on each other
- where technical debt spreads
- how architecture changes over time
- which files act like system bottlenecks
- how runtime behavior connects with code structure
- how a project slowly becomes unstable

SYNAPSE makes all of that visible.

It converts a codebase into a living engineering organism.

---

## ⚡ The Core Philosophy

Most tools show software like this:

```txt
files
folders
logs
graphs
terminal output
```

SYNAPSE shows software like this:

```txt
neural pathways
dependency DNA
runtime pulses
architecture mutations
system stress signals
evolution timelines
```

This is not a normal dashboard.

This is an engineering cockpit.

---

## 🧬 Software As A Living Organism

SYNAPSE treats every software project like a biological system.

| Software Reality      | SYNAPSE Visualization  |
| --------------------- | ---------------------- |
| Dependencies          | Neural connections     |
| Modules               | Functional regions     |
| APIs                  | Communication pathways |
| Technical debt        | Structural mutation    |
| Bugs                  | System infection       |
| Runtime spikes        | Stress response        |
| Dead code             | Inactive tissue        |
| Circular dependencies | Corrupted pathways     |
| Git history           | Evolution timeline     |
| Docker containers     | Isolated organs        |
| System processes      | Active life signals    |

The goal is simple:

> Help developers understand how software behaves, not just how it is written.

---

## 🚀 Why SYNAPSE Exists

Developers spend too much time trying to understand systems through scattered information.

They switch between:

* terminal
* logs
* code editor
* package files
* architecture docs
* Docker tools
* Git history
* monitoring dashboards
* AI chats

SYNAPSE brings these signals into one visual intelligence layer.

It helps answer questions like:

* What does this project actually look like internally?
* Which files are most connected?
* Which modules are risky?
* Where is technical debt forming?
* How has the architecture evolved?
* Which dependencies are becoming dangerous?
* What happens when the system runs?

---

## ✨ Key Features

### 1. Project Scanner

SYNAPSE scans a local project and extracts its internal structure.

It reads:

* folders
* files
* imports
* exports
* dependencies
* config files
* API routes
* components
* services
* database-related files

The scanner becomes the foundation of the intelligence engine.

---

### 2. Architecture Visualization

SYNAPSE converts the codebase into an interactive architecture graph.

You can explore:

* file relationships
* module connections
* component hierarchy
* service boundaries
* API communication
* dependency chains
* risky nodes
* overloaded modules

The goal is to make architecture understandable in seconds.

---

### 3. Dependency DNA

SYNAPSE visualizes dependencies like DNA chains.

It can reveal:

* circular dependencies
* over-coupled modules
* unused dependencies
* heavy packages
* risky dependency paths
* poor separation of concerns

Bad architecture becomes visible as mutation.

---

### 4. Runtime Observatory

SYNAPSE watches the system while it runs.

It tracks:

* CPU usage
* memory usage
* active processes
* network activity
* runtime spikes
* Docker containers
* application stress signals

This connects static code structure with live system behavior.

---

### 5. Evolution Engine

SYNAPSE analyzes Git history to understand how the project changed over time.

It can show:

* frequently changed files
* unstable modules
* growing complexity
* dependency expansion
* technical debt spread
* architecture drift

This turns Git history into an evolution timeline.

---

### 6. AI Insight Layer

SYNAPSE uses AI to explain engineering problems clearly.

It can generate:

* architecture summaries
* codebase health reports
* optimization ideas
* scalability warnings
* refactoring suggestions
* technical debt explanations

AI is not the product.

AI is the intelligence layer behind the system.

---

## 🛰️ MVP v0.1 Scope

The first version focuses on the core foundation.

### Included In MVP v0.1

* Native desktop app
* Project import system
* File system scanner
* Basic dependency parser
* Interactive architecture graph
* Project summary panel
* Basic health score
* Futuristic visual interface

### Not Included Yet

* Full AI automation
* Advanced eBPF tracing
* Deep runtime profiling
* Multi-language support
* Cloud sync
* Team collaboration

These belong in future phases.

---

## 🛠️ Tech Stack

### Native Desktop

* Tauri
* Rust

Used for filesystem access, native performance, and system integration.

### Frontend

* React
* TypeScript
* Tailwind CSS
* Framer Motion
* React Flow
* Three.js
* React Three Fiber
* D3.js

Used for the cinematic visual interface.

### Intelligence Engine

* Python
* FastAPI
* Tree-sitter
* AST parsing

Used for static analysis and architecture intelligence.

### Runtime Layer

* WebSockets
* Docker API
* Linux system APIs
* Process monitoring

Used for real-time system signals.

### AI Layer

* Ollama
* Local LLMs
* OpenAI-compatible APIs
* RAG-based project understanding

Used for intelligent explanations and engineering reports.

---

## 🧩 System Architecture

```txt
┌──────────────────────────────────────────┐
│              SYNAPSE FRONTEND             │
│  React + Tailwind + Motion + Graph Engine │
└─────────────────────┬────────────────────┘
                      │
                      │ Commands / Events
                      ▼
┌──────────────────────────────────────────┐
│               TAURI CORE                  │
│           Rust Native Backend             │
└─────────────────────┬────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
┌─────────────────────┐   ┌────────────────────────┐
│  Analysis Engine     │   │    Runtime Monitor      │
│  Python + AST        │   │ Linux + Docker Signals  │
└─────────────────────┘   └────────────────────────┘
        │                           │
        └─────────────┬─────────────┘
                      ▼
┌──────────────────────────────────────────┐
│          Visualization Engine             │
│ Graphs + DNA Chains + Runtime Signals     │
└──────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```txt
synapse/
│
├── apps/
│   ├── desktop/
│   │   ├── src-tauri/
│   │   └── src/
│   │
│   ├── frontend/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── styles/
│   │
│   └── analysis-engine/
│       ├── app/
│       ├── analyzers/
│       ├── parsers/
│       ├── services/
│       └── main.py
│
├── packages/
│   ├── visualization-engine/
│   ├── graph-core/
│   ├── runtime-monitor/
│   └── shared-types/
│
├── docs/
│   ├── architecture.md
│   ├── roadmap.md
│   ├── setup.md
│   └── api.md
│
├── scripts/
├── assets/
├── docker/
├── README.md
└── LICENSE
```

---

## 🔬 How SYNAPSE Works

### Step 1: Import A Project

The user selects a local project folder.

```txt
/home/user/projects/my-app
```

SYNAPSE starts scanning the project.

---

### Step 2: Extract Structure

The scanner reads:

* files
* folders
* package files
* source code
* imports
* exports
* config files

Example output:

```json
{
  "projectName": "my-app",
  "totalFiles": 124,
  "totalFolders": 28,
  "dependencies": 42,
  "entryPoints": ["src/main.tsx"],
  "framework": "React"
}
```

---

### Step 3: Build The Architecture Graph

SYNAPSE converts scanned data into graph nodes and edges.

```json
{
  "nodes": [
    {
      "id": "src/App.tsx",
      "type": "component",
      "label": "App.tsx"
    }
  ],
  "edges": [
    {
      "from": "src/App.tsx",
      "to": "src/components/Header.tsx",
      "type": "import"
    }
  ]
}
```

---

### Step 4: Visualize The System

The frontend renders the system as an interactive engineering map.

Users can:

* zoom
* pan
* inspect nodes
* highlight dependencies
* detect risky modules
* view architecture layers
* explore the codebase visually

---

### Step 5: Generate Intelligence

SYNAPSE analyzes the graph and produces insight.

Example:

```txt
The project has a high number of imports from the components folder.
This may indicate weak separation between UI and business logic.
Consider introducing feature-based modules.
```

---

## 🎨 UI Direction

SYNAPSE should feel like:

```txt
a neural control room
a cybernetic engineering cockpit
a living system observatory
a software MRI scanner
```

### Visual Style

* dark graphite interface
* neon violet and cyan highlights
* animated graph systems
* glowing node networks
* floating tactical panels
* smooth cinematic transitions
* layered depth
* terminal-inspired details
* data streams
* neural motion language

### Main UI Sections

* Project Overview
* Architecture Graph
* Dependency DNA
* Runtime Observatory
* Evolution Timeline
* AI Insight Panel
* System Health Score

---

## 🧪 npm Setup

### Clone Repository

```bash
git clone https://github.com/Tusharxhub/synapse.git
cd synapse
```

### Install Dependencies

```bash
npm install
```

### Run Desktop App

```bash
npm run tauri dev
```

### Run Frontend Only

```bash
npm run dev
```

### Run Analysis Engine

```bash
cd apps/analysis-engine
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 📜 Recommended npm Scripts

Add these scripts to your root `package.json`.

```json
{
  "scripts": {
    "dev": "npm run dev --workspace=apps/desktop",
    "build": "npm run build --workspace=apps/desktop",
    "preview": "npm run preview --workspace=apps/desktop",
    "tauri": "npm run tauri --workspace=apps/desktop",
    "tauri:dev": "npm run tauri dev --workspace=apps/desktop",
    "tauri:build": "npm run tauri build --workspace=apps/desktop",
    "analysis:dev": "cd apps/analysis-engine && uvicorn main:app --reload --port 8000",
    "lint": "npm run lint --workspaces",
    "format": "prettier --write ."
  }
}
```

---

## 🗺️ Roadmap

### Phase 1: Foundation

* Setup Tauri desktop app
* Setup React + TypeScript frontend
* Build project import system
* Build file scanner
* Render basic graph visualization

### Phase 2: Intelligence

* Add dependency parser
* Detect framework type
* Analyze imports and exports
* Generate architecture summary
* Add basic health scoring

### Phase 3: Visualization

* Add graph animations
* Add dependency DNA view
* Add module risk highlighting
* Add project overview dashboard

### Phase 4: Runtime Monitoring

* Add CPU and memory tracking
* Add process monitoring
* Add Docker container monitoring
* Stream runtime events through WebSockets

### Phase 5: Evolution Engine

* Read Git history
* Track file change frequency
* Detect complexity growth
* Visualize project evolution timeline

### Phase 6: AI Insight Layer

* Add local AI model support
* Generate architecture reports
* Suggest refactoring improvements
* Explain technical debt
* Generate project health summary

---

## 🧠 Future Scope

Future versions of SYNAPSE may include:

* eBPF-based runtime tracing
* VS Code extension
* GitHub repository import
* multi-language support
* team collaboration
* plugin system
* security vulnerability mapping
* performance profiling
* CI/CD pipeline visualization
* AI-powered refactoring planner
* cloud architecture intelligence

---

## 🎯 Development Goals

SYNAPSE is being built with these goals:

* Make software architecture visually understandable
* Build a clean native desktop experience
* Connect static analysis with runtime behavior
* Use AI as an explanation layer, not a gimmick
* Explore real engineering beyond normal web apps
* Create a project that feels research-grade and product-grade

---

## 🧑‍💻 Author

Built by **Tushar Kanti Dey**

A software engineering student exploring AI, systems visualization, developer tooling, runtime intelligence, and futuristic human-computer interaction.

🌐 Portfolio: [https://www.tushardevx01.tech](https://www.tushardevx01.tech)

---

## 🔗 Connect

📧 Email: [thetushardev0@gmail.com](mailto:thetushardev0@gmail.com)
📸 Instagram: [tushardevx01](https://www.instagram.com/tushardevx01/)

---

## 📄 License

This project is currently under active development.

License details will be added soon.

---

<div align="center">

## 🧬 Final Mission

```txt
SYNAPSE is not just a final-year project.

It is an attempt to rethink how developers experience software systems.
```
