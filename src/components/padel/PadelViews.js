"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown, ArrowRight, ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { formatMatchDate, playerName } from "@/data/padel";
import { getMatchScore, getWinner, sortPlayers } from "@/lib/padelStats.mjs";
import { monthLabel } from "@/lib/padelCalendar.mjs";
import { PlayerAvatar, PlayerLink } from "./PlayerIdentity";
import AnimatedDetails from "./AnimatedDetails";
import styles from "./PadelDashboard.module.css";

export function TeamName({ members, linked = false }) {
  return <>{members.map((id, index) => <span key={id}>{index > 0 && <span className={styles.ampersand}> & </span>}{linked ? <PlayerLink id={id} /> : playerName(id)}</span>)}</>;
}

export function RecentResults({ results }) {
  return <span className={styles.results} role="img" aria-label={`Laatste ${results.length} potjes, oudste eerst: ${results.map((won) => won ? "gewonnen" : "verloren").join(", ") || "nog geen potjes"}`}>
    {!results.length && <span className={styles.noResults} aria-hidden="true">–</span>}
    {results.map((won, index) => <span key={index} className={styles.resultDot} data-won={won} aria-hidden="true" title={`${won ? "Gewonnen" : "Verloren"}${index === results.length - 1 ? " · laatste potje" : ""}`} />)}
  </span>;
}

function SearchField({ value, onChange, label }) {
  return <div className={styles.searchField}><Search size={17} aria-hidden="true" /><input type="search" aria-label={label} placeholder={label} value={value} onChange={(event) => onChange(event.target.value)} />{value && <button type="button" onClick={() => onChange("")} aria-label="Zoekopdracht wissen"><X size={15} /></button>}</div>;
}

const rankingColumns = [
  { key: "name", label: "Speler" },
  { key: "played", label: "Gespeeld", shortLabel: "G" },
  { key: "wins", label: "Winst", shortLabel: "W" },
  { key: "losses", label: "Verlies", shortLabel: "V" },
  { key: "percentage", label: "Winst %" },
];

export function Ranking({ players }) {
  const [sorting, setSorting] = useState({ key: "wins", direction: "descending" });
  const ranked = sortPlayers(players, sorting.key, sorting.direction);
  const positions = new Map(sortPlayers(players).map((player, index) => [player.id, index + 1]));

  function selectSort(key) {
    setSorting((current) => ({ key, direction: current.key === key ? current.direction === "descending" ? "ascending" : "descending" : key === "name" ? "ascending" : "descending" }));
  }

  return <section aria-labelledby="ranking-heading">
    <div className={styles.sectionHeader}><h2 id="ranking-heading">De stand</h2><span className={styles.sectionMeta}>{players.length} spelers</span></div>
    <div className={styles.tableScroll}><table className={styles.rankingTable}>
      <caption className="sr-only">Ranglijst op overwinningen, bij gelijkspel op winstpercentage. Gevulde stippen zijn gewonnen potjes, open stippen verloren potjes. Klik op een speler voor het profiel.</caption>
      <thead><tr><th scope="col"><span className="sr-only">Positie</span>#</th>{rankingColumns.map(({ key, label, shortLabel }) => {
        const active = sorting.key === key;
        const SortIcon = active ? sorting.direction === "descending" ? ArrowDown : ArrowUp : ArrowUpDown;
        return <th key={key} scope="col" aria-sort={active ? sorting.direction : undefined}><button type="button" className={styles.columnSort} onClick={() => selectSort(key)} aria-label={`Sorteer op ${label.toLocaleLowerCase("nl")}`}>
          {shortLabel ? <><span className={styles.longLabel}>{label}</span><abbr className={styles.shortLabel} title={label}>{shortLabel}</abbr></> : label}<SortIcon size={12} aria-hidden="true" />
        </button></th>;
      })}<th scope="col" className={styles.resultsColumn}>Vorm</th></tr></thead>
      <tbody>{ranked.map((player) => <tr key={player.id} data-leader={positions.get(player.id) === 1}>
        <td className={styles.position}>{String(positions.get(player.id)).padStart(2, "0")}</td>
        <th scope="row"><Link href={`/padel/spelers/${player.id}`} className={styles.playerName}><PlayerAvatar id={player.id} /><span>{player.name}<span className={styles.mobileResults}><RecentResults results={player.form} /></span></span><ChevronRight size={14} aria-hidden="true" /></Link></th>
        <td>{player.played}</td><td className={styles.winsValue}>{player.wins}</td><td>{player.losses}</td><td>{player.played ? `${player.percentage}%` : "–"}</td><td className={styles.resultsColumn}><RecentResults results={player.form} /></td>
      </tr>)}</tbody>
    </table></div>
    <p className={styles.tableLegend}><span><i className={styles.resultDot} data-won="true" aria-hidden="true" /> gewonnen</span><span><i className={styles.resultDot} data-won="false" aria-hidden="true" /> verloren</span><span>Laatste 5 · nieuwste rechts</span></p>
  </section>;
}

