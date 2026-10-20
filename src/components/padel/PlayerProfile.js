"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ChevronDown, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPadelStats, formatMatchDate, playerName } from "@/data/padel";
import { getMatchScore, getWinner } from "@/lib/padelStats.mjs";
import { usePadel } from "./PadelProvider";
import { PlayerAvatar, PlayerLink } from "./PlayerIdentity";
import AnimatedDetails from "./AnimatedDetails";
import { MatchDetails, RecentResults, TeamName } from "./PadelViews";
import styles from "./PadelDashboard.module.css";

export default function PlayerProfile({ id }) {
  const { matches } = usePadel();
  const stats = useMemo(() => getPadelStats(matches), [matches]);
  const [expanded, setExpanded] = useState(false);
  const player = stats.players.find((item) => item.id === id);
  const rank = stats.players.indexOf(player) + 1;
  const playerMatches = matches.filter((match) => [...match.teamA, ...match.teamB].includes(id));
  const partners = stats.duos.filter((duo) => duo.members.includes(id)).sort((a, b) => b.played - a.played || b.wins - a.wins);
  const firstMatch = playerMatches.at(-1);
  const visibleMatches = expanded ? playerMatches : playerMatches.slice(0, 6);

  return <main className={styles.page}>
    <Header />
    <div className={styles.shell}>
      <Link href="/padel#spelers" className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" />Alle spelers</Link>
      <div className={styles.profileHero}>
        <PlayerAvatar id={id} size="profile" />
        <div><span className={styles.eyebrow}>Spelersprofiel</span><h1>{player.name}</h1><p>{firstMatch ? `Op de baan sinds ${formatMatchDate(firstMatch.date, { month: "long", year: "numeric" })}` : "Nog geen potjes gespeeld"}</p></div>
        {player.played > 0 && <Link href="/padel#ranglijst" className={styles.profileRank}><strong><span>#</span>{rank}</strong><span>in de ranglijst <ChevronRight size={13} aria-hidden="true" /></span></Link>}
      </div>
      <dl className={styles.profileMetrics}>
        <div><dt>Potjes gespeeld</dt><dd>{player.played}</dd></div>
        <div><dt>Gewonnen</dt><dd>{player.wins}</dd></div>
        <div><dt>Verloren</dt><dd>{player.losses}</dd></div>
        <div><dt>Winstpercentage</dt><dd>{player.played ? `${player.percentage}%` : "–"}</dd></div>
      </dl>
      <div className={styles.profileLayout}>
        <section aria-labelledby="profile-matches-heading">
          <div className={styles.sectionHeader}><div><h2 id="profile-matches-heading">De potjes van {player.name}</h2><p>Alle wedstrijden, met de nieuwste bovenaan.</p></div></div>
          {visibleMatches.length ? visibleMatches.map((match) => {
            const ownSide = match.teamA.includes(id) ? "teamA" : "teamB";
            const sideIndex = ownSide === "teamA" ? 0 : 1;
            const partner = match[ownSide].find((member) => member !== id);
            const opponents = match[ownSide === "teamA" ? "teamB" : "teamA"];
            const won = getWinner(match) === ownSide;
            const score = getMatchScore(match);
            return <AnimatedDetails key={match.id} className={styles.profileMatchRow}>
              <summary>
                <span className={won ? styles.resultWin : styles.resultLoss}><span aria-hidden="true">{won ? "W" : "V"}</span><span className="sr-only">{won ? "Gewonnen" : "Verloren"}</span></span>
                <span className={styles.profileMatchTeams}><strong>Met {playerName(partner)}</strong><span>tegen <TeamName members={opponents} /></span></span>
                <span className={styles.profileMatchScore}>{score[sideIndex]}<span>–</span>{score[1 - sideIndex]}</span>
                <time dateTime={match.date}>{formatMatchDate(match.date, { year: "numeric" })}</time>
                <ChevronDown className={styles.matchChevron} size={16} aria-hidden="true" />
              </summary>
              <MatchDetails match={match} />
            </AnimatedDetails>;
          }) : <p className={styles.emptyState}>Hier verschijnen de eerste uitslagen.</p>}
          {playerMatches.length > 6 && <div className={styles.showMore}><button className="button-secondary" onClick={() => setExpanded(!expanded)}>{expanded ? "Minder potjes" : `Alle ${playerMatches.length} potjes bekijken`}<ArrowDown size={15} className={expanded ? styles.chevronUp : ""} aria-hidden="true" /></button></div>}
        </section>
        <aside className={styles.profileAside}>
          <section><div className={styles.sectionHeader}><h2>De vorm</h2></div><RecentResults results={player.form} /><p className={styles.formCaption}>Laatste vijf potjes · nieuwste rechts</p>
            <dl className={styles.formFacts}><div><dt>Gewonnen op rij</dt><dd>{player.streak}</dd></div><div><dt>Sets gewonnen / verloren</dt><dd>{player.setsWon} <span>/ {player.setsLost}</span></dd></div></dl>
          </section>
          <section><div className={styles.sectionHeader}><div><h2>Op de baan met</h2><p>Partners, op aantal potjes samen.</p></div></div>
            {partners.length ? partners.map((duo) => {
              const partnerId = duo.members.find((member) => member !== id);
              return <div className={styles.profilePartner} key={duo.id}><PlayerAvatar id={partnerId} /><div><PlayerLink id={partnerId} /><p>{duo.wins} van {duo.played} gewonnen</p></div><span>{duo.percentage}%</span></div>;
            }) : <p className={styles.formCaption}>Nog geen partners.</p>}
          </section>
        </aside>
      </div>
      <p className={styles.designNote}>Voorbeeldcompetitie · Statistieken over alle potjes.</p>
    </div>
    <Footer />
  </main>;
}
