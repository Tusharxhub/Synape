import { motion } from "framer-motion";
import { Crown, Folder, FileCode2, Package, Settings, Container } from "lucide-react";

const legendItems = [
  { label: "Entry", icon: <Crown size={12} />, color: "text-synapse-warning", bg: "bg-synapse-warning/10" },
  { label: "Folder", icon: <Folder size={12} />, color: "text-slate-300", bg: "bg-slate-300/10" },
  { label: "File", icon: <FileCode2 size={12} />, color: "text-synapse-accent", bg: "bg-synapse-accent/10" },
  { label: "Dependency", icon: <Package size={12} />, color: "text-synapse-success", bg: "bg-synapse-success/10" },
  { label: "Config", icon: <Settings size={12} />, color: "text-synapse-warning", bg: "bg-synapse-warning/10" },
  { label: "Docker", icon: <Container size={12} />, color: "text-sky-400", bg: "bg-sky-400/10" },
];

export default function GraphLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute right-5 top-5 z-20 rounded-xl border border-synapse-border bg-synapse-panel/84 px-3 py-2.5 backdrop-blur-md"
    >
      <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">Legend</p>
      <div className="space-y-1.5">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`rounded p-1 ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-[10px] text-synapse-text-muted">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
