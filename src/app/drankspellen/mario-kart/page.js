import DrinkGameRules from "@/components/DrinkGameRules";

const SECTIONS = [
  {
    title: "Tijdens de race",
    rules: [
      { label: "Voor de start", value: "Iedereen begint met een biertje" },
      { label: "Tijdens het racen", value: "Drink je biertje voor je finisht" },
    ],
  },
  {
    title: "Bij de finish",
    description: "Check je biertje zodra je zelf over de finish rijdt.",
    rules: [
      { label: "Biertje op", value: "Geen straf" },
      { label: "Biertje nog niet op", value: "2 strafslokken per overgebleven slok" },
    ],
    notes: ["Nog 2 slokken over? Dan zijn dat 4 strafslokken na de race."],
  },
];

const TEAM_SECTIONS = [
  {
    title: "Tijdens de race",
    rules: [
      { label: "Voor de start", value: "Allebei een eigen biertje" },
      { label: "Tijdens het racen", value: "Eén rijdt, de ander drinkt" },
      { label: "Wisselen tijdens de race", value: "Sta helemaal stil voordat je de controller doorgeeft" },
    ],
  },
  {
    title: "Bij de finish",
    description: "Beide biertjes moeten op zijn voordat jullie over de finish gaan.",
    rules: [
      { label: "Beide biertjes op", value: "Geen straf" },
      { label: "Nog bier over", value: "2 strafslokken per overgebleven slok, samen verdelen" },
    ],
    notes: ["Tel wat er in beide biertjes over is bij elkaar op. Samen nog 2 slokken over is 4 strafslokken na de race."],
  },
];

const EXTENDED_SECTIONS = [
  {
    title: "Finishpositie",
    description: "Na elke race drink je of deel je uit op basis van je plek in de race.",
    rules: [
      { label: "1e plek", value: "3 slokken uitdelen" },
      { label: "2e plek", value: "1 slok uitdelen" },
      { label: "3e plek", value: "1 slok drinken" },
      { label: "4e en 5e plek", value: "3 slokken drinken" },
      { label: "6e plek en lager", value: "5 slokken drinken" },
    ],
  },
  {
    title: "Grand Prix-eindstand",
    description: "Kijk na 4 races wie er van jullie bovenaan staat. Computers tellen niet mee.",
    rules: [
      { label: "1e plek", value: "Alle andere spelers of duo’s drinken 2 slokken" },
      { label: "2e plek", value: "Alle andere spelers of duo’s drinken 1 slok" },
      { label: "3e plek", value: "2 slokken uitdelen" },
      { label: "Laatste plek", value: "5 slokken drinken" },
    ],
    notes: ["Sta je derde én laatste? Dan drink je 5 slokken en deel je niets uit."],
  },
];

export default function MarioKartDrankspelPage() {
  return (
    <DrinkGameRules
      title="Mario Kart"
      intensity={5}
      description="Zorg dat je biertje op is voor je over de finish gaat."
      sections={SECTIONS}
      extendedSections={EXTENDED_SECTIONS}
      teamPlay={{
        sections: TEAM_SECTIONS,
      }}
    />
  );
}