export function MatchDetails({ match }) {
  const score = getMatchScore(match);
  return <div className={styles.matchDetail}><table><caption className="sr-only">Uitslag per set van {formatMatchDate(match.date, { year: "numeric" })}</caption><thead><tr><th scope="col">Team</th>{match.sets.map((_, index) => <th scope="col" key={index}>Set {index + 1}</th>)}<th scope="col">Totaal</th></tr></thead><tbody>{["teamA", "teamB"].map((side, sideIndex) => <tr key={side}><th scope="row"><TeamName members={match[side]} linked /></th>{match.sets.map((set, index) => <td key={index} data-winner={set[sideIndex] > set[1 - sideIndex]}>{set[sideIndex]}</td>)}<td>{score[sideIndex]}</td></tr>)}</tbody></table></div>;
}

export function MatchList({ matches, query = "", onQueryChange }) {
  const [expanded, setExpanded] = useState(false);
  const headingId = useId();
  const matching = matches.filter((match) => `${[...match.teamA, ...match.teamB].map(playerName).join(" ")} ${match.date} ${formatMatchDate(match.date, { month: "long", year: "numeric" })}`.toLocaleLowerCase("nl").includes(query.trim().toLocaleLowerCase("nl")));
  const displayed = query.trim() || expanded ? matching : matching.slice(0, 8);
  const months = new Map();
  for (const match of displayed) {
    const month = match.date.slice(0, 7);
    months.set(month, [...(months.get(month) ?? []), match]);
  }
  return <section aria-labelledby={headingId}>
    <div className={styles.sectionHeader}><div><h2 id={headingId}>Wedstrijden</h2><p>{matches.length} potjes · Open een uitslag voor de setstanden.</p></div><SearchField label="Zoek op speler of datum" value={query} onChange={onQueryChange} /></div>
    {query && <p className={styles.searchCount} role="status">{matching.length} gevonden</p>}
    {!displayed.length && <div className={styles.emptyState}><h3>{query ? "Geen potjes gevonden" : "Nog geen potjes"}</h3><p>{query ? "Probeer een andere naam of datum." : "Kies een andere maand of voeg een potje toe."}</p>{query && <button className="button-secondary" onClick={() => onQueryChange("")}>Zoekopdracht wissen</button>}</div>}
    {[...months].map(([month, monthMatches]) => <div className={styles.matchMonth} key={month}><h3>{monthLabel(month)}</h3>{monthMatches.map((match) => {
      const winner = getWinner(match);
      const [a, b] = getMatchScore(match);
      return <AnimatedDetails className={styles.matchRow} key={match.id}><summary><time dateTime={match.date}><span>{formatMatchDate(match.date, { day: "2-digit" }).split(" ")[0]}</span><span>{formatMatchDate(match.date).split(" ").slice(1).join(" ")}</span></time><span className={styles.matchSide} data-winner={winner === "teamA"}><TeamName members={match.teamA} /></span><span className={styles.matchFinalScore}><span data-winner={a > b}>{a}</span><span>–</span><span data-winner={b > a}>{b}</span></span><span className={styles.matchSide} data-winner={winner === "teamB"}><TeamName members={match.teamB} /></span><ChevronDown className={styles.matchChevron} size={16} aria-hidden="true" /><span className="sr-only">Toon setstanden</span></summary><MatchDetails match={match} /></AnimatedDetails>;
    })}</div>)}
    {!query.trim() && matching.length > 8 && <div className={styles.showMore}><button className="button-secondary" onClick={() => setExpanded(!expanded)}>{expanded ? "Minder potjes tonen" : `Alle ${matching.length} potjes bekijken`}<ArrowDown size={15} aria-hidden="true" className={expanded ? styles.chevronUp : ""} /></button></div>}
  </section>;
}

