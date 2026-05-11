import { motion, AnimatePresence } from "framer-motion";
import { X, FileCode2, Folder, Link2, AlertTriangle, Radar, ActivitySquare } from "lucide-react";
import type { SelectedNode } from "@/types";

interface NodeInspectorProps {
  selectedNode: SelectedNode | null;
  onClose?: () => void;
}

export function NodeInspector({ selectedNode, onClose }: NodeInspectorProps) {
  const getTypeColor = () => {
    switch (selectedNode?.type) {
      case "folder":
        return "text-synapse-violet";
      case "module":
        return "text-synapse-cyan";
      default:
        return "text-synapse-cyan";
    }
  };

  const getTypeIcon = () => {
    switch (selectedNode?.type) {
      case "folder":
        return <Folder size={20} />;
      case "module":
        return <Radar size={20} />;
      default:
        return <FileCode2 size={20} />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className="flex h-full w-full flex-col overflow-hidden bg-transparent"
      >
        <div className="border-b border-white/8 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-synapse-cyan/50">Inspector</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Node Telemetry</h2>
            </div>
            {selectedNode && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="rounded-full border border-white/8 bg-white/5 p-2 transition-colors hover:bg-white/10"
              >
                <X size={18} className="text-synapse-cyan/70" />
              </motion.button>
            )}
          </div>
        </div>

        {!selectedNode && (
          <div className="flex flex-1 items-center justify-center px-6 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <ActivitySquare size={34} className="mx-auto mb-3 text-synapse-cyan/30" />
              <p className="text-sm text-slate-300/80">
                Select a node in the graph to inspect module structure, paths, and dependency pressure.
              </p>
            </motion.div>
          </div>
        )}

        {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
        >
            {/* Node Name */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-xl"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className={`${getTypeColor()}`}>{getTypeIcon()}</div>
                <span className="text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
                  Name
                </span>
              </div>
              <p className="break-words text-base font-bold text-white">
                {selectedNode.label}
              </p>
            </motion.div>

            {/* Type */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-xl"
            >
              <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
                Type
              </span>
              <span className="inline-block rounded-full border border-synapse-violet/40 bg-synapse-violet/20 px-3 py-1 text-xs font-medium text-synapse-violet">
                {selectedNode.type}
              </span>
            </motion.div>

            {/* File Path */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-xl"
            >
              <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
                Path
              </span>
              <p className="break-all font-mono text-xs text-synapse-cyan/90">
                {selectedNode.path}
              </p>
            </motion.div>

            {/* Dependencies */}
            {selectedNode.dependencies && selectedNode.dependencies.length > 0 && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-xl"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Link2 size={14} className="text-synapse-cyan" />
                  <span className="text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
                    Dependencies ({selectedNode.dependencies.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {selectedNode.dependencies.map((dep, idx) => (
                    <motion.div
                      key={dep}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="truncate rounded-lg border border-white/8 bg-black/20 px-3 py-2 text-xs text-synapse-cyan/80"
                    >
                      → {dep}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Risk Indicator */}
            {selectedNode.metadata?.risk && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-synapse-red/30 bg-synapse-red/5 p-4 backdrop-blur-xl"
              >
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-synapse-red" />
                  <span className="text-xs font-bold uppercase tracking-[0.35em] text-synapse-red">
                    High Risk
                  </span>
                </div>
                <p className="text-xs text-synapse-red/80">
                  This node has complex dependencies or circular references
                </p>
              </motion.div>
            )}

            {/* Metadata */}
            {selectedNode.metadata && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-xl"
              >
                <span className="mb-3 block text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
                  Metadata
                </span>
                <div className="space-y-2 text-xs">
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    key !== "risk" && (
                      <div
                        key={key}
                          className="flex items-center justify-between rounded bg-white/[0.03] px-2 py-1"
                      >
                        <span className="text-synapse-cyan/60">{key}</span>
                          <span className="font-mono text-synapse-violet">
                          {String(value)}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </motion.div>
            )}

            {/* Future Insights */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-xl"
            >
              <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
                AI Insights
              </span>
              <p className="text-xs text-synapse-violet/70">
                Coming soon: Detailed analysis, optimization suggestions, and refactoring recommendations
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
