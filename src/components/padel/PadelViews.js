"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, ArrowRight, Check, ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { formatMatchDate, playerName } from "@/data/padel";
import { getMatchScore, getWinner, sortPlayers } from "@/lib/padelStats.mjs";
import { monthLabel } from "@/lib/padelCalendar.mjs";
import styles from "./PadelDashboard.module.css";

export function TeamName({ members }) {
  return <>{members.map(playerName).join(" & ")}</>;
}

export function RecentResults({ results }) {
  return <span className={styles.results} aria-label={`Laatste ${results.length} potjes, oudste eerst: ${results.map((won) => won ? "gewonnen" : "verloren").join(", ") || "nog geen potjes"}`}>
    {Array.from({ length: 5 - results.length }, (_, index) => <span key={`empty-${index}`} className={styles.resultEmpty} aria-hidden="true">–</span>)}
    {results.map((won, index) => <span key={index} className={won ? styles.resultWin : styles.resultLoss} aria-hidden="true" title={won ? "Gewonnen" : "Verloren"}>{won ? "W" : "V"}</span>)}
  </span>;
}

function SearchField({ value, onChange, label }) {
  return <div className={styles.searchField}><Search size={17} aria-hidden="true" /><input type="search" aria-label={label} placeholder={label} value={value} onChange={(event) => onChange(event.target.value)} />{value && <button type="button" onClick={() => onChange("")} aria-label="Zoekopdracht wissen"><X size={15} /></button>}</div>;
}

const rankingColumns = [
  { key: "name", label: "Speler", description: "Op naam" },
  { key: "played", label: "Gespeeld", shortLabel: "G", description: "Op aantal gespeelde potjes" },
  { key: "wins", label: "Winst", shortLabel: "W", description: "Op aantal overwinningen" },
  { key: "losses", label: "Verlies", shortLabel: "V", description: "Op aantal nederlagen" },
  { key: "percentage", label: "Winst %", description: "Op winstpercentage" },
];

export function Ranking({ players, onSelectPlayer }) {
  const [sorting, setSorting] = useState({ key: "wins", direction: "descending" });
  const ranked = sortPlayers(players, sorting.key, sorting.direction);

  function selectSort(key) {
    setSorting((current) => ({
      key,
      direction: current.key === key
        ? current.direction === "descending" ? "ascending" : "descending"
        : key === "name" ? "ascending" : "descending",
    }));
  }

  return <section aria-labelledby="ranking-heading">
    <div className={styles.sectionHeader}><div><h2 id="ranking-heading" tabIndex={-1}>Ranglijst</h2><p>{rankingColumns.find(({ key }) => key === sorting.key).description}</p></div></div>
    <div className={styles.tableScroll}><table className={styles.rankingTable}>
      <caption className="sr-only">Ranglijst. De laatste vijf potjes staan van oud naar nieuw. W is gewonnen, V is verloren.</caption>
      <thead><tr><th scope="col"><span className="sr-only">Positie</span>#</th>{rankingColumns.map(({ key, label, shortLabel }) => {
        const active = sorting.key === key;
        const SortIcon = active ? sorting.direction === "descending" ? ArrowDown : ArrowUp : ArrowUpDown;
        return <th key={key} scope="col" aria-sort={active ? sorting.direction : undefined}>
          <button type="button" className={styles.columnSort} onClick={() => selectSort(key)} aria-label={`Sorteer op ${label.toLocaleLowerCase("nl")}`}>
            {shortLabel ? <><span className={styles.longLabel}>{label}</span><abbr className={styles.shortLabel} title={label}>{shortLabel}</abbr></> : label}
            <SortIcon size={12} aria-hidden="true" />
          </button>
        </th>;
      })}<th scope="col" className={styles.resultsColumn}>Laatste 5</th></tr></thead>
      <tbody>{ranked.map((player, index) => <tr key={player.id}>
        <td className={styles.position}>{index + 1}</td><th scope="row"><button className={styles.playerName} onClick={() => onSelectPlayer(player.id)}>{player.name}<ChevronRight size={13} aria-hidden="true" /></button><span className={styles.mobileResults}><RecentResults results={player.form} /></span></th>
        <td>{player.played}</td><td className={styles.winsValue}>{player.wins}</td><td>{player.losses}</td><td>{player.played ? `${player.percentage}%` : "–"}</td><td className={styles.resultsColumn}><RecentResults results={player.form} /></td>
      </tr>)}</tbody>
    </table></div>
    <p className={styles.tableLegend}><span><b className={styles.legendWin}>W</b> gewonnen</span><span><b>V</b> verloren</span><span>Oudste links, nieuwste rechts</span></p>
  </section>;
}

function MatchDetails({ match }) {
  const score = getMatchScore(match);
  return <div className={styles.matchDetail}><table><caption className="sr-only">Uitslag per set van {formatMatchDate(match.date, { year: "numeric" })}</caption><thead><tr><th scope="col">Team</th>{match.sets.map((_, index) => <th scope="col" key={index}>Set {index + 1}</th>)}<th scope="col">Totaal</th></tr></thead><tbody>{["teamA", "teamB"].map((side, sideIndex) => <tr key={side}><th scope="row"><TeamName members={match[side]} /></th>{match.sets.map((set, index) => <td key={index} data-winner={set[sideIndex] > set[1 - sideIndex]}>{set[sideIndex]}</td>)}<td>{score[sideIndex]}</td></tr>)}</tbody></table></div>;
}

