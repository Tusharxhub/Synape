// ─── Project Scan Result (from Rust backend) ───

export interface ProjectScanResult {
  projectName: string;
  rootPath: string;
  totalFiles: number;
  totalFolders: number;
  totalSizeBytes: number;
  detectedFramework: string | null;
  packageManager: string;
  hasGit: boolean;
  hasDocker: boolean;
  hasEnv: boolean;
  healthScore: number;
  healthLabel: string;
  files: ProjectFile[];
  folders: ProjectFolder[];
  dependencies: ProjectDependency[];
  graph: ArchitectureGraph;
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  relativePath: string;
  extension: string | null;
  sizeBytes: number;
  category: "source" | "config" | "style" | "asset" | "test" | "documentation" | "unknown";
}

export interface ProjectFolder {
  id: string;
  name: string;
  path: string;
  relativePath: string;
}

export interface ProjectDependency {
  name: string;
  version: string;
  type: "dependency" | "devDependency" | "peerDependency" | "optionalDependency";
}

export interface ArchitectureGraph {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  path: string;
  nodeType: "folder" | "file" | "dependency" | "config" | "entry" | "docker";
  riskLevel: "low" | "medium" | "high";
  metadata: Record<string, string | number | boolean | null>;
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  edgeType: "contains" | "imports" | "depends_on" | "configures" | "dockerizes";
}

// ─── Docker Status ───

export interface DockerStatus {
  available: boolean;
  version: string | null;
}

// ─── UI State Types ───

export interface SelectedNodeData {
  id: string;
  label: string;
  nodeType: string;
  riskLevel: string;
  path: string;
  metadata: Record<string, string | number | boolean | null>;
}

export interface AppError {
  message: string;
  details?: string;
  timestamp: number;
}
