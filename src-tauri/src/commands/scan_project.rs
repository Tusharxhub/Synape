use crate::models::ProjectScanResult;
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

    // Check for Docker
    let docker_files = ["Dockerfile", "docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"];
    let has_docker = docker_files.iter().any(|f| root.join(f).exists());

    // Check for .env
    let has_env = root.join(".env").exists();

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
        health_score,
        health_label,
        files: scan_result.files,
        folders: scan_result.folders,
        dependencies,
        graph,
    })
}
