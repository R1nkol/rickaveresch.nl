import DrinkGameRules from "@/components/DrinkGameRules";

const SECTIONS = [
  {
    title: "Minigames",
    description: "Alleen de spelers die meedoen tellen mee.",
    rules: [
      { label: "1e plek", value: "1 slok uitdelen" },
      { label: "2e plek", value: "Niets" },
      { label: "3e plek", value: "2 slokken drinken" },
      { label: "4e plek", value: "3 slokken drinken" },
      { label: "2 keer of vaker op rij laatste", value: "1 slok minder bij deze minigame" },
    ],
    notes: [
      "De korting blijft 1 slok. Bij 4 spelers drink je dus 3, 2, 2, 2 slokken als je steeds laatste wordt.",
      "Eindig je een keer hoger, dan begint de telling opnieuw.",
    ],
  },
  {
    title: "Teamminigames",
    description: "Bij 2v2 en 3v1 gebruik je deze tabel in plaats van de losse plekken.",
    rules: [
      { label: "2v2: winnend team", value: "Per personage 1 slok uitdelen" },
      { label: "3v1: solo wint", value: "Solo deelt 3 slokken uit" },
      { label: "3v1: solo verliest", value: "Solo drinkt 2 slokken" },
    ],
  },
  {
    title: "Sterren",
    rules: [
      { label: "Ster kopen", value: "Iedereen 2 slokken" },
      { label: "Ster stelen", value: "De dief drinkt 3 slokken" },
      { label: "Ster cadeau krijgen", value: "3 slokken uitdelen" },
      { label: "Langs de ster lopen", value: "2 slokken drinken" },
    ],
  },
  {
    title: "Eindstand",
    description: "Deel uit van de laatste naar de eerste plek.",
    rules: [
      { label: "1e plek", value: "5 slokken uitdelen" },
      { label: "2e plek", value: "3 slokken uitdelen" },
      { label: "3e plek", value: "2 slokken uitdelen" },
      { label: "4e plek", value: "1 slok uitdelen" },
    ],
  },
];

const EXTENDED_SECTIONS = [
  {
    title: "Board events",
    description: "Alleen de speler die het overkomt drinkt.",
    rules: [
      { label: "Bowser event", value: "2 slokken" },
      { label: "Item tegen je gebruikt", value: "1 slok" },
      { label: "Duelminigame verliezen", value: "2 slokken" },
      { label: "Item kopen", value: "1 slok" },
    ],
  },
  {
    title: "Tussenstand",
    description: "Bekijk de stand na elke 5 minigames.",
    rules: [
      { label: "1e plek", value: "2 slokken drinken" },
      { label: "2e plek", value: "1 slok drinken" },
      { label: "3e plek", value: "1 slok uitdelen" },
      { label: "4e plek", value: "2 slokken uitdelen" },
    ],
  },
  {
    title: "Jamboree",
    rules: [
      { label: "Jamboree actief", value: "Drinken en uitdelen telt dubbel" },
    ],
    notes: ["Reken eerst de korting voor laatste worden, daarna verdubbel je de slokken."],
  },
];

export default function MarioPartyDrankspelPage() {
  return (
    <DrinkGameRules
      title="Mario Party"
      intensity={4}
      description="De drinkregels voor minigames, sterren en het bord."
      sections={SECTIONS}
      extendedSections={EXTENDED_SECTIONS}
      teamPlay
    />
  );
}
