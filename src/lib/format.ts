/// Simple class merger
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

/// Format bytes to human-readable string
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

/// Format a number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/// Truncate a path for display
export function truncatePath(path: string, maxLen: number = 40): string {
  if (path.length <= maxLen) return path;
  const parts = path.split("/");
  if (parts.length <= 3) return "..." + path.slice(-maxLen);
  return parts[0] + "/.../" + parts.slice(-2).join("/");
}

/// Get a color class based on risk level
export function getRiskColor(risk: string): string {
  switch (risk) {
    case "high": return "text-red-400";
    case "medium": return "text-amber-400";
    case "low": return "text-emerald-400";
    default: return "text-slate-400";
  }
}

/// Get health score color
export function getHealthColor(score: number): string {
  if (score >= 90) return "text-emerald-400";
  if (score >= 75) return "text-cyan-400";
  if (score >= 60) return "text-amber-400";
  return "text-red-400";
}

/// Get health score bg glow
export function getHealthGlow(score: number): string {
  if (score >= 90) return "shadow-[0_0_20px_rgba(52,211,153,0.3)]";
  if (score >= 75) return "shadow-[0_0_20px_rgba(0,217,255,0.3)]";
  if (score >= 60) return "shadow-[0_0_20px_rgba(251,191,36,0.3)]";
  return "shadow-[0_0_20px_rgba(248,113,113,0.3)]";
}
