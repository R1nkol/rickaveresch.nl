"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { translations } from "@/lib/translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "preferred-language";
const DEFAULT_LANGUAGE = "nl";

function resolveTranslation(key, language) {
  const parts = key.split(".");
  let node = translations[language];

  for (const part of parts) {
    if (node == null || typeof node !== "object" || !(part in node)) {
      return null;
    }
    node = node[part];
  }

  if (typeof node === "string") {
    return node;
  }

  return null;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (hydrated) return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) {
        setLanguage(stored);
      }
    } catch (error) {
      console.warn("Unable to read stored language preference", error);
    } finally {
      setHydrated(true);
    }
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.warn("Unable to persist language preference", error);
    }
  }, [language, hydrated]);

  useEffect(() => {
    document.documentElement.lang = language === "nl" ? "nl" : "en";
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "nl" ? "en" : "nl"));
  }, []);

  const t = useCallback(
    (key, options = {}) => {
      const { fallback, vars } = options ?? {};

      const applyVars = (str) => {
        if (typeof str !== "string" || !vars) return str;
        return str.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, p1) => {
          const v = vars[p1];
          return v != null ? String(v) : match;
        });
      };

      const localized = resolveTranslation(key, language);
      if (localized != null) {
        return applyVars(localized);
      }
      if (fallback != null) {
        return applyVars(fallback);
      }
      const fallbackLocalized = resolveTranslation(key, DEFAULT_LANGUAGE);
      if (fallbackLocalized != null) {
        return applyVars(fallbackLocalized);
      }
      return key;
    },
    [language],
  );

  const translateField = useCallback(
    (value, fallback) => {
      if (value == null) return fallback ?? value;
      if (typeof value === "string") return value;
      if (Array.isArray(value)) return value;
      if (typeof value === "object") {
        if (value[language] != null) {
          return value[language];
        }
        if (value[DEFAULT_LANGUAGE] != null) {
          return value[DEFAULT_LANGUAGE];
        }
        const [, firstValue] = Object.entries(value)[0] ?? [];
        return firstValue ?? fallback ?? value;
      }
      return value;
    },
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      translateField,
      hydrated,
    }),
    [language, t, translateField, toggleLanguage, hydrated],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
