import DrinkGameRules from "@/components/DrinkGameRules";
import { drinkGameDescriptions } from "@/data/drinkGameDescriptions";

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

function getTeamSections(isHeavy = false) {
  return [
    {
      title: "Tijdens de race",
      rules: [
        { label: "Voor de start", value: isHeavy ? "Iedereen een eigen biertje: twee per duo" : "Eén gezamenlijk biertje per duo" },
        { label: "Tijdens het racen", value: "Eén rijdt, de ander drinkt" },
        { label: "Wisselen tijdens de race", value: "Sta helemaal stil voordat je de controller doorgeeft" },
      ],
    },
    {
      title: "Bij de finish",
      description: isHeavy
        ? "Beide biertjes moeten op zijn voordat jullie over de finish gaan."
        : "Jullie gezamenlijke biertje moet op zijn voordat jullie over de finish gaan.",
      rules: [
        { label: isHeavy ? "Beide biertjes op" : "Biertje op", value: "Geen straf" },
        { label: "Nog bier over", value: "2 strafslokken per overgebleven slok, samen verdelen" },
      ],
      notes: [isHeavy
        ? "Tel de overgebleven slokken in beide biertjes bij elkaar op. Nog 2 slokken over? Dan verdelen jullie na de race 4 strafslokken."
        : "Nog 2 slokken over in jullie biertje? Dan verdelen jullie na de race 4 strafslokken."],
    },
  ];
}

function getExtendedSections(isTeamPlay = false) {
  const participants = isTeamPlay ? "duo’s" : "spelers";

  return [
    {
      title: "Finishpositie",
      description: isTeamPlay
        ? "Na elke race drinken jullie of delen jullie uit op basis van jullie plek in de race."
        : "Na elke race drink je of deel je uit op basis van je plek in de race.",
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
      description: isTeamPlay
        ? "Kijk na 4 races welk duo bovenaan staat. Computers tellen niet mee."
        : "Kijk na 4 races wie er van jullie bovenaan staat. Computers tellen niet mee.",
      rules: [
        { label: "1e plek", value: `Alle andere ${participants} drinken 2 slokken` },
        { label: "2e plek", value: `Alle andere ${participants} drinken 1 slok` },
        { label: "3e plek", value: "2 slokken uitdelen" },
        { label: "Laatste plek", value: "5 slokken drinken" },
      ],
      notes: [isTeamPlay
        ? "Staan jullie derde én laatste? Dan drinken jullie 5 slokken en delen jullie niets uit."
        : "Sta je derde én laatste? Dan drink je 5 slokken en deel je niets uit."],
    },
  ];
}

export default function MarioKartDrankspelPage() {
  return (
    <DrinkGameRules
      title="Mario Kart"
      intensity={5}
      description={drinkGameDescriptions["mario-kart"]}
      sections={SECTIONS}
      extendedSections={getExtendedSections()}
      teamPlay={{
        extendedSections: getExtendedSections(true),
        variantLabel: "Biertjes per duo",
        variants: [
          { value: "shared", label: "Samen één", sections: getTeamSections() },
          { value: "heavy", label: "Ieder één (heavy)", sections: getTeamSections(true) },
        ],
      }}
    />
  );
}
