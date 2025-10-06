export const BACKGROUND_EFFECT_ORDER = [
  "balls",
  "rain",
  "stars",
  "fireflies",
  "attract-repel",
  "orbit",
];

export const BACKGROUND_EFFECT_META = {
  balls: {
    selectLabel: { nl: "Ballen", en: "Bubbles" },
    sliderLabel: { nl: "Aantal ballen:", en: "Number of bubbles:" },
    max: 100,
  },
  rain: {
    selectLabel: { nl: "Regen", en: "Rain" },
    sliderLabel: { nl: "Aantal regendruppels:", en: "Number of raindrops:" },
    max: 1000,
  },
  stars: {
    selectLabel: { nl: "Sneeuw", en: "Snow" },
    sliderLabel: { nl: "Aantal sneeuwvlokken:", en: "Number of snowflakes:" },
    max: 1000,
  },
  fireflies: {
    selectLabel: { nl: "Vuurvliegjes", en: "Fireflies" },
    sliderLabel: { nl: "Aantal vuurvliegjes:", en: "Number of fireflies:" },
    max: 750,
  },
  "attract-repel": {
    selectLabel: { nl: "Aantrekkingseffect", en: "Attraction effect" },
    sliderLabel: { nl: "Aantal objecten:", en: "Number of objects:" },
    max: 500,
    extraControl: {
      label: { nl: "Muis reach:", en: "Mouse reach:" },
      min: 20,
      max: 500,
    },
  },
  orbit: {
    selectLabel: { nl: "Roterende objecten", en: "Orbiting objects" },
    sliderLabel: { nl: "Aantal objecten:", en: "Number of objects:" },
    max: 500,
    extraControl: {
      label: { nl: "Maximale radius:", en: "Maximum radius:" },
      min: 20,
      max: 500,
    },
  },
};
