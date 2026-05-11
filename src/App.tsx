import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { ArchitectureCanvas } from "@/components/graph/ArchitectureCanvas";
import { ProjectOverview } from "@/components/panels/ProjectOverview";
import { InspectorPanel } from "@/components/panels/InspectorPanel";
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
        sidebar={
          <div className="flex h-full flex-col overflow-hidden">
            <ProjectOverview
              scanResult={scanResult}
              isLoading={isLoading}
              error={error}
              onImportProject={importProject}
              onClearError={clearError}
            />
            {/* Docker & Dependency panels at bottom of sidebar */}
            {scanResult && (
              <div className="border-t border-white/[0.04] px-4 py-3 space-y-3 overflow-y-auto max-h-[40%]">
                <DockerPanel scanResult={scanResult} />
                <DependencyPanel dependencies={scanResult.dependencies} />
              </div>
            )}
          </div>
        }
        canvas={
          <ArchitectureCanvas
            graph={scanResult?.graph || null}
            selectedNodeId={selectedNode?.id}
            onNodeClick={selectNode}
          />
        }
        inspector={
          <InspectorPanel
            selectedNode={selectedNode}
            onClose={clearSelection}
          />
        }
      />
    </motion.div>
  );
}

export default App;
