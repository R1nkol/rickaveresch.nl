import { buildPadelStats } from "@/lib/padelStats.mjs";
export { getWinner } from "@/lib/padelStats.mjs";

// Fictieve gegevens voor het ontwerp. Er wordt niets in de database opgeslagen.
export const demoPlayers = [
  { id: "rick", name: "Rick", initials: "RA" },
  { id: "sem", name: "Sem", initials: "SV" },
  { id: "thomas", name: "Thomas", initials: "TB" },
  { id: "max", name: "Max", initials: "MK" },
  { id: "daan", name: "Daan", initials: "DV" },
  { id: "jesse", name: "Jesse", initials: "JB" },
  { id: "lars", name: "Lars", initials: "LH" },
  { id: "tim", name: "Tim", initials: "TW" },
];

const fixtures = [
  ["2026-10-19", ["rick", "sem"], ["thomas", "max"], [[6, 4], [3, 6], [6, 3]]],
  ["2026-10-16", ["daan", "jesse"], ["rick", "lars"], [[4, 6], [5, 7]]],
  ["2026-10-14", ["sem", "thomas"], ["max", "tim"], [[6, 2], [6, 4]]],
  ["2026-10-12", ["rick", "sem"], ["daan", "jesse"], [[6, 3], [4, 6], [6, 2]]],
  ["2026-10-09", ["lars", "tim"], ["thomas", "max"], [[3, 6], [6, 4], [4, 6]]],
  ["2026-10-07", ["rick", "sem"], ["max", "jesse"], [[7, 5], [6, 3]]],
  ["2026-10-05", ["daan", "thomas"], ["lars", "tim"], [[6, 4], [6, 2]]],
  ["2026-10-02", ["rick", "max"], ["sem", "jesse"], [[4, 6], [6, 3], [6, 4]]],
  ["2026-09-28", ["rick", "sem"], ["thomas", "daan"], [[3, 6], [6, 4], [4, 6]]],
  ["2026-09-24", ["jesse", "tim"], ["max", "lars"], [[6, 4], [6, 3]]],
  ["2026-09-21", ["rick", "sem"], ["lars", "tim"], [[6, 2], [6, 4]]],
  ["2026-09-17", ["daan", "jesse"], ["thomas", "max"], [[4, 6], [6, 3], [7, 5]]],
  ["2026-09-14", ["rick", "thomas"], ["sem", "daan"], [[6, 3], [6, 4]]],
  ["2026-09-10", ["max", "tim"], ["jesse", "lars"], [[6, 4], [3, 6], [6, 2]]],
  ["2026-09-07", ["rick", "sem"], ["daan", "jesse"], [[6, 4], [7, 5]]],
  ["2026-09-03", ["thomas", "lars"], ["max", "tim"], [[6, 3], [6, 4]]],
];

export const demoMatches = fixtures.map(([date, teamA, teamB, sets], index) => ({
  id: `demo-${index + 1}`,
  date,
  teamA,
  teamB,
  sets,
}));

export function getPadelStats(matches) {
  return buildPadelStats(matches, demoPlayers);
}

export function playerName(id) {
  return demoPlayers.find((player) => player.id === id)?.name ?? id;
}

export function formatMatchDate(date, options = {}) {
  return new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "short", ...options })
    .format(new Date(`${date}T12:00:00`));
}
