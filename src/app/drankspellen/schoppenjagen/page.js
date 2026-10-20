import DrinkGameRules from "@/components/DrinkGameRules";
import { drinkGameDescriptions } from "@/data/drinkGameDescriptions";

export const metadata = {
  title: "Schoppenjagen drankspel | Rick Averesch",
  description: drinkGameDescriptions.schoppenjagen,
};

const SECTIONS = [
  {
    title: "Na een hand",
    description: "Speel eerst alle slagen uit. Daarna kijk je wie de meeste schoppenpunten van die hand heeft gekregen.",
    rules: [
      { label: "Meeste schoppenpunten van de hand", value: "1 kleine slok drinken" },
      { label: "Gedeeld de meeste schoppenpunten", value: "Die spelers nemen ieder 1 kleine slok" },
    ],
    notes: [
      "Dit geldt in beide fases. Kijk naar de schoppenpunten van deze hand, niet naar de totaalscore.",
      "De bonus of straf uit de 20-puntenregel telt hiervoor niet mee.",
    ],
  },
  {
    title: "Na het spel",
    description: "De eerste speler die in fase 2 op 0 of lager eindigt, wint.",
    rules: [
      { label: "Winnaar", value: "1 kleine slok uitdelen" },
    ],
  },
];

export default function SchoppenjagenDrankspelPage() {
  return (
    <DrinkGameRules
      title="Schoppenjagen"
      intensity={1}
      description={drinkGameDescriptions.schoppenjagen}
      links={[
        { label: "Score bijhouden", href: "/drankspellen/schoppenjagen/scorebord" },
        { label: "Schoppenjagen basisuitleg", href: "/drankspellen/schoppenjagen/uitleg" },
      ]}
      sections={SECTIONS}
      notes={[
        "Maximaal één kleine slok per persoon per hand, ook in de laatste hand. Heeft iemand al gedronken, dan komt daar geen extra slok bij.",
        "Extra spelregels veranderen de punten, niet het aantal slokken. Alcoholvrij kan ook.",
      ]}
    />
  );
}
