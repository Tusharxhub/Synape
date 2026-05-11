import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { CommandBar } from "@/components/layout/CommandBar";
import { ArchitectureCanvas } from "@/components/graph/ArchitectureCanvas";
import { ProjectOverview } from "@/components/panels/ProjectOverview";
import { ContextualInspector } from "@/components/panels/ContextualInspector";
import { DockerPanel } from "@/components/panels/DockerPanel";
import { DependencyPanel } from "@/components/panels/DependencyPanel";
import { useProjectImport } from "@/hooks/useProjectImport";
import { useGraphSelection } from "@/hooks/useGraphSelection";

function App() {
  const { scanResult, isLoading, error, importProject, clearError } = useProjectImport();
  const { selectedNode, selectNode, clearSelection } = useGraphSelection();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-screen h-screen overflow-hidden"
    >
      <AppShell
        commandBar={
          <CommandBar
            projectName={scanResult?.projectName}
            isLoading={isLoading}
            hasProject={Boolean(scanResult)}
            onImportProject={importProject}
          />
        }
        sidebar={
          <div className="flex h-full flex-col overflow-hidden">
            <ProjectOverview
              scanResult={scanResult}
              isLoading={isLoading}
              error={error}
              onImportProject={importProject}
              onClearError={clearError}
            />
            {scanResult && (
              <div className="max-h-[42%] space-y-3 overflow-y-auto border-t border-synapse-border px-4 py-3">
                <DockerPanel scanResult={scanResult} />
                <DependencyPanel dependencies={scanResult.dependencies} />
              </div>
            )}
          </div>
        }
        canvas={
          <div className="relative h-full w-full">
            <ArchitectureCanvas
              graph={scanResult?.graph || null}
              selectedNodeId={selectedNode?.id}
              onNodeClick={selectNode}
            />
            <ContextualInspector selectedNode={selectedNode} onClose={clearSelection} />
          </div>
        }
      />
    </motion.div>
  );
}

export default App;
