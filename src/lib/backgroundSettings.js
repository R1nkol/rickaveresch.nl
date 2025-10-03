export const BACKGROUND_DEFAULTS = {
  effect: "balls",
  ballCount: 35,
  rainCount: 250,
  starCount: 200,
  orbitCount: 50,
  orbitRadius: 300,
  firefliesCount: 250,
  attractRepelCount: 200,
  attractRepelRange: 150,
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

  const parseNumberSetting = (storageKey, fallback) => {
    const storedValue = storage.getItem(storageKey);
    if (storedValue == null) return fallback;
    const parsed = parseInt(storedValue, 10);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  settings.ballCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.ballCount,
    BACKGROUND_DEFAULTS.ballCount,
  );
  settings.rainCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.rainCount,
    BACKGROUND_DEFAULTS.rainCount,
  );
  settings.starCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.starCount,
    BACKGROUND_DEFAULTS.starCount,
  );
  settings.orbitCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.orbitCount,
    BACKGROUND_DEFAULTS.orbitCount,
  );
  settings.orbitRadius = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.orbitRadius,
    BACKGROUND_DEFAULTS.orbitRadius,
  );
  settings.firefliesCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.firefliesCount,
    BACKGROUND_DEFAULTS.firefliesCount,
  );
  settings.attractRepelCount = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.attractRepelCount,
    BACKGROUND_DEFAULTS.attractRepelCount,
  );
  settings.attractRepelRange = parseNumberSetting(
    BACKGROUND_STORAGE_KEYS.attractRepelRange,
    BACKGROUND_DEFAULTS.attractRepelRange,
  );

  return settings;
}

export function dispatchBackgroundSettingsChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("background-settings-change"));
}

export function saveBackgroundSetting(storageKey, value) {
  if (typeof window === "undefined") return;

  const storage = window.localStorage;
  const stringValue = typeof value === "string" ? value : String(value);

  if (storage.getItem(storageKey) === stringValue) return;

  storage.setItem(storageKey, stringValue);
  dispatchBackgroundSettingsChange();
}
