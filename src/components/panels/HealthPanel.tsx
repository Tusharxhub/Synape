import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { getHealthColor } from "@/lib/format";
import type { ProjectScanResult } from "@/types";

interface HealthPanelProps {
  scanResult: ProjectScanResult;
}

export function HealthPanel({ scanResult }: HealthPanelProps) {
  const { healthScore, healthLabel, hasReadme, hasGit, hasDocker } = scanResult;
  const deps = scanResult.dependencies.length;
  const hasLockFile = scanResult.packageManager !== "unknown";
  const hasFramework = !!scanResult.detectedFramework;

  // Build health breakdown items
  const checks = [
    { label: "README present", pass: hasReadme, penalty: 10 },
    { label: "Git initialized", pass: hasGit, penalty: 10 },
    { label: "Docker detected", pass: hasDocker, penalty: 10 },
    { label: "Framework detected", pass: hasFramework, penalty: 10 },
    { label: "Lock file present", pass: hasLockFile, penalty: 10 },
    { label: "Dependencies < 80", pass: deps <= 80, penalty: 15 },
  ];

  const statusIcon =
    healthScore >= 80 ? (
      <CheckCircle size={16} className="text-synapse-success" />
    ) : healthScore >= 50 ? (
      <AlertTriangle size={16} className="text-synapse-warning" />
    ) : (
      <AlertTriangle size={16} className="text-synapse-danger" />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-synapse-border bg-synapse-surface/60 p-3.5"
    >
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck size={14} className="text-synapse-accent" />
        <p className="text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
          Health Score
        </p>
      </div>

      {/* Score display */}
      <div className="mb-3 flex items-center gap-3 rounded-lg border border-synapse-border bg-synapse-bg/55 px-3 py-2.5">
        {statusIcon}
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-2xl font-semibold tracking-tight ${getHealthColor(healthScore)}`}
          >
            {healthScore}
          </span>
          <span className="text-xs text-synapse-text-muted/50">/ 100</span>
        </div>
        <span className="ml-auto text-[10px] font-medium text-synapse-text-muted">
          {healthLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-1 overflow-hidden rounded-full bg-synapse-bg/80">
        <motion.div
          className={`h-full rounded-full ${
            healthScore >= 80
              ? "bg-synapse-success"
              : healthScore >= 50
                ? "bg-synapse-warning"
                : "bg-synapse-danger"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${healthScore}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Breakdown */}
      <div className="space-y-1">
        {checks.map((check) => (
          <div
            key={check.label}
            className="flex items-center justify-between rounded-md px-2 py-1 text-[10px]"
          >
            <span className="text-synapse-text-muted">{check.label}</span>
            {check.pass ? (
              <CheckCircle size={11} className="text-synapse-success/80" />
            ) : (
              <span className="text-synapse-danger/80">-{check.penalty}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
