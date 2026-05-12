import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, CheckCircle, XCircle, Loader2, FileCode2 } from "lucide-react";
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

  const { docker } = scanResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-synapse-border bg-synapse-surface/60 p-3.5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Container size={14} className="text-sky-400" />
        <p className="text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
          Docker
        </p>
      </div>

      {/* Docker CLI status */}
      <div className="mb-2 rounded-lg border border-synapse-border bg-synapse-bg/55 px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-synapse-text-muted">Docker CLI</span>
          {checking ? (
            <Loader2 size={12} className="animate-spin text-synapse-accent" />
          ) : dockerStatus?.available ? (
            <div className="flex items-center gap-1">
              <CheckCircle size={11} className="text-synapse-success" />
              <span className="text-[10px] text-synapse-success">Available</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <XCircle size={11} className="text-synapse-danger/80" />
              <span className="text-[10px] text-synapse-danger/80">Not found</span>
            </div>
          )}
        </div>
        {dockerStatus?.version && (
          <p className="mt-1 truncate font-mono text-[9px] text-synapse-text-muted">
            {dockerStatus.version}
          </p>
        )}
      </div>

      {/* Project Docker detection */}
      <div className="mb-2 rounded-lg border border-synapse-border bg-synapse-bg/55 px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-synapse-text-muted">Project Docker</span>
          {docker.detected ? (
            <span className="text-[10px] text-synapse-success">Detected</span>
          ) : (
            <span className="text-[10px] text-synapse-text-muted">Not detected</span>
          )}
        </div>
      </div>

      {/* Dockerfile */}
      {docker.dockerfilePath && (
        <div className="mb-1 rounded-md border border-synapse-border bg-synapse-bg/55 px-2.5 py-1.5">
          <div className="flex items-center gap-1.5">
            <FileCode2 size={10} className="text-sky-400" />
            <p className="truncate text-[10px] text-sky-400">{docker.dockerfilePath}</p>
          </div>
        </div>
      )}

      {/* Compose file */}
      {docker.composePath && (
        <div className="mb-1 rounded-md border border-synapse-border bg-synapse-bg/55 px-2.5 py-1.5">
          <div className="flex items-center gap-1.5">
            <FileCode2 size={10} className="text-sky-400" />
            <p className="truncate text-[10px] text-sky-400">{docker.composePath}</p>
          </div>
        </div>
      )}

      <p className="mt-2 text-[9px] italic text-synapse-text-muted">
        Container monitoring — coming soon
      </p>
    </motion.div>
  );
}
