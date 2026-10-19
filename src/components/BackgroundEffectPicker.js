"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import { BACKGROUND_EFFECT_META, BACKGROUND_EFFECT_ORDER } from "@/lib/backgroundEffectMeta";

export default function BackgroundEffectPicker({ effect, setEffect }) {
  const { t, translateField } = useLanguage();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const id = useId();
  const containerRef = useRef(null);
  const toggleRef = useRef(null);
  const optionsRef = useRef(null);
  const selected = BACKGROUND_EFFECT_META[effect] ?? BACKGROUND_EFFECT_META.balls;

  useLayoutEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const anchor = toggleRef.current.getBoundingClientRect();
      const menu = optionsRef.current;
      const margin = 12;
      const gap = 8;
      const below = Math.max(0, window.innerHeight - anchor.bottom - gap - margin);
      const above = Math.max(0, anchor.top - gap - margin);
      const naturalHeight = menu.scrollHeight + 2;
      const openAbove = below < naturalHeight && above > below;
      const maxHeight = openAbove ? above : below;
      const width = Math.min(anchor.width, window.innerWidth - margin * 2);
      const next = {
        left: Math.max(margin, Math.min(anchor.left, window.innerWidth - width - margin)),
        top: openAbove
          ? Math.max(margin, anchor.top - gap - Math.min(naturalHeight, maxHeight))
          : anchor.bottom + gap,
        width,
        maxHeight,
      };
      setPosition((previous) =>
        previous && Object.keys(next).every((key) => previous[key] === next[key])
          ? previous
          : next,
      );
    };
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(toggleRef.current);
    observer.observe(optionsRef.current);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    const options = optionsRef.current;
    (options.querySelector("input:checked") ?? options.querySelector("input"))?.focus({ preventScroll: true });
    const dismissOutside = (event) => {
      if (!container.contains(event.target) && !options.contains(event.target)) setOpen(false);
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
        className="form-field flex items-center justify-between gap-2 text-left text-sm"
        aria-label={`${t("backgroundSettings.effect")}: ${translateField(selected.selectLabel)}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        {translateField(selected.selectLabel)}
        <FiChevronDown className={open ? "rotate-180" : ""} aria-hidden="true" />
      </button>
      {open && createPortal(
        <fieldset
          ref={optionsRef}
          id={id}
          aria-label={t("backgroundSettings.effect")}
          className="effect-picker-options"
          style={{ ...position, visibility: position ? "visible" : "hidden" }}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              // Resume the panel's tab order after leaving the portal.
              if (event.shiftKey) event.preventDefault();
              close();
            }
          }}
        >
          {BACKGROUND_EFFECT_ORDER.map((key) => (
            <label key={key} className="preference-option relative block cursor-pointer">
              <input
                type="radio"
                name={`${id}-effect`}
                value={key}
                checked={effect === key}
                className="sr-only"
                onChange={() => setEffect?.(key)}
                onClick={(event) => {
                  if (event.detail > 0) close();
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setEffect?.(key);
                    close();
                  }
                }}
              />
              <span className="effect-picker-option">
                {translateField(BACKGROUND_EFFECT_META[key].selectLabel)}
              </span>
            </label>
          ))}
        </fieldset>,
        document.body,
      )}
    </div>
  );
}
