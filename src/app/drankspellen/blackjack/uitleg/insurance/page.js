"use client";

import PageTitle from "@/components/PageTitle";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const WHEN_WIN = [
  "Insurance is alleen beschikbaar als de dealer een aas open heeft.",
  "Je wint insurance als de dealer blackjack heeft (aas + kaart met waarde 10).",
];

const PAYOUTS = [
  { label: "Dealer blackjack", value: "2:1" },
  // { label: "Dealer blackjack", value: "Verlies" },
];

const RedCard = ({ children }) => (
  <span className="text-red-400 font-semibold">{children}</span>
);

const EXAMPLES = [
  {
    id: "win",
    content: (
      <>
        Dealer upcard: <RedCard>A♥</RedCard>, hole card: 10♠ &rarr; dealer
        blackjack, insurance wint.
      </>
    ),
  },
  {
    id: "loss",
    content: (
      <>
        Dealer upcard: <RedCard>A♦</RedCard>, hole card: 6♣ &rarr; geen
        blackjack, insurance verliest.
      </>
    ),
  },
];

export default function InsuranceSideBetPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-12">
            <section className="space-y-4">
              <PageTitle backHref="/drankspellen/blackjack/uitleg" backLabel="Terug naar uitleg">
                Side bet: Insurance uitgelegd
              </PageTitle>
              <p className="text-base text-gray-300 sm:text-lg">
                Insurance is een side bet die alleen wordt aangeboden wanneer de dealer een aas open heeft liggen. Je hoeft hier niet aan mee te doen.
                Als je wel meedoet, plaats je een extra inzet op de kans dat de dealer blackjack heeft.
                Heeft de dealer blackjack, dan wordt je insurance uitbetaald tegen 2:1, maar verlies je je originele inzet.
                Heeft de dealer geen blackjack, dan verlies je de insurance-inzet en gaat het spel verder met je originele inzet.
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <div className="surface-panel p-6">
                <h2 className="text-2xl font-semibold text-white">
                  Wanneer win je
                </h2>
                <ul className="mt-4 space-y-3 text-base text-gray-300">
                  {WHEN_WIN.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/10 bg-black/40 px-4 py-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-panel p-6">
                <h2 className="text-2xl font-semibold text-white">
                  Uitbetaling
                </h2>
                <div className="mt-4 space-y-3 text-base text-gray-300">
                  {PAYOUTS.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span>{item.label}</span>
                      <span className="font-semibold text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="surface-panel p-6">
              <h2 className="text-2xl font-semibold text-white">Voorbeelden</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {EXAMPLES.map((example) => (
                  <div
                    key={example.id}
                    className="rounded-md border border-white/10 bg-black/40 px-4 py-3 text-base text-gray-300"
                  >
                    {example.content}
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