export function MatchList({ matches, compact = false, onShowAll, query = "", onQueryChange }) {
  const [expanded, setExpanded] = useState(false);
  const matching = matches.filter((match) => `${[...match.teamA, ...match.teamB].map(playerName).join(" ")} ${match.date} ${formatMatchDate(match.date, { month: "long", year: "numeric" })}`.toLocaleLowerCase("nl").includes(query.trim().toLocaleLowerCase("nl")));
  const displayed = compact ? matching.slice(0, 3) : query.trim() || expanded ? matching : matching.slice(0, 4);
  const months = new Map();
  for (const match of displayed) {
    const month = match.date.slice(0, 7);
    months.set(month, [...(months.get(month) ?? []), match]);
  }
  return <section aria-labelledby="matches-heading"><div className={styles.sectionHeader}><div><h2 id="matches-heading" tabIndex={-1}>{compact ? "Recente potjes" : "Wedstrijden"}</h2><p>{compact ? "Klik op een potje voor de setstanden." : `${displayed.length} van ${matches.length} potjes · Klik op een uitslag voor de setstanden.`}</p></div>{compact && <button className={styles.inlineLink} onClick={onShowAll}>Alle wedstrijden <ArrowRight size={15} aria-hidden="true" /></button>}</div>
    {!compact && <div className={styles.listToolbar}><SearchField label="Zoek op speler of datum" value={query} onChange={onQueryChange} />{query && <span className={styles.searchCount} role="status">{matching.length} gevonden</span>}</div>}
    {!displayed.length && <div className={styles.emptyState}><h3>{query ? "Geen potjes gevonden" : "Nog geen potjes"}</h3><p>{query ? "Probeer een andere naam of datum." : "Kies een andere maand of voeg een potje toe."}</p>{query && <button className="button-secondary" onClick={() => onQueryChange("")}>Zoekopdracht wissen</button>}</div>}
    {[...months].map(([month, monthMatches]) => <div className={styles.matchMonth} key={month}>{!compact && <h3>{monthLabel(month)}</h3>}{monthMatches.map((match) => {
      const winner = getWinner(match);
      const [a, b] = getMatchScore(match);
      return <details className={styles.matchRow} key={match.id}><summary><time dateTime={match.date}><span>{formatMatchDate(match.date, { day: "2-digit" }).split(" ")[0]}</span><span>{formatMatchDate(match.date).split(" ").slice(1).join(" ")}</span></time><span className={styles.matchSide} data-winner={winner === "teamA"}><TeamName members={match.teamA} /></span><span className={styles.matchFinalScore}><span data-winner={a > b}>{a}</span><span>–</span><span data-winner={b > a}>{b}</span></span><span className={styles.matchSide} data-winner={winner === "teamB"}><TeamName members={match.teamB} /></span><ChevronDown className={styles.matchChevron} size={16} aria-hidden="true" /><span className="sr-only">Gewonnen door <TeamName members={match[winner]} />. Toon setstanden.</span></summary><MatchDetails match={match} /></details>;
    })}</div>)}
    {!compact && !query.trim() && matching.length > 4 && <div className={styles.showMore}><button className="button-secondary" onClick={() => setExpanded(!expanded)}>{expanded ? "Minder potjes tonen" : `Alle ${matching.length} potjes bekijken`}<ArrowDown size={15} aria-hidden="true" className={expanded ? styles.chevronUp : ""} /></button></div>}
  </section>;
}

export function PlayerGrid({ players, onSelectPlayer }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const matching = sortPlayers(players, "name").filter((player) => player.name.toLocaleLowerCase("nl").includes(query.trim().toLocaleLowerCase("nl")));
  const visible = query.trim() || expanded ? matching : matching.slice(0, 4);
  return <section aria-labelledby="players-heading"><div className={styles.sectionHeader}><div><h2 id="players-heading">Spelers</h2><p>Kies een speler voor resultaten en partners.</p></div><SearchField label="Zoek een speler" value={query} onChange={setQuery} /></div>
    {!visible.length && <div className={styles.emptyState}><h3>Geen spelers gevonden</h3><button className="button-secondary" onClick={() => setQuery("")}>Alle spelers</button></div>}
    <div className={styles.playerGrid}>{visible.map((player) => <article key={player.id} className={styles.playerCard}><h3><button className={styles.playerCardLink} onClick={() => onSelectPlayer(player.id)}><span>{player.name}</span><ChevronRight size={18} aria-hidden="true" /></button></h3><p>{player.played} potjes gespeeld</p><dl className={styles.playerMetrics}><div><dt>Winst</dt><dd>{player.wins}</dd></div><div><dt>Verlies</dt><dd>{player.losses}</dd></div><div><dt>Winst %</dt><dd>{player.played ? `${player.percentage}%` : "–"}</dd></div></dl><div className={styles.playerRecent}><span>Laatste 5 potjes</span><RecentResults results={player.form} /></div></article>)}</div>
    {!query.trim() && matching.length > 4 && <div className={styles.showMore}><button className="button-secondary" onClick={() => setExpanded(!expanded)}>{expanded ? "Minder spelers tonen" : `Alle ${matching.length} spelers bekijken`}<ArrowDown size={15} aria-hidden="true" className={expanded ? styles.chevronUp : ""} /></button></div>}
  </section>;
}

