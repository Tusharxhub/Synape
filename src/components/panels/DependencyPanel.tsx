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
      className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5"
    >
      <div className="flex items-center gap-2 mb-3">
        <Package size={14} className="text-emerald-400" />
        <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/50">
          Dependencies ({dependencies.length})
        </p>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {grouped.dependency.length > 0 && (
          <DepGroup label="Production" deps={grouped.dependency} color="text-emerald-400" />
        )}
        {grouped.devDependency.length > 0 && (
          <DepGroup label="Development" deps={grouped.devDependency} color="text-violet-400" />
        )}
        {grouped.peerDependency.length > 0 && (
          <DepGroup label="Peer" deps={grouped.peerDependency} color="text-amber-400" />
        )}
        {grouped.optionalDependency.length > 0 && (
          <DepGroup label="Optional" deps={grouped.optionalDependency} color="text-white/40" />
        )}
      </div>
    </motion.div>
  );
}

function DepGroup({ label, deps, color }: { label: string; deps: ProjectDependency[]; color: string }) {
  return (
    <div>
      <p className={`text-[9px] uppercase tracking-[0.3em] mb-1.5 ${color}`}>
        {label} ({deps.length})
      </p>
      <div className="space-y-1">
        {deps.map((dep) => (
          <div key={dep.name} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-2.5 py-1.5">
            <span className="text-[10px] text-white/60 truncate max-w-[140px]">{dep.name}</span>
            <span className="text-[9px] font-mono text-white/25">{dep.version}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
