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
      <div className="border-b border-synapse-border px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
          Project overview
        </p>
        <p className="mt-1.5 text-sm font-semibold text-synapse-text">
          Real-time software intelligence
        </p>
      </div>

      <div className="px-4 pt-4">
        <button
          type="button"
          onClick={onImportProject}
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-synapse-border bg-synapse-surface/80 px-4 py-2.5 text-sm font-medium text-synapse-text transition-colors hover:bg-synapse-surface disabled:cursor-wait disabled:opacity-50"
        >
          <FolderOpen size={15} />
          {isLoading ? "Scanning..." : "Import Project"}
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
          className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
        >
          <div className="rounded-lg border border-synapse-border bg-synapse-surface/60 p-3.5">
            <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
              Project
            </p>
            <p className="truncate text-sm font-semibold text-synapse-text">
              {scanResult.projectName}
            </p>
            <p className="mt-1.5 break-all text-[10px] leading-relaxed text-synapse-text-muted">
              {scanResult.rootPath}
            </p>
            {scanResult.detectedFramework && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-synapse-border bg-synapse-bg/70 px-2.5 py-1 text-[10px] text-synapse-text-muted">
                <ShieldCheck size={10} />
                {scanResult.detectedFramework}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <StatCard icon={<Database size={13} className="text-synapse-accent" />} label="Files" value={formatNumber(scanResult.totalFiles)} color="text-synapse-text" />
            <StatCard icon={<FolderOpen size={13} className="text-slate-300" />} label="Folders" value={formatNumber(scanResult.totalFolders)} color="text-synapse-text" />
            <StatCard icon={<Zap size={13} className="text-synapse-success" />} label="Dependencies" value={formatNumber(scanResult.dependencies.length)} color="text-synapse-text" />
            <StatCard icon={<FileText size={13} className="text-slate-300" />} label="Size" value={formatBytes(scanResult.totalSizeBytes)} color="text-synapse-text" />
          </div>

          <div className="rounded-lg border border-synapse-border bg-synapse-surface/60 p-3.5">
            <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
              Health Score
            </p>
            <div className="flex items-end gap-2">
              <span className={`text-3xl font-bold ${getHealthColor(scanResult.healthScore)}`}>
                {scanResult.healthScore}
              </span>
              <span className="pb-1 text-sm text-synapse-text-muted">/100</span>
            </div>
            <p className={`mt-1 text-xs ${getHealthColor(scanResult.healthScore)}`}>
              {scanResult.healthLabel}
            </p>
          </div>

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
    <div className="rounded-lg border border-synapse-border bg-synapse-surface/60 p-3">
      <div className="mb-1 flex items-center gap-1.5">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.1em] text-synapse-text-muted">{label}</span>
      </div>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}

function StatusRow({ icon, label, value, active, warning }: { icon: React.ReactNode; label: string; value: string; active?: boolean; warning?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-synapse-border bg-synapse-surface/55 px-3 py-2">
      <div className="flex items-center gap-2 text-synapse-text-muted">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <span className={`text-[10px] font-medium ${warning ? "text-synapse-warning" : active ? "text-synapse-success" : "text-synapse-text-muted"}`}>
        {value}
      </span>
    </div>
  );
}
