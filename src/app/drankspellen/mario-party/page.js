"use client";

import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const QUICK_RULES = [
  "Alleen spelers die een minigame meedoen mogen drinken of uitdelen.",
  "Team minigames gebruiken altijd de teamregels (geen placement).",
  "Board events kunnen ook slokken geven buiten minigames om.",
  "Tussenstand wordt bekeken na elke 5 rondes.",
  "Sterren, board events en eindstand tellen niet mee voor de minigame cap.",
  "Water mag altijd; regels mogen gepauzeerd worden.",
];

const MINIGAME_RULES = [
  { label: "1e plek", value: "1 slok uitdelen" },
  { label: "2e plek", value: "0 slokken" },
  { label: "3e plek", value: "2 slokken" },
  { label: "4e plek", value: "3 slokken" },
];

const TEAM_2V2_RULES = [
  { label: "Winnend team", value: "1 slok uitdelen (per speler)" },
];

const TEAM_3V1_RULES = [
  { label: "Solo wint", value: "3 slokken uitdelen" },
  { label: "Solo verliest", value: "2 slokken drinken" },
];

const STAR_RULES = [
  { label: "Ster kopen", value: "Iedereen 2 slokken" },
  { label: "Ster stelen", value: "Kost 3 slokken" },
  { label: "Ster cadeau krijgen", value: "3 slokken uitdelen" },
  { label: "Langs ster lopen", value: "2 slokken" },
];

const ENDGAME_RULES = [
  { label: "1e plek", value: "5 slokken uitdelen" },
  { label: "2e plek", value: "3 slokken uitdelen" },
  { label: "3e plek", value: "2 slokken uitdelen" },
  { label: "4e plek", value: "1 slok uitdelen" },
];

const BOARD_EVENTS = [
  { label: "Bowser event", value: "2 slokken" },
  { label: "Item wordt tegen je gebruikt", value: "1 slok" },
  { label: "Verliest duel minigame", value: "2 slokken" },
  { label: "Koop een item uit de shop", value: "1 slok" },
];

const MIDGAME_RULES = [
  { label: "1e plek", value: "2 slokken drinken" },
  { label: "2e plek", value: "1 slok drinken" },
  { label: "3e plek", value: "1 slok uitdelen" },
  { label: "4e plek", value: "2 slokken uitdelen" },
];

const SAFETY_RULES = [
  "Water mag altijd en telt niet als pauze.",
  "Iedereen mag drankregels pauzeren zonder vragen, maar speelt wel door.",
  "Geen druk: niemand moet drinken als ze dat niet willen.",
  "Stop direct als iemand zich niet goed voelt.",
];

export default function MarioPartyDrankspelPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_rgba(3,7,18,0))]" />
        <div className="absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-16">
            <section className="space-y-10">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                  Mario Party drankspel regels
                </h1>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <h2 className="text-xl font-semibold text-white">Snel overzicht</h2>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {QUICK_RULES.map((rule, index) => (
                    <div
                      key={rule}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                        {index + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="minigame-regels" className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Minigame regels
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Bepaal wie drinkt op basis van de plaatsing in elke minigame.
                </p>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {MINIGAME_RULES.map((rule) => (
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
                  <h2 className="text-2xl font-semibold text-white">
                    Team minigames
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Deze regels vervangen de placement regels in team minigames.
                </p>
                <div className="mt-6 space-y-6 text-sm text-gray-300">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                      2v2
                    </p>
                    <div className="space-y-3">
                      {TEAM_2V2_RULES.map((rule) => (
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
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                      3v1
                    </p>
                    <div className="space-y-3">
                      {TEAM_3V1_RULES.map((rule) => (
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
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Stars
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Regels rondom het verkrijgen en verliezen van sterren.
                </p>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {STAR_RULES.map((rule) => (
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
                  <h2 className="text-2xl font-semibold text-white">
                    Board events
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Extra slokken tijdens het spelen op het bord.
                </p>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {BOARD_EVENTS.map((rule) => (
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

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Tussenstand
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Na elke 5 rondes wordt de tussenstand bekeken.
                </p>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {MIDGAME_RULES.map((rule) => (
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
                  <h2 className="text-2xl font-semibold text-white">
                    Eindstand
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Volgorde: 4e plek deelt als eerst uit, 1e plek als laatst.
                </p>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {ENDGAME_RULES.map((rule) => (
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
