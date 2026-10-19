"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiCheck, FiGlobe, FiX } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const LANGUAGES = [
  { id: "nl", label: "Nederlands", code: "NL" },
  { id: "en", label: "English", code: "EN" },
];

export default function LanguagePicker() {
  const { language, setLanguage, t } = useLanguage();
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
        className="button-secondary h-10 w-10 p-0"
        aria-label={t("languagePicker.open")}
        title={t("languagePicker.open")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <FiGlobe size={18} aria-hidden="true" />
      </button>
      {open && (
        <div
          id={panelId}
          className="surface-panel absolute -right-12 top-full mt-3 max-h-[calc(100svh-6rem)] w-64 max-w-[calc(100vw-2.5rem)] overflow-y-auto p-4 shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span id={`${panelId}-title`} className="text-sm font-medium">
              {t("languagePicker.label")}
            </span>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-foreground"
              aria-label={t("languagePicker.close")}
              onClick={close}
            >
              <FiX size={18} aria-hidden="true" />
            </button>
          </div>
          <fieldset aria-labelledby={`${panelId}-title`} className="space-y-1">
            {LANGUAGES.map((option) => (
              <label key={option.id} className="relative block cursor-pointer">
                <input
                  type="radio"
                  name={`${panelId}-language`}
                  value={option.id}
                  checked={language === option.id}
                  onChange={() => setLanguage(option.id)}
                  className="peer sr-only"
                />
                <span className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm text-muted hover:bg-white/5 peer-checked:bg-white/5 peer-checked:text-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                  <span className="font-mono text-xs" aria-hidden="true">{option.code}</span>
                  <span lang={option.id}>{option.label}</span>
                  {language === option.id && <FiCheck size={16} className="ml-auto text-accent" aria-hidden="true" />}
                </span>
              </label>
            ))}
          </fieldset>
        </div>
      )}
    </div>
  );
}
