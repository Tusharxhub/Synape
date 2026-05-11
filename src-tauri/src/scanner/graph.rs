use crate::models::{ArchitectureEdge, ArchitectureGraph, ArchitectureNode, ProjectDependency, ProjectFile, ProjectFolder};
use std::collections::HashMap;

const MAX_GRAPH_NODES: usize = 120;

const PRIORITY_FILES: &[&str] = &[
    "package.json", "Cargo.toml", "tsconfig.json", "vite.config.ts", "vite.config.js",
    "next.config.js", "next.config.ts", "tailwind.config.js", "postcss.config.js",
    "Dockerfile", "docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml",
    "README.md", ".env", ".gitignore", "main.tsx", "main.ts", "main.rs", "index.tsx",
    "index.ts", "index.html", "App.tsx", "app.tsx", "lib.rs", "mod.rs", "schema.prisma",
];

const PRIORITY_DIRS: &[&str] = &[
    "src", "app", "pages", "components", "lib", "hooks", "utils", "styles", "public",
    "api", "server", "services", "models", "types", "features", "layouts", "prisma",
    "scripts", "tests", "src-tauri", "commands", "scanner",
];

pub fn generate_graph(
    project_name: &str, root_path: &str, files: &[ProjectFile],
    folders: &[ProjectFolder], dependencies: &[ProjectDependency], has_docker: bool,
) -> ArchitectureGraph {
    let mut nodes: Vec<ArchitectureNode> = Vec::new();
    let mut edges: Vec<ArchitectureEdge> = Vec::new();
    let mut ec: u64 = 0;

    let root_id = "root".to_string();
    let mut rm = HashMap::new();
    rm.insert("totalFiles".into(), serde_json::json!(files.len()));
    rm.insert("totalFolders".into(), serde_json::json!(folders.len()));
    rm.insert("totalDependencies".into(), serde_json::json!(dependencies.len()));
    nodes.push(ArchitectureNode {
        id: root_id.clone(), label: project_name.to_string(), path: root_path.to_string(),
        node_type: "entry".into(), risk_level: "low".into(), metadata: rm,
    });

    let mut folder_ids: HashMap<String, String> = HashMap::new();
    for folder in folders {
        let parts: Vec<&str> = folder.relative_path.split('/').collect();
        if parts.len() == 1 && PRIORITY_DIRS.contains(&parts[0]) && !folder_ids.contains_key(&folder.name) {
            let fid = format!("folder-{}", folder.name);
            let mut m = HashMap::new();
            m.insert("relativePath".into(), serde_json::json!(folder.relative_path));
            nodes.push(ArchitectureNode {
                id: fid.clone(), label: folder.name.clone(), path: folder.path.clone(),
                node_type: "folder".into(), risk_level: "low".into(), metadata: m,
            });
            ec += 1;
            edges.push(ArchitectureEdge { id: format!("e-{}", ec), source: root_id.clone(), target: fid.clone(), edge_type: "contains".into() });
            folder_ids.insert(folder.name.clone(), fid);
        }
    }

    let dep_limit = dependencies.len().min(30);
    let budget = MAX_GRAPH_NODES - dep_limit - if has_docker { 1 } else { 0 };

    for file in files {
        if nodes.len() >= budget { break; }
        let is_priority = PRIORITY_FILES.contains(&file.name.as_str());
        let is_src = file.category == "source" && {
            let p: Vec<&str> = file.relative_path.split('/').collect();
            p.len() >= 2 && PRIORITY_DIRS.contains(&p[0])
        };
        if !is_priority && !is_src { continue; }

        let nt = if file.name == ".env" || file.category == "config" { "config".into() }
            else if file.name.to_lowercase().starts_with("dockerfile") || file.name.to_lowercase().contains("compose") { "docker".to_string() }
            else { "file".into() };
        let rl = if file.name == ".env" { "high".into() }
            else if file.name == "package.json" || file.name.contains("config") { "medium".into() }
            else if file.size_bytes > 10000 && file.category == "source" { "medium".into() }
            else { "low".into() };
        let mut m = HashMap::new();
        m.insert("extension".into(), serde_json::json!(file.extension.as_deref().unwrap_or("none")));
        m.insert("sizeBytes".into(), serde_json::json!(file.size_bytes));
        m.insert("category".into(), serde_json::json!(file.category));
        m.insert("relativePath".into(), serde_json::json!(file.relative_path));
        if file.name == ".env" { m.insert("note".into(), serde_json::json!(".env detected — contents hidden")); }

        let fid = format!("file-{}", file.relative_path.replace('/', "-").replace('.', "_"));
        nodes.push(ArchitectureNode { id: fid.clone(), label: file.name.clone(), path: file.path.clone(), node_type: nt, risk_level: rl, metadata: m });

        let parts: Vec<&str> = file.relative_path.split('/').collect();
        let pid = if parts.len() >= 2 { folder_ids.get(parts[0]).cloned().unwrap_or(root_id.clone()) } else { root_id.clone() };
        ec += 1;
        edges.push(ArchitectureEdge { id: format!("e-{}", ec), source: pid, target: fid, edge_type: "contains".into() });
    }

    for (i, dep) in dependencies.iter().take(dep_limit).enumerate() {
        let did = format!("dep-{}", i);
        let mut m = HashMap::new();
        m.insert("version".into(), serde_json::json!(dep.version));
        m.insert("type".into(), serde_json::json!(dep.dep_type));
        nodes.push(ArchitectureNode { id: did.clone(), label: dep.name.clone(), path: format!("node_modules/{}", dep.name), node_type: "dependency".into(), risk_level: "low".into(), metadata: m });
        ec += 1;
        edges.push(ArchitectureEdge { id: format!("e-{}", ec), source: root_id.clone(), target: did, edge_type: "depends_on".into() });
    }

    if has_docker {
        let did = "docker-integration".to_string();
        let mut m = HashMap::new();
        m.insert("status".into(), serde_json::json!("detected"));
        nodes.push(ArchitectureNode { id: did.clone(), label: "Docker".into(), path: format!("{}/Dockerfile", root_path), node_type: "docker".into(), risk_level: "low".into(), metadata: m });
        ec += 1;
        edges.push(ArchitectureEdge { id: format!("e-{}", ec), source: did, target: root_id, edge_type: "dockerizes".into() });
    }

    ArchitectureGraph { nodes, edges }
}
