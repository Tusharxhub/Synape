import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-synapse-border bg-synapse-surface/40 p-4 backdrop-blur-sm",
        hover && "transition-colors hover:bg-synapse-surface/60",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  icon?: ReactNode;
  title: string;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ icon, title, action, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-3 flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-synapse-text-muted">{icon}</span>}
        <p className="text-[10px] uppercase tracking-[0.14em] text-synapse-text-muted">
          {title}
        </p>
      </div>
      {action}
    </div>
  );
}
