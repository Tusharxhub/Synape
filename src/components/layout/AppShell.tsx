import { ReactNode } from "react";

interface AppShellProps {
  sidebar: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
}

export function AppShell({ sidebar, canvas, inspector }: AppShellProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-synapse-darker text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.1),transparent_30%)]" />
      <div className="absolute inset-0 synapse-grid opacity-50" />

      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Layout */}
      <div className="relative z-10 flex h-full">
        {/* Left Sidebar */}
        <aside className="w-[300px] flex-shrink-0 border-r border-white/[0.04] bg-white/[0.01] backdrop-blur-2xl overflow-hidden">
          {sidebar}
        </aside>

        {/* Center Canvas */}
        <main className="relative flex-1 min-w-0 overflow-hidden">
          {canvas}
        </main>

        {/* Right Inspector */}
        <aside className="w-[320px] flex-shrink-0 border-l border-white/[0.04] bg-white/[0.01] backdrop-blur-2xl overflow-hidden">
          {inspector}
        </aside>
      </div>
    </div>
  );
}
