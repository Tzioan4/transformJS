import { useEffect } from "react";

const OPEN_TOOL_SWITCHER_EVENT = "open-tool-switcher";

export default function useKeyboardShortcuts({ toggleTheme }) {
  useEffect(() => {
    function handler(e) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      const ctrl = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toLowerCase();

      if (e.key === "Escape") {
        const toolSwitcherOpen = document.querySelector(
          ".tool-switcher-backdrop",
        );

        if (toolSwitcherOpen) return;

        const clearButton = document.querySelector(
          ".btn-danger:not(:disabled)",
        );

        clearButton?.click();

        return;
      }

      if (!ctrl) return;

      if (key === "k" && e.shiftKey) {
        e.preventDefault();

        window.dispatchEvent(new Event(OPEN_TOOL_SWITCHER_EVENT));

        return;
      }

      if (key === "k") {
        e.preventDefault();

        const searchInput = document.querySelector(".search-input");

        searchInput?.focus();

        return;
      }

      if (key === "/") {
        e.preventDefault();
        toggleTheme();

        return;
      }

      if (key === "c" && e.shiftKey) {
        e.preventDefault();

        const copyButton = document.querySelector(".btn-copy:not(:disabled)");

        copyButton?.click();
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [toggleTheme]);
}
