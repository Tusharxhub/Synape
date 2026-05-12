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
    () => flowNodes.map((n) => {
      const isSelected = n.id === selectedNodeId;
      const isDimmed = selectedNodeId ? !isSelected : false;
      return { 
        ...n, 
        selected: isSelected,
        data: { ...n.data, isDimmed } 
      };
    }),
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="flex h-full w-full items-center justify-center p-8"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-synapse-border bg-synapse-panel/40 p-8 text-center shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-synapse-surface/20 to-transparent pointer-events-none" />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex h-20 w-20 mx-auto items-center justify-center rounded-2xl border border-synapse-border/60 bg-synapse-surface/50 shadow-inner"
              >
                <Cpu size={36} className="text-synapse-accent/60" />
              </motion.div>
              <h2 className="relative z-10 mt-6 text-[15px] font-medium tracking-wide text-synapse-text">
                Architecture Observatory
              </h2>
              <p className="relative z-10 mt-2 text-[13px] text-synapse-text-muted/80 leading-relaxed">
                Import a local project or connect a repository to generate a real-time, interactive topology of your software architecture.
              </p>
              
              <div className="relative z-10 mt-8 grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center rounded-xl bg-synapse-surface/30 p-3 outline outline-1 outline-synapse-border/40">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-synapse-text-muted/60">Search</span>
                  <span className="mt-1 flex items-center gap-1 text-[11px] font-mono text-synapse-text-muted"><kbd className="px-1.5 py-0.5 rounded bg-synapse-panel shadow-sm">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-synapse-panel shadow-sm">K</kbd></span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-synapse-surface/30 p-3 outline outline-1 outline-synapse-border/40">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-synapse-text-muted/60">Import</span>
                  <span className="mt-1 flex items-center gap-1 text-[11px] font-mono text-synapse-text-muted"><kbd className="px-1.5 py-0.5 rounded bg-synapse-panel shadow-sm">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-synapse-panel shadow-sm">O</kbd></span>
                </div>
              </div>
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
              <Background variant={BackgroundVariant.Lines} gap={32} lineWidth={1} color="rgba(255, 255, 255, 0.025)" />
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
