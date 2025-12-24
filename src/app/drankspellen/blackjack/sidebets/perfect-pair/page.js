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
    title: "Voorwaarde",
    description: "Je eerste twee kaarten moeten dezelfde waarde hebben.",
  },
  {
    title: "Soorten",
    description:
      "Mixed pair (rood + zwart), colored pair (zelfde kleur), perfect pair (zelfde suit).",
  },
];

const PAYOUTS = [
  { label: "Mixed pair", value: "6x uitbetaling (je wint 6x je sidebet in fiches)" },
  { label: "Colored pair", value: "12x uitbetaling (je wint 12x je sidebet in fiches)" },
  { label: "Perfect pair", value: "25x uitbetaling (je wint 25x je sidebet in fiches)" },
  { label: "Verlies", value: "Sidebet-fiches kwijt, geen extra drinkstraf." },
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
                Perfect Pair uitgelegd
              </h1>
              <p className="max-w-2xl text-base text-gray-300 sm:text-lg">
                Perfect Pair is een extra side bet waarbij je wint als je eerste
                twee kaarten een pair vormen. De uitbetaling hangt af van kleur
                en suit (mixed, colored, perfect). Het staat los van je normale
                blackjackhand en is bedoeld als snelle bonus.
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
                <h2 className="text-2xl font-semibold text-white">Voorbeelden</h2>
                <div className="mt-4 space-y-3 text-sm text-gray-300">
                  {EXAMPLES.map((example) => (
                    <div
                      key={example.id}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      {example.content}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h2 className="text-2xl font-semibold text-white">
                  Uitbetaling
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Uitbetaling is ratio x je side bet, uit te delen in slokken.
                </p>
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
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

