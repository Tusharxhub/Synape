import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  children?: ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-synapse-text text-synapse-bg border-transparent hover:bg-slate-200 shadow-sm",
  secondary:
    "bg-synapse-surface/70 text-synapse-text border-synapse-border hover:bg-synapse-surface",
  ghost:
    "bg-transparent text-synapse-text-muted border-transparent hover:bg-synapse-surface/50 hover:text-synapse-text",
  accent:
    "bg-synapse-accent/10 text-synapse-accent border-synapse-border hover:bg-synapse-accent/15",
  danger:
    "bg-synapse-danger/10 text-synapse-danger border-synapse-danger/30 hover:bg-synapse-danger/15",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2.5 py-1 text-[11px] gap-1.5 rounded-md",
  md: "px-3.5 py-2 text-[13px] gap-2 rounded-lg",
  lg: "px-5 py-2.5 text-sm gap-2.5 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "secondary", size = "md", icon, children, className, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center border font-medium transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
