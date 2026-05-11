use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectScanResult {
    pub project_name: String,
    pub root_path: String,
    pub total_files: usize,
    pub total_folders: usize,
    pub total_size_bytes: u64,
    pub detected_framework: Option<String>,
    pub package_manager: String,
    pub has_git: bool,
    pub has_docker: bool,
    pub has_env: bool,
    pub health_score: u32,
    pub health_label: String,
    pub files: Vec<ProjectFile>,
    pub folders: Vec<ProjectFolder>,
    pub dependencies: Vec<ProjectDependency>,
    pub graph: ArchitectureGraph,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectFile {
    pub id: String,
    pub name: String,
    pub path: String,
    pub relative_path: String,
    pub extension: Option<String>,
    pub size_bytes: u64,
    pub category: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectFolder {
    pub id: String,
    pub name: String,
    pub path: String,
    pub relative_path: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectDependency {
    pub name: String,
    pub version: String,
    #[serde(rename = "type")]
    pub dep_type: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ArchitectureGraph {
    pub nodes: Vec<ArchitectureNode>,
    pub edges: Vec<ArchitectureEdge>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ArchitectureNode {
    pub id: String,
    pub label: String,
    pub path: String,
    pub node_type: String,
    pub risk_level: String,
    pub metadata: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ArchitectureEdge {
    pub id: String,
    pub source: String,
    pub target: String,
    pub edge_type: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DockerStatus {
    pub available: bool,
    pub version: Option<String>,
}
