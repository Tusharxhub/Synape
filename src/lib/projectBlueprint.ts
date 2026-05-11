import type { GraphEdge, GraphNode, ProjectMetadata } from "@/types";

function getProjectName(projectPath?: string) {
  if (!projectPath) {
    return "SYNAPSE Demo";
  }

  const segments = projectPath.split("/").filter(Boolean);
  return segments[segments.length - 1] || "Imported Project";
}

export function buildProjectBlueprint(projectPath?: string) {
  const rootPath = projectPath || "/workspace/synapse-demo";
  const projectName = getProjectName(projectPath);

  const nodes: GraphNode[] = [
    {
      id: "workspace-root",
      label: projectName,
      type: "folder",
      path: rootPath,
      dependencies: ["app-shell", "design-system", "graph-canvas"],
      size: 24,
      metadata: {
        layer: "workspace",
        signal: "entry boundary",
        importance: "orchestration",
      },
    },
    {
      id: "app-shell",
      label: "App.tsx",
      type: "module",
      path: `${rootPath}/src/App.tsx`,
      dependencies: ["project-sidebar", "graph-canvas", "node-inspector"],
      size: 14,
      metadata: {
        layer: "composition",
        signal: "orchestration",
        importance: "system shell",
      },
    },
    {
      id: "graph-canvas",
      label: "ArchitectureGraph.tsx",
      type: "module",
      path: `${rootPath}/src/components/Graph/ArchitectureGraph.tsx`,
      dependencies: ["custom-node", "graph-store"],
      size: 18,
      metadata: {
        layer: "visualization",
        signal: "graph runtime",
        importance: "primary surface",
      },
    },
    {
      id: "project-sidebar",
      label: "ProjectSidebar.tsx",
      type: "module",
      path: `${rootPath}/src/features/Sidebar/ProjectSidebar.tsx`,
      dependencies: ["graph-store", "dialog-bridge"],
      size: 12,
      metadata: {
        layer: "navigation",
        signal: "project intake",
        importance: "control surface",
      },
    },
    {
      id: "node-inspector",
      label: "NodeInspector.tsx",
      type: "module",
      path: `${rootPath}/src/features/Inspector/NodeInspector.tsx`,
      dependencies: ["graph-store"],
      size: 10,
      metadata: {
        layer: "analysis",
        signal: "selection telemetry",
        importance: "diagnostic surface",
      },
    },
    {
      id: "custom-node",
      label: "CustomNode.tsx",
      type: "file",
      path: `${rootPath}/src/components/Graph/CustomNode.tsx`,
      dependencies: ["reactflow", "framer-motion"],
      size: 8,
      metadata: {
        layer: "node rendering",
        signal: "render capsule",
        importance: "visual primitive",
      },
    },
    {
      id: "graph-store",
      label: "useGraphStore.ts",
      type: "file",
      path: `${rootPath}/src/hooks/useGraphStore.ts`,
      dependencies: ["project-blueprint"],
      size: 11,
      risk: "medium",
      metadata: {
        layer: "state",
        signal: "source of truth",
        importance: "control core",
      },
    },
    {
      id: "design-system",
      label: "styles",
      type: "folder",
      path: `${rootPath}/src/styles`,
      dependencies: ["globals-css"],
      size: 6,
      metadata: {
        layer: "presentation",
        signal: "interface palette",
        importance: "surface discipline",
      },
    },
    {
      id: "globals-css",
      label: "globals.css",
      type: "file",
      path: `${rootPath}/src/styles/globals.css`,
      dependencies: [],
      size: 4,
      metadata: {
        layer: "presentation",
        signal: "glow lattice",
        importance: "theme substrate",
      },
    },
    {
      id: "dialog-bridge",
      label: "Tauri Dialog",
      type: "module",
      path: `${rootPath}/src-tauri/plugins/dialog`,
      dependencies: [],
      size: 3,
      risk: "high",
      metadata: {
        layer: "native bridge",
        signal: "folder picker",
        importance: "operational ingress",
      },
    },
  ];

  const edges: GraphEdge[] = [
    { id: "e-workspace-shell", source: "workspace-root", target: "app-shell", type: "import" },
    { id: "e-workspace-graph", source: "workspace-root", target: "graph-canvas", type: "relationship" },
    { id: "e-workspace-sidebar", source: "workspace-root", target: "project-sidebar", type: "relationship" },
    { id: "e-workspace-inspector", source: "workspace-root", target: "node-inspector", type: "relationship" },
    { id: "e-shell-graph", source: "app-shell", target: "graph-canvas", type: "import" },
    { id: "e-shell-sidebar", source: "app-shell", target: "project-sidebar", type: "import" },
    { id: "e-shell-inspector", source: "app-shell", target: "node-inspector", type: "import" },
    { id: "e-graph-node", source: "graph-canvas", target: "custom-node", type: "dependency" },
    { id: "e-graph-store", source: "graph-canvas", target: "graph-store", type: "dependency" },
    { id: "e-sidebar-store", source: "project-sidebar", target: "graph-store", type: "dependency" },
    { id: "e-sidebar-dialog", source: "project-sidebar", target: "dialog-bridge", type: "import" },
    { id: "e-inspector-store", source: "node-inspector", target: "graph-store", type: "dependency" },
    { id: "e-store-blueprint", source: "graph-store", target: "dialog-bridge", type: "relationship" },
    { id: "e-design-globals", source: "design-system", target: "globals-css", type: "import" },
    { id: "e-custom-reactflow", source: "custom-node", target: "graph-canvas", type: "relationship" },
  ];

  const metadata: ProjectMetadata = {
    name: projectName,
    path: rootPath,
    totalFiles: 42,
    totalFolders: 12,
    dependencies: 18,
    framework: "React + Tauri",
    health: projectPath ? 86 : 78,
    status: projectPath ? "Imported" : "Demo telemetry active",
  };

  return { nodes, edges, metadata, projectPath: rootPath };
}