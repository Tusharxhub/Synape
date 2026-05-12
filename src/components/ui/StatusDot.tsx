import { cn } from "@/lib/cn";

interface StatusDotProps {
  status: "active" | "warning" | "danger" | "idle" | "info";
  pulse?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const colorMap: Record<string, string> = {
  active: "bg-synapse-success",
  warning: "bg-synapse-warning",
  danger: "bg-synapse-danger",
  idle: "bg-synapse-border",
  info: "bg-synapse-accent",
};

export function StatusDot({ status, pulse = false, size = "sm", className }: StatusDotProps) {
  const sizeClass = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        className={cn(
          "rounded-full shadow-sm",
          colorMap[status],
          sizeClass,
        )}
      />
      {pulse && (
        <span
          className={cn(
            "absolute inset-0 animate-ping rounded-full opacity-40",
            colorMap[status],
            sizeClass,
          )}
        />
      )}
    </span>
  );
}
