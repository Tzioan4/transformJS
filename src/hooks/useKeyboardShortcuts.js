import { useEffect } from "react";

export default function useKeyboardShortcuts({ toggleTheme }) {
  useEffect(() => {
    const handler = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrl = isMac ? e.metaKey : e.ctrlKey;

      //escape clear
      if (e.key === "Escape") {
        const clearBtn = document.querySelector(".btn-danger:not(:disabled)");
        if (clearBtn) clearBtn.click();
        return;
      }

      if (!ctrl) return;

      switch (e.key) {
        //ctrl+K focus search
        case "k": {
          e.preventDefault();
          const searchInput = document.querySelector(".search-input");
          if (searchInput) searchInput.focus();
          break;
        }

        //ctrl+/ toggle theme
        case "/": {
          e.preventDefault();
          toggleTheme();
          break;
        }

        //ctrl+Shift+C copy output
        case "C": {
          if (!e.shiftKey) break;
          e.preventDefault();
          const copyBtn = document.querySelector(".btn-copy:not(:disabled)");
          if (copyBtn) copyBtn.click();
          break;
        }

        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleTheme]);
}
