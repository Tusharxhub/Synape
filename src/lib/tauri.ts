import { invoke } from "@tauri-apps/api/core";
import type { ProjectScanResult, DockerStatus } from "@/types";

export async function scanProject(path: string): Promise<ProjectScanResult> {
  return invoke<ProjectScanResult>("scan_project", { path });
}

export async function checkDockerAvailable(): Promise<DockerStatus> {
  return invoke<DockerStatus>("check_docker_available");
}
