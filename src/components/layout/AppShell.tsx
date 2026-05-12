import { ReactNode } from "react";

interface AppShellProps {
  commandBar: ReactNode;
  sidebar: ReactNode;
  canvas: ReactNode;
}

export function AppShell({ commandBar, sidebar, canvas }: AppShellProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-synapse-bg text-synapse-text">
      <div className="pointer-events-none absolute inset-0 synapse-depth" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="shrink-0 bg-synapse-panel/60 backdrop-blur-xl z-20 shadow-[0_1px_0_0_rgba(255,255,255,0.02)]">
          {commandBar}
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="w-[320px] shrink-0 bg-synapse-surface/40 backdrop-blur-md xl:w-[336px] z-10 shadow-[1px_0_0_0_rgba(255,255,255,0.02)]">
          {sidebar}
          </aside>

          <main className="relative min-w-0 flex-1 overflow-hidden bg-transparent">
            {canvas}
          </main>
        </div>
      </div>
    </div>
  );
}
