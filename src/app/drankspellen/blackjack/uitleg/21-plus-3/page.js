"use client";

import Image from "next/image";
import PageTitle from "@/components/PageTitle";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RuleExample from "@/components/RuleExample";

const EXAMPLES = [
  { title: "Flush (1:5)", cards: [{ rank: "2", suit: "hearts" }, { rank: "J", suit: "hearts" }, { rank: "7", suit: "hearts" }], description: "Drie kaarten van dezelfde kaartsoort: allemaal harten." },
  { title: "Straight (1:10)", cards: [{ rank: "8", suit: "clubs" }, { rank: "10", suit: "diamonds" }, { rank: "9", suit: "spades" }], description: "Je kunt de waarden op volgorde leggen: 8, 9, 10." },
  { title: "Three of a kind (1:30)", cards: [{ rank: "9", suit: "spades" }, { rank: "9", suit: "diamonds" }, { rank: "9", suit: "clubs" }], description: "Drie kaarten met dezelfde waarde: drie negens." },
  { title: "Straight flush (1:40)", cards: [{ rank: "7", suit: "diamonds" }, { rank: "8", suit: "diamonds" }, { rank: "9", suit: "diamonds" }], description: "Een reeks van drie én allemaal ruiten." },
  { title: "Suited trips (1:100)", cards: [{ rank: "7", suit: "clubs" }, { rank: "7", suit: "clubs" }, { rank: "7", suit: "clubs" }], description: "Drie keer precies dezelfde kaart. Dit kan alleen met minstens drie kaartspellen." },
  { title: "Geen combinatie", cards: [{ rank: "A", suit: "hearts" }, { rank: "9", suit: "clubs" }, { rank: "4", suit: "spades" }], description: "Geen reeks, gelijke waarden of gelijke kaartsoort. Je verliest deze side bet." },
];
export default function SideBet21Plus3Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-12">
            <section className="space-y-4">
              <PageTitle backHref="/drankspellen/blackjack/uitleg" backLabel="Terug naar uitleg">
                Side bet: 21+3 uitgelegd
              </PageTitle>
              <p className="text-base text-gray-300 sm:text-lg">
                Bij 21+3 zet je voor het delen extra in op een combinatie van jouw
                twee kaarten en de open dealerkaart. De dichte dealerkaart telt niet mee.
                Deze inzet staat los van je gewone blackjackhand.
              </p>
              <div className="surface-panel overflow-hidden">
                <Image
                  src="/Images/blackjack-21-plus-3.png"
                  alt="Overzicht van de 21+3-combinaties"
                  width={746}
                  height={329}
                  className="h-auto w-full"
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  priority
                />
              </div>
            </section>

            <section className="surface-panel p-6">
              <h2 className="text-2xl font-semibold text-white">Combinaties en uitbetaling</h2>
              <div className="mt-5 divide-y divide-line">
                {EXAMPLES.map(({ cards, ...example }) => (
                  <div
                    key={example.title}
                    className="py-5 first:pt-0 last:pb-0"
                  >
                    <RuleExample {...example} groupLayout="paired" groups={[
                      { label: "Jij", cards: cards.slice(0, 2) },
                      { label: "Dealer", cards: [cards[2], { faceDown: true }] },
                    ]} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

