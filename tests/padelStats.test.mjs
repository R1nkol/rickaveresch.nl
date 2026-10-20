import test from "node:test";
import assert from "node:assert/strict";
import { buildPadelStats, getMatchScore, getWinner, sortPlayers } from "../src/lib/padelStats.mjs";

const players = ["a", "b", "c", "d", "e"].map((id) => ({ id, name: id.toUpperCase() }));
const match = (date, sets, teamA = ["a", "b"], teamB = ["c", "d"]) => ({ id: date, date, sets, teamA, teamB });

test("a three-set match counts as one win and two won sets", () => {
  const fixture = match("2026-10-20", [[6, 4], [3, 6], [6, 3]]);
  assert.deepEqual(getMatchScore(fixture), [2, 1]);
  assert.equal(getWinner(fixture), "teamA");
  const stats = buildPadelStats([fixture], players);
  const winner = stats.players.find(({ id }) => id === "a");
  const loser = stats.players.find(({ id }) => id === "c");
  assert.deepEqual([winner.wins, winner.losses, winner.setsWon, winner.setsLost], [1, 0, 2, 1]);
  assert.deepEqual([loser.wins, loser.losses, loser.setsWon, loser.setsLost], [0, 1, 1, 2]);
  assert.equal(stats.players.reduce((total, player) => total + player.wins, 0), 2);
  assert.equal(stats.players.reduce((total, player) => total + player.losses, 0), 2);
});

test("recent results and winning streak use dates, independent of input order", () => {
  const fixtures = [
    match("2026-10-03", [[6, 4], [6, 4]]),
    match("2026-10-01", [[6, 4], [6, 4]]),
    match("2026-10-04", [[6, 4], [6, 4]]),
    match("2026-10-02", [[4, 6], [4, 6]]),
  ];
  const player = buildPadelStats(fixtures, players).players.find(({ id }) => id === "a");
  assert.deepEqual(player.form, [true, false, true, true]);
  assert.equal(player.streak, 2);
  assert.equal(player.percentage, 75);
  assert.equal(fixtures[0].date, "2026-10-03");
});

test("duos are the same regardless of player order and need five games to qualify", () => {
  const fixtures = Array.from({ length: 5 }, (_, index) => match(`2026-10-0${index + 1}`, [[6, 4], [6, 4]], index % 2 ? ["b", "a"] : ["a", "b"]));
  assert.equal(buildPadelStats(fixtures.slice(0, 4), players).bestDuo, undefined);
  const stats = buildPadelStats(fixtures, players);
  assert.equal(stats.duos.length, 2);
  assert.deepEqual(stats.bestDuo.members, ["a", "b"]);
  assert.equal(stats.bestDuo.played, 5);
  assert.equal(stats.bestDuo.percentage, 100);
});

test("empty periods have no wins, streaks, NaN or ranked duo", () => {
  const stats = buildPadelStats([], players);
  assert.equal(stats.bestDuo, undefined);
  assert.equal(stats.setCount, 0);
  assert.equal(stats.duos.length, 0);
  for (const player of stats.players) {
    assert.equal(player.played, 0);
    assert.equal(player.percentage, 0);
    assert.equal(player.streak, 0);
    assert.deepEqual(player.form, []);
  }
});

test("sorting by percentage differs from total wins without mutating players", () => {
  const fixture = [
    { name: "A", wins: 8, percentage: 80 },
    { name: "B", wins: 3, percentage: 100 },
    { name: "C", wins: 8, percentage: 90 },
  ];
  assert.deepEqual(sortPlayers(fixture).map(({ name }) => name), ["C", "A", "B"]);
  assert.deepEqual(sortPlayers(fixture, "percentage").map(({ name }) => name), ["B", "C", "A"]);
  assert.deepEqual(fixture.map(({ name }) => name), ["A", "B", "C"]);
});

test("ranking columns support both sort directions with deterministic ties", () => {
  const fixture = [
    { name: "C", played: 10, wins: 8, losses: 2, percentage: 80 },
    { name: "B", played: 3, wins: 3, losses: 0, percentage: 100 },
    { name: "A", played: 10, wins: 8, losses: 2, percentage: 80 },
  ];
  const names = (key, direction) => sortPlayers(fixture, key, direction).map(({ name }) => name);
  assert.deepEqual(names("name", "ascending"), ["A", "B", "C"]);
  assert.deepEqual(names("name", "descending"), ["C", "B", "A"]);
  for (const key of ["played", "wins", "losses"]) {
    assert.deepEqual(names(key, "descending"), ["A", "C", "B"]);
    assert.deepEqual(names(key, "ascending"), ["B", "A", "C"]);
  }
  assert.deepEqual(names("percentage", "descending"), ["B", "A", "C"]);
  assert.deepEqual(names("percentage", "ascending"), ["A", "C", "B"]);
  assert.deepEqual(fixture.map(({ name }) => name), ["C", "B", "A"]);
});
