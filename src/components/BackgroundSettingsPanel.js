"use client";

import { useEffect, useRef, useState } from "react";
import { FiSettings, FiX } from "react-icons/fi";

import {
  BACKGROUND_EFFECT_META,
  BACKGROUND_EFFECT_ORDER,
} from "@/lib/backgroundEffectMeta";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function BackgroundSettingsPanel({
  effect,
  setEffect,
  ballCount,
  setBallCount,
  rainCount,
  setRainCount,
  starCount,
  setStarCount,
  orbitCount,
  setOrbitCount,
  orbitRadius,
  setOrbitRadius,
  firefliesCount,
  setFirefliesCount,
  attractRepelCount,
  setAttractRepelCount,
  attractRepelRange,
  setAttractRepelRange,
  showSettings,
  setShowSettings,
  variant = "static",
  stopSelector = "footer",
  className = "",
  style,
  gap = 24,
}) {
  const containerRef = useRef(null);
  const [floatingBottom, setFloatingBottom] = useState(gap);

  useEffect(() => {
    if (variant !== "floating") return undefined;

    let frame = null;

    const updatePosition = () => {
      const element = containerRef.current;
      if (!element) return;

      const footer = stopSelector
        ? document.querySelector(stopSelector)
        : null;

      if (!footer) {
        setFloatingBottom((prev) => (prev === gap ? prev : gap));
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportBottom = window.scrollY + viewportHeight;
      const footerTop = window.scrollY + footerRect.top;
      const requiredBottom = Math.max(
        gap,
        viewportBottom - (footerTop - gap),
      );

      setFloatingBottom((prev) => {
        const next = Number.isFinite(requiredBottom) ? requiredBottom : gap;
        return Math.abs(prev - next) < 0.5 ? prev : next;
      });
    };

    const handleScrollOrResize = () => {
      if (frame != null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        updatePosition();
      });
    };

    updatePosition();

    window.addEventListener("scroll", handleScrollOrResize, {
      passive: true,
    });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      if (frame != null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [variant, stopSelector, gap]);

  const getEffectValue = () => {
    switch (effect) {
      case "rain":
        return rainCount;
      case "stars":
        return starCount;
      case "orbit":
        return orbitCount;
      case "fireflies":
        return firefliesCount;
      case "attract-repel":
        return attractRepelCount;
      case "balls":
      default:
        return ballCount;
    }
  };

  const handleEffectValueChange = (nextValue) => {
    switch (effect) {
      case "rain":
        setRainCount?.(nextValue);
        break;
      case "stars":
        setStarCount?.(nextValue);
        break;
      case "orbit":
        setOrbitCount?.(nextValue);
        break;
      case "fireflies":
        setFirefliesCount?.(nextValue);
        break;
      case "attract-repel":
        setAttractRepelCount?.(nextValue);
        break;
      case "balls":
      default:
        setBallCount?.(nextValue);
        break;
    }
  };

  const extraControl = BACKGROUND_EFFECT_META[effect]?.extraControl;
  const extraValue = (() => {
    if (!extraControl) return 0;
    if (effect === "orbit") return orbitRadius;
    if (effect === "attract-repel") return attractRepelRange;
    return 0;
  })();

  const handleExtraChange = (nextValue) => {
    if (!extraControl) return;
    if (effect === "orbit") {
      setOrbitRadius?.(nextValue);
    }
    if (effect === "attract-repel") {
      setAttractRepelRange?.(nextValue);
    }
  };

  const effectDetails =
    BACKGROUND_EFFECT_META[effect] ?? BACKGROUND_EFFECT_META.balls;

  const containerClassName = [
    "pointer-events-auto",
    variant === "floating" ? "fixed left-6 z-40" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyle = {
    overflowAnchor: "none",
    ...(variant === "floating" ? { bottom: `${floatingBottom}px` } : {}),
    ...style,
  };

  return (
    <div ref={containerRef} className={containerClassName} style={inlineStyle}>
      {showSettings ? (
        <div className="w-64 space-y-4 rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-sm text-white backdrop-blur supports-[backdrop-filter]:bg-white/[0.09] animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Settings</h3>
            <button
              onClick={() => setShowSettings?.(false)}
              className="text-white transition hover:text-red-400"
            >
              <FiX size={18} />
            </button>
          </div>

          <select
            value={effect}
            onChange={(event) => setEffect?.(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          >
            {BACKGROUND_EFFECT_ORDER.map((key) => {
              const option = BACKGROUND_EFFECT_META[key];
              if (!option) return null;
              return (
                <option key={key} value={key}>
                  {option.selectLabel}
                </option>
              );
            })}
          </select>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium">
              {effectDetails.sliderLabel}
              <input
                type="number"
                min={0}
                max={effectDetails.max}
                value={getEffectValue().toString()}
                onChange={(event) => {
                  const numericValue = clamp(
                    parseInt(event.target.value, 10) || 0,
                    0,
                    effectDetails.max,
                  );
                  handleEffectValueChange(numericValue);
                }}
                className="w-12 border-none bg-transparent text-left text-white outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={effectDetails.max}
            value={getEffectValue()}
            onChange={(event) => {
              const numericValue = parseInt(event.target.value, 10) || 0;
              handleEffectValueChange(numericValue);
            }}
            className="w-full accent-purple-500"
          />

          {extraControl && (
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="text-sm">{extraControl.label}</span>
                <input
                  type="number"
                  min={extraControl.min}
                  max={extraControl.max}
                  value={extraValue}
                  onChange={(event) => {
                    const numericValue = clamp(
                      parseInt(event.target.value, 10) || 0,
                      extraControl.min,
                      extraControl.max,
                    );
                    handleExtraChange(numericValue);
                  }}
                  className="w-16 border-none bg-transparent text-white outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>

              <input
                type="range"
                min={extraControl.min}
                max={extraControl.max}
                value={extraValue}
                onChange={(event) => {
                  const numericValue = parseInt(event.target.value, 10) || 0;
                  handleExtraChange(numericValue);
                }}
                className="w-full accent-purple-500"
              />
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setShowSettings?.(true)}
          className="rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:border-purple-400/40 hover:bg-purple-500/25"
          aria-label="Open instellingen"
        >
          <FiSettings size={20} />
        </button>
      )}
    </div>
  );
}
