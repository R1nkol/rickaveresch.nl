"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

const QUICK_RULES = [
  "Kopen mag alleen voor de ronde.",
  "Inleveren kan alleen na een gewonnen hand.",
  "Alleen spelers die meedoen kunnen drinken.",
  "Max 1 vol adtje per persoon per ronde.",
  "Blackjack: iedereen zonder blackjack 3 slokken.",
];

const BUY_CHIPS = [
  { chip: "1", cost: "1 slok" },
  { chip: "5", cost: "3 slokken" },
  { chip: "25", cost: "1 vol adtje" },
  { chip: "50", cost: "1 vol adtje + 3 slokken" },
  { chip: "100", cost: "2 volle adtjes" },
];

const BUY_NOTES = [
  "Kopen mag alleen voor een ronde.",
  "Een vol adtje is altijd een nieuw, vol glas.",
];
const CASHIN_CHIPS = [
  { chip: "25", reward: "1 glas adten uitdelen" },
  { chip: "50", reward: "1 vol adtje uitdelen" },
  { chip: "100", reward: "2 volle adtjes uitdelen" },
];

const CASHIN_RULES = [
  "Je mag alleen fiches inleveren als je je hand hebt gewonnen.",
  "Max 1 vol adtje per persoon per ronde.",
  "Jij kiest wie er drinkt.",
  "Alleen spelers die in die ronde hebben meegespeeld mogen drinken.",
  "Adtjes mogen niet worden opgespaard voor later.",
  "Adtjes mogen opgesplitst worden over meerdere spelers, 1 vol adtje = 5 slokken.",
];

const BLACKJACK_RULES = [
  { label: "Iedereen zonder blackjack", value: "2/3 slokken" },
  { label: "Dealer", value: "1 glas adten" },
  { label: "Speler met blackjack", value: "Mag geen fiches inleveren" },
];

const BUST_RULES = [
  { label: "Bust tot en met 23", value: "1 slok" },
  { label: "Bust 24 of hoger", value: "2 slokken" },
  { label: "Bust met double", value: "1 vol adtje" },
];

const SPLIT_RULES = [
  { label: "Splitten kost vooraf", value: "1 slok" },
  { label: "Win je beide handen", value: "1 glas adten uitdelen" },
  { label: "Verlies je beide", value: "glas adten" },
];

const DOUBLE_DOWN_RULES = [
  { label: "Win", value: "3 slokken uitdelen" },
  { label: "Verlies", value: "3 slokken drinken" },
  { label: "Bust", value: "1 vol adtje" },
];

const SPECIAL_RULES = [
  { label: "Dealer heeft 5 kaarten zonder bust", value: "iedereen 1 slok" },
  { label: "Speler heeft 5 kaarten zonder bust", value: "1 glas adten uitdelen" },
  { label: "21 met 4+ kaarten", value: "2 slokken uitdelen" },
];


const SAFETY_RULES = [
  "Max 1 vol adtje per persoon per ronde.",
  "Geen meerdere volle adtjes achter elkaar.",
  "Water mag altijd.",
  "Niet iedereen hoeft elke ronde mee te doen.",
  "Iemand mag drankregels pauzeren, maar speelt dan wel verder.",
];

export default function BlackjackDrankspelPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_rgba(3,7,18,0))]" />
        <div className="absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-16">
            <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr),minmax(0,0.8fr)]">
              <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                  Blackjack Drankspel regels
                </h1>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/drankspellen/blackjack/uitleg"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white"
                  >
                    Blackjack basis uitleg
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Snel overzicht
                </p>
                <ul className="mt-5 space-y-3 text-sm text-gray-300">
                  {QUICK_RULES.map((rule, index) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-emerald-200">
                        {index + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Fiches kopen
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Alleen met slokken of volle adtjes, afhankelijk van de fiche.
                </p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-xs uppercase text-gray-400">
                      <tr>
                        <th className="px-4 py-3">Fiche</th>
                        <th className="px-4 py-3">Kosten</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {BUY_CHIPS.map((row) => (
                        <tr key={row.chip} className="bg-black/30">
                          <td className="px-4 py-3 font-semibold text-white">
                            {row.chip}
                          </td>
                          <td className="px-4 py-3 text-gray-300">
                            {row.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-gray-300">
                  {BUY_NOTES.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Fiches inleveren
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Je krijgt de kans om fiches uit te delen nadat je een ronde hebt gewonnen.
                </p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-xs uppercase text-gray-400">
                      <tr>
                        <th className="px-4 py-3">Ingeleverd</th>
                        <th className="px-4 py-3">Uitdelen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {CASHIN_CHIPS.map((row) => (
                        <tr key={row.chip} className="bg-black/30">
                          <td className="px-4 py-3 font-semibold text-white">
                            {row.chip}
                          </td>
                          <td className="px-4 py-3 text-gray-300">
                            {row.reward}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-gray-300">
                  {CASHIN_RULES.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">
                    Blackjack regels
                  </h2>
                </div>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {BLACKJACK_RULES.map((rule) => (
                    <div
                      key={rule.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span>{rule.label}</span>
                      <span className="font-semibold text-white">
                        {rule.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">
                    Speciale regels
                  </h2>
                </div>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {SPECIAL_RULES.map((rule) => (
                    <div
                      key={rule.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span>{rule.label}</span>
                      <span className="font-semibold text-white">
                        {rule.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">Bust regels</h2>
                </div>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {BUST_RULES.map((rule) => (
                    <div
                      key={rule.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span>{rule.label}</span>
                      <span className="font-semibold text-white">
                        {rule.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">Split regels</h2>
                </div>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {SPLIT_RULES.map((rule) => (
                    <div
                      key={rule.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span>{rule.label}</span>
                      <span className="font-semibold text-white">
                        {rule.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">
                    Double down
                  </h2>
                </div>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {DOUBLE_DOWN_RULES.map((rule) => (
                    <div
                      key={rule.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span>{rule.label}</span>
                      <span className="font-semibold text-white">
                        {rule.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold text-white">
                  Tips voor iedereen
                </h2>
              </div>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-gray-300">
                {SAFETY_RULES.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </section>

          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
