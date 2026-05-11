import { useMemo, useCallback } from "react";
import ReactFlow, {
  Node,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
} from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";
import SynapseNode from "./SynapseNode";
import GraphLegend from "./GraphLegend";
import { buildFlowGraph } from "@/lib/graph";
import "reactflow/dist/style.css";
import type { ArchitectureGraph, ArchitectureNode } from "@/types";

interface ArchitectureCanvasProps {
  graph: ArchitectureGraph | null;
  selectedNodeId?: string;
  onNodeClick?: (node: ArchitectureNode) => void;
}

export function ArchitectureCanvas({ graph, selectedNodeId, onNodeClick }: ArchitectureCanvasProps) {
  const nodeTypes = useMemo(() => ({ synapse: SynapseNode as any }), []);

  const { flowNodes, flowEdges } = useMemo(() => {
    if (!graph) return { flowNodes: [], flowEdges: [] };
    const { nodes, edges } = buildFlowGraph(graph);
    return { flowNodes: nodes, flowEdges: edges };
  }, [graph]);

  const displayNodes = useMemo(
    () => flowNodes.map((n) => ({ ...n, selected: n.id === selectedNodeId })),
    [flowNodes, selectedNodeId]
  );

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (onNodeClick && node.data) {
        onNodeClick(node.data as ArchitectureNode);
      }
    },
    [onNodeClick]
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-synapse-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(34,211,238,0.07),transparent_34%),radial-gradient(circle_at_76%_80%,rgba(148,163,184,0.07),transparent_38%)]" />

      <AnimatePresence mode="wait">
        {!graph ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Cpu size={48} className="mx-auto text-synapse-accent/40" />
              </motion.div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-synapse-text-muted">
                Awaiting project import
              </p>
              <p className="mt-2 text-sm text-synapse-text-muted/80">
                Import a project to visualize its architecture graph
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="graph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full"
          >
            <ReactFlow
              nodes={displayNodes}
              edges={flowEdges}
              onNodeClick={handleNodeClick}
              nodeTypes={nodeTypes}
              fitView
              panOnScroll
              zoomOnScroll
              panOnDrag
              minZoom={0.15}
              maxZoom={1.8}
              defaultEdgeOptions={{ type: "smoothstep" }}
              fitViewOptions={{ padding: 0.3 }}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant={BackgroundVariant.Dots} gap={28} size={1} color="#94a3b81f" />
              <Controls
                position="bottom-right"
                showInteractive={false}
                className="synapse-flow-controls"
              />
              <MiniMap
                position="bottom-left"
                style={{
                  background: "rgba(17, 24, 39, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  boxShadow: "0 14px 30px rgba(0, 0, 0, 0.35)",
                }}
                maskColor="rgba(9, 9, 11, 0.45)"
                pannable
                zoomable
              />
            </ReactFlow>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none absolute left-5 top-5 z-20 max-w-[420px] rounded-xl border border-synapse-border bg-synapse-panel/82 px-4 py-3 backdrop-blur-md"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
          Architecture map
        </p>
        <p className="mt-1.5 text-xs text-synapse-text-muted">
          {graph
            ? `${graph.nodes.length} nodes · ${graph.edges.length} edges`
            : "No project loaded"
          }
        </p>
      </motion.div>

      {graph && <GraphLegend />}
    </div>
  );
}
