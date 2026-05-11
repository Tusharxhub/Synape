import { memo } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { FileCode2, Folder, AlertTriangle, Cpu } from "lucide-react";
import type { GraphNode } from "@/types";

interface NodeProps {
  data: GraphNode;
  selected?: boolean;
  onClick?: () => void;
}

const CustomNode = memo(({ data, selected, onClick }: NodeProps) => {
  const getNodeTone = () => {
    if (data.risk === "high") return "from-synapse-red/20 via-slate-950/90 to-slate-950";
    if (data.type === "folder") return "from-synapse-violet/20 via-slate-950/90 to-slate-950";
    return "from-synapse-cyan/18 via-slate-950/90 to-slate-950";
  };

  const getGlowClass = () => {
    if (data.risk === "high") return "glow-red";
    if (data.type === "folder") return "glow-violet";
    return "glow-cyan";
  };

  const getIcon = () => {
    if (data.type === "folder") return <Folder size={16} className="text-synapse-violet" />;
    if (data.type === "module") return <Cpu size={16} className="text-synapse-cyan" />;
    return <FileCode2 size={16} className="text-synapse-cyan" />;
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -1.5, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.04, y: -4 }}
      className={`
        relative min-w-[180px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br px-4 py-3 transition-all cursor-pointer
        ${getNodeTone()} ${selected ? "ring-2 ring-synapse-cyan/80 shadow-[0_0_40px_rgba(0,217,255,0.25)]" : "shadow-[0_0_26px_rgba(5,8,17,0.45)]"}
        ${getGlowClass()}
      `}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),transparent_30%,transparent_70%,rgba(255,255,255,0.03))]" />
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-0 !bg-synapse-cyan/80" />
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-0 !bg-synapse-violet/80" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
            {getIcon()}
          </div>
          <div className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">
              {data.label}
            </span>
            <span className="block truncate text-[10px] uppercase tracking-[0.28em] text-synapse-cyan/55">
              {data.path.split("/").filter(Boolean).slice(-1)[0]}
            </span>
          </div>
        </div>

        {data.risk === "high" ? (
          <AlertTriangle size={14} className="mt-1 flex-shrink-0 text-synapse-red" />
        ) : (
          <span className="mt-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-white/70">
            {data.type}
          </span>
        )}
      </div>

      <div className="relative z-10 mt-3 flex items-center justify-between gap-3 text-[11px] text-synapse-cyan/70">
        <span className="truncate">deps {data.dependencies.length}</span>
        <span className="truncate text-synapse-violet/80">{data.risk || "stable"}</span>
      </div>

      <div className="relative z-10 mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </motion.div>
  );
});

CustomNode.displayName = "CustomNode";

export default CustomNode;
