export const SCHOPPENJAGEN_TARGETS = {
  100: { duration: "60 tot 90 minuten", jackPoints: 13, doubleFrom: 90 },
  50: { duration: "45 tot 60 minuten", jackPoints: 10, doubleFrom: 40 },
  25: { duration: "30 tot 45 minuten", jackPoints: 5, doubleFrom: 20 },
};

export const SCHOPPENJAGEN_TARGET_OPTIONS = [
  { value: 100, label: "100 (standaard)" },
  { value: 50, label: "50 (snel)" },
  { value: 25, label: "25 (kort)" },
];

export const SCHOPPENJAGEN_PLAYER_SETUPS = {
  4: { lowestCard: 7, deckSize: 32, handSize: 8 },
  5: { lowestCard: 7, deckSize: 32, handSize: 6 },
  6: { lowestCard: 6, deckSize: 36, handSize: 6 },
};

export const SCHOPPENJAGEN_PLAYER_OPTIONS = [
  { value: 4, label: "4 (ideaal)" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];

export const SCHOPPENJAGEN_EXTRA_RULES = [
  { key: "double", label: "Dubbele punten" },
  { key: "ace", label: "Aas beïnvloedt boer" },
  { key: "sweep", label: "20-puntenregel bij alle slagen winnen" },
  { key: "bounce", label: "Stuiterregel in fase 1" },
];

export function schoppenjagenSettings(target, playerCount) {
  return {
    target: Object.hasOwn(SCHOPPENJAGEN_TARGETS, target) ? Number(target) : 100,
    playerCount: Object.hasOwn(SCHOPPENJAGEN_PLAYER_SETUPS, playerCount) ? Number(playerCount) : 4,
  };
}
