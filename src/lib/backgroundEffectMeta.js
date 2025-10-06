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
    selectLabel: "Ballen",
    sliderLabel: "Aantal ballen:",
    max: 100,
  },
  rain: {
    selectLabel: "Regen",
    sliderLabel: "Aantal regendruppels:",
    max: 1000,
  },
  stars: {
    selectLabel: "Sneeuw",
    sliderLabel: "Aantal sneeuwvlokken:",
    max: 1000,
  },
  fireflies: {
    selectLabel: "Vuurvliegjes",
    sliderLabel: "Aantal vuurvliegjes:",
    max: 750,
  },
  "attract-repel": {
    selectLabel: "Aantrekkingseffect",
    sliderLabel: "Aantal objecten:",
    max: 500,
    extraControl: {
      label: "Muis reach:",
      min: 20,
      max: 500,
    },
  },
  orbit: {
    selectLabel: "Roterende objecten",
    sliderLabel: "Aantal objecten:",
    max: 500,
    extraControl: {
      label: "Maximale radius:",
      min: 20,
      max: 500,
    },
  },
};
