import { memo } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import {
  FileCode2, Folder, Package, Settings, Container,
  AlertTriangle, Crown
} from "lucide-react";
import type { ArchitectureNode } from "@/types";

interface SynapseNodeProps {
  data: ArchitectureNode & { isDimmed?: boolean };
  selected?: boolean;
}

const nodeConfig: Record<string, {
  icon: React.ReactNode;
  tint: string;
}> = {
  entry: {
    icon: <Crown size={15} className="text-synapse-warning" />,
    tint: "bg-synapse-warning/10 text-synapse-warning",
  },
  folder: {
    icon: <Folder size={15} className="text-synapse-text-muted" />,
    tint: "bg-slate-300/10 text-slate-300",
  },
  file: {
    icon: <FileCode2 size={15} className="text-synapse-accent" />,
    tint: "bg-synapse-accent/10 text-synapse-accent",
  },
  dependency: {
    icon: <Package size={15} className="text-synapse-success" />,
    tint: "bg-synapse-success/10 text-synapse-success",
  },
  config: {
    icon: <Settings size={15} className="text-synapse-warning" />,
    tint: "bg-synapse-warning/10 text-synapse-warning",
  },
  docker: {
    icon: <Container size={15} className="text-sky-400" />,
    tint: "bg-sky-400/10 text-sky-400",
  },
};

const SynapseNode = memo(({ data, selected }: SynapseNodeProps) => {
  const config = nodeConfig[data.nodeType] || nodeConfig.file;
  const isHighRisk = data.riskLevel === "high";

  // For dependency nodes, show version
  const version = data.metadata?.version as string | undefined;
  const depType = data.metadata?.type as string | undefined;

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: data.isDimmed ? 0.35 : 1 }}
      whileHover={{ y: -1, opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`
        group relative min-w-[200px] max-w-[260px] cursor-pointer rounded-xl border
        bg-synapse-panel px-3.5 py-3 text-left transition-all duration-300 backdrop-blur-md
        ${selected ? "border-synapse-accent/60 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5),0_0_0_1px_rgba(34,211,238,0.2)]" : "border-synapse-border/80 shadow-md hover:border-synapse-text-muted/30 hover:shadow-lg hover:bg-synapse-surface"}
      `}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.04] to-transparent" />

      <Handle
        type="target"
        position={Position.Top}
        className="!-top-1.5 !h-2.5 !w-2.5 !border !border-synapse-panel !bg-synapse-text-muted transition-colors hover:!bg-synapse-text opacity-0 group-hover:opacity-100"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!-bottom-1.5 !h-2.5 !w-2.5 !border !border-synapse-panel !bg-synapse-text-muted transition-colors hover:!bg-synapse-text opacity-0 group-hover:opacity-100"
      />

      {isHighRisk && (
        <motion.div
          className="absolute right-2 top-2 rounded-md border border-synapse-danger/40 bg-synapse-danger/10 px-1.5 py-0.5 text-[10px] font-medium text-synapse-danger"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          High
        </motion.div>
      )}

      <div className="relative z-10 flex items-start gap-2.5">
        <div className={`shrink-0 rounded-lg border border-synapse-border p-1.5 ${config.tint}`}>
          {isHighRisk ? (
            <AlertTriangle size={15} className="text-synapse-danger" />
          ) : data.nodeType === "entry" ? (
            <Crown size={15} className="text-synapse-warning" />
          ) : (
            config.icon
          )}
        </div>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold leading-tight text-synapse-text">
            {data.label}
          </span>
          {data.nodeType === "dependency" && version && (
            <span className="mt-0.5 block text-[10px] text-synapse-success/90">
              {version}
            </span>
          )}
          {data.nodeType === "dependency" && depType && (
            <span className="mt-0.5 block text-[9px] tracking-normal text-synapse-text-muted">
              {depType}
            </span>
          )}
          {data.nodeType !== "dependency" && (
            <span className="mt-0.5 block truncate text-[10px] text-synapse-text-muted">
              {data.nodeType}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

SynapseNode.displayName = "SynapseNode";

export default SynapseNode;
