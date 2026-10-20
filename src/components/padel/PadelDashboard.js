"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Plus, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarPicker from "./CalendarPicker";
import { DuoGrid, MatchList, PlayerGrid, Ranking, RecentActivity } from "./PadelViews";
import { PlayerAvatar } from "./PlayerIdentity";
import { usePadel } from "./PadelProvider";
import { todayValue } from "@/lib/padelCalendar.mjs";
import { demoPlayers, formatMatchDate, getPadelStats } from "@/data/padel";
import { sortPlayers } from "@/lib/padelStats.mjs";
import styles from "./PadelDashboard.module.css";

const views = [
  { id: "ranglijst", label: "Ranglijst" },
  { id: "wedstrijden", label: "Wedstrijden" },
  { id: "spelers", label: "Spelers" },
  { id: "duos", label: "Duo’s" },
];

function MatchDialog({ dialogRef, onAdd }) {
  const [error, setError] = useState("");
  const [thirdSet, setThirdSet] = useState(false);
  const [matchDate, setMatchDate] = useState(todayValue);
  const [teamPlayers, setTeamPlayers] = useState(demoPlayers.slice(0, 4).map((player) => player.id));

  function submitMatch(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const teamA = [form.get("player-0"), form.get("player-1")];
    const teamB = [form.get("player-2"), form.get("player-3")];
    if (new Set([...teamA, ...teamB]).size !== 4) {
      setError("Kies vier verschillende spelers.");
      return;
    }
    const sets = Array.from({ length: thirdSet ? 3 : 2 }, (_, index) => [Number(form.get(`set-${index}-a`)), Number(form.get(`set-${index}-b`))]);
    if (sets.some(([a, b]) => {
      const high = Math.max(a, b), low = Math.min(a, b);
      return !((high === 6 && low <= 4) || (high === 7 && (low === 5 || low === 6)));
    })) {
      setError("Vul volledige sets in, bijvoorbeeld 6–4, 7–5 of 7–6.");
      return;
    }
    const firstTwoWins = sets.slice(0, 2).filter(([a, b]) => a > b).length;
    if ((thirdSet && firstTwoWins !== 1) || (!thirdSet && firstTwoWins === 1)) {
      setError(thirdSet ? "Na twee gewonnen sets is het potje klaar. Verwijder de derde set." : "Het staat 1–1 in sets. Voeg een derde set toe.");
      return;
    }
    onAdd({ id: `preview-${Date.now()}`, date: form.get("date"), teamA, teamB, sets });
    dialogRef.current.close();
    event.currentTarget.reset();
    setMatchDate(todayValue());
    setTeamPlayers(demoPlayers.slice(0, 4).map((player) => player.id));
  }

  return <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="new-match-heading" aria-describedby="new-match-description" onClose={() => { setError(""); setThirdSet(false); }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
  }}>
    <div className={styles.dialogHeader}><h2 id="new-match-heading">Nieuw potje</h2><button className={styles.closeButton} aria-label="Sluiten" onClick={() => dialogRef.current.close()}><X size={20} /></button></div>
    <p id="new-match-description" className={styles.dialogDescription}>Probeer het invoeren. Dit voorbeeld blijft alleen bewaard tot je de pagina ververst.</p>
    <form onSubmit={submitMatch} className={styles.matchForm}>
      <div className={styles.fieldLabel}><span>Datum</span><CalendarPicker name="date" label="Datum" value={matchDate} onChange={setMatchDate} /></div>
      <div className={styles.teamFields}>{[0, 1].map((team) => <fieldset key={team}><legend>Team {team === 0 ? "A" : "B"}</legend>{[0, 1].map((position) => {
        const index = team * 2 + position;
        return <label key={index} className={styles.fieldLabel}><span className="sr-only">Team {team === 0 ? "A" : "B"}, speler {position + 1}</span><select name={`player-${index}`} value={teamPlayers[index]} onChange={(event) => { const id = event.target.value; setTeamPlayers((current) => current.map((player, playerIndex) => playerIndex === index ? id : player)); }} className="form-field" required>{demoPlayers.map((player) => <option key={player.id} value={player.id} disabled={teamPlayers.includes(player.id) && teamPlayers[index] !== player.id}>{player.name}</option>)}</select></label>;
      })}</fieldset>)}</div>
      <fieldset className={styles.setFields}><legend>Setstanden <span>Team A – Team B</span></legend><div className={styles.setInputs}>{Array.from({ length: thirdSet ? 3 : 2 }, (_, index) => <div key={index}><span>Set {index + 1}</span><div>{["a", "b"].map((side, sideIndex) => <label key={side}><span className="sr-only">Set {index + 1}, team {side.toUpperCase()}</span><input name={`set-${index}-${side}`} type="number" min="0" max="7" step="1" className="form-field" defaultValue={sideIndex === 0 ? 6 : index === 0 ? 4 : 3} required /></label>)}</div></div>)}</div><button type="button" className={styles.inlineButton} onClick={() => setThirdSet(!thirdSet)}>{thirdSet ? <X size={14} /> : <Plus size={14} />}{thirdSet ? "Derde set verwijderen" : "Derde set toevoegen"}</button></fieldset>
      {error && <p role="alert" className={styles.formError}>{error}</p>}
      <div className={styles.dialogActions}><button type="button" className="button-secondary" onClick={() => dialogRef.current.close()}>Annuleren</button><button type="submit" className="button-primary"><Check size={16} aria-hidden="true" />Voorbeeld toevoegen</button></div>
    </form>
  </dialog>;
}
export default function PadelDashboard() {
  const [view, setView] = useState("ranglijst");
  const [period, setPeriod] = useState("all");
  const { matches, addMatch } = usePadel();
  const [notice, setNotice] = useState("");
  const [matchQuery, setMatchQuery] = useState("");
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const tabRefs = useRef({});
  const filteredMatches = useMemo(() => matches.filter((match) => period === "all" || match.date.startsWith(period)), [matches, period]);
  const stats = useMemo(() => getPadelStats(filteredMatches), [filteredMatches]);
  const leader = filteredMatches.length ? sortPlayers(stats.players)[0] : null;
  const monthCounts = useMemo(() => matches.reduce((counts, match) => {
    const month = match.date.slice(0, 7);
    counts[month] = (counts[month] ?? 0) + 1;
    return counts;
  }, {}), [matches]);

  useEffect(() => {
    const syncView = () => {
      const id = window.location.hash.slice(1);
      if (views.some((item) => item.id === id)) setView(id);
    };
    syncView();
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);

  function chooseView(id, focusTab = false) {
    setView(id);
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${id}`);
    if (focusTab) tabRefs.current[id]?.focus();
  }

  function handleTabKey(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % views.length;
    if (event.key === "ArrowLeft") next = (index + views.length - 1) % views.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = views.length - 1;
    if (next !== undefined) { event.preventDefault(); chooseView(views[next].id, true); }
  }

  return <main className={styles.page}>
    <Header />
    <div className={styles.shell}>
      <div className={styles.pageHeader}>
        <div className={styles.heroCopy}>
          <span className={styles.heroEyebrow}>Op de baan / naast elkaar</span>
          <h1 className={styles.heroTitle}>PADEL<span className={styles.titleDot}>.</span></h1>
          <p>Vrienden op de baan.<br />Rivalen op de ranglijst.</p>
          <Link href="/padel#spelers" onClick={() => chooseView("spelers")} className={styles.groupLink}>
            <span className={styles.avatarStack}>{demoPlayers.slice(0, 4).map((player) => <PlayerAvatar key={player.id} id={player.id} size="small" />)}</span>
            <span>Onze spelers</span><ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.heroCourt} aria-hidden="true">
          <span className={styles.courtCaption}>DE BAAN IS VAN ONS.</span>
          <div className={styles.courtDrawing}><span className={styles.courtNet} /><span className={styles.courtService} /><span className={styles.courtBall} /></div>
          <span className={styles.courtFootnote}>Twee teams. Eén stand.</span>
        </div>
      </div>
      <div className={styles.competitionBar}>
        <dl className={styles.competitionFacts}>
          <div><dt>Spelers</dt><dd>{String(demoPlayers.length).padStart(2, "0")}</dd></div>
          <div><dt>Potjes gespeeld</dt><dd>{String(filteredMatches.length).padStart(2, "0")}</dd></div>
          <div><dt>Koploper</dt><dd>{leader ? <Link href={`/padel/spelers/${leader.id}`}>{leader.name}<ArrowUpRight size={15} aria-hidden="true" /></Link> : "—"}</dd></div>
        </dl>
        <button className={styles.addMatchButton} onClick={() => dialogRef.current.showModal()}><Plus size={18} aria-hidden="true" />Potje toevoegen</button>
      </div>
      <div className={styles.toolbar}>
        <div role="tablist" aria-label="Padeloverzichten" className={styles.tabs}>{views.map(({ id, label }, index) => <button key={id} ref={(element) => { tabRefs.current[id] = element; }} id={`tab-${id}`} type="button" role="tab" aria-selected={view === id} aria-controls={`panel-${id}`} tabIndex={view === id ? 0 : -1} onClick={() => chooseView(id)} onKeyDown={(event) => handleTabKey(event, index)}>{label}</button>)}</div>
        <CalendarPicker mode="month" label="Periode" value={period} onChange={setPeriod} monthCounts={monthCounts} />
      </div>
      {notice && <div role="status" className={styles.notice}><Check size={17} aria-hidden="true" /><span>{notice}</span><button aria-label="Melding sluiten" onClick={() => setNotice("")}><X size={17} /></button></div>}
      {views.map(({ id }) => <section key={id} ref={view === id ? panelRef : null} id={`panel-${id}`} role="tabpanel" aria-labelledby={`tab-${id}`} hidden={view !== id} tabIndex={0} className={styles.content}>
        {view === id && <>
        {view === "ranglijst" && (filteredMatches.length ? <div className={styles.overviewLayout}><Ranking players={stats.players} /><RecentActivity matches={filteredMatches} duos={stats.duos} onShowAll={() => chooseView("wedstrijden")} /></div> : <div className={styles.emptyState}><h2>Geen potjes in deze periode</h2><p>Kies een andere maand of bekijk alle uitslagen.</p><button className="button-secondary" onClick={() => setPeriod("all")}>Alle potjes bekijken</button></div>)}
        {view === "wedstrijden" && <MatchList matches={filteredMatches} query={matchQuery} onQueryChange={setMatchQuery} />}
        {view === "spelers" && <PlayerGrid players={stats.players} />}
        {view === "duos" && <DuoGrid duos={stats.duos} />}
        </>}
      </section>)}
      <div className={styles.designNote}><span>Voorbeeldcompetitie · Potjes worden tijdelijk bewaard.</span><span>{matches[0] && `Laatst gespeeld · ${formatMatchDate(matches[0].date)}`}</span></div>
    </div>
    <Footer />
    <MatchDialog dialogRef={dialogRef} onAdd={(match) => { addMatch(match); setPeriod("all"); chooseView("ranglijst"); setNotice("Potje toegevoegd. De ranglijst is bijgewerkt."); requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true })); }} />
  </main>;
}
