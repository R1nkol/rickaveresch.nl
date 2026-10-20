import { SCHOPPENJAGEN_TARGETS, SCHOPPENJAGEN_PLAYER_SETUPS, SCHOPPENJAGEN_EXTRA_RULES } from "../data/schoppenjagen.js";

export const SCHOPPENJAGEN_STORAGE_KEY = "rickaveresch:schoppenjagen-score:v1";

export function schoppenjagenHandBudget({ target, playerCount }, points = []) {
  const spadeCount = playerCount === 6 ? 9 : 8;
  const maxPoints = spadeCount + SCHOPPENJAGEN_TARGETS[target].jackPoints - 1;
  const values = points.map((value) => {
    const number = Number(value);
    return Number.isSafeInteger(number) && number >= 0 ? number : 0;
  });
  const total = values.reduce((sum, value) => sum + value, 0);
  return {
    maxPoints,
    total,
    remaining: Math.max(0, maxPoints - total),
    maxPerPlayer: values.map((value) => Math.max(0, maxPoints - total + value)),
  };
}

export function createSchoppenjagenGame({ target, playerCount, rules = {} }, names) {
  if (!Object.hasOwn(SCHOPPENJAGEN_TARGETS, target) || !Object.hasOwn(SCHOPPENJAGEN_PLAYER_SETUPS, playerCount)) {
    throw new Error("Kies een doelscore van 100, 50 of 25 en 4, 5 of 6 spelers.");
  }
  if (!Array.isArray(names) || names.length !== Number(playerCount)) throw new Error("Vul voor iedere speler een naam in.");
  const cleanNames = names.map((name, index) => typeof name === "string" ? name.trim().slice(0, 30) || `Speler ${index + 1}` : "");
  if (cleanNames.some((name) => !name) || new Set(cleanNames.map((name) => name.toLocaleLowerCase("nl"))).size !== cleanNames.length) {
    throw new Error("Geef iedere speler een andere naam.");
  }
  return {
    version: 1,
    config: {
      target: Number(target),
      playerCount: Number(playerCount),
      rules: Object.fromEntries(SCHOPPENJAGEN_EXTRA_RULES.map(({ key }) => [key, rules[key] === true])),
    },
    names: cleanNames,
    hands: [],
  };
}

function applyHand(players, hand, config) {
  const { target, playerCount, rules } = config;
  const { doubleFrom } = SCHOPPENJAGEN_TARGETS[target];
  const { maxPoints } = schoppenjagenHandBudget(config);
  const points = hand.points;
  if (!Array.isArray(points) || points.length !== playerCount || points.some((value) => !Number.isSafeInteger(value) || value < 0 || value > maxPoints)) {
    throw new Error("Vul voor iedere speler een heel aantal schoppenpunten in, vanaf 0.");
  }
  const total = points.reduce((sum, value) => sum + value, 0);
  if (total < 1 || total > maxPoints) throw new Error(`Controleer de punten van deze hand: samen kunnen het er maximaal ${maxPoints} zijn, vóór verdubbeling.`);

  const sweepPlayer = hand.sweepPlayer ?? null;
  if (sweepPlayer !== null && (!rules.sweep || !Number.isInteger(sweepPlayer) || sweepPlayer < 0 || sweepPlayer >= playerCount)) {
    throw new Error("Kies wie alle slagen heeft gewonnen.");
  }
  if (sweepPlayer !== null && points.some((value, index) => index !== sweepPlayer && value !== 0)) {
    throw new Error("Als iemand alle slagen wint, kunnen de anderen geen schoppenpunten hebben.");
  }
  if (sweepPlayer !== null && players[sweepPlayer].phase === 1 && !["subtract", "others"].includes(hand.sweepChoice)) {
    throw new Error("Kies wat de winnaar met de 20 punten wil doen.");
  }

  const countedPoints = points.map((value, index) => value * (rules.double && players[index].phase === 1 && players[index].score >= doubleFrom ? 2 : 1));
  const nextPlayers = players.map((player, index) => {
    const handDelta = player.phase === 1 ? countedPoints[index] : -countedPoints[index];
    let bonus = 0;
    if (sweepPlayer !== null) {
      const subtractSelf = players[sweepPlayer].phase === 1 && hand.sweepChoice === "subtract";
      if (subtractSelf && index === sweepPlayer) bonus = -20;
      if (!subtractSelf && index !== sweepPlayer) bonus = 20;
    }
    let score = player.score + handDelta + bonus;
    let phase = player.phase;
    if (phase === 1 && score >= target) {
      phase = 2;
      if (rules.bounce) score = 2 * target - score;
    }
    return { ...player, score, phase };
  });
  return { players: nextPlayers, countedPoints };
}

export function schoppenjagenStandings(game) {
  let players = game.names.map((name) => ({ name, score: 0, phase: 1 }));
  const history = [];
  let winners = [];
  let nextStarters = [];
  for (const hand of game.hands) {
    if (winners.length) throw new Error("Het spel is al afgelopen. Draai de laatste hand terug om deze te wijzigen.");
    const result = applyHand(players, hand, game.config);
    players = result.players;
    history.push({ ...hand, countedPoints: result.countedPoints, players });
    winners = players.flatMap((player, index) => player.phase === 2 && player.score <= 0 ? [index] : []);
    const mostPoints = Math.max(...result.countedPoints);
    const candidates = players.flatMap((player, index) => result.countedPoints[index] === mostPoints ? [index] : []);
    const highestScore = Math.max(...candidates.map((index) => players[index].score));
    nextStarters = candidates.filter((index) => players[index].score === highestScore);
  }
  return { players, history, winners, nextStarters };
}

export function addSchoppenjagenHand(game, hand) {
  if (game.hands.length >= 1000) throw new Error("Dit scorebord heeft het maximum van 1000 handen bereikt.");
  const next = {
    ...game,
    hands: [...game.hands, {
      points: [...hand.points],
      sweepPlayer: hand.sweepPlayer ?? null,
      sweepChoice: hand.sweepChoice ?? "others",
    }],
  };
  schoppenjagenStandings(next);
  return next;
}

export function restoreSchoppenjagenGame(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.hands) || value.hands.length > 1000) throw new Error("Het opgeslagen spel kon niet worden geopend.");
  const game = createSchoppenjagenGame(value.config ?? {}, value.names);
  game.hands = value.hands;
  schoppenjagenStandings(game);
  return game;
}
