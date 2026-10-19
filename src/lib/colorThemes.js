export const COLOR_THEME_STORAGE_KEY = "preferred-color-theme";
export const DEFAULT_COLOR_THEME = "purple";

export const COLOR_THEMES = [
  { id: "purple", label: { nl: "Paars", en: "Purple" } },
  { id: "blue", label: { nl: "Blauw", en: "Blue" } },
  { id: "green", label: { nl: "Groen", en: "Green" } },
  { id: "teal", label: { nl: "Turquoise", en: "Teal" } },
  { id: "amber", label: { nl: "Amber", en: "Amber" } },
  { id: "rose", label: { nl: "Roze", en: "Rose" } },
];

export function resolveColorTheme(value) {
  return COLOR_THEMES.some((theme) => theme.id === value)
    ? value
    : DEFAULT_COLOR_THEME;
}

// Apply the saved palette before the page paints, including on direct page loads.
export const colorThemeInitScript = `(() => {
  let theme = ${JSON.stringify(DEFAULT_COLOR_THEME)};
  try {
    const stored = localStorage.getItem(${JSON.stringify(COLOR_THEME_STORAGE_KEY)});
    if (${JSON.stringify(COLOR_THEMES.map(({ id }) => id))}.includes(stored)) theme = stored;
  } catch {}
  document.documentElement.dataset.colorTheme = theme;
})();`;