export function RecentActivity({ matches, duos, onShowAll }) {
  const regularDuo = [...duos].sort((a, b) => b.played - a.played || b.wins - a.wins)[0];
  return <aside className={styles.activity} aria-label="Rond de baan">
    <section><div className={styles.sectionHeader}><h2>Laatst gespeeld</h2></div>
      {matches.slice(0, 3).map((match) => <div className={styles.activityMatch} key={match.id}>
        <time dateTime={match.date}>{formatMatchDate(match.date, { weekday: "short" })}</time>
        {["teamA", "teamB"].map((side, sideIndex) => <div key={side} className={styles.activityTeam} data-winner={getWinner(match) === side}><span><TeamName members={match[side]} linked /></span><span className={styles.activityScores}>{match.sets.map((set, index) => <span key={index} data-winner={set[sideIndex] > set[1 - sideIndex]}>{set[sideIndex]}</span>)}</span></div>)}
      </div>)}
      <button className={styles.inlineLink} onClick={onShowAll}>Alle wedstrijden <ArrowRight size={15} aria-hidden="true" /></button>
    </section>
    {regularDuo && <section className={styles.regularDuo}><div className={styles.sectionHeader}><h2>Vaak samen op de baan</h2></div><div className={styles.avatarStack}>{regularDuo.members.map((id) => <Link key={id} href={`/padel/spelers/${id}`} aria-label={`Profiel van ${playerName(id)}`}><PlayerAvatar id={id} /></Link>)}</div><h3><TeamName members={regularDuo.members} linked /></h3><p>{regularDuo.played} potjes samen · {regularDuo.wins} gewonnen</p></section>}
  </aside>;
}

export function PlayerGrid({ players }) {
  const [query, setQuery] = useState("");
  const matching = sortPlayers(players, "name").filter((player) => player.name.toLocaleLowerCase("nl").includes(query.trim().toLocaleLowerCase("nl")));
  return <section aria-labelledby="players-heading"><div className={styles.sectionHeader}><div><h2 id="players-heading">Spelers</h2><p>Bekijk de resultaten, vorm en partners per speler.</p></div><SearchField label="Zoek een speler" value={query} onChange={setQuery} /></div>
    {!matching.length && <div className={styles.emptyState}><h3>Geen spelers gevonden</h3><button className="button-secondary" onClick={() => setQuery("")}>Alle spelers</button></div>}
    <div className={styles.playerGrid}>{matching.map((player) => <Link key={player.id} href={`/padel/spelers/${player.id}`} className={styles.playerCard} aria-label={`Bekijk het profiel van ${player.name}`}>
      <div className={styles.playerCardTop}><PlayerAvatar id={player.id} size="large" /><ChevronRight size={19} aria-hidden="true" /></div>
      <h3>{player.name}</h3><p>{player.played} potjes gespeeld</p>
      <dl className={styles.playerMetrics}><div><dt>Gewonnen</dt><dd>{player.wins}</dd></div><div><dt>Winstpercentage</dt><dd>{player.played ? `${player.percentage}%` : "–"}</dd></div></dl>
      <div className={styles.playerRecent}><span>Laatste 5</span><RecentResults results={player.form} /></div>
    </Link>)}</div>
  </section>;
}

export function DuoGrid({ duos }) {
  const ranked = [...duos].sort((a, b) => b.wins - a.wins || b.percentage - a.percentage || b.played - a.played || a.id.localeCompare(b.id));
  return <section aria-labelledby="duos-heading"><div className={styles.sectionHeader}><div><h2 id="duos-heading">Duo’s</h2><p>Alle combinaties, gerangschikt op gewonnen potjes.</p></div></div>
    {ranked.length ? <div className={styles.tableScroll}><table className={`${styles.rankingTable} ${styles.duoTable}`}><thead><tr><th scope="col">#</th><th scope="col">Duo</th><th scope="col">Gespeeld</th><th scope="col" aria-sort="descending">Winst <ArrowDown size={12} aria-hidden="true" /></th><th scope="col">Verlies</th><th scope="col">Winst %</th></tr></thead><tbody>{ranked.map((duo, index) => <tr key={duo.id}><td className={styles.position}>{String(index + 1).padStart(2, "0")}</td><th scope="row"><div className={styles.duoIdentity}><span className={styles.avatarStack}>{duo.members.map((id) => <PlayerAvatar key={id} id={id} size="small" />)}</span><span><TeamName members={duo.members} linked /></span></div></th><td>{duo.played}</td><td className={styles.winsValue}>{duo.wins}</td><td>{duo.losses}</td><td>{duo.percentage}%</td></tr>)}</tbody></table></div> : <div className={styles.emptyState}><h3>Nog geen duo’s</h3><p>In deze periode zijn nog geen potjes gespeeld.</p></div>}
  </section>;
}
