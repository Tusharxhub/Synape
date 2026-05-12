import { useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, FolderOpen, ArrowRight, FileCode2, Package,
  Container, Crosshair, Settings, Info,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import type { ProjectScanResult, ArchitectureNode } from "@/types";

interface CommandPaletteProps {
  onImportClick?: () => void;
  scanResult?: ProjectScanResult | null;
  onNodeSelect?: (node: ArchitectureNode) => void;
}

interface CommandItem {
  icon: React.ElementType;
  label: string;
  description?: string;
  action: () => void;
  category: string;
}

export function CommandPalette({ onImportClick, scanResult, onNodeSelect }: CommandPaletteProps) {
  const { isOpen, query, setQuery, close } = useCommandPalette();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build action commands
  const actionCommands: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [
      {
        icon: FolderOpen,
        label: "Import Project...",
        description: "Open a local project folder",
        action: () => { close(); onImportClick?.(); },
        category: "Actions",
      },
      {
        icon: Crosshair,
        label: "Focus Graph",
        description: "Center and fit the architecture graph",
        action: () => close(),
        category: "Actions",
      },
      {
        icon: Info,
        label: "Show Project Info",
        description: "View project metadata and health",
        action: () => close(),
        category: "Actions",
      },
    ];

    if (scanResult?.hasDocker) {
      items.push({
        icon: Container,
        label: "Show Docker Info",
        description: "View Docker status and files",
        action: () => close(),
        category: "Actions",
      });
    }

    return items;
  }, [close, onImportClick, scanResult]);

  // Build searchable items from scan result
  const searchableItems: CommandItem[] = useMemo(() => {
    if (!scanResult) return [];
    const items: CommandItem[] = [];

    // Graph nodes
    for (const node of scanResult.graph.nodes.slice(0, 50)) {
      items.push({
        icon: node.nodeType === "folder" ? FolderOpen
          : node.nodeType === "dependency" ? Package
          : node.nodeType === "config" ? Settings
          : node.nodeType === "docker" ? Container
          : FileCode2,
        label: node.label,
        description: node.path,
        action: () => { close(); onNodeSelect?.(node); },
        category: node.nodeType === "dependency" ? "Dependencies" : "Graph Nodes",
      });
    }

    return items;
  }, [scanResult, close, onNodeSelect]);

  // Filter by query
  const filteredActions = useMemo(() => {
    if (!query) return actionCommands;
    const q = query.toLowerCase();
    return actionCommands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q),
    );
  }, [actionCommands, query]);

  const filteredSearch = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return searchableItems
      .filter((c) => c.label.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q))
      .slice(0, 20);
  }, [searchableItems, query]);

  // Group search results by category
  const groupedSearch = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const item of filteredSearch) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredSearch]);

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
            onClick={close}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-[640px] -translate-x-1/2 overflow-hidden rounded-xl border border-synapse-border bg-synapse-surface/90 shadow-2xl backdrop-blur-xl"
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-synapse-border px-4 py-3">
              <Search className="mr-3 h-5 w-5 text-synapse-text-muted" />
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent text-[15px] text-synapse-text placeholder-synapse-text-muted/60 outline-none"
                placeholder="Search files, nodes, dependencies or commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="rounded bg-synapse-panel/50 px-1.5 py-0.5 text-[10px] font-medium text-synapse-text-muted">
                ESC
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto p-2">
              {/* Actions */}
              {filteredActions.length > 0 && (
                <>
                  <div className="mb-2 mt-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-synapse-text-muted/70">
                    Actions
                  </div>
                  <ul className="space-y-0.5">
                    {filteredActions.map((item, idx) => (
                      <CommandRow key={`action-${idx}`} item={item} />
                    ))}
                  </ul>
                </>
              )}

              {/* Search results by category */}
              {Object.entries(groupedSearch).map(([category, items]) => (
                <div key={category}>
                  <div className="mb-2 mt-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-synapse-text-muted/70">
                    {category} ({items.length})
                  </div>
                  <ul className="space-y-0.5">
                    {items.map((item, idx) => (
                      <CommandRow key={`${category}-${idx}`} item={item} />
                    ))}
                  </ul>
                </div>
              ))}

              {/* No results */}
              {query && filteredActions.length === 0 && filteredSearch.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-synapse-text-muted">
                  No results for "{query}"
                </div>
              )}

              {/* Recent projects (when no query) */}
              {!query && (
                <>
                  <div className="mb-2 mt-4 px-3 text-[11px] font-semibold uppercase tracking-wider text-synapse-text-muted/70">
                    Recent Projects
                  </div>
                  <div className="px-3 py-4 text-center text-sm text-synapse-text-muted">
                    No recent projects found.
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-synapse-border px-4 py-2">
              <div className="flex items-center gap-3 text-[10px] text-synapse-text-muted/60">
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-synapse-panel px-1 py-0.5 text-[9px] shadow-sm">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-synapse-panel px-1 py-0.5 text-[9px] shadow-sm">↵</kbd>
                  select
                </span>
              </div>
              <span className="text-[10px] text-synapse-text-muted/40">SYNAPSE v0.1</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CommandRow({ item }: { item: CommandItem }) {
  const Icon = item.icon;
  return (
    <li>
      <button
        onClick={item.action}
        className={cn(
          "group flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-synapse-text transition-all",
          "hover:bg-synapse-accent/10 hover:text-synapse-accent focus:bg-synapse-accent/10 focus:text-synapse-accent focus:outline-none",
        )}
      >
        <Icon className="mr-3 h-4 w-4 shrink-0 text-synapse-text-muted transition-colors group-hover:text-synapse-accent" />
        <div className="min-w-0 flex-1">
          <span className="block truncate">{item.label}</span>
          {item.description && (
            <span className="block truncate text-[11px] text-synapse-text-muted/60">
              {item.description}
            </span>
          )}
        </div>
        <ArrowRight className="ml-2 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
    </li>
  );
}
