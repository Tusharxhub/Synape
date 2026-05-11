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
        <header className="shrink-0 border-b border-synapse-border">
          {commandBar}
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="w-[320px] shrink-0 border-r border-synapse-border bg-synapse-panel/80 backdrop-blur-md xl:w-[336px]">
          {sidebar}
          </aside>

          <main className="relative min-w-0 flex-1 overflow-hidden bg-synapse-surface/55">
            {canvas}
          </main>
        </div>
      </div>
    </div>
  );
}
