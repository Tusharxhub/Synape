import { useMemo, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  MarkerType,
} from "reactflow";
import { motion } from "framer-motion";
import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";
import type { GraphNode, GraphEdge } from "@/types";

interface ArchitectureGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
}

export function ArchitectureGraph({
  nodes: dataNodes,
  edges: dataEdges,
  selectedNodeId,
  onNodeClick,
}: ArchitectureGraphProps) {
  const nodeTypes = useMemo(() => ({ custom: CustomNode as any }), []);

  const flowNodes: Node[] = useMemo(
    () =>
      dataNodes.map((node, idx) => ({
        id: node.id,
        data: node,
        position: {
          x: (idx % 4) * 240 + 120,
          y: Math.floor(idx / 4) * 190 + 120,
        },
        type: "custom",
        draggable: true,
      })),
    [dataNodes]
  );

  const flowEdges: Edge[] = useMemo(
    () =>
      dataEdges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: true,
        type: "smoothstep",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edge.type === "import" ? "#00d9ff" : edge.type === "dependency" ? "#a855f7" : "#7dd3fc",
        },
        style: {
          stroke: edge.type === "import" ? "#00d9ff" : edge.type === "dependency" ? "#a855f7" : "#7dd3fc",
          strokeWidth: edge.type === "dependency" ? 2.5 : 2,
          opacity: 0.68,
        },
      })),
    [dataEdges]
  );

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      onNodeClick?.(node.id);
    },
    [onNodeClick]
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-synapse-darker">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.08),transparent_44%)]" />
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #00d9ff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <ReactFlow
        nodes={flowNodes.map((node) => ({
          ...node,
          selected: node.id === selectedNodeId,
        }))}
        edges={flowEdges}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        panOnScroll
        zoomOnScroll
        panOnDrag
        minZoom={0.28}
        maxZoom={1.5}
        defaultEdgeOptions={{ type: "smoothstep" }}
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={32} size={1} color="#7dd3fc1f" />
        <Controls position="bottom-right" showInteractive={false} className="synapse-flow-controls" />
        <MiniMap
          position="bottom-left"
          style={{
            background: "rgba(5, 8, 17, 0.82)",
            border: "1px solid rgba(0, 217, 255, 0.22)",
            borderRadius: "14px",
            boxShadow: "0 0 24px rgba(0, 217, 255, 0.12)",
          }}
          maskColor="rgba(5, 8, 17, 0.5)"
          pannable
          zoomable
        />
      </ReactFlow>

      <motion.div
        className="pointer-events-none absolute left-6 top-6 z-20 max-w-[420px] rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl shadow-[0_0_40px_rgba(0,217,255,0.08)]"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[10px] uppercase tracking-[0.45em] text-synapse-cyan/70">Live architecture map</p>
        <p className="mt-2 text-sm text-white/90">
          Zoom, pan, and click nodes to inspect structural relationships in the system graph.
        </p>
      </motion.div>

      {selectedNodeId && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_38%)]" />
        </motion.div>
      )}
    </div>
  );
}
