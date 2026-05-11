use crate::models::DockerStatus;
use std::process::Command;

#[tauri::command]
pub async fn check_docker_available() -> Result<DockerStatus, String> {
    match Command::new("docker").arg("--version").output() {
        Ok(output) => {
            if output.status.success() {
                let version = String::from_utf8_lossy(&output.stdout)
                    .trim()
                    .to_string();
                Ok(DockerStatus {
                    available: true,
                    version: Some(version),
                })
            } else {
                Ok(DockerStatus {
                    available: false,
                    version: None,
                })
            }
        }
        Err(_) => Ok(DockerStatus {
            available: false,
            version: None,
        }),
    }
}
