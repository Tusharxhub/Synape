import { motion } from "framer-motion";
import { Crown, Folder, FileCode2, Package, Settings, Container } from "lucide-react";

const legendItems = [
  { label: "Entry", icon: <Crown size={12} />, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Folder", icon: <Folder size={12} />, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "File", icon: <FileCode2 size={12} />, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { label: "Dependency", icon: <Package size={12} />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Config", icon: <Settings size={12} />, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Docker", icon: <Container size={12} />, color: "text-blue-400", bg: "bg-blue-500/10" },
];

export default function GraphLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute right-5 top-5 z-20 rounded-xl border border-white/8 bg-slate-950/70 px-3 py-2.5 backdrop-blur-xl"
    >
      <p className="mb-2 text-[9px] uppercase tracking-[0.4em] text-white/40">Legend</p>
      <div className="space-y-1.5">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`rounded p-1 ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-[10px] text-white/50">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
