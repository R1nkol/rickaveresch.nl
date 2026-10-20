import Link from "next/link";
import { demoPlayers } from "@/data/padel";
import styles from "./PadelDashboard.module.css";

export function PlayerAvatar({ id, size = "normal" }) {
  const player = demoPlayers.find((item) => item.id === id);
  return <span className={styles.avatar} data-size={size} data-tone={demoPlayers.indexOf(player) % 4} aria-hidden="true">{player?.initials ?? "?"}</span>;
}

export function PlayerLink({ id, avatar = false, className = "" }) {
  const player = demoPlayers.find((item) => item.id === id);
  return <Link href={`/padel/spelers/${id}`} className={`${styles.identityLink} ${className}`}>
    {avatar && <PlayerAvatar id={id} />}
    <span>{player?.name ?? id}</span>
  </Link>;
}
