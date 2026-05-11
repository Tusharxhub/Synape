import { motion, AnimatePresence } from "framer-motion";
import {
  X, FileCode2, Folder, Package, Settings, Container,
  Crown, AlertTriangle, Activity
} from "lucide-react";
import { getRiskColor } from "@/lib/format";
import type { SelectedNodeData } from "@/types";

interface InspectorPanelProps {
  selectedNode: SelectedNodeData | null;
  onClose: () => void;
}

const nodeIcons: Record<string, React.ReactNode> = {
  entry: <Crown size={18} className="text-amber-400" />,
  folder: <Folder size={18} className="text-violet-400" />,
  file: <FileCode2 size={18} className="text-cyan-400" />,
  dependency: <Package size={18} className="text-emerald-400" />,
  config: <Settings size={18} className="text-amber-400" />,
  docker: <Container size={18} className="text-blue-400" />,
};

export function InspectorPanel({ selectedNode, onClose }: InspectorPanelProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/6 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.55em] text-cyan-400/50">
              Inspector
            </p>
            <h2 className="mt-1.5 text-lg font-semibold text-white">
              Node Telemetry
            </h2>
          </div>
          {selectedNode && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="rounded-full border border-white/8 bg-white/5 p-1.5 hover:bg-white/10 transition-colors"
            >
              <X size={14} className="text-white/50" />
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedNode ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 items-center justify-center px-5 text-center"
          >
            <div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Activity size={32} className="mx-auto text-cyan-500/20" />
              </motion.div>
              <p className="mt-4 text-xs text-white/35 max-w-[200px] leading-relaxed">
                Click a node in the graph to inspect its structure, path, and metadata
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
          >
            {/* Node Identity */}
            <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2.5 mb-2">
                {nodeIcons[selectedNode.nodeType] || nodeIcons.file}
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
                  {selectedNode.nodeType}
                </span>
              </div>
              <p className="text-base font-bold text-white break-words">
                {selectedNode.label}
              </p>
            </div>

            {/* Risk Level */}
            <div className={`rounded-xl border p-3.5 ${
              selectedNode.riskLevel === "high"
                ? "border-red-500/30 bg-red-500/5"
                : selectedNode.riskLevel === "medium"
                ? "border-amber-500/25 bg-amber-500/5"
                : "border-white/6 bg-white/[0.02]"
            }`}>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-1.5">Risk Level</p>
              <div className="flex items-center gap-2">
                {selectedNode.riskLevel === "high" && <AlertTriangle size={14} className="text-red-400" />}
                <span className={`text-sm font-semibold capitalize ${getRiskColor(selectedNode.riskLevel)}`}>
                  {selectedNode.riskLevel}
                </span>
              </div>
              {selectedNode.riskLevel === "high" && (
                <p className="mt-1.5 text-[10px] text-red-400/60">
                  This node may contain sensitive data or critical configuration
                </p>
              )}
            </div>

            {/* Path */}
            <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-1.5">Path</p>
              <p className="font-mono text-[11px] text-cyan-400/80 break-all leading-relaxed">
                {selectedNode.path}
              </p>
            </div>

            {/* Metadata */}
            {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
              <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-2.5">
                  Metadata
                </p>
                <div className="space-y-1.5">
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-2.5 py-1.5">
                      <span className="text-[10px] text-white/35">{key}</span>
                      <span className="font-mono text-[10px] text-violet-400 max-w-[140px] truncate text-right">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Future Insights Placeholder */}
            <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-1.5">
                Insights
              </p>
              <p className="text-[10px] text-violet-400/50 italic">
                Deep analysis coming in future release
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
