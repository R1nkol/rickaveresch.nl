import { BACKGROUND_EFFECT_META } from "./backgroundEffectMeta.js";

export const BACKGROUND_DEFAULTS = {
  effect: "balls",
  ballCount: 18,
  rainCount: 120,
  starCount: 120,
  orbitCount: 24,
  orbitRadius: 240,
  firefliesCount: 90,
  attractRepelCount: 80,
  attractRepelRange: 120,
};

export const BACKGROUND_CLAMP_LIMITS = {
  ballCount: { min: 8, max: 48 },
  rainCount: { min: 50, max: 250 },
  starCount: { min: 60, max: 260 },
  orbitCount: { min: 0, max: BACKGROUND_EFFECT_META.orbit.max },
  orbitRadius: {
    min: BACKGROUND_EFFECT_META.orbit.extraControl.min,
    max: BACKGROUND_EFFECT_META.orbit.extraControl.max,
  },
  firefliesCount: { min: 0, max: BACKGROUND_EFFECT_META.fireflies.max },
  attractRepelCount: { min: 0, max: BACKGROUND_EFFECT_META["attract-repel"].max },
  attractRepelRange: {
    min: BACKGROUND_EFFECT_META["attract-repel"].extraControl.min,
    max: BACKGROUND_EFFECT_META["attract-repel"].extraControl.max,
  },
};

export const BACKGROUND_STORAGE_KEYS = {
  effect: "homepageEffect",
  ballCount: "ballCount",
  rainCount: "rainCount",
  starCount: "starCount",
  orbitCount: "orbitCount",
  orbitRadius: "orbitRadius",
  firefliesCount: "firefliesCount",
  attractRepelCount: "attractRepelCount",
  attractRepelRange: "attractRepelRange",
};

const clampNumber = (value, limits) => {
  if (!limits) return value;
  const { min, max } = limits;
  let result = value;
  if (typeof min === "number") {
    result = Math.max(min, result);
  }
  if (typeof max === "number") {
    result = Math.min(max, result);
  }
  return result;
};

export function loadBackgroundSettings() {
  if (typeof window === "undefined") {
    return { ...BACKGROUND_DEFAULTS };
  }

  const storage = window.localStorage;
  const settings = { ...BACKGROUND_DEFAULTS };

  const storedEffect = storage.getItem(BACKGROUND_STORAGE_KEYS.effect);
  if (storedEffect) {
    settings.effect = storedEffect;
  }

  const parseNumberSetting = (storageKey, fallback, clampKey) => {
    const storedValue = storage.getItem(storageKey);
    if (storedValue == null) return fallback;
    const parsed = parseInt(storedValue, 10);
    const value = Number.isFinite(parsed) ? parsed : fallback;
    return clampNumber(value, BACKGROUND_CLAMP_LIMITS[clampKey]);
  };

  settings.ballCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.ballCount,
    BACKGROUND_DEFAULTS.ballCount,
    "ballCount",
  );
  settings.rainCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.rainCount,
    BACKGROUND_DEFAULTS.rainCount,
    "rainCount",
  );
  settings.starCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.starCount,
    BACKGROUND_DEFAULTS.starCount,
    "starCount",
  );
  settings.orbitCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.orbitCount,
    BACKGROUND_DEFAULTS.orbitCount,
    "orbitCount",
  );
  settings.orbitRadius = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.orbitRadius,
    BACKGROUND_DEFAULTS.orbitRadius,
    "orbitRadius",
  );
  settings.firefliesCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.firefliesCount,
    BACKGROUND_DEFAULTS.firefliesCount,
    "firefliesCount",
  );
  settings.attractRepelCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.attractRepelCount,
    BACKGROUND_DEFAULTS.attractRepelCount,
    "attractRepelCount",
  );
  settings.attractRepelRange = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.attractRepelRange,
    BACKGROUND_DEFAULTS.attractRepelRange,
    "attractRepelRange",
  );

  return settings;
}

export function dispatchBackgroundSettingsChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("background-settings-change"));
}

const pendingSaves = new Map();
let flushHandle = null;

function flushPendingSaves() {
  flushHandle = null;

  if (typeof window === "undefined") {
    pendingSaves.clear();
    return;
  }

  const storage = window.localStorage;
  let didChange = false;

  pendingSaves.forEach((stringValue, key) => {
    if (storage.getItem(key) === stringValue) return;
    storage.setItem(key, stringValue);
    didChange = true;
  });

  pendingSaves.clear();

  if (didChange) {
    dispatchBackgroundSettingsChange();
  }
}

function scheduleFlush() {
  if (flushHandle != null) return;

  if (
    typeof window !== "undefined" &&
    typeof window.requestAnimationFrame === "function"
  ) {
    flushHandle = window.requestAnimationFrame(() => {
      flushPendingSaves();
    });
  } else if (typeof window !== "undefined") {
    flushHandle = window.setTimeout(() => {
      flushPendingSaves();
    }, 16);
  }
}

export function saveBackgroundSetting(storageKey, value) {
  if (typeof window === "undefined") return;

  const stringValue = typeof value === "string" ? value : String(value);
  pendingSaves.set(storageKey, stringValue);

  scheduleFlush();
}
