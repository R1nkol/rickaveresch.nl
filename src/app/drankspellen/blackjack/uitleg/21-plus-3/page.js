"use client";

import Image from "next/image";
import PageTitle from "@/components/PageTitle";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const WINNING_HANDS = [
  "Flush: 3 kaarten van dezelfde soort.",
  "Straight: 3 opeenvolgende waardes.",
  "Three of a kind: 3 gelijke waardes.",
  "Straight flush: straight + flush.",
  "Suited trips: 3 gelijke waardes in dezelfde suit.",
];

const PAYOUTS = [
  { label: "Flush", value: "1:5" },
  { label: "Straight", value: "1:10" },
  { label: "Three of a kind", value: "1:30" },
  { label: "Straight flush", value: "1:40" },
  { label: "Suited trips", value: "1:100" },
];

const RedCard = ({ children }) => (
  <span className="text-red-400 font-semibold">{children}</span>
);

const EXAMPLES = [
  {
    id: "flush",
    left: (
      <>
        Jij: <RedCard>2♥</RedCard> + <RedCard>J♥</RedCard>, dealer upcard:{" "}
        <RedCard>7♥</RedCard>
      </>
    ),
    right: "flush (1:5)",
  },
  {
    id: "straight",
    left: (
      <>
        Jij: 8♣ + <RedCard>10♦</RedCard>, dealer upcard: 9♠
      </>
    ),
    right: "straight (1:10)",
  },
  {
    id: "three-of-a-kind",
    left: (
      <>
        Jij: 9♠ + <RedCard>9♦</RedCard>, dealer upcard: 9♣
      </>
    ),
    right: "three of a kind (1:30)",
  },
  {
    id: "straight-flush",
    left: (
      <>
        Jij: <RedCard>7♦</RedCard> + <RedCard>8♦</RedCard>, dealer upcard:{" "}
        <RedCard>9♦</RedCard>
      </>
    ),
    right: "straight flush (1:40)",
  },
  {
    id: "suited-three-of-a-kind",
    left: (
      <>
        Jij: 7♣ + 7♣, dealer upcard: 7♣
      </>
    ),
    right: "suited trips (1:100)",
  },
  {
    id: "loss",
    left: (
      <>
        Jij: <RedCard>A♥</RedCard> + 9♣, dealer upcard: 4♠
      </>
    ),
    right: "geen pokerhand (verlies)",
  },
];



export default function SideBet21Plus3Page() {
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
                Side bet: 21+3 uitgelegd
              </PageTitle>
              <p className="text-base text-gray-300 sm:text-lg">
                21+3 is een extra side bet die je voor de deal plaatst, tegelijk
                met je normale inzet. Je wint als jouw twee kaarten samen met de
                dealer upcard een 3-kaart pokerhand vormen. Het is een losstaande
                inzet; verlies je het hoofdspel blackjack, dan verlies je deze
                inzet niet automatisch.
              </p>
              <div className="overflow-hidden surface-panel">
                <Image
                  src="/Images/blackjack-21-plus-3.png"
                  alt="Voorbeeld van de 21+3 side bet"
                  width={746}
                  height={329}
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
                  {WINNING_HANDS.map((hand) => (
                    <li
                      key={hand}
                      className="rounded-md border border-white/10 bg-black/40 px-4 py-3"
                    >
                      {hand}
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
                    className="flex flex-col gap-2 rounded-md border border-white/10 bg-black/40 px-4 py-3 text-base text-gray-300 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="sm:pr-4">{example.left}</div>
                    <div className="text-sm font-semibold text-white sm:shrink-0 sm:text-right">
                      {example.right}
                    </div>
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

