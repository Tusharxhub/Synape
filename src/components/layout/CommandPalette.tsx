import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderOpen, Box, ArrowRight } from "lucide-react";
import { cn } from "@/lib/format";

interface CommandPaletteProps {
  onImportClick?: () => void;
}

export function CommandPalette({ onImportClick }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-[640px] -translate-x-1/2 overflow-hidden rounded-xl border border-synapse-border bg-synapse-surface/90 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center border-b border-synapse-border px-4 py-3">
              <Search className="mr-3 h-5 w-5 text-synapse-text-muted" />
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent text-[15px] text-synapse-text placeholder-synapse-text-muted/60 outline-none"
                placeholder="Search files, symbols, dependencies or commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="rounded bg-synapse-panel/50 px-1.5 py-0.5 text-[10px] font-medium text-synapse-text-muted">
                ESC
              </div>
            </div>

            <div className="max-h-[360px] overflow-y-auto p-2">
              <div className="mb-2 mt-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-synapse-text-muted/70">
                Actions
              </div>
              <ul className="space-y-1">
                {[
                  {
                    icon: FolderOpen,
                    label: "Import Project...",
                    action: () => {
                      setIsOpen(false);
                      onImportClick?.();
                    },
                  },
                  { icon: Box, label: "Search Dependencies...", action: () => {} },
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={item.action}
                      className={cn(
                        "group flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-synapse-text transition-all",
                        "hover:bg-synapse-accent/10 hover:text-synapse-accent focus:bg-synapse-accent/10 focus:text-synapse-accent focus:outline-none"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4 text-synapse-text-muted transition-colors group-hover:text-synapse-accent" />
                      <span className="flex-1">{item.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mb-2 mt-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-synapse-text-muted/70">
                Recent Projects
              </div>
              <div className="px-3 py-4 text-center text-sm text-synapse-text-muted">
                No recent projects found.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
