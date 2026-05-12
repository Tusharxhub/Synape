import { useEffect, useState, useCallback } from "react";

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);
  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setQuery("");
      return !prev;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle, close]);

  return { isOpen, query, setQuery, open, close, toggle };
}
