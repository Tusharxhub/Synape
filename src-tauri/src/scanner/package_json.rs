use crate::models::ProjectDependency;
use std::path::Path;

/// Parse package.json and extract dependencies
pub fn parse_package_json(root_path: &str) -> Result<Vec<ProjectDependency>, String> {
    let pkg_path = Path::new(root_path).join("package.json");

    if !pkg_path.exists() {
        return Ok(Vec::new());
    }

    let content = std::fs::read_to_string(&pkg_path)
        .map_err(|e| format!("Failed to read package.json: {}", e))?;

    let parsed: serde_json::Value = serde_json::from_str(&content)
        .map_err(|e| format!("Failed to parse package.json: {}", e))?;

    let mut deps: Vec<ProjectDependency> = Vec::new();

    // Extract dependencies
    if let Some(dependencies) = parsed.get("dependencies").and_then(|v| v.as_object()) {
        for (name, version) in dependencies {
            deps.push(ProjectDependency {
                name: name.clone(),
                version: version.as_str().unwrap_or("*").to_string(),
                dep_type: "dependency".to_string(),
            });
        }
    }

    // Extract devDependencies
    if let Some(dev_deps) = parsed.get("devDependencies").and_then(|v| v.as_object()) {
        for (name, version) in dev_deps {
            deps.push(ProjectDependency {
                name: name.clone(),
                version: version.as_str().unwrap_or("*").to_string(),
                dep_type: "devDependency".to_string(),
            });
        }
    }

    // Extract peerDependencies
    if let Some(peer_deps) = parsed.get("peerDependencies").and_then(|v| v.as_object()) {
        for (name, version) in peer_deps {
            deps.push(ProjectDependency {
                name: name.clone(),
                version: version.as_str().unwrap_or("*").to_string(),
                dep_type: "peerDependency".to_string(),
            });
        }
    }

    // Extract optionalDependencies
    if let Some(opt_deps) = parsed.get("optionalDependencies").and_then(|v| v.as_object()) {
        for (name, version) in opt_deps {
            deps.push(ProjectDependency {
                name: name.clone(),
                version: version.as_str().unwrap_or("*").to_string(),
                dep_type: "optionalDependency".to_string(),
            });
        }
    }

    Ok(deps)
}

/// Detect the package manager based on lock files
pub fn detect_package_manager(root_path: &str) -> String {
    let root = Path::new(root_path);

    if root.join("bun.lockb").exists() || root.join("bun.lock").exists() {
        "bun".to_string()
    } else if root.join("pnpm-lock.yaml").exists() {
        "pnpm".to_string()
    } else if root.join("yarn.lock").exists() {
        "yarn".to_string()
    } else if root.join("package-lock.json").exists() {
        "npm".to_string()
    } else {
        "unknown".to_string()
    }
}
