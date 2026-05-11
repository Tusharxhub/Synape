import { useState, useCallback } from "react";
import type { SelectedNodeData, ArchitectureNode } from "@/types";

export function useGraphSelection() {
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);

  const selectNode = useCallback((node: ArchitectureNode) => {
    setSelectedNode({
      id: node.id,
      label: node.label,
      nodeType: node.nodeType,
      riskLevel: node.riskLevel,
      path: node.path,
      metadata: node.metadata,
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return { selectedNode, selectNode, clearSelection };
}
