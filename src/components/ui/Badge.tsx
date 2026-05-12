import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "accent" | "muted";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-synapse-surface/60 text-synapse-text-muted border-synapse-border/40",
  success:
    "bg-synapse-success/10 text-synapse-success border-synapse-success/30",
  warning:
    "bg-synapse-warning/10 text-synapse-warning border-synapse-warning/30",
  danger:
    "bg-synapse-danger/10 text-synapse-danger border-synapse-danger/30",
  accent:
    "bg-synapse-accent/10 text-synapse-accent border-synapse-accent/30",
  muted:
    "bg-synapse-panel/60 text-synapse-text-muted/80 border-synapse-border/30",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-tight",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
