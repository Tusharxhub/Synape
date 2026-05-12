use crate::models::{DockerProjectInfo, ProjectScanResult};
use crate::scanner;
use std::path::Path;

#[tauri::command]
pub async fn scan_project(path: String) -> Result<ProjectScanResult, String> {
    let root = Path::new(&path);
    if !root.exists() {
        return Err(format!("Path does not exist: {}", path));
    }
    if !root.is_dir() {
        return Err(format!("Path is not a directory: {}", path));
    }

    // Scan filesystem
    let scan_result = scanner::scan_filesystem(&path)?;

    // Parse package.json dependencies
    let dependencies = scanner::parse_package_json(&path)?;

    // Detect package manager
    let package_manager = scanner::detect_package_manager(&path);

    // Detect framework
    let detected_framework = scanner::detect_framework(&path, &dependencies);

    // Check for Git
    let has_git = root.join(".git").exists();

    // Check for Docker files
    let docker_files = [
        "Dockerfile",
        "docker-compose.yml",
        "docker-compose.yaml",
        "compose.yml",
        "compose.yaml",
    ];
    let has_docker = docker_files.iter().any(|f| root.join(f).exists());

    // Build DockerProjectInfo
    let dockerfile_path = if root.join("Dockerfile").exists() {
        Some("Dockerfile".to_string())
    } else {
        None
    };
    let compose_path = ["docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"]
        .iter()
        .find(|f| root.join(f).exists())
        .map(|f| f.to_string());

    let docker = DockerProjectInfo {
        detected: has_docker,
        dockerfile_path,
        compose_path,
    };

    // Check for .env (existence only — never read contents)
    let has_env = root.join(".env").exists();

    // Check for README
    let has_readme = scan_result
        .files
        .iter()
        .any(|f| f.name.to_lowercase().starts_with("readme"));

    // Extract project name from path
    let project_name = root
        .file_name()
        .map(|n| n.to_string_lossy().to_string())
        .unwrap_or_else(|| "Unknown Project".to_string());

    // Calculate health score
    let (health_score, health_label) = scanner::calculate_health_score(
        &path,
        &scan_result.files,
        &dependencies,
        has_git,
        has_docker,
        &detected_framework,
        &package_manager,
    );

    // Derive health status from score
    let health_status = if health_score >= 80 {
        "Healthy".to_string()
    } else if health_score >= 50 {
        "Needs Attention".to_string()
    } else {
        "Risky".to_string()
    };

    // Generate architecture graph
    let graph = scanner::generate_graph(
        &project_name,
        &path,
        &scan_result.files,
        &scan_result.folders,
        &dependencies,
        has_docker,
    );

    Ok(ProjectScanResult {
        project_name,
        root_path: path,
        total_files: scan_result.files.len(),
        total_folders: scan_result.folders.len(),
        total_size_bytes: scan_result.total_size_bytes,
        detected_framework,
        package_manager,
        has_git,
        has_docker,
        has_env,
        has_readme,
        health_score,
        health_status,
        health_label,
        files: scan_result.files,
        folders: scan_result.folders,
        dependencies,
        docker,
        graph,
    })
}
