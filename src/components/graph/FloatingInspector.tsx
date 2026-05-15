import { AnimatePresence, motion } from "framer-motion";
import { Container, Crown, FileCode2, Folder, Package, Settings, X, ExternalLink } from "lucide-react";
import type { SelectedNodeData } from "@/types";

interface FloatingInspectorProps {
  selectedNode: SelectedNodeData | null;
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  entry: <Crown size={14} className="text-synapse-warning" />,
  folder: <Folder size={14} className="text-synapse-text-muted" />,
  file: <FileCode2 size={14} className="text-synapse-accent" />,
  dependency: <Package size={14} className="text-synapse-success" />,
  config: <Settings size={14} className="text-synapse-warning" />,
  docker: <Container size={14} className="text-sky-400" />,
};

function riskChipClass(riskLevel: string) {
  if (riskLevel === "high") return "border-synapse-danger/50 bg-synapse-danger/10 text-synapse-danger";
  if (riskLevel === "medium") return "border-synapse-warning/50 bg-synapse-warning/10 text-synapse-warning";
  return "border-synapse-success/50 bg-synapse-success/10 text-synapse-success";
}

function riskLabel(riskLevel: string) {
  if (riskLevel === "high") return "High Risk";
  if (riskLevel === "medium") return "Medium Risk";
  return "Low Risk";
}

export function FloatingInspector({ selectedNode, onClose }: FloatingInspectorProps) {
  return (
    <AnimatePresence>
      {selectedNode && (
        <motion.aside
          key={selectedNode.id}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute right-6 top-6 z-30 w-[340px] rounded-2xl border border-synapse-border/60 bg-synapse-panel/90 shadow-2xl backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-synapse-border/40 px-4 py-3.5">
            <div className="min-w-0">
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-synapse-text-muted/60">
                Node Inspector
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-synapse-border bg-synapse-surface/70">
                  {iconMap[selectedNode.nodeType] ?? iconMap.file}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-synapse-text">{selectedNode.label}</p>
                  <p className="text-[10px] capitalize text-synapse-text-muted">{selectedNode.nodeType}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-synapse-border/60 p-1.5 text-synapse-text-muted transition-colors hover:bg-synapse-surface hover:text-synapse-text"
              aria-label="Close inspector"
            >
              <X size={12} />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-2.5 p-4">
            {/* Risk Level */}
            <div className="flex items-center justify-between rounded-lg border border-synapse-border/60 bg-synapse-surface/50 px-3 py-2">
              <span className="text-[10px] uppercase tracking-wider text-synapse-text-muted">Risk</span>
              <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${riskChipClass(selectedNode.riskLevel)}`}>
                {riskLabel(selectedNode.riskLevel)}
              </span>
            </div>

            {/* Path */}
            <div className="rounded-lg border border-synapse-border/60 bg-synapse-surface/50 px-3 py-2">
              <p className="mb-1 text-[9px] uppercase tracking-wider text-synapse-text-muted">Path</p>
              <div className="flex items-center gap-1.5">
                <ExternalLink size={10} className="shrink-0 text-synapse-text-muted/60" />
                <p className="break-all font-mono text-[10px] leading-relaxed text-synapse-text-muted">
                  {selectedNode.path}
                </p>
              </div>
            </div>

            {/* Metadata */}
            {Object.keys(selectedNode.metadata ?? {}).length > 0 && (
              <div className="rounded-lg border border-synapse-border/60 bg-synapse-surface/50 px-3 py-2">
                <p className="mb-2 text-[9px] uppercase tracking-wider text-synapse-text-muted">Properties</p>
                <div className="space-y-1">
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between gap-2 rounded-md border border-synapse-border/40 bg-synapse-bg/40 px-2 py-1">
                      <span className="truncate text-[10px] text-synapse-text-muted">{key}</span>
                      <span className="max-w-[55%] truncate font-mono text-[10px] text-synapse-text">
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
