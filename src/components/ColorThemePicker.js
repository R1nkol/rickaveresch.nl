"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiDroplet, FiX } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import { useColorTheme } from "@/contexts/ColorThemeContext";
import { COLOR_THEMES } from "@/lib/colorThemes";

export default function ColorThemePicker() {
  const { t, translateField } = useLanguage();
  const { theme, selectTheme } = useColorTheme();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    containerRef.current?.querySelector("input:checked")?.focus({ preventScroll: true });

    const dismissOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("focusin", dismissOutside);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.stopPropagation();
          close();
        }
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        className="button-secondary h-10 w-10 p-0 text-accent"
        aria-label={t("colorTheme.open")}
        title={t("colorTheme.open")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <FiDroplet size={18} aria-hidden="true" />
      </button>
      {open && (
        <div
          id={panelId}
          className="surface-panel absolute right-0 top-full mt-3 max-h-[calc(100svh-6rem)] w-64 max-w-[calc(100vw-2.5rem)] overflow-y-auto p-4 shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span id={`${panelId}-title`} className="text-sm font-medium">
              {t("colorTheme.label")}
            </span>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-foreground"
              aria-label={t("colorTheme.close")}
              onClick={close}
            >
              <FiX size={18} aria-hidden="true" />
            </button>
          </div>
          <fieldset aria-labelledby={`${panelId}-title`}>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_THEMES.map((option) => (
                <label key={option.id} className="preference-option color-theme-option">
                  <input
                    type="radio"
                    name={`${panelId}-color-theme`}
                    value={option.id}
                    checked={theme === option.id}
                    onChange={() => selectTheme(option.id)}
                    className="sr-only"
                  />
                  <span className="color-theme-swatch" data-color-theme={option.id} aria-hidden="true" />
                  <span className="text-xs">{translateField(option.label)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}
