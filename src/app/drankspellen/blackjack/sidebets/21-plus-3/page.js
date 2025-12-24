"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SyncedBackground from "@/components/SyncedBackground";

const KEY_POINTS = [
  {
    title: "Wanneer",
    description: "Plaats de side bet voor de deal, tegelijk met je normale inzet.",
  },
  {
    title: "Kaarten",
    description: "Jouw 2 kaarten + dealer upcard vormen samen een 3-kaart pokerhand.",
  },
  {
    title: "Doel",
    description: "Maak een geldige pokerhand om de bonus te pakken.",
  },
];

const WINNING_HANDS = [
  "Flush: 3 kaarten van dezelfde soort.",
  "Straight: 3 opeenvolgende waardes (A mag laag zijn: A-2-3).",
  "Three of a kind: 3 gelijke waardes (bijv. 7-7-7).",
  "Straight flush: straight + flush.",
  "Suited three of a kind: 3 gelijke waardes in dezelfde suit.",
];

const PAYOUTS = [
  { label: "Flush", value: "1:5 (5x je sidebet in fiches)" },
  { label: "Straight", value: "1:10 (10x je sidebet in fiches)" },
  { label: "Three of a kind", value: "1:30 (30x je sidebet in fiches)" },
  { label: "Straight flush", value: "1:40 (40x je sidebet in fiches)" },
  { label: "Suited three of a kind", value: "1:100 (100x je sidebet in fiches)" },
];

const EXAMPLES = [
  "Jij: 2♥ + 7♥, dealer upcard: K♥ → flush (1:5).",
  "Jij: 5♣ + 6♦, dealer upcard: 7♠ → straight (1:10).",
  "Jij: 9♠ + 9♦, dealer upcard: 9♣ → three of a kind (1:30).",
  "Jij: 8♥ + 10♥, dealer upcard: 9♥ → straight flush (1:40).",
  "Jij: Q♣ + Q♣, dealer upcard: Q♣ → suited three of a kind (1:100).",
];


export default function SideBet21Plus3Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <SyncedBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-black/70"
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
              href="/drankspellen/blackjack"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Terug naar blackjack
            </Link>

            <section className="space-y-4">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Side bet
              </span>
              <h1 className="text-4xl font-extrabold sm:text-5xl">
                21+3 uitgelegd
              </h1>
              <p className="max-w-2xl text-base text-gray-300 sm:text-lg">
                21+3 is een extra side bet waarbij jouw twee kaarten samen met de
                dealer upcard een 3-kaart pokerhand moeten vormen. Je hoofdhand
                blijft gewoon blackjack; deze bet staat er los van.
              </p>
            </section>

            <section className="grid gap-6 md:grid-cols-3">
              {KEY_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <h2 className="text-lg font-semibold text-white">
                    {point.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-300">
                    {point.description}
                  </p>
                </div>
              ))}
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
                    key={example}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300"
                  >
                    {example}
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
