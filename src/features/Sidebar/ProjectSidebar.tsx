import { motion } from "framer-motion";
import { FolderOpen, Database, AlertCircle, Zap, Cpu, ShieldCheck, ScanLine } from "lucide-react";
import { open } from "@tauri-apps/plugin-dialog";
import type { ProjectMetadata } from "@/types";

interface ProjectSidebarProps {
  projectPath: string;
  projectMetadata: ProjectMetadata | null;
  isLoading: boolean;
  onImportProject: (path: string) => void;
}

export function ProjectSidebar({
  projectPath,
  projectMetadata,
  isLoading,
  onImportProject,
}: ProjectSidebarProps) {
  const handleImportClick = async () => {
    try {
      const path = await open({
        directory: true,
        title: "Import Project Directory",
      });

      if (path && typeof path === "string") {
        onImportProject(path);
      }
    } catch (error) {
      console.error("Error importing project:", error);
    }
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="flex h-full w-full flex-col overflow-hidden bg-transparent"
    >
      {/* Header */}
      <div className="border-b border-white/8 p-6">
        <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer text-left">
          <p className="text-[10px] uppercase tracking-[0.5em] text-synapse-cyan/55">Real-Time Software Intelligence Engine</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[0.22em] text-white">SYNAPSE</h1>
          <p className="mt-2 max-w-[24ch] text-sm text-slate-300/80">
            Cinematic architecture observatory for native code systems.
          </p>
        </motion.div>
      </div>

      {/* Import Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleImportClick}
        disabled={isLoading}
        className="mx-4 mt-4 inline-flex items-center justify-center gap-3 rounded-2xl border border-synapse-cyan/30 bg-white/5 px-4 py-3 font-medium text-synapse-cyan shadow-[0_0_32px_rgba(0,217,255,0.08)] transition-all hover:border-synapse-cyan/60 hover:bg-white/8 disabled:cursor-wait disabled:opacity-50"
      >
        <FolderOpen size={16} />
        {isLoading ? "Importing..." : "Import Project"}
      </motion.button>

      <div className="mx-4 mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-synapse-cyan/55">
          <ScanLine size={12} />
          Project ingress
        </div>
        <p className="mt-3 break-all text-sm text-white/80">
          {projectPath || "No project directory selected."}
        </p>
      </div>

      {/* Project Info */}
      {projectMetadata && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
        >
          {/* Project Name */}
          <div className="rounded-2xl border border-white/8 bg-slate-950/55 p-4 backdrop-blur-xl">
            <p className="mb-1 text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
              Project
            </p>
            <p className="truncate text-sm font-medium text-white">
              {projectMetadata.name}
            </p>
            <p className="mt-2 truncate text-xs text-synapse-cyan/40">
              {projectPath}
            </p>
            {projectMetadata.status && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-synapse-cyan/20 bg-synapse-cyan/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-synapse-cyan/80">
                <ShieldCheck size={12} />
                {projectMetadata.status}
              </p>
            )}
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Files */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur-xl"
            >
              <div className="mb-1 flex items-center gap-2">
                <Database size={14} className="text-synapse-cyan" />
                <span className="text-xs text-synapse-cyan/60">Files</span>
              </div>
              <p className="text-lg font-bold text-synapse-cyan">
                {projectMetadata.totalFiles}
              </p>
            </motion.div>

            {/* Folders */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur-xl"
            >
              <div className="mb-1 flex items-center gap-2">
                <FolderOpen size={14} className="text-synapse-violet" />
                <span className="text-xs text-synapse-cyan/60">Folders</span>
              </div>
              <p className="text-lg font-bold text-synapse-violet">
                {projectMetadata.totalFolders}
              </p>
            </motion.div>

            {/* Dependencies */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur-xl"
            >
              <div className="mb-1 flex items-center gap-2">
                <Zap size={14} className="text-synapse-cyan" />
                <span className="text-xs text-synapse-cyan/60">Dependencies</span>
              </div>
              <p className="text-lg font-bold text-synapse-cyan">
                {projectMetadata.dependencies}
              </p>
            </motion.div>

            {/* Health */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur-xl"
            >
              <div className="mb-1 flex items-center gap-2">
                <Cpu size={14} className="text-synapse-violet" />
                <span className="text-xs text-synapse-cyan/60">Health</span>
              </div>
              <p className="text-lg font-bold text-synapse-violet">
                {projectMetadata.health || 0}%
              </p>
            </motion.div>
          </div>

          {/* Framework Info */}
          {projectMetadata.framework && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur-xl"
            >
              <p className="mb-1 text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
                Framework
              </p>
              <p className="text-sm font-medium text-synapse-cyan">
                {projectMetadata.framework}
              </p>
            </motion.div>
          )}

          {/* AI Insights Placeholder */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur-xl"
          >
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="text-synapse-violet mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-synapse-cyan/60">
                  AI Insights
                </p>
                <p className="mt-1 text-xs text-synapse-violet/70">
                  Coming soon: Architecture analysis and optimization suggestions
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {!projectMetadata && (
        <div className="flex flex-1 items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FolderOpen size={32} className="text-synapse-cyan/30 mx-auto mb-2" />
            <p className="text-sm text-synapse-cyan/60">
              Import a project to begin analyzing its architecture
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
