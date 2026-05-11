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
  gradient: string;
  glow: string;
  borderColor: string;
}> = {
  entry: {
    icon: <Crown size={16} className="text-amber-400" />,
    gradient: "from-amber-500/20 via-slate-950/90 to-slate-950",
    glow: "shadow-[0_0_24px_rgba(251,191,36,0.25)]",
    borderColor: "border-amber-500/30",
  },
  folder: {
    icon: <Folder size={16} className="text-violet-400" />,
    gradient: "from-violet-500/20 via-slate-950/90 to-slate-950",
    glow: "shadow-[0_0_18px_rgba(168,85,247,0.2)]",
    borderColor: "border-violet-500/25",
  },
  file: {
    icon: <FileCode2 size={16} className="text-cyan-400" />,
    gradient: "from-cyan-500/15 via-slate-950/90 to-slate-950",
    glow: "shadow-[0_0_16px_rgba(0,217,255,0.15)]",
    borderColor: "border-cyan-500/20",
  },
  dependency: {
    icon: <Package size={16} className="text-emerald-400" />,
    gradient: "from-emerald-500/15 via-slate-950/90 to-slate-950",
    glow: "shadow-[0_0_14px_rgba(52,211,153,0.15)]",
    borderColor: "border-emerald-500/20",
  },
  config: {
    icon: <Settings size={16} className="text-amber-400" />,
    gradient: "from-amber-500/15 via-slate-950/90 to-slate-950",
    glow: "shadow-[0_0_14px_rgba(251,191,36,0.15)]",
    borderColor: "border-amber-500/20",
  },
  docker: {
    icon: <Container size={16} className="text-blue-400" />,
    gradient: "from-blue-500/20 via-slate-950/90 to-slate-950",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.25)]",
    borderColor: "border-blue-500/25",
  },
};

const riskOverrides: Record<string, {
  glow: string;
  borderColor: string;
}> = {
  high: {
    glow: "shadow-[0_0_30px_rgba(255,23,68,0.35)]",
    borderColor: "border-red-500/40",
  },
  medium: {
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.25)]",
    borderColor: "border-amber-500/30",
  },
};

const SynapseNode = memo(({ data, selected }: SynapseNodeProps) => {
  const config = nodeConfig[data.nodeType] || nodeConfig.file;
  const risk = riskOverrides[data.riskLevel];
  const isHighRisk = data.riskLevel === "high";

  const glow = risk?.glow || config.glow;
  const border = risk?.borderColor || config.borderColor;

  // For dependency nodes, show version
  const version = data.metadata?.version as string | undefined;
  const depType = data.metadata?.type as string | undefined;

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -3 }}
      transition={{ duration: 0.3 }}
      className={`
        relative min-w-[160px] max-w-[220px] overflow-hidden rounded-xl border
        bg-gradient-to-br px-3.5 py-2.5 cursor-pointer transition-all duration-200
        ${config.gradient} ${border} ${glow}
        ${selected ? "ring-2 ring-cyan-400/70 shadow-[0_0_40px_rgba(0,217,255,0.3)]" : ""}
      `}
    >
      {/* Specular highlight */}
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_35%)]" />

      <Handle
        type="target"
        position={Position.Top}
        className="!h-1.5 !w-1.5 !border-0 !bg-cyan-400/70 !-top-[3px]"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-1.5 !w-1.5 !border-0 !bg-violet-400/70 !-bottom-[3px]"
      />

      {/* High risk pulse */}
      {isHighRisk && (
        <motion.div
          className="absolute -inset-px rounded-xl border border-red-500/50"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="relative z-10 flex items-start gap-2.5">
        <div className="rounded-lg border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm flex-shrink-0">
          {isHighRisk ? (
            <AlertTriangle size={16} className="text-red-400" />
          ) : data.nodeType === "entry" ? (
            <Crown size={16} className="text-amber-400" />
          ) : (
            config.icon
          )}
        </div>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-white leading-tight">
            {data.label}
          </span>
          {data.nodeType === "dependency" && version && (
            <span className="block text-[10px] text-emerald-400/60 mt-0.5">
              {version}
            </span>
          )}
          {data.nodeType === "dependency" && depType && (
            <span className="block text-[9px] uppercase tracking-wider text-white/30 mt-0.5">
              {depType}
            </span>
          )}
          {data.nodeType !== "dependency" && (
            <span className="block truncate text-[10px] text-white/40 mt-0.5">
              {data.nodeType}
            </span>
          )}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="relative z-10 mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
});

SynapseNode.displayName = "SynapseNode";

export default SynapseNode;
