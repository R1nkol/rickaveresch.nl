import { notFound } from "next/navigation";
import { demoPlayers } from "@/data/padel";
import PlayerProfile from "@/components/padel/PlayerProfile";

export function generateStaticParams() {
  return demoPlayers.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const player = demoPlayers.find((item) => item.id === id);
  return {
    title: `${player?.name ?? "Speler"} · Padel | Rick Averesch`,
    description: `Bekijk de padelresultaten, wedstrijden en partners van ${player?.name ?? "deze speler"}.`,
  };
}

export default async function PlayerPage({ params }) {
  const { id } = await params;
  if (!demoPlayers.some((player) => player.id === id)) notFound();
  return <PlayerProfile key={id} id={id} />;
}
