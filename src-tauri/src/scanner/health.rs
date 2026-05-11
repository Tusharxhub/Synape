use crate::models::{ProjectFile, ProjectDependency};
use std::path::Path;

/// Calculate a health score for the project (0-100)
pub fn calculate_health_score(
    root_path: &str,
    files: &[ProjectFile],
    dependencies: &[ProjectDependency],
    has_git: bool,
    has_docker: bool,
    detected_framework: &Option<String>,
    package_manager: &str,
) -> (u32, String) {
    let mut score: i32 = 100;

    // Check for README
    let has_readme = files.iter().any(|f| f.name.to_lowercase().starts_with("readme"));
    if !has_readme { score -= 10; }

    // Check for Git
    if !has_git { score -= 10; }

    // Check for Docker
    if !has_docker { score -= 10; }

    // Too many dependencies
    if dependencies.len() > 80 { score -= 15; }
    else if dependencies.len() > 50 { score -= 8; }

    // Too many files in root (direct children)
    let _root = Path::new(root_path);
    let root_files = files.iter().filter(|f| {
        let parts: Vec<&str> = f.relative_path.split('/').collect();
        parts.len() == 1
    }).count();
    if root_files > 15 { score -= 10; }
    else if root_files > 10 { score -= 5; }

    // No clear framework
    if detected_framework.is_none() { score -= 10; }

    // No lock file
    if package_manager == "unknown" { score -= 10; }

    // Check for .env (good practice to have .env.example)
    let has_env = files.iter().any(|f| f.name == ".env");
    let has_env_example = files.iter().any(|f| f.name == ".env.example" || f.name == ".env.sample");
    if has_env && !has_env_example { score -= 5; }

    // Check for license
    let has_license = files.iter().any(|f| f.name.to_lowercase().starts_with("license"));
    if !has_license { score -= 5; }

    let score = score.max(0).min(100) as u32;

    let label = match score {
        90..=100 => "Excellent".to_string(),
        75..=89 => "Healthy".to_string(),
        60..=74 => "Fair".to_string(),
        40..=59 => "Needs Attention".to_string(),
        _ => "Critical".to_string(),
    };

    (score, label)
}
