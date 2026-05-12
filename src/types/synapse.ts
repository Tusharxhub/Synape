// ─── Enums & Aliases ───

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun" | "unknown";

export type FileCategory =
  | "source"
  | "config"
  | "style"
  | "asset"
  | "test"
  | "documentation"
  | "environment"
  | "unknown";

export type RiskLevel = "low" | "medium" | "high";

export type NodeType =
  | "entry"
  | "folder"
  | "file"
  | "dependency"
  | "config"
  | "docker";

// ─── Project Scan Result (from Rust backend) ───

export interface ProjectScanResult {
  projectName: string;
  rootPath: string;
  totalFiles: number;
  totalFolders: number;
  totalSizeBytes: number;
  detectedFramework: string | null;
  packageManager: PackageManager;
  hasGit: boolean;
  hasDocker: boolean;
  hasEnv: boolean;
  hasReadme: boolean;
  healthScore: number;
  healthStatus: "Healthy" | "Needs Attention" | "Risky";
  healthLabel: string;
  files: ProjectFile[];
  folders: ProjectFolder[];
  dependencies: ProjectDependency[];
  docker: DockerProjectInfo;
  graph: ArchitectureGraph;
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  relativePath: string;
  extension: string | null;
  sizeBytes: number;
  category: FileCategory;
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
  nodeType: NodeType;
  riskLevel: RiskLevel;
  metadata: Record<string, string | number | boolean | null>;
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  edgeType: "contains" | "imports" | "depends_on" | "configures" | "dockerizes";
}

// ─── Docker ───

export interface DockerStatus {
  available: boolean;
  version: string | null;
}

export interface DockerProjectInfo {
  detected: boolean;
  dockerfilePath: string | null;
  composePath: string | null;
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
