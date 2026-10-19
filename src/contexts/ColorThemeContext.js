"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { COLOR_THEME_STORAGE_KEY, DEFAULT_COLOR_THEME, resolveColorTheme } from "@/lib/colorThemes";

const ColorThemeContext = createContext(null);

export function ColorThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_COLOR_THEME);

  useEffect(() => {
    const applyTheme = (value) => {
      const nextTheme = resolveColorTheme(value);
      document.documentElement.dataset.colorTheme = nextTheme;
      setTheme(nextTheme);
    };

    try {
      applyTheme(window.localStorage.getItem(COLOR_THEME_STORAGE_KEY));
    } catch {
      applyTheme(document.documentElement.dataset.colorTheme);
    }

    const syncTheme = (event) => {
      if (event.key === COLOR_THEME_STORAGE_KEY || event.key === null) {
        applyTheme(event.newValue);
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const selectTheme = useCallback((value) => {
    const nextTheme = resolveColorTheme(value);
    document.documentElement.dataset.colorTheme = nextTheme;
    setTheme(nextTheme);
    try {
      window.localStorage.setItem(COLOR_THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The palette still works when the browser does not allow storage.
    }
  }, []);

  const value = useMemo(() => ({ theme, selectTheme }), [theme, selectTheme]);
  return <ColorThemeContext.Provider value={value}>{children}</ColorThemeContext.Provider>;
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (!context) throw new Error("useColorTheme must be used within a ColorThemeProvider");
  return context;
}
