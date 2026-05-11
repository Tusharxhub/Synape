import { memo } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import {
  FileCode2, Folder, Package, Settings, Container,
  AlertTriangle, Crown
} from "lucide-react";
import type { ArchitectureNode } from "@/types";

interface SynapseNodeProps {
  data: ArchitectureNode;
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
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.18 }}
      className={`
        relative min-w-[180px] max-w-[250px] cursor-pointer overflow-hidden rounded-xl border
        bg-synapse-panel/92 px-3.5 py-3 text-left transition-all duration-150
        ${selected ? "border-synapse-accent/70 shadow-[0_8px_20px_rgba(0,0,0,0.35)]" : "border-synapse-border"}
      `}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.03),transparent_35%)]" />

      <Handle
        type="target"
        position={Position.Top}
        className="!-top-[3px] !h-1.5 !w-1.5 !border-0 !bg-synapse-accent/80"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!-bottom-[3px] !h-1.5 !w-1.5 !border-0 !bg-slate-300/80"
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

      <div className="relative z-10 mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </motion.div>
  );
});

SynapseNode.displayName = "SynapseNode";

export default SynapseNode;
