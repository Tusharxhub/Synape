import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { checkDockerAvailable } from "@/lib/tauri";
import type { ProjectScanResult, DockerStatus } from "@/types";

interface DockerPanelProps {
  scanResult: ProjectScanResult | null;
}

export function DockerPanel({ scanResult }: DockerPanelProps) {
  const [dockerStatus, setDockerStatus] = useState<DockerStatus | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    checkDocker();
  }, []);

  const checkDocker = async () => {
    setChecking(true);
    try {
      const status = await checkDockerAvailable();
      setDockerStatus(status);
    } catch {
      setDockerStatus({ available: false, version: null });
    }
    setChecking(false);
  };

  if (!scanResult) return null;

  const dockerFiles = scanResult.files.filter(
    (f) => f.name.toLowerCase().startsWith("dockerfile") ||
           f.name.toLowerCase().includes("compose") ||
           f.name.toLowerCase() === "compose.yml" ||
           f.name.toLowerCase() === "compose.yaml"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/6 bg-white/[0.02] p-3.5"
    >
      <div className="flex items-center gap-2 mb-3">
        <Container size={14} className="text-blue-400" />
        <p className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/50">
          Docker
        </p>
      </div>

      {/* Docker Availability */}
      <div className="rounded-lg border border-white/4 bg-white/[0.01] px-3 py-2 mb-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/40">Docker CLI</span>
          {checking ? (
            <Loader2 size={12} className="text-cyan-400 animate-spin" />
          ) : dockerStatus?.available ? (
            <div className="flex items-center gap-1">
              <CheckCircle size={11} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400">Available</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <XCircle size={11} className="text-red-400/60" />
              <span className="text-[10px] text-red-400/60">Not found</span>
            </div>
          )}
        </div>
        {dockerStatus?.version && (
          <p className="mt-1 text-[9px] text-white/25 font-mono truncate">
            {dockerStatus.version}
          </p>
        )}
      </div>

      {/* Project Docker Status */}
      <div className="rounded-lg border border-white/4 bg-white/[0.01] px-3 py-2 mb-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/40">Project Docker</span>
          {scanResult.hasDocker ? (
            <span className="text-[10px] text-emerald-400">Detected</span>
          ) : (
            <span className="text-[10px] text-white/25">Not detected</span>
          )}
        </div>
      </div>

      {/* Docker Files */}
      {dockerFiles.length > 0 && (
        <div className="space-y-1">
          {dockerFiles.map((f) => (
            <div key={f.id} className="rounded-lg bg-blue-500/5 border border-blue-500/10 px-2.5 py-1.5">
              <p className="text-[10px] text-blue-400 truncate">{f.name}</p>
              <p className="text-[9px] text-white/20 truncate">{f.relativePath}</p>
            </div>
          ))}
        </div>
      )}

      {/* Future Placeholder */}
      <p className="mt-2 text-[9px] text-white/20 italic">
        Container monitoring — coming soon
      </p>
    </motion.div>
  );
}