export function DuoGrid({ duos, onSelectPlayer }) {
  const ranked = [...duos].sort((a, b) => b.wins - a.wins || b.percentage - a.percentage || b.played - a.played || a.id.localeCompare(b.id));
  return <section aria-labelledby="duos-heading">
    <div className={styles.sectionHeader}><div><h2 id="duos-heading">Duo’s</h2><p>Alle combinaties, op aantal overwinningen.</p></div></div>
    {ranked.length ? <div className={styles.tableScroll}><table className={`${styles.rankingTable} ${styles.duoTable}`}><thead><tr><th scope="col">#</th><th scope="col">Duo</th><th scope="col">Gespeeld</th><th scope="col" aria-sort="descending">Winst <ArrowDown size={12} aria-hidden="true" /></th><th scope="col">Verlies</th><th scope="col">Winst %</th></tr></thead><tbody>{ranked.map((duo, index) => <tr key={duo.id}><td className={styles.position}>{index + 1}</td><th scope="row"><span className={styles.duoNames}>{duo.members.map((id, memberIndex) => <span key={id}>{memberIndex > 0 && <span className={styles.ampersand}> & </span>}<button onClick={() => onSelectPlayer(id)}>{playerName(id)}</button></span>)}</span></th><td>{duo.played}</td><td className={styles.winsValue}>{duo.wins}</td><td>{duo.losses}</td><td>{duo.percentage}%</td></tr>)}</tbody></table></div> : <div className={styles.emptyState}><h3>Nog geen duo’s</h3><p>In deze periode zijn nog geen potjes gespeeld.</p></div>}
  </section>;
}
export function PlayerDialog({ player, matches, duos, periodLabel, onClose, onShowMatches }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (player && !dialogRef.current.open) dialogRef.current.showModal();
  }, [player]);
  if (!player) return null;
  const recent = matches.filter((match) => [...match.teamA, ...match.teamB].includes(player.id)).slice(0, 5);
  const partners = [...duos].filter((duo) => duo.members.includes(player.id)).sort((a, b) => b.played - a.played || b.wins - a.wins);
  return <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId} onClose={onClose} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
  }}><div className={styles.dialogHeader}><div><h2 id={titleId}>{player.name}</h2><p className={styles.dialogDescription}>{periodLabel} · {player.played} potjes</p></div><button className={styles.closeButton} aria-label="Spelersdetails sluiten" onClick={() => dialogRef.current.close()}><X size={20} /></button></div>
    <dl className={styles.profileStats}><div><dt>Gewonnen</dt><dd>{player.wins}</dd></div><div><dt>Verloren</dt><dd>{player.losses}</dd></div><div><dt>Winstpercentage</dt><dd>{player.played ? `${player.percentage}%` : "–"}</dd></div></dl>
    <div className={styles.profileSets}><span>Sets gewonnen / verloren</span><strong>{player.setsWon} / {player.setsLost}</strong></div>
    <div className={styles.profileStreak}><span>Gewonnen op rij</span><strong>{player.streak}</strong></div>
    <section className={styles.profileSection}><h3>Laatste potjes</h3>{recent.length ? <div>{recent.map((match) => {
      const won = match[getWinner(match)].includes(player.id);
      const ownSide = match.teamA.includes(player.id) ? "teamA" : "teamB";
      const opponents = match[ownSide === "teamA" ? "teamB" : "teamA"];
      return <div className={styles.profileMatch} key={match.id}><span className={won ? styles.resultWin : styles.resultLoss}>{won ? <Check size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />}<span className="sr-only">{won ? "Gewonnen" : "Verloren"}</span></span><span>Tegen <TeamName members={opponents} /></span><time dateTime={match.date}>{formatMatchDate(match.date)}</time></div>;
    })}</div> : <p>Nog geen potjes in deze periode.</p>}</section>
    {partners.length > 0 && <section className={styles.profileSection}><h3>Partners</h3>{partners.map((duo) => <div className={styles.partnerRow} key={duo.id}><span>{playerName(duo.members.find((id) => id !== player.id))}</span><span>{duo.wins} van {duo.played} gewonnen</span><strong>{duo.percentage}%</strong></div>)}</section>}
    <div className={styles.dialogActions}><button className="button-secondary" onClick={() => dialogRef.current.close()}>Sluiten</button><button className="button-primary" onClick={() => { dialogRef.current.close(); onShowMatches(player.id); }}>Alle potjes van {player.name}<ArrowRight size={15} aria-hidden="true" /></button></div>
  </dialog>;
}
