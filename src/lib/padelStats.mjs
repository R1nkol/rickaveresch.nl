export function getMatchScore(match) {
  const teamA = match.sets.filter(([a, b]) => a > b).length;
  return [teamA, match.sets.length - teamA];
}

export function getWinner(match) {
  const [a, b] = getMatchScore(match);
  return a > b ? "teamA" : "teamB";
}

export function sortPlayers(players, sort = "wins", direction = sort === "name" ? "ascending" : "descending") {
  return [...players].sort((a, b) => {
    const field = ["name", "played", "wins", "losses", "percentage"].includes(sort) ? sort : "wins";
    const primary = field === "name" ? a.name.localeCompare(b.name, "nl") : a[field] - b[field];
    return primary * (direction === "ascending" ? 1 : -1) || b.wins - a.wins || b.percentage - a.percentage || a.name.localeCompare(b.name, "nl");
  });
}

export function buildPadelStats(matches, playerList) {
  const chronological = [...matches].sort((a, b) => b.date.localeCompare(a.date));
  const players = playerList.map((player) => {
    const played = chronological.filter((match) => [...match.teamA, ...match.teamB].includes(player.id));
    const results = played.map((match) => match[getWinner(match)].includes(player.id));
    const wins = results.filter(Boolean).length;
    let setsWon = 0, setsLost = 0;
    for (const match of played) {
      const side = match.teamA.includes(player.id) ? 0 : 1;
      const score = getMatchScore(match);
      setsWon += score[side];
      setsLost += score[1 - side];
    }
    const streak = results[0] ? results.findIndex((won) => !won) : 0;
    return { ...player, played: played.length, wins, losses: played.length - wins,
      percentage: played.length ? Math.round(wins / played.length * 100) : 0,
      form: results.slice(0, 5).reverse(), setsWon, setsLost,
      streak: streak === -1 ? results.length : streak };
  });

  const pairs = new Map();
  for (const match of chronological) {
    for (const side of ["teamA", "teamB"]) {
      const members = [...match[side]].sort();
      const id = members.join("-");
      const pair = pairs.get(id) ?? { id, members, played: 0, wins: 0 };
      pair.played += 1;
      pair.wins += Number(getWinner(match) === side);
      pairs.set(id, pair);
    }
  }
  const duos = [...pairs.values()].map((pair) => ({ ...pair,
    losses: pair.played - pair.wins, percentage: Math.round(pair.wins / pair.played * 100),
  })).sort((a, b) => b.percentage - a.percentage || b.wins - a.wins || a.id.localeCompare(b.id));

  return { players: sortPlayers(players), duos, bestDuo: duos.find((pair) => pair.played >= 5),
    setCount: chronological.reduce((total, match) => total + match.sets.length, 0),
    threeSetCount: chronological.filter((match) => match.sets.length === 3).length };
}
