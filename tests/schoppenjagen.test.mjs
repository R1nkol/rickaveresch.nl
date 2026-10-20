import assert from "node:assert/strict";
import test from "node:test";
import {
  addSchoppenjagenHand,
  createSchoppenjagenGame,
  restoreSchoppenjagenGame,
  schoppenjagenStandings,
  schoppenjagenHandBudget,
} from "../src/lib/schoppenjagen.js";
import { SCHOPPENJAGEN_TARGETS, schoppenjagenSettings } from "../src/data/schoppenjagen.js";

const create = (target = 100, rules = {}, playerCount = 4) => createSchoppenjagenGame(
  { target, playerCount, rules },
  Array.from({ length: playerCount }, (_, index) => `Speler ${index + 1}`),
);
const hand = (game, points, extra = {}) => addSchoppenjagenHand(game, { points, ...extra });

function reachScore(game, score, player = 0) {
  const max = (game.config.playerCount === 6 ? 9 : 8) + SCHOPPENJAGEN_TARGETS[game.config.target].jackPoints - 1;
  while (schoppenjagenStandings(game).players[player].score < score) {
    const remaining = score - schoppenjagenStandings(game).players[player].score;
    game = hand(game, game.names.map((_, index) => index === player ? Math.min(remaining, max) : 0));
  }
  return game;
}

test("settings travel as validated query values; all optional rules start off", () => {
  assert.deepEqual(schoppenjagenSettings("25", "6"), { target: 25, playerCount: 6 });
  assert.deepEqual(schoppenjagenSettings("invalid", "9"), { target: 100, playerCount: 4 });
  const game = createSchoppenjagenGame({ target: 25, playerCount: 4 }, [" Rick ", "", "Sam", "Teun"]);
  assert.deepEqual(game.names, ["Rick", "Speler 2", "Sam", "Teun"]);
  assert.ok(Object.values(game.config.rules).every((value) => value === false));
  assert.throws(() => createSchoppenjagenGame({ target: 100, playerCount: 4 }, ["Rick", "rick", "Sam", "Teun"]));
});

test("the jack counts as five, ten or thirteen for targets 25, 50 and 100", () => {
  assert.equal(SCHOPPENJAGEN_TARGETS[100].jackPoints, 13);
  assert.equal(SCHOPPENJAGEN_TARGETS[25].jackPoints, 5);
  assert.equal(SCHOPPENJAGEN_TARGETS[50].jackPoints, 10);
  assert.equal(schoppenjagenHandBudget({ target: 100, playerCount: 4 }).maxPoints, 20);
  assert.equal(schoppenjagenHandBudget({ target: 100, playerCount: 6 }).maxPoints, 21);
  assert.equal(schoppenjagenHandBudget({ target: 25, playerCount: 4 }).maxPoints, 12);
  assert.equal(schoppenjagenHandBudget({ target: 50, playerCount: 4 }).maxPoints, 17);
  assert.equal(schoppenjagenHandBudget({ target: 50, playerCount: 6 }).maxPoints, 18);
});

test("passing the target keeps the full score without the optional bounce rule", () => {
  for (const target of [100, 50, 25]) {
    const game = hand(reachScore(create(target), target - 2), [5, 0, 0, 0]);
    const [player] = schoppenjagenStandings(game).players;
    assert.equal(player.score, target + 3);
    assert.equal(player.phase, 2);
  }
});

test("phase-one bounce enters phase two even below the target: 98 + 5 becomes 97", () => {
  for (const target of [100, 50, 25]) {
    const game = hand(reachScore(create(target, { bounce: true }), target - 2), [5, 0, 0, 0]);
    const [player] = schoppenjagenStandings(game).players;
    assert.equal(player.score, target - 3);
    assert.equal(player.phase, 2);
  }
});

test("phase two never bounces: 3 minus 5 is a win, including with bounce enabled", () => {
  for (const bounce of [false, true]) {
    let game = reachScore(create(25, { bounce }), 25);
    game = hand(game, [10, 0, 0, 0]);
    game = hand(game, [10, 0, 0, 0]);
    game = hand(game, [2, 0, 0, 0]);
    assert.equal(schoppenjagenStandings(game).players[0].score, 3);
    game = hand(game, [5, 0, 0, 0]);
    assert.equal(schoppenjagenStandings(game).players[0].score, -2);
    assert.deepEqual(schoppenjagenStandings(game).winners, [0]);
    assert.throws(() => hand(game, [1, 0, 0, 0]), /afgelopen/);
  }
});

test("double points use the score before the hand, at 90, 40 or 20, only in phase one", () => {
  for (const [target, threshold] of [[100, 90], [50, 40], [25, 20]]) {
    let game = reachScore(create(target, { double: true }), threshold);
    game = hand(game, [5, 0, 0, 0]);
    const result = schoppenjagenStandings(game);
    assert.equal(result.history.at(-1).countedPoints[0], 10);
    assert.equal(result.players[0].score, threshold + 10);
    assert.equal(result.players[0].phase, 2);
    game = hand(game, [5, 0, 0, 0]);
    assert.equal(schoppenjagenStandings(game).players[0].score, threshold + 5);
  }
});

