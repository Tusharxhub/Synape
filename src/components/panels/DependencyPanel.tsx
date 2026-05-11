import { motion } from "framer-motion";
import { Package } from "lucide-react";
import type { ProjectDependency } from "@/types";

interface DependencyPanelProps {
  dependencies: ProjectDependency[];
}

export function DependencyPanel({ dependencies }: DependencyPanelProps) {
  if (dependencies.length === 0) return null;

  const grouped = {
    dependency: dependencies.filter(d => d.type === "dependency"),
    devDependency: dependencies.filter(d => d.type === "devDependency"),
    peerDependency: dependencies.filter(d => d.type === "peerDependency"),
    optionalDependency: dependencies.filter(d => d.type === "optionalDependency"),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-synapse-border bg-synapse-surface/60 p-3.5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Package size={14} className="text-synapse-success" />
        <p className="text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
          Dependencies ({dependencies.length})
        </p>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {grouped.dependency.length > 0 && (
          <DepGroup label="Production" deps={grouped.dependency} color="text-synapse-success" />
        )}
        {grouped.devDependency.length > 0 && (
          <DepGroup label="Development" deps={grouped.devDependency} color="text-synapse-accent" />
        )}
        {grouped.peerDependency.length > 0 && (
          <DepGroup label="Peer" deps={grouped.peerDependency} color="text-synapse-warning" />
        )}
        {grouped.optionalDependency.length > 0 && (
          <DepGroup label="Optional" deps={grouped.optionalDependency} color="text-synapse-text-muted" />
        )}
      </div>
    </motion.div>
  );
}

function DepGroup({ label, deps, color }: { label: string; deps: ProjectDependency[]; color: string }) {
  return (
    <div>
      <p className={`mb-1.5 text-[10px] uppercase tracking-[0.12em] ${color}`}>
        {label} ({deps.length})
      </p>
      <div className="space-y-1">
        {deps.map((dep) => (
          <div key={dep.name} className="flex items-center justify-between rounded-md border border-synapse-border bg-synapse-bg/55 px-2.5 py-1.5">
            <span className="max-w-[140px] truncate text-[10px] text-synapse-text">{dep.name}</span>
            <span className="font-mono text-[9px] text-synapse-text-muted">{dep.version}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
