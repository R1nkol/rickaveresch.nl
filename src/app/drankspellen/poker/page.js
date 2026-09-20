"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IntensityStars from "@/components/IntensityStars";

const QUICK_RULES = [
  "Een hand = een ronde: alles gebeurt per hand.",
  "Kopen mag alleen voordat de eerste kaart gedeeld is.",
  "Inleveren kan alleen direct nadat je de pot hebt gewonnen.",
  "All-in regels gaan voor showdown regels.",
  "Je mag alleen straffen uitdelen aan spelers die die hand hebben meegespeeld.",
  "Per hand geldt alleen de zwaarste regel (straffen/bonussen stacken niet).",
];

const BUY_CHIPS = [
  { chip: "1", cost: "1 slok" },
  { chip: "5", cost: "3 slokken" },
  { chip: "25", cost: "1 vol adtje" },
  { chip: "50", cost: "1 vol adtje + 3 slokken" },
  { chip: "100", cost: "2 volle adtjes" },
];

const BUY_NOTES = [
  "Kopen mag alleen voordat de eerste kaart gedeeld is (voor de hand start).",
  "1 vol adtje = 5 slokken (adten in een keer of verdelen).",
  "Een vol adtje doe je met een nieuw, vol glas.",
];

const CASHIN_CHIPS = [
  { chip: "25", reward: "1 glas adten uitdelen" },
  { chip: "50", reward: "1 vol adtje uitdelen" },
  { chip: "100", reward: "2 volle adtjes uitdelen" },
];

const CASHIN_RULES = [
  "Je mag alleen fiches inleveren als je de pot hebt gewonnen.",
  "Jij kiest wie er drinkt.",
  "Alleen spelers die in die hand hebben meegespeeld mogen drinken.",
  "Adtjes mogen niet worden opgespaard voor later.",
  "1 vol adtje = 5 slokken (adten in een keer of verdelen).",
];

const HAND_RULES = [
  { label: "Fold voor de flop", value: "1 slok" },
  { label: "Verlies de showdown", value: "2 slokken" },
  { label: "Win de pot (2-3 spelers)", value: "3 slokken uitdelen" },
  { label: "Win de pot (4+ spelers)", value: "4 slokken uitdelen" },
];

const SPECIAL_RULES = [
  { label: "Je blufft en iedereen foldt", value: "3 slokken uitdelen" },
  { label: "Je blufft en verliest", value: "3 slokken drinken" },
  { label: "All-in en je wint", value: "1 vol adtje uitdelen" },
  { label: "All-in en je verliest", value: "1 vol adtje drinken" },
  { label: "Je hebt trips of beter maar verliest", value: "2 slokken uitdelen" },
  { label: "Split pot", value: "Beide winnaars 2 slokken uitdelen" },
];

export default function PokerDrankspelPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-16">
            <section className="space-y-10">
              <div className="space-y-4">
                <h1 className="page-heading">
                  Poker drankspel regels
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=Id0f8mxTiWQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary"
                  >
                    Poker uitleg video
                  </a>
                  <IntensityStars intensity={3} />
                </div>
              </div>

              <div className="surface-panel p-8">
                <h2 className="text-xl font-semibold text-white">Snel overzicht</h2>
                <div className="mt-6 space-y-4 text-base text-gray-300">
                  {QUICK_RULES.map((rule, index) => (
                    <div
                      key={rule}
                      className="flex items-center gap-4 rounded-md border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span className="button-secondary">
                        {index + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="surface-panel p-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Fiches kopen
                  </h2>
                </div>
                <p className="mt-3 text-base text-gray-300">
                  Alleen met slokken of volle adtjes, afhankelijk van de fiche.
                </p>
                <div className="mt-6 overflow-hidden rounded-md border border-white/10">
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
                <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-gray-300">
                  {BUY_NOTES.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>

              <div className="surface-panel p-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Fiches inleveren
                  </h2>
                </div>
                <p className="mt-3 text-base text-gray-300">
                  Je krijgt de kans om fiches uit te delen nadat je de pot hebt gewonnen.
                </p>
                <div className="mt-6 overflow-hidden rounded-md border border-white/10">
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
                <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-gray-300">
                  {CASHIN_RULES.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="surface-panel p-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">
                    Handregels
                  </h2>
                </div>
                <p className="mt-3 text-base text-gray-300">
                  Drinkmomenten tijdens een pokerhand.
                </p>
                <div className="mt-6 space-y-4 text-base text-gray-300">
                  {HAND_RULES.map((rule) => (
                    <div
                      key={rule.label}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span>{rule.label}</span>
                      <span className="font-semibold text-white">
                        {rule.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-panel p-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-white">
                    Speciale momenten
                  </h2>
                </div>
                <p className="mt-3 text-base text-gray-300">
                  Bluffs, all-ins en andere spicy situaties.
                </p>
                <div className="mt-6 space-y-4 text-base text-gray-300">
                  {SPECIAL_RULES.map((rule) => (
                    <div
                      key={rule.label}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-black/40 px-4 py-3"
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
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

