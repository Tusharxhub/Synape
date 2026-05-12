import { useState, useCallback } from "react";
import { scanProject } from "@/lib/tauri";
import type { ProjectScanResult } from "@/types";

export function useProjectScan() {
  const [scanResult, setScanResult] = useState<ProjectScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const scan = useCallback(async (path: string) => {
    setScanError(null);
    setIsScanning(true);
    try {
      const result = await scanProject(path);
      setScanResult(result);
    } catch (err: unknown) {
      const message =
        typeof err === "string" ? err : (err as Error)?.message || "Unknown scan error";
      setScanError(message);
    } finally {
      setIsScanning(false);
    }
  }, []);

  const clearScan = useCallback(() => {
    setScanResult(null);
    setScanError(null);
  }, []);

  return { scanResult, isScanning, scanError, scan, clearScan };
}
