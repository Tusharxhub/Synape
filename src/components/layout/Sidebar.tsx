import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {children}
    </div>
  );
}
