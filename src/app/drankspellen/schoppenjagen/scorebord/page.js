import SchoppenjagenScoreboard from "@/components/SchoppenjagenScoreboard";

export const metadata = {
  title: "Schoppenjagen scorebord | Rick Averesch",
  description: "Houd de scores bij van Schoppenjagen. Kies je spelers en doelscore en noteer de punten per hand.",
};

export default async function SchoppenjagenScoreboardPage({ searchParams }) {
  const settings = await searchParams;
  return <SchoppenjagenScoreboard initialTarget={settings?.doel} initialPlayerCount={settings?.spelers} />;
}
