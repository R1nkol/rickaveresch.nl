import SchoppenjagenExplanation from "./SchoppenjagenExplanation";

export const metadata = {
  title: "Schoppenjagen huisregels | Rick Averesch",
  description: "Onze eigen Schoppenjagen-variant: 4 tot 6 spelers, slagen, schoppenpunten en twee fases.",
};

export default async function SchoppenjagenBasicsPage({ searchParams }) {
  const settings = await searchParams;
  return <SchoppenjagenExplanation initialTarget={settings?.doel} initialPlayerCount={settings?.spelers} />;
}