test("twenty points can make phase-one scores negative without winning", () => {
  const game = hand(create(25, { sweep: true }), [10, 0, 0, 0], { sweepPlayer: 0, sweepChoice: "subtract" });
  const result = schoppenjagenStandings(game);
  assert.equal(result.players[0].score, -10);
  assert.equal(result.players[0].phase, 1);
  assert.deepEqual(result.winners, []);
  assert.deepEqual(result.history[0].countedPoints, [10, 0, 0, 0]);
});

test("twenty-point bonuses can push another player into phase two and respect bounce", () => {
  const game = hand(reachScore(create(25, { sweep: true, bounce: true }), 24, 1), [10, 0, 0, 0], { sweepPlayer: 0, sweepChoice: "others" });
  const result = schoppenjagenStandings(game);
  assert.equal(result.players[1].score, 6);
  assert.equal(result.players[1].phase, 2);
  assert.deepEqual(result.nextStarters, [0]);
});

test("sweeping in phase two subtracts the hand and always adds twenty to the others", () => {
  let game = reachScore(create(25, { sweep: true }), 25);
  game = hand(game, [10, 0, 0, 0], { sweepPlayer: 0, sweepChoice: "subtract" });
  assert.deepEqual(schoppenjagenStandings(game).players.map(({ score }) => score), [15, 20, 20, 20]);
});

test("next starter uses hand points, then highest total, retaining ties for a draw", () => {
  let game = hand(create(), [0, 4, 0, 0]);
  game = hand(game, [3, 3, 0, 0]);
  assert.deepEqual(schoppenjagenStandings(game).nextStarters, [1]);
  assert.deepEqual(schoppenjagenStandings(hand(create(), [3, 3, 0, 0])).nextStarters, [0, 1]);
});

test("undo and reload reconstruct every score and phase from the saved hands", () => {
  const before = reachScore(create(25, { bounce: true }), 23);
  const after = hand(before, [5, 0, 0, 0]);
  const restored = restoreSchoppenjagenGame(JSON.parse(JSON.stringify(after)));
  assert.deepEqual(schoppenjagenStandings(restored), schoppenjagenStandings(after));
  const undone = { ...restored, hands: restored.hands.slice(0, -1) };
  assert.deepEqual(schoppenjagenStandings(undone), schoppenjagenStandings(before));
  assert.equal(schoppenjagenStandings(before).players[0].phase, 1);
  assert.equal(schoppenjagenStandings(after).players[0].phase, 2);
});

test("invalid hand scores and impossible sweeps are rejected without changing the game", () => {
  const game = create(25, { sweep: true });
  const { maxPoints } = schoppenjagenHandBudget(game.config);
  for (const points of [[-1, 1, 0, 0], [0.5, 1, 0, 0], [NaN, 1, 0, 0], [maxPoints + 1, 0, 0, 0], [maxPoints, maxPoints, 0, 0], [0, 0, 0, 0], [1, 0]]) {
    assert.throws(() => hand(game, points));
  }
  assert.throws(() => hand(game, [3, 3, 0, 0], { sweepPlayer: 0 }));
  assert.throws(() => hand(create(), [10, 0, 0, 0], { sweepPlayer: 0 }));
  assert.equal(game.hands.length, 0);
});

test("hand points are shared between all players, including when editing earlier entries", () => {
  const config = { target: 100, playerCount: 4 };
  assert.deepEqual(schoppenjagenHandBudget(config, ["7", "3", "", ""]), {
    maxPoints: 20, total: 10, remaining: 10, maxPerPlayer: [17, 13, 10, 10],
  });
  assert.deepEqual(schoppenjagenHandBudget(config, ["20", "0", "", ""]).maxPerPlayer, [20, 0, 0, 0]);
  assert.deepEqual(schoppenjagenHandBudget(config, ["5", "3", "", ""]).maxPerPlayer, [17, 15, 12, 12]);
  assert.throws(() => hand(create(), [20, 20, 20, 0]), /samen/);
});

test("shared hand limits match the deck and jack value, before optional double points", () => {
  for (const target of [100, 50, 25]) for (const playerCount of [4, 5, 6]) {
    const config = { target, playerCount, rules: { double: true } };
    const max = (playerCount === 6 ? 9 : 8) + SCHOPPENJAGEN_TARGETS[target].jackPoints - 1;
    const points = Array(playerCount).fill(0);
    points[0] = max - 1;
    const budget = schoppenjagenHandBudget(config, points);
    assert.equal(budget.maxPoints, max);
    assert.equal(budget.remaining, 1);
    assert.equal(budget.maxPerPlayer[1], 1);
    assert.equal(budget.maxPerPlayer[0], max);
  }
});

test("whole games finish correctly for every target and player count with optional doubles and bounce", () => {
  for (const target of [100, 50, 25]) for (const playerCount of [4, 5, 6]) {
    let game = create(target, { double: true, bounce: true, ace: true }, playerCount);
    const max = (playerCount === 6 ? 9 : 8) + SCHOPPENJAGEN_TARGETS[target].jackPoints - 1;
    for (let round = 0; round < 50 && !schoppenjagenStandings(game).winners.length; round++) {
      game = hand(game, game.names.map((_, index) => index === 0 ? max : 0));
    }
    assert.deepEqual(schoppenjagenStandings(game).winners, [0]);
    assert.deepEqual(restoreSchoppenjagenGame(JSON.parse(JSON.stringify(game))), game);
  }
});
