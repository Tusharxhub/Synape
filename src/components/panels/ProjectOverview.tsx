import { motion } from "framer-motion";
import {
  FolderOpen, Database, Zap, Cpu, ShieldCheck,
  GitBranch, Container, FileText, Package as PackageIcon
} from "lucide-react";
import { formatBytes, formatNumber, getHealthColor, getHealthGlow } from "@/lib/format";
import type { ProjectScanResult, AppError } from "@/types";

interface ProjectOverviewProps {
  scanResult: ProjectScanResult | null;
  isLoading: boolean;
  error: AppError | null;
  onImportProject: () => void;
  onClearError: () => void;
}

export function ProjectOverview({
  scanResult, isLoading, error, onImportProject, onClearError,
}: ProjectOverviewProps) {
  return (
    <motion.div
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-full w-full flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-white/6 px-5 py-5">
        <p className="text-[9px] uppercase tracking-[0.55em] text-cyan-400/50">
          Software Intelligence Engine
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-[0.18em] text-white">
          SYNAPSE
        </h1>
        <p className="mt-1.5 text-[11px] text-white/40 leading-relaxed">
          Architecture observatory for native code systems
        </p>
      </div>

      {/* Import Button */}
      <div className="px-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onImportProject}
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl border border-cyan-500/25 bg-cyan-500/5 px-4 py-2.5 text-sm font-medium text-cyan-400 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_24px_rgba(0,217,255,0.12)] disabled:cursor-wait disabled:opacity-40"
        >
          <FolderOpen size={15} />
          {isLoading ? "Scanning..." : "Import Project"}
        </motion.button>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-3 rounded-xl border border-red-500/30 bg-red-500/5 p-3"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-red-400">{error.message}</p>
              {error.details && (
                <p className="mt-1 text-[10px] text-red-400/60 break-all">{error.details}</p>
              )}
            </div>
            <button onClick={onClearError} className="text-red-400/60 hover:text-red-400 text-xs">✕</button>
          </div>
        </motion.div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mx-4 mt-3">
          <motion.div
            className="h-1 rounded-full bg-cyan-500/20 overflow-hidden"
          >
            <motion.div
              className="h-full w-1/3 rounded-full bg-cyan-400"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <p className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-cyan-400/50">
            Scanning filesystem...
          </p>
        </div>
      )}

      {/* Project Info */}
      {scanResult && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
        >
          {/* Project Name */}
          <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5">
            <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/50 mb-1">
              Project
            </p>
            <p className="text-sm font-semibold text-white truncate">
              {scanResult.projectName}
            </p>
            <p className="mt-1.5 text-[10px] text-white/30 break-all leading-relaxed">
              {scanResult.rootPath}
            </p>
            {scanResult.detectedFramework && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-[10px] text-cyan-400/80">
                <ShieldCheck size={10} />
                {scanResult.detectedFramework}
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            <StatCard icon={<Database size={13} className="text-cyan-400" />} label="Files" value={formatNumber(scanResult.totalFiles)} color="text-cyan-400" />
            <StatCard icon={<FolderOpen size={13} className="text-violet-400" />} label="Folders" value={formatNumber(scanResult.totalFolders)} color="text-violet-400" />
            <StatCard icon={<Zap size={13} className="text-cyan-400" />} label="Dependencies" value={formatNumber(scanResult.dependencies.length)} color="text-cyan-400" />
            <StatCard icon={<FileText size={13} className="text-violet-400" />} label="Size" value={formatBytes(scanResult.totalSizeBytes)} color="text-violet-400" />
          </div>

          {/* Health Score */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`rounded-xl border border-white/6 bg-white/[0.02] p-3.5 ${getHealthGlow(scanResult.healthScore)}`}
          >
            <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/50 mb-2">
              Health Score
            </p>
            <div className="flex items-end gap-2">
              <span className={`text-3xl font-bold ${getHealthColor(scanResult.healthScore)}`}>
                {scanResult.healthScore}
              </span>
              <span className="text-sm text-white/40 pb-1">/100</span>
            </div>
            <p className={`mt-1 text-xs ${getHealthColor(scanResult.healthScore)}`}>
              {scanResult.healthLabel}
            </p>
          </motion.div>

          {/* Status Indicators */}
          <div className="space-y-1.5">
            <StatusRow icon={<PackageIcon size={12} />} label="Package Manager" value={scanResult.packageManager} />
            <StatusRow icon={<GitBranch size={12} />} label="Git" value={scanResult.hasGit ? "Initialized" : "Not found"} active={scanResult.hasGit} />
            <StatusRow icon={<Container size={12} />} label="Docker" value={scanResult.hasDocker ? "Detected" : "Not found"} active={scanResult.hasDocker} />
            {scanResult.hasEnv && (
              <StatusRow icon={<ShieldCheck size={12} />} label=".env" value="Detected" active warning />
            )}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!scanResult && !isLoading && (
        <div className="flex flex-1 items-center justify-center px-5 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Cpu size={36} className="mx-auto text-cyan-500/20" />
            </motion.div>
            <p className="mt-4 text-xs text-white/40 leading-relaxed max-w-[200px]">
              Import a project directory to begin analyzing its architecture
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-xl border border-white/6 bg-white/[0.02] p-3"
    >
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">{label}</span>
      </div>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}

function StatusRow({ icon, label, value, active, warning }: { icon: React.ReactNode; label: string; value: string; active?: boolean; warning?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/4 bg-white/[0.01] px-3 py-2">
      <div className="flex items-center gap-2 text-white/40">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <span className={`text-[10px] font-medium ${warning ? "text-amber-400" : active ? "text-emerald-400" : "text-white/30"}`}>
        {value}
      </span>
    </div>
  );
}
