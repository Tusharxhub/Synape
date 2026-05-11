import { useState, useCallback } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { scanProject } from "@/lib/tauri";
import type { ProjectScanResult, AppError } from "@/types";

export function useProjectImport() {
  const [scanResult, setScanResult] = useState<ProjectScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const importProject = useCallback(async () => {
    setError(null);
    try {
      const path = await open({
        directory: true,
        title: "Import Project Directory",
      });

      if (!path || typeof path !== "string") {
        return; // User cancelled
      }

      setIsLoading(true);

      const result = await scanProject(path);
      setScanResult(result);
      setIsLoading(false);
    } catch (err: any) {
      const message = typeof err === "string" ? err : err?.message || "Unknown error";
      setError({
        message: "Failed to scan project",
        details: message,
        timestamp: Date.now(),
      });
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearProject = useCallback(() => {
    setScanResult(null);
    setError(null);
  }, []);

  return {
    scanResult,
    isLoading,
    error,
    importProject,
    clearError,
    clearProject,
  };
}
