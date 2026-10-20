"use client";

import PageTitle from "@/components/PageTitle";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RuleExample from "@/components/RuleExample";

const EXAMPLES = [
  { title: "Dealer heeft blackjack", cards: [{ rank: "A", suit: "hearts", caption: "Lag al open" }, { rank: "10", suit: "spades", caption: "Omgedraaid" }], description: "11 + 10 = 21 op twee kaarten. Insurance wint en betaalt 2:1." },
  { title: "Dealer heeft geen blackjack", cards: [{ rank: "A", suit: "diamonds", caption: "Lag al open" }, { rank: "6", suit: "clubs", caption: "Omgedraaid" }], description: "11 + 6 = 17. Insurance verliest; je gewone hand gaat verder." },
];
export default function InsuranceSideBetPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-12">
            <section className="space-y-4">
              <PageTitle backHref="/drankspellen/blackjack/uitleg" backLabel="Terug naar uitleg">
                Side bet: Insurance uitgelegd
              </PageTitle>
              <p className="text-base text-gray-300 sm:text-lg">
                Insurance is een optionele extra inzet op blackjack bij de dealer.
                Je kunt dit alleen kiezen als de dealer een aas open heeft.
                Je gewone hand en de insurance-inzet worden apart afgehandeld.
              </p>
            </section>

            <section className="surface-panel p-6">
              <h2 className="text-2xl font-semibold text-white">Als de dealer zijn kaart omdraait</h2>
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
