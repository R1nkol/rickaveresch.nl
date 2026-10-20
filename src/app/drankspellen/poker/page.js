import DrinkGameRules from "@/components/DrinkGameRules";
import { drinkGameDescriptions } from "@/data/drinkGameDescriptions";

const SECTIONS = [
  {
    title: "Fiches kopen",
    description: "Alleen voordat de eerste kaart van een hand gedeeld is.",
    rules: [
      { label: "1 fiche", value: "1 slok" },
      { label: "5 fiches", value: "3 slokken" },
      { label: "25 fiches", value: "5 slokken" },
      { label: "50 fiches", value: "8 slokken" },
      { label: "100 fiches", value: "10 slokken" },
    ],
  },
  {
    title: "Fiches inleveren",
    description: "Alleen direct nadat je de pot hebt gewonnen. Jij kiest wie drinkt.",
    rules: [
      { label: "25 fiches", value: "5 slokken uitdelen" },
      { label: "50 fiches", value: "5 slokken uitdelen" },
      { label: "100 fiches", value: "10 slokken uitdelen" },
    ],
    notes: ["Deel je slokken meteen uit, je kunt ze niet bewaren voor later."],
  },
];

const EXTENDED_SECTIONS = [
  {
    title: "Per hand",
    rules: [
      { label: "Fold voor de flop", value: "1 slok drinken" },
      { label: "Verlies de showdown", value: "2 slokken drinken" },
      { label: "Win de pot (2 of 3 spelers)", value: "3 slokken uitdelen" },
      { label: "Win de pot (4+ spelers)", value: "4 slokken uitdelen" },
    ],
  },
  {
    title: "Speciale momenten",
    rules: [
      { label: "Bluf en iedereen foldt", value: "3 slokken uitdelen" },
      { label: "Bluf en verlies", value: "3 slokken drinken" },
      { label: "All-in en win", value: "5 slokken uitdelen" },
      { label: "All-in en verlies", value: "5 slokken drinken" },
      { label: "Trips of beter en verlies", value: "2 slokken uitdelen" },
      { label: "Split pot", value: "Elke winnaar deelt 2 slokken uit" },
    ],
    notes: ["Bij een all-in gebruik je de all-inregel, ook als je de showdown verliest."],
  },
];

export default function PokerDrankspelPage() {
  return (
    <DrinkGameRules
      title="Poker"
      intensity={3}
      description={drinkGameDescriptions.poker}
      links={[
        { label: "Poker basisuitleg", href: "/drankspellen/poker/uitleg" },
        { label: "Uitlegvideo", href: "https://www.youtube.com/watch?v=Id0f8mxTiWQ", external: true },
      ]}
      notes={[
        "Begin met een afgesproken aantal fiches per speler en speel normaal poker.",
        "Deel alleen uit aan spelers die deze hand hebben meegedaan.",
      ]}
      sections={SECTIONS}
      extendedSections={EXTENDED_SECTIONS}
    />
  );
}
