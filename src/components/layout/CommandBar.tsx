import { motion } from "framer-motion";
import { CircleDot, Command, FolderOpen, Search, Zap } from "lucide-react";

interface CommandBarProps {
  projectName?: string;
  isLoading: boolean;
  hasProject: boolean;
  onImportProject: () => void;
}

export function CommandBar({
  projectName,
  isLoading,
  hasProject,
  onImportProject,
}: CommandBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-14 items-center justify-between gap-3 bg-synapse-panel/70 px-4 backdrop-blur-md"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-synapse-border bg-synapse-surface/80 text-synapse-accent">
          <Zap size={14} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-normal text-synapse-text">SYNAPSE</p>
          <p className="truncate text-[11px] text-synapse-text-muted">
            {projectName || "No project selected"}
          </p>
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center md:flex">
        <button
          type="button"
          onClick={() => {
            const event = new KeyboardEvent("keydown", { ctrlKey: true, metaKey: true, key: "k" });
            window.dispatchEvent(event);
          }}
          className="inline-flex w-full max-w-[440px] items-center justify-between rounded-lg border border-synapse-border bg-synapse-surface/70 px-3 py-1.5 text-xs text-synapse-text-muted transition-colors hover:bg-synapse-surface hover:text-synapse-text shadow-sm"
        >
          <span className="inline-flex items-center gap-2">
            <Search size={13} />
            Search files, symbols, dependencies
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-synapse-border/60 px-1.5 py-0.5 text-[10px] bg-synapse-panel shadow-sm">
            <Command size={10} />
            K
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1 rounded-lg border border-synapse-border bg-synapse-surface/70 px-2 py-1 text-[11px] text-synapse-text-muted sm:inline-flex">
          <CircleDot size={10} className={hasProject ? "text-synapse-success" : "text-synapse-warning"} />
          {hasProject ? "Indexed" : "Idle"}
        </div>

        <button
          type="button"
          onClick={onImportProject}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-synapse-border bg-synapse-accent/10 px-3 py-1.5 text-xs font-medium text-synapse-accent transition-colors hover:bg-synapse-accent/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FolderOpen size={13} />
          {isLoading ? "Importing..." : "Import Project"}
        </button>
      </div>
    </motion.div>
  );
}
