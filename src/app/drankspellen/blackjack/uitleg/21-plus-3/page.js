"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

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
    content: (
      <>
        Jij: <RedCard>2♥</RedCard> + <RedCard>J♥</RedCard>, dealer upcard:{" "}
        <RedCard>7♥</RedCard> &rarr; flush (1:5).
      </>
    ),
  },
  {
    id: "straight",
    content: (
      <>
        Jij: 8♣ + <RedCard>10♦</RedCard>, dealer upcard: 9♠ &rarr; straight (1:10).
      </>
    ),
  },
  {
    id: "three-of-a-kind",
    content: (
      <>
        Jij: 9♠ + <RedCard>9♦</RedCard>, dealer upcard: 9♣ &rarr; three of a kind (1:30).
      </>
    ),
  },
  {
    id: "straight-flush",
    content: (
      <>
        Jij: <RedCard>7♥</RedCard> + <RedCard>8♥</RedCard>, dealer upcard:{" "}
        <RedCard>9♥</RedCard> &rarr; straight flush (1:40).
      </>
    ),
  },
  {
    id: "suited-three-of-a-kind",
    content: (
      <>
        Jij: 7♣ + 7♣, dealer upcard: 7♣ &rarr; suited trips (1:100).
      </>
    ),
  },
  {
    id: "loss",
    content: (
      <>
        Jij: <RedCard>A♦</RedCard> + 9♣, dealer upcard: 4♠ &rarr; geen pokerhand
        (verlies).
      </>
    ),
  },
];



export default function SideBet21Plus3Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_rgba(3,7,18,0))]" />
        <div className="absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-5xl space-y-12">
            <Link
              href="/drankspellen/blackjack/uitleg"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Terug naar uitleg
            </Link>

            <section className="space-y-4">
              <h1 className="text-4xl font-extrabold sm:text-5xl">
                Side bet: 21+3 uitgelegd
              </h1>
              <p className="text-base text-gray-300 sm:text-lg">
                21+3 is een extra side bet die je voor de deal plaatst, tegelijk
                met je normale inzet. Je wint als jouw twee kaarten samen met de
                dealer upcard een 3-kaart pokerhand vormen. Het is een losstaande
                inzet; verlies je het hoofdspel blackjack, dan verlies je deze
                inzet niet automatisch.
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h2 className="text-2xl font-semibold text-white">
                  Wanneer win je
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  {WINNING_HANDS.map((hand) => (
                    <li
                      key={hand}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      {hand}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h2 className="text-2xl font-semibold text-white">
                  Uitbetaling
                </h2>
                <div className="mt-4 space-y-3 text-sm text-gray-300">
                  {PAYOUTS.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
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

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Voorbeelden</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {EXAMPLES.map((example) => (
                  <div
                    key={example.id}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300"
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
