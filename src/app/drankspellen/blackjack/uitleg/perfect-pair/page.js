"use client";

import Image from "next/image";
import PageTitle from "@/components/PageTitle";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RuleExample from "@/components/RuleExample";

const EXAMPLES = [
  { title: "Mixed pair (1:6)", cards: [{ rank: "8", suit: "hearts" }, { rank: "8", suit: "spades" }], description: "Twee achten: één rood en één zwart." },
  { title: "Colored pair (1:12)", cards: [{ rank: "Q", suit: "hearts" }, { rank: "Q", suit: "diamonds" }], description: "Twee vrouwen, allebei rood, maar met een andere kaartsoort." },
  { title: "Perfect pair (1:25)", cards: [{ rank: "7", suit: "clubs" }, { rank: "7", suit: "clubs" }], description: "Precies dezelfde kaart. Hiervoor heb je minstens twee kaartspellen nodig." },
  { title: "Geen pair", cards: [{ rank: "9", suit: "clubs" }, { rank: "10", suit: "clubs" }], description: "De waarden verschillen. Je verliest deze side bet." },
];
export default function PerfectPairSideBetPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-12">
            <section className="space-y-4">
              <PageTitle backHref="/drankspellen/blackjack/uitleg" backLabel="Terug naar uitleg">
                Side bet: Perfect Pair uitgelegd
              </PageTitle>
              <p className="text-base text-gray-300 sm:text-lg">
                Bij Perfect Pair zet je voor het delen extra in op twee kaarten
                met dezelfde waarde. De uitbetaling hangt af van de kleur en kaartsoort.
                Deze inzet staat los van je gewone blackjackhand.
              </p>
              <div className="surface-panel overflow-hidden">
                <Image
                  src="/Images/blackjack-perfect-pairs.png"
                  alt="Overzicht van de Perfect Pair-combinaties"
                  width={800}
                  height={400}
                  className="h-auto w-full"
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  priority
                />
              </div>
            </section>

            <section className="surface-panel p-6">
              <h2 className="text-2xl font-semibold text-white">Combinaties en uitbetaling</h2>
              <div className="mt-5 divide-y divide-line">
                {EXAMPLES.map((example) => (
                  <div
                    key={example.title}
                    className="py-5 first:pt-0 last:pb-0"
                  >
                    <RuleExample {...example} />
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
