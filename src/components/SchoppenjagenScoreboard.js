"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import ChoiceGroup from "@/components/ChoiceGroup";
import {
  SCHOPPENJAGEN_TARGETS,
  SCHOPPENJAGEN_TARGET_OPTIONS,
  SCHOPPENJAGEN_PLAYER_SETUPS,
  SCHOPPENJAGEN_PLAYER_OPTIONS,
  SCHOPPENJAGEN_EXTRA_RULES,
  schoppenjagenSettings,
} from "@/data/schoppenjagen";
import {
  SCHOPPENJAGEN_STORAGE_KEY,
  createSchoppenjagenGame,
  addSchoppenjagenHand,
  restoreSchoppenjagenGame,
  schoppenjagenStandings,
} from "@/lib/schoppenjagen";

export default function SchoppenjagenScoreboard({ initialTarget = 100, initialPlayerCount = 4 }) {
  const initial = schoppenjagenSettings(initialTarget, initialPlayerCount);
  const [target, setTarget] = useState(initial.target);
  const [playerCount, setPlayerCount] = useState(initial.playerCount);
  const [names, setNames] = useState(Array(6).fill(""));
  const [rules, setRules] = useState({});
  const [game, setGame] = useState(null);
  const [ready, setReady] = useState(false);
  const [points, setPoints] = useState([]);
  const [sweepPlayer, setSweepPlayer] = useState("");
  const [sweepChoice, setSweepChoice] = useState("others");
  const [confirmReset, setConfirmReset] = useState(false);
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SCHOPPENJAGEN_STORAGE_KEY);
      if (saved) {
        const restored = restoreSchoppenjagenGame(JSON.parse(saved));
        setGame(restored);
        setTarget(restored.config.target);
        setPlayerCount(restored.config.playerCount);
        setRules(restored.config.rules);
        setNames(Array.from({ length: 6 }, (_, index) => restored.names[index] ?? ""));
        setPoints(Array(restored.config.playerCount).fill(""));
      }
    } catch {
      setStorageError("Het opgeslagen spel kon niet worden geopend. Je kunt hieronder een nieuw spel starten.");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !game) return;
    try {
      localStorage.setItem(SCHOPPENJAGEN_STORAGE_KEY, JSON.stringify(game));
      setStorageError("");
    } catch {
      setStorageError("Je browser kan dit spel niet bewaren. Houd dit tabblad open om je scores te behouden.");
    }
  }, [game, ready]);

  const standings = game ? schoppenjagenStandings(game) : null;
  const activeTarget = game?.config.target ?? target;
  const activeCount = game?.config.playerCount ?? playerCount;
  const { lowestCard, deckSize, handSize } = SCHOPPENJAGEN_PLAYER_SETUPS[activeCount];
  const { jackPoints, doubleFrom } = SCHOPPENJAGEN_TARGETS[activeTarget];
  const rulesHref = `/drankspellen/schoppenjagen/uitleg?doel=${activeTarget}&spelers=${activeCount}`;
  const selectedRules = SCHOPPENJAGEN_EXTRA_RULES.filter(({ key }) => game?.config.rules[key]);
  const sweepIndex = sweepPlayer === "" ? null : Number(sweepPlayer);
  const sweepPhase = sweepIndex === null ? null : standings?.players[sweepIndex]?.phase;

  function clearHand() {
    setPoints(Array(activeCount).fill(""));
    setSweepPlayer("");
    setSweepChoice("others");
    setError("");
  }

  function startGame(event) {
    event.preventDefault();
    try {
      setGame(createSchoppenjagenGame({ target, playerCount, rules }, names.slice(0, playerCount)));
      clearHand();
      setStatus("");
    } catch (cause) {
      setError(cause.message);
    }
  }

  function saveHand(event) {
    event.preventDefault();
    try {
      const next = addSchoppenjagenHand(game, {
        points: points.map((value) => value.trim() === "" ? NaN : Number(value)),
        sweepPlayer: sweepIndex,
        sweepChoice,
      });
      setGame(next);
      clearHand();
      setStatus(`Hand ${next.hands.length} opgeslagen.`);
    } catch (cause) {
      setError(cause.message);
    }
  }

  function undoHand() {
    const last = game.hands.at(-1);
    setGame({ ...game, hands: game.hands.slice(0, -1) });
    setPoints(last.points.map(String));
    setSweepPlayer(last.sweepPlayer === null ? "" : String(last.sweepPlayer));
    setSweepChoice(last.sweepChoice);
    setError("");
    setStatus("Laatste hand teruggedraaid. Je kunt de punten hieronder aanpassen.");
  }

  function resetGame() {
    try {
      localStorage.removeItem(SCHOPPENJAGEN_STORAGE_KEY);
    } catch {
      setStorageError("Je browser kon het opgeslagen spel niet verwijderen.");
    }
    setGame(null);
    setConfirmReset(false);
    clearHand();
    setStatus("");
  }

  const winners = standings?.winners.map((index) => game.names[index]) ?? [];
  const nextNames = standings?.nextStarters.map((index) => game.names[index]) ?? [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />
        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-5xl space-y-8">
            <div>
              <PageTitle backHref="/drankspellen/schoppenjagen" backLabel="Terug naar Schoppenjagen">Schoppenjagen scorebord</PageTitle>
              <p className="mt-4 text-base text-gray-300 sm:text-lg">Noteer na iedere hand de punten. Dit spel wordt op dit apparaat bewaard.</p>
              <Link href={rulesHref} className="text-link mt-4">Spelregels bekijken</Link>
            </div>

            {!ready ? <p className="text-sm text-muted">Scorebord laden…</p> : !game ? (
              <form onSubmit={startGame} className="surface-panel space-y-7 p-5 sm:p-8">
                <div className="flex flex-wrap gap-x-10 gap-y-5">
                  <ChoiceGroup label="Doelscore" name="score-target" value={target} onChange={setTarget} options={SCHOPPENJAGEN_TARGET_OPTIONS} />
                  <ChoiceGroup label="Aantal spelers" name="score-players" value={playerCount} onChange={setPlayerCount} options={SCHOPPENJAGEN_PLAYER_OPTIONS} />
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  Gebruik {lowestCard} t/m aas ({deckSize} kaarten). Iedereen krijgt {handSize} kaarten.
                  {playerCount === 5 && " Leg voor het delen de bovenste 2 kaarten blind weg."}
                </p>
                <fieldset>
                  <legend className="mb-4 text-xl font-semibold">Wie spelen er mee?</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: playerCount }, (_, index) => (
                      <label key={index} className="space-y-2 text-sm text-muted">
                        <span>Speler {index + 1}</span>
                        <input className="form-field" type="text" autoComplete="off" maxLength={30} placeholder={`Speler ${index + 1}`} value={names[index]} onChange={(event) => setNames((current) => current.map((name, position) => position === index ? event.target.value : name))} />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <details className="border-t border-line pt-5">
                  <summary className="cursor-pointer text-sm font-medium">Optionele extra regels</summary>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {SCHOPPENJAGEN_EXTRA_RULES.map(({ key, label }) => (
                      <label key={key} className="flex items-start gap-3 text-sm text-gray-300">
                        <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]" checked={Boolean(rules[key])} onChange={(event) => setRules((current) => ({ ...current, [key]: event.target.checked }))} />
                        {label}
                      </label>
                    ))}
                  </div>
                </details>
                <button type="submit" className="button-primary">Start spel</button>
                {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
              </form>
            ) : (
              <>
                <section className="surface-panel p-5 sm:p-8" aria-labelledby="score-heading">
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                    <h2 id="score-heading" className="text-2xl font-semibold">{winners.length ? "Eindstand" : `Hand ${game.hands.length + 1}`}</h2>
                    <p className="text-sm text-muted">{activeCount} spelers, doelscore {activeTarget}</p>
                  </div>
                  {selectedRules.length > 0 && <p className="mb-5 text-sm text-muted">Extra regels: {selectedRules.map(({ label }) => label.toLocaleLowerCase("nl")).join(", ")}.</p>}
                  {winners.length > 0 ? (
                    <p className="mb-5 text-lg font-semibold" role="status">{winners.join(" en ")} {winners.length === 1 ? "wint" : "winnen"}!</p>
                  ) : (
                    <p className="mb-5 text-sm text-muted">
                      {nextNames.length === 0 ? "Loot wie de eerste hand begint." : nextNames.length === 1 ? `${nextNames[0]} begint deze hand.` : `${nextNames.join(" of ")} begint. Loot bij deze gelijke stand.`}
                    </p>
                  )}
                  <form onSubmit={saveHand}>
                    <table className="w-full table-fixed text-left text-sm">
                      <caption className="sr-only">Spelers, totaalscores, fases en schoppenpunten van deze hand</caption>
                      <thead className="text-xs text-muted"><tr><th scope="col" className="pb-3 pr-3 font-medium">Speler</th><th scope="col" className="w-20 pb-3 px-2 text-right font-medium">Totaal</th>{!winners.length && <th scope="col" className="w-24 pb-3 pl-3 text-right font-medium">Deze hand</th>}</tr></thead>
                      <tbody className="divide-y divide-line border-t border-line">
                        {standings.players.map((player, index) => (
                          <tr key={index}>
                            <th scope="row" className="break-words py-4 pr-3 font-medium">
                              {player.name}
                              <span className="mt-1 block text-xs font-normal text-muted">Fase {player.phase}{game.config.rules.double && player.phase === 1 && player.score >= doubleFrom ? ", punten dubbel" : ""}</span>
                            </th>
                            <td className="px-2 py-4 text-right text-lg font-semibold tabular-nums">{player.score}</td>
                            {!winners.length && <td className="py-4 pl-3"><input id={`hand-points-${index}`} aria-label={`Schoppenpunten van ${player.name}`} type="number" inputMode="numeric" min={0} max={(activeCount === 6 ? 9 : 8) + jackPoints - 1} step={1} required value={points[index] ?? ""} onChange={(event) => setPoints((current) => current.map((value, position) => position === index ? event.target.value : value))} className="form-field text-right tabular-nums" /></td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!winners.length && <>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        Vul de schoppenpunten van de hele hand in{game.config.rules.double ? ", vóór verdubbeling. Het scorebord verdubbelt automatisch." : "."}
                        {game.config.rules.ace && " Aas en boer in dezelfde slag? Tel de boer dan als 1 punt."}
                      </p>
                      {game.config.rules.sweep && <div className="mt-5 space-y-4">
                        <label className="block space-y-2 text-sm text-muted"><span>Alle slagen gewonnen door</span>
                          <select className="form-field" value={sweepPlayer} onChange={(event) => setSweepPlayer(event.target.value)}><option value="">Niemand</option>{game.names.map((name, index) => <option key={index} value={index}>{name}</option>)}</select>
                        </label>
                        {sweepPhase === 1 && <ChoiceGroup label="Keuze voor de 20 punten" name="sweep-choice" value={sweepChoice} onChange={setSweepChoice} options={[{ value: "others", label: "20 erbij bij de anderen" }, { value: "subtract", label: "20 van eigen score af" }]} />}
                        {sweepPhase === 2 && <p className="text-sm text-muted">De anderen krijgen 20 punten erbij.</p>}
                      </div>}
                      <button type="submit" className="button-primary mt-6">Hand opslaan</button>
                    </>}
                    {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
                  </form>
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-5">
                    <button type="button" className="button-secondary" disabled={game.hands.length === 0} onClick={undoHand}>Laatste hand terug</button>
                    <button type="button" className="button-secondary" onClick={() => setConfirmReset(true)}>Nieuw spel</button>
                  </div>
                  {confirmReset && <div className="mt-5 space-y-3 text-sm">
                    <p>Een nieuw spel starten? De huidige scores worden gewist.</p>
                    <div className="flex flex-wrap gap-3"><button type="button" className="button-primary" onClick={resetGame}>Ja, nieuw spel</button><button type="button" className="button-secondary" onClick={() => setConfirmReset(false)}>Annuleren</button></div>
                  </div>}
                  <p role="status" className="mt-4 text-sm text-muted">{status}</p>
                </section>

                {standings.history.length > 0 && <section aria-labelledby="history-heading">
                  <h2 id="history-heading" className="mb-4 text-xl font-semibold">Scoreverloop</h2>
                  <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Scoreverloop per hand">
                    <table className="w-full text-right text-sm tabular-nums">
                      <caption className="sr-only">Totaalscores na iedere uitgespeelde hand</caption>
                      <thead className="text-muted"><tr><th scope="col" className="py-3 pr-5 text-left font-medium">Hand</th>{game.names.map((name, index) => <th scope="col" key={index} className="min-w-24 px-3 py-3 font-medium">{name}</th>)}</tr></thead>
                      <tbody className="divide-y divide-line border-t border-line">{standings.history.map((hand, index) => <tr key={index}><th scope="row" className="py-3 pr-5 text-left font-medium">{index + 1}</th>{hand.players.map((player, playerIndex) => <td key={playerIndex} className="px-3 py-3">{player.score}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                </section>}
              </>
            )}
            {storageError && <p role="alert" className="text-sm text-red-300">{storageError}</p>}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
