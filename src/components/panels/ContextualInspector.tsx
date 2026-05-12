import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, FileCode2, Folder, Package, Settings, X } from "lucide-react";
import type { SelectedNodeData } from "@/types";

interface ContextualInspectorProps {
  selectedNode: SelectedNodeData | null;
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  folder: <Folder size={14} className="text-synapse-text-muted" />,
  file: <FileCode2 size={14} className="text-synapse-text-muted" />,
  dependency: <Package size={14} className="text-synapse-success" />,
  config: <Settings size={14} className="text-synapse-warning" />,
  entry: <AlertTriangle size={14} className="text-synapse-warning" />,
  docker: <Package size={14} className="text-synapse-accent" />,
};

function riskChipClass(riskLevel: string) {
  if (riskLevel === "high") return "border-synapse-danger/50 bg-synapse-danger/10 text-synapse-danger";
  if (riskLevel === "medium") return "border-synapse-warning/50 bg-synapse-warning/10 text-synapse-warning";
  return "border-synapse-success/50 bg-synapse-success/10 text-synapse-success";
}

export function ContextualInspector({ selectedNode, onClose }: ContextualInspectorProps) {
  return (
    <AnimatePresence>
      {selectedNode && (
        <motion.aside
          key={selectedNode.id}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute right-6 top-6 z-30 w-[340px] rounded-2xl border border-synapse-border/40 bg-synapse-panel/85 p-4 shadow-2xl backdrop-blur-2xl"
        >
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-synapse-border/40 pb-3">
            <div className="min-w-0">
              <p className="mb-1 text-[10px] uppercase tracking-widest text-synapse-text-muted/70">Node Identity</p>
              <div className="flex items-center gap-2">
                {iconMap[selectedNode.nodeType] ?? iconMap.file}
                <p className="truncate text-sm font-semibold text-synapse-text">{selectedNode.label}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-synapse-border p-1 text-synapse-text-muted transition-colors hover:text-synapse-text"
              aria-label="Close inspector"
            >
              <X size={13} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="rounded-lg border border-synapse-border bg-synapse-surface/70 px-2.5 py-2">
              <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">Type</p>
              <p className="text-xs text-synapse-text">{selectedNode.nodeType}</p>
            </div>

            <div className="rounded-lg border border-synapse-border bg-synapse-surface/70 px-2.5 py-2">
              <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">Risk</p>
              <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-medium ${riskChipClass(selectedNode.riskLevel)}`}>
                {selectedNode.riskLevel}
              </span>
            </div>

            <div className="rounded-lg border border-synapse-border bg-synapse-surface/70 px-2.5 py-2">
              <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">Path</p>
              <p className="break-all font-mono text-[11px] text-synapse-text-muted">{selectedNode.path}</p>
            </div>

            {Object.keys(selectedNode.metadata ?? {}).length > 0 && (
              <div className="rounded-lg border border-synapse-border bg-synapse-surface/70 px-2.5 py-2">
                <p className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">Metadata</p>
                <div className="space-y-1">
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between gap-2 rounded-md border border-synapse-border/70 bg-synapse-bg/50 px-2 py-1">
                      <span className="truncate text-[11px] text-synapse-text-muted">{key}</span>
                      <span className="max-w-[55%] truncate font-mono text-[11px] text-synapse-text">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
