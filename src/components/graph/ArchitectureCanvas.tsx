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
    <div className="relative h-full w-full overflow-hidden bg-synapse-darker">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.06),transparent_50%)]" />

      {/* Animated dot grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #00d9ff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

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
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Cpu size={56} className="mx-auto text-cyan-500/20" />
              </motion.div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.5em] text-cyan-500/40">
                Awaiting project import
              </p>
              <p className="mt-2 text-sm text-white/30">
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
              <Background variant={BackgroundVariant.Dots} gap={36} size={1} color="#7dd3fc12" />
              <Controls
                position="bottom-right"
                showInteractive={false}
                className="synapse-flow-controls"
              />
              <MiniMap
                position="bottom-left"
                style={{
                  background: "rgba(5, 8, 17, 0.85)",
                  border: "1px solid rgba(0, 217, 255, 0.18)",
                  borderRadius: "12px",
                  boxShadow: "0 0 20px rgba(0, 217, 255, 0.08)",
                }}
                maskColor="rgba(5, 8, 17, 0.5)"
                pannable
                zoomable
              />
            </ReactFlow>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas header */}
      <motion.div
        className="pointer-events-none absolute left-5 top-5 z-20 max-w-[380px] rounded-xl border border-white/8 bg-slate-950/70 px-4 py-3 backdrop-blur-xl"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[9px] uppercase tracking-[0.5em] text-cyan-400/60">
          Architecture map
        </p>
        <p className="mt-1.5 text-xs text-white/60">
          {graph
            ? `${graph.nodes.length} nodes · ${graph.edges.length} edges`
            : "No project loaded"
          }
        </p>
      </motion.div>

      {/* Legend */}
      {graph && <GraphLegend />}

      {/* Selection overlay */}
      {selectedNodeId && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06),transparent_40%)]" />
        </motion.div>
      )}
    </div>
  );
}
