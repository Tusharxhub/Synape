import { motion } from "framer-motion";
import { Cpu, FolderOpen, ArrowRight } from "lucide-react";

interface GraphEmptyStateProps {
  onImportProject?: () => void;
}

export function GraphEmptyState({ onImportProject }: GraphEmptyStateProps) {
  return (
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

        {/* Floating Icon */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-synapse-border/60 bg-synapse-surface/50 shadow-inner"
        >
          <Cpu size={36} className="text-synapse-accent/60" />
        </motion.div>

        {/* Heading */}
        <h2 className="relative z-10 mt-6 text-[15px] font-medium tracking-wide text-synapse-text">
          Architecture Observatory
        </h2>
        <p className="relative z-10 mt-2 text-[13px] text-synapse-text-muted/80 leading-relaxed max-w-xs mx-auto">
          Import a local project to generate a real-time, interactive topology of
          your software architecture.
        </p>

        {/* Import Action */}
        {onImportProject && (
          <motion.button
            type="button"
            onClick={onImportProject}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 mt-6 inline-flex items-center gap-2.5 rounded-lg border border-synapse-accent/30 bg-synapse-accent/10 px-5 py-2.5 text-[13px] font-medium text-synapse-accent transition-colors hover:bg-synapse-accent/15"
          >
            <FolderOpen size={14} />
            Import Project
            <ArrowRight size={12} className="opacity-60" />
          </motion.button>
        )}

        {/* Keyboard shortcuts */}
        <div className="relative z-10 mt-8 grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-xl bg-synapse-surface/30 p-3 outline outline-1 outline-synapse-border/40">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-synapse-text-muted/60">
              Search
            </span>
            <span className="mt-1 flex items-center gap-1 text-[11px] font-mono text-synapse-text-muted">
              <kbd className="rounded bg-synapse-panel px-1.5 py-0.5 shadow-sm">Ctrl</kbd>
              +
              <kbd className="rounded bg-synapse-panel px-1.5 py-0.5 shadow-sm">K</kbd>
            </span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-synapse-surface/30 p-3 outline outline-1 outline-synapse-border/40">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-synapse-text-muted/60">
              Import
            </span>
            <span className="mt-1 flex items-center gap-1 text-[11px] font-mono text-synapse-text-muted">
              <kbd className="rounded bg-synapse-panel px-1.5 py-0.5 shadow-sm">Ctrl</kbd>
              +
              <kbd className="rounded bg-synapse-panel px-1.5 py-0.5 shadow-sm">O</kbd>
            </span>
          </div>
        </div>

        {/* Recent placeholder */}
        <div className="relative z-10 mt-6 rounded-lg border border-synapse-border/30 bg-synapse-bg/40 px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-synapse-text-muted/50">
            Recent Projects
          </p>
          <p className="mt-1 text-[11px] text-synapse-text-muted/40">
            Your recently scanned projects will appear here
          </p>
        </div>
      </div>
    </motion.div>
  );
}
