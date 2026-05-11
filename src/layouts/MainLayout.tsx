import { ReactNode } from "react";

interface MainLayoutProps {
  sidebar: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
}

export function MainLayout({ sidebar, canvas, inspector }: MainLayoutProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-synapse-darker text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.14),transparent_28%),linear-gradient(135deg,rgba(6,10,20,0.96),rgba(4,6,14,1))]" />
      <div className="absolute inset-0 synapse-grid opacity-70" />
      <div className="relative z-10 flex h-full min-w-0 flex-col xl:flex-row">
        <aside className="w-full xl:w-[336px] xl:flex-shrink-0 border-b xl:border-b-0 xl:border-r border-white/6 bg-white/[0.02] backdrop-blur-2xl">
          {sidebar}
        </aside>

        <main className="relative flex-1 min-w-0 overflow-hidden">
          {canvas}
        </main>

        <aside className="w-full xl:w-[360px] xl:flex-shrink-0 border-t xl:border-t-0 xl:border-l border-white/6 bg-white/[0.02] backdrop-blur-2xl">
          {inspector}
        </aside>
      </div>
    </div>
  );
}
