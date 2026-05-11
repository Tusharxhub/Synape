import type { Node, Edge } from "reactflow";
import type { ArchitectureGraph, ArchitectureNode, ArchitectureEdge } from "@/types";

/// Edge color mapping by type
const EDGE_COLORS: Record<string, string> = {
  contains: "#7dd3fc",
  imports: "#00d9ff",
  depends_on: "#a855f7",
  configures: "#fbbf24",
  dockerizes: "#38bdf8",
};

/// Convert architecture graph data into React Flow nodes and edges
export function buildFlowGraph(graph: ArchitectureGraph): { nodes: Node[]; edges: Edge[] } {
  const nodes = layoutNodes(graph.nodes);
  const edges = graph.edges.map(mapEdge);
  return { nodes, edges };
}

function layoutNodes(archNodes: ArchitectureNode[]): Node[] {
  // Group nodes by type for hierarchical layout
  const groups: Record<string, ArchitectureNode[]> = {};
  for (const node of archNodes) {
    const key = node.nodeType;
    if (!groups[key]) groups[key] = [];
    groups[key].push(node);
  }

  const typeOrder = ["entry", "docker", "folder", "config", "file", "dependency"];
  const result: Node[] = [];
  let globalY = 0;

  for (const type of typeOrder) {
    const group = groups[type];
    if (!group || group.length === 0) continue;

    const cols = type === "dependency" ? 6 : type === "file" ? 5 : 4;
    const spacingX = type === "dependency" ? 200 : 260;
    const spacingY = type === "dependency" ? 100 : 160;

    for (let i = 0; i < group.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Center each row
      const rowItems = Math.min(cols, group.length - row * cols);
      const totalRowWidth = (rowItems - 1) * spacingX;
      const startX = -totalRowWidth / 2;

      result.push({
        id: group[i].id,
        data: group[i],
        position: {
          x: startX + col * spacingX,
          y: globalY + row * spacingY,
        },
        type: "synapse",
        draggable: true,
      });
    }

    const rows = Math.ceil(group.length / cols);
    globalY += rows * spacingY + 80;
  }

  return result;
}

function mapEdge(edge: ArchitectureEdge): Edge {
  const color = EDGE_COLORS[edge.edgeType] || "#7dd3fc";
  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: edge.edgeType === "depends_on" || edge.edgeType === "dockerizes",
    type: "smoothstep",
    markerEnd: { type: "arrowclosed" as any, color },
    style: {
      stroke: color,
      strokeWidth: edge.edgeType === "depends_on" ? 1.5 : 2,
      opacity: edge.edgeType === "depends_on" ? 0.5 : 0.7,
    },
  };
}
