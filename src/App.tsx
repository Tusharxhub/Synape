import { useEffect } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/layouts/MainLayout";
import { ProjectSidebar } from "@/features/Sidebar/ProjectSidebar";
import { NodeInspector } from "@/features/Inspector/NodeInspector";
import { ArchitectureGraph } from "@/components/Graph/ArchitectureGraph";
import { useGraphStore } from "@/hooks/useGraphStore";

function App() {
  const {
    nodes,
    edges,
    selectedNode,
    projectPath,
    projectMetadata,
    isLoading,
    setSelectedNode,
    setIsLoading,
    initializeMockGraph,
  } = useGraphStore();

  // Initialize mock graph on mount
  useEffect(() => {
    initializeMockGraph();
  }, [initializeMockGraph]);

  const handleImportProject = async (path: string) => {
    setIsLoading(true);
    initializeMockGraph(path);

    window.setTimeout(() => {
      setIsLoading(false);
    }, 650);
  };

  const handleNodeClick = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setSelectedNode({
        id: node.id,
        label: node.label,
        type: node.type,
        path: node.path,
        dependencies: node.dependencies,
        metadata: {
          size: node.size,
          risk: node.risk,
          totalDependencies: node.dependencies.length,
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen overflow-hidden"
    >
      <MainLayout
        sidebar={
          <ProjectSidebar
            projectPath={projectPath}
            projectMetadata={projectMetadata}
            isLoading={isLoading}
            onImportProject={handleImportProject}
          />
        }
        canvas={
          <ArchitectureGraph
            nodes={nodes}
            edges={edges}
            selectedNodeId={selectedNode?.id}
            onNodeClick={handleNodeClick}
          />
        }
        inspector={
          <NodeInspector
            selectedNode={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        }
      />
    </motion.div>
  );
}

export default App;
