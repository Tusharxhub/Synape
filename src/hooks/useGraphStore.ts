import { useState, useCallback } from "react";
import type { GraphNode, GraphEdge, ProjectMetadata, SelectedNode } from "@/types";
import { buildProjectBlueprint } from "@/lib/projectBlueprint";

export function useGraphStore() {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [projectPath, setProjectPath] = useState<string>("");
  const [projectMetadata, setProjectMetadata] = useState<ProjectMetadata | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const initializeMockGraph = useCallback((path?: string) => {
    const blueprint = buildProjectBlueprint(path);
    setNodes(blueprint.nodes);
    setEdges(blueprint.edges);
    setProjectMetadata(blueprint.metadata);
    setProjectPath(blueprint.projectPath);
    setSelectedNode(null);
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    projectPath,
    projectMetadata,
    isLoading,
    setNodes,
    setEdges,
    setSelectedNode,
    setProjectPath,
    setProjectMetadata,
    setIsLoading,
    initializeMockGraph,
  };
}
