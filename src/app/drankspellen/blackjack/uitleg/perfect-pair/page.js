"use client";

import Image from "next/image";
import PageTitle from "@/components/PageTitle";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PAYOUTS = [
  { label: "Mixed pair", value: "1:6" },
  { label: "Colored pair", value: "1:12" },
  { label: "Perfect pair", value: "1:25" },
];

const WINNING_TYPES = [
  "Mixed pair: zelfde waarde, rood + zwart.",
  "Colored pair: zelfde waarde, zelfde kleur.",
  "Perfect pair: zelfde waarde, zelfde suit.",
];

const RedCard = ({ children }) => (
  <span className="text-red-400 font-semibold">{children}</span>
);

const EXAMPLES = [
  {
    id: "mixed",
    content: (
      <>
        <RedCard>8♥</RedCard> + 8♠ &rarr; mixed pair (1:6).
      </>
    ),
  },
  {
    id: "colored",
    content: (
      <>
        <RedCard>Q♥</RedCard> + <RedCard>Q♦</RedCard> &rarr; colored pair (1:12).
      </>
    ),
  },
  {
    id: "perfect",
    content: (
      <>
        7♣ + 7♣ &rarr; perfect pair (1:25).
      </>
    ),
  },
  {
    id: "loss",
    content: (
      <>
        9♣ + 10♣ &rarr; geen pair (verlies).
      </>
    ),
  },
];

export default function PerfectPairSideBetPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-12">
            <section className="space-y-4">
              <PageTitle backHref="/drankspellen/blackjack/uitleg" backLabel="Terug naar uitleg">
                Side bet: Perfect Pair uitgelegd
              </PageTitle>
              <p className="text-base text-gray-300 sm:text-lg">
                Perfect Pair is een extra side bet die je voor de deal plaatst,
                tegelijk met je normale inzet. Je wint als je eerste twee kaarten
                een pair vormen. De uitbetaling hangt af van kleur en suit
                (mixed, colored, perfect). Het is een losstaande inzet naast je
                normale blackjackhand.
              </p>
              <div className="overflow-hidden surface-panel">
                <Image
                  src="/Images/blackjack-perfect-pairs.png"
                  alt="Voorbeeld van de Perfect Pair side bet"
                  width={800}
                  height={400}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 800px, 100vw"
                  priority
                />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <div className="surface-panel p-6">
                <h2 className="text-2xl font-semibold text-white">
                  Wanneer win je
                </h2>
                <ul className="mt-4 space-y-3 text-base text-gray-300">
                  {WINNING_TYPES.map((item) => (
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
                    className="rounded-md border border-white/10 bg-black/40 px-4 py-3"
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
