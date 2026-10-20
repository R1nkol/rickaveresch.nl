import DrinkGameRules from "@/components/DrinkGameRules";
import { drinkGameDescriptions } from "@/data/drinkGameDescriptions";
import { shitheadHandSizeNote } from "@/data/shithead";

export const metadata = {
  title: "Shithead drankspel | Rick Averesch",
  description: drinkGameDescriptions.shithead,
};

const SECTIONS = [
  {
    title: "Stapel pakken",
    rules: [
      { label: "Aflegstapel pakken", value: "2 slokken drinken" },
      { label: "Verkeerd gokken met de trekstapel", value: "1 extra slok drinken" },
      { label: "Verkeerde dichte kaart omdraaien en de stapel pakken", value: "2 slokken drinken" },
    ],
    notes: ["Bij verkeerd gokken drink je dus 3 slokken in totaal: 2 voor de stapel en 1 extra."],
  },
  {
    title: "Einde van de ronde",
    rules: [
      { label: "Winnaar: als eerste alle kaarten kwijt", value: "3 slokken uitdelen" },
      { label: "Shithead: als laatste nog kaarten over", value: "3 slokken drinken" },
    ],
    notes: ["De Shithead begint de volgende ronde."],
  },
];

const EXTENDED_SECTIONS = [
  {
    title: "Stapel verbranden",
    rules: [
      { label: "Een 10 spelen", value: "2 slokken uitdelen" },
      { label: "Vier dezelfde kaarten achter elkaar maken", value: "3 slokken uitdelen" },
    ],
  },
  {
    title: "Open en dichte kaarten",
    rules: [
      { label: "Als eerste je open kaarten bereiken", value: "2 slokken uitdelen" },
      { label: "Als eerste je dichte kaarten bereiken", value: "2 slokken uitdelen" },
    ],
  },
];

export default function ShitheadDrankspelPage() {
  return (
    <DrinkGameRules
      title="Shithead"
      intensity={3}
      description={drinkGameDescriptions.shithead}
      links={[{ label: "Shithead basisuitleg", href: "/drankspellen/shithead/uitleg" }]}
      sections={SECTIONS}
      extendedSections={EXTENDED_SECTIONS}
      notes={[
        shitheadHandSizeNote,
        "Houd het bij kleine slokken en spreek vooraf af wat voor jullie prettig is. Alcoholvrij werkt net zo goed.",
      ]}
    />
  );
}
