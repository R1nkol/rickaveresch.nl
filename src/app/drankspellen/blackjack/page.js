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
    description: "Maximaal één keer, direct na een gewonnen hand. Jij kiest wie drinkt.",
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
    title: "Bust",
    description: "Als je boven de 21 komt, drink je het aantal slokken hieronder.",
    examples: [{
      title: "Bijvoorbeeld: je neemt een kaart te veel",
      cards: [{ rank: "10", suit: "diamonds" }, { rank: "8", suit: "clubs" }, { rank: "6", suit: "spades" }],
      description: "10 + 8 + 6 = 24. Als speler drink je bij 24 dus 2 slokken.",
    }],
    rules: [
      { label: "22 of 23", value: "1 slok" },
      { label: "24 tot en met 27", value: "2 slokken" },
      { label: "28 of hoger", value: "5 slokken" },
      { label: "Dealer: 22 tot en met 24", value: "Dealer drinkt 1 slok" },
      { label: "Dealer: 25 of hoger", value: "Dealer drinkt 2 slokken" },
    ],
  },
  {
    title: "Blackjack",
    examples: [{
      title: "Zo ziet een blackjack eruit",
      cards: [{ rank: "A", suit: "spades" }, { rank: "K", suit: "hearts" }],
      description: "Een aas en een kaart van 10 punten op je eerste twee kaarten. Een heer, vrouw en boer tellen ook als 10.",
    }],
    rules: [
      { label: "Speler heeft blackjack", value: "Iedereen zonder blackjack drinkt 3 slokken" },
      { label: "Dealer heeft blackjack", value: "Alle spelers drinken 3 slokken" },
    ],
    notes: [
      "De eerste 2 handen is de straf bij een blackjack van een speler 2 slokken.",
      "Met blackjack mag je deze hand geen fiches inleveren.",
    ],
  },
  {
    title: "Splitten",
    rules: [
      { label: "Vooraf", value: "1 slok drinken" },
      { label: "Win beide handen", value: "5 slokken uitdelen" },
      { label: "Verlies beide handen", value: "5 slokken drinken" },
    ],
  },
  {
    title: "Double down",
    rules: [
      { label: "Win", value: "3 slokken uitdelen" },
      { label: "Verlies zonder bust", value: "3 slokken drinken" },
      { label: "Bust", value: "5 slokken drinken" },
    ],
  },
  {
    title: "Speciale momenten",
    rules: [
      { label: "Dealer: 5 kaarten zonder bust", value: "Alle spelers 1 slok" },
      { label: "Speler: 5 kaarten zonder bust", value: "5 slokken uitdelen" },
      { label: "21 met 4 of meer kaarten", value: "2 slokken uitdelen" },
      { label: "Dealer bust 2 handen op rij", value: "Dealer drinkt 2 slokken" },
      { label: "Dealer bust 3 handen op rij", value: "Dealer drinkt 5 slokken" },
    ],
  },
];

export default function BlackjackDrankspelPage() {
  return (
    <DrinkGameRules
      title="Blackjack"
      intensity={4}
      description={drinkGameDescriptions.blackjack}
      links={[{ label: "Blackjack basisuitleg", href: "/drankspellen/blackjack/uitleg" }]}
      notes={[
        "Spreek af met hoeveel fiches je begint.",
        "Je mag alleen uitdelen aan spelers die deze ronde meedoen. De dealer sla je over.",
      ]}
      sections={SECTIONS}
      extendedSections={EXTENDED_SECTIONS}
    />
  );
}
