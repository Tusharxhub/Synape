import { motion } from "framer-motion";
import {
  FolderOpen, Database, Zap, Cpu, ShieldCheck,
  GitBranch, Container, FileText, Package as PackageIcon
} from "lucide-react";
import { formatBytes, formatNumber, getHealthColor } from "@/lib/format";
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
      initial={{ x: -16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex h-full w-full flex-col overflow-hidden"
    >
      <div className="border-b border-synapse-border/40 px-5 py-4 bg-synapse-surface/20">
        <p className="text-[9px] uppercase tracking-widest text-synapse-text-muted/70 font-semibold">
          Project overview
        </p>
        <p className="mt-1 text-sm font-medium text-synapse-text">
          Architecture Inspector
        </p>
      </div>

      <div className="px-5 pt-5">
        <button
          type="button"
          onClick={onImportProject}
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-synapse-text border border-transparent px-4 py-2 text-[13px] font-medium text-synapse-bg transition-colors hover:bg-slate-200 disabled:cursor-wait disabled:opacity-50 shadow-sm"
        >
          <FolderOpen size={14} />
          {isLoading ? "Scanning..." : "Open Directory"}
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-3 rounded-lg border border-synapse-danger/40 bg-synapse-danger/10 p-3"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-synapse-danger">{error.message}</p>
              {error.details && (
                <p className="mt-1 break-all text-[10px] text-synapse-danger/80">{error.details}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClearError}
              className="text-xs text-synapse-danger/80 hover:text-synapse-danger"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {isLoading && (
        <div className="mx-4 mt-3">
          <motion.div
            className="h-1 overflow-hidden rounded-full bg-synapse-surface"
          >
            <motion.div
              className="h-full w-1/3 rounded-full bg-synapse-accent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <p className="mt-2 text-center text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
            Scanning filesystem...
          </p>
        </div>
      )}

      {scanResult && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 space-y-5 overflow-y-auto px-5 py-4"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-synapse-text-muted/80">Project Identity</p>
            <p className="truncate text-base font-semibold text-synapse-text">
              {scanResult.projectName}
            </p>
            <p className="break-all text-[11px] leading-relaxed text-synapse-text-muted/60">
              {scanResult.rootPath}
            </p>
            {scanResult.detectedFramework && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-synapse-surface/60 px-2 py-0.5 text-[10px] font-medium text-synapse-text-muted/90 border border-synapse-border/40">
                <ShieldCheck size={10} />
                {scanResult.detectedFramework}
              </div>
            )}
          </div>

          <div className="h-px w-full bg-synapse-border/30" />

          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<Database size={13} className="text-synapse-accent/80" />} label="Files" value={formatNumber(scanResult.totalFiles)} color="text-synapse-text" />
            <StatCard icon={<FolderOpen size={13} className="text-slate-400" />} label="Folders" value={formatNumber(scanResult.totalFolders)} color="text-synapse-text" />
            <StatCard icon={<Zap size={13} className="text-synapse-success/80" />} label="Deps" value={formatNumber(scanResult.dependencies.length)} color="text-synapse-text" />
            <StatCard icon={<FileText size={13} className="text-slate-400" />} label="Size" value={formatBytes(scanResult.totalSizeBytes)} color="text-synapse-text" />
          </div>

          <div className="h-px w-full bg-synapse-border/30" />

          <div className="space-y-1.5">
            <p className="mb-2 text-[10px] font-medium text-synapse-text-muted/80">Health Indicator</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-semibold tracking-tight ${getHealthColor(scanResult.healthScore)}`}>
                {scanResult.healthScore}
              </span>
              <span className="pb-0.5 text-xs font-medium text-synapse-text-muted/50">/ 100</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <StatusRow icon={<PackageIcon size={12} />} label="Manager" value={scanResult.packageManager} />
            <StatusRow icon={<GitBranch size={12} />} label="Git" value={scanResult.hasGit ? "Initialized" : "Not found"} active={scanResult.hasGit} />
            <StatusRow icon={<Container size={12} />} label="Docker" value={scanResult.hasDocker ? "Detected" : "Not found"} active={scanResult.hasDocker} />
            {scanResult.hasEnv && (
              <StatusRow icon={<ShieldCheck size={12} />} label="Env" value="Detected" active warning />
            )}
          </div>
        </motion.div>
      )}

      {!scanResult && !isLoading && (
        <div className="flex flex-1 items-center justify-center px-5 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Cpu size={36} className="mx-auto text-synapse-accent/35" />
            </motion.div>
            <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-synapse-text-muted">
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
    <div className="flex flex-col rounded-lg bg-synapse-surface/30 p-2.5 outline outline-1 outline-synapse-border/40 shadow-sm transition-colors hover:bg-synapse-surface/50">
      <div className="mb-1.5 flex items-center gap-1.5 text-synapse-text-muted">
        {icon}
        <span className="text-[9px] font-semibold uppercase tracking-widest opacity-80">{label}</span>
      </div>
      <span className={`text-base font-semibold ${color}`}>{value}</span>
    </div>
  );
}

function StatusRow({ icon, label, value, active, warning }: { icon: React.ReactNode; label: string; value: string; active?: boolean; warning?: boolean }) {
  const dotColor = active
    ? warning
      ? "bg-synapse-warning"
      : "bg-synapse-success"
    : "bg-synapse-border";

  return (
    <div className="flex items-center justify-between rounded-md py-1.5 px-2 hover:bg-synapse-surface/30 transition-colors">
      <div className="flex items-center gap-2 text-synapse-text-muted">
        <span className="opacity-80">{icon}</span>
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-synapse-text-muted/80">{value}</span>
        <div className={`h-1.5 w-1.5 rounded-full shadow-sm ${dotColor}`} />
      </div>
    </div>
  );
}
