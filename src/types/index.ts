export type GraphNodeType = "file" | "folder" | "module";

export type GraphRisk = "high" | "medium" | "low";

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  path: string;
  dependencies: string[];
  size?: number;
  risk?: GraphRisk;
  metadata?: Record<string, string | number | boolean>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: "import" | "dependency" | "relationship";
}

export interface ProjectMetadata {
  name: string;
  path: string;
  totalFiles: number;
  totalFolders: number;
  dependencies: number;
  framework?: string;
  health?: number;
  status?: string;
}

export interface SelectedNode {
  id: string;
  label: string;
  type: GraphNodeType;
  path: string;
  dependencies: string[];
  metadata?: Record<string, any>;
}
