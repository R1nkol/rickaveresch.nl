"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IntensityStars from "@/components/IntensityStars";

const QUICK_RULES = [
  "Open slok = 1 slok die je nog moet drinken (je mag ze opsparen tot een veilig moment).",
  "Bij elk moment in de race krijg je een of meer open slokken.",
  "Zodra je over de finish bent (klaar met de race), moeten je open slokken op 0 staan.",
  "Per open slok die nog open staat bij finish: 2 strafslokken.",
];

const CORE_RULES = [
  { label: "Wat is een open slok?", value: "1 slok die je nog moet drinken" },
  { label: "Wanneer mag je drinken?", value: "Tijdens de race (je mag opsparen)" },
  { label: "Finish check", value: "Zodra je over de finish bent (klaar met de race)" },
  { label: "Nog open slokken bij finish?", value: "2 strafslokken per open slok" },
];

const RACE_FINISH_RULES = [
  { label: "1e plek", value: "3 slokken uitdelen" },
  { label: "2e plek", value: "1 slok uitdelen" },
  { label: "3e plek", value: "1 slok drinken" },
  { label: "4e en 5e plek", value: "3 slokken drinken" },
  { label: "6e en lager", value: "1 vol adtje" },
];

const ITEM_RULES = [
  { label: "Geraakt door banaan", value: "1 open slok" },
  { label: "Geraakt door green shell", value: "1 open slok" },
  { label: "Geraakt door red shell", value: "1 open slok" },
];

const BIG_ITEM_RULES = [
  { label: "Geraakt door blue shell", value: "3 open slokken" },
  { label: "Iemand gebruikt bliksem", value: "Iedereen 2 open slokken" },
  { label: "Bullet Bill gebruikt", value: "3 open slokken" },
];

const TRACK_EVENTS = [
  { label: "Van de baan vallen", value: "2 open slokken" },
  { label: "Item over de finish meenemen", value: "1 open slok per item, (3 mushrooms + 1 banaan is 4 slokken)" },
];

const MID_CUP_RULES = [
  { label: "Staat 1e in tussenstand", value: "1 slok uitdelen" },
  { label: "Gestegen in tussenstand", value: "1 slok drinken" },
  { label: "Gezakt in tussenstand", value: "3 slokken drinken" },
  { label: "Staat laatste van iedereen", value: "2 slokken drinken" },
];


const GRAND_PRIX_FINISH_RULES = [
  { label: "1e plek overall", value: "Iedereen 2 slokken" },
  { label: "2e plek overall", value: "Iedereen 1 slok" },
  { label: "3e plek overall", value: "2 slokken uitdelen" },
  { label: "Laatste plek overall", value: "1 vol adtje" },
];


export default function MarioKartDrankspelPage() {
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
                  Mario Kart drankspel regels
                </h1>
                <IntensityStars intensity={5} />
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

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-semibold text-white">
                  Drink of Dubbel Regel
                </h2>
              </div>
                <p className="mb-6 text-sm text-gray-300">
                  Elke keer dat er iets gebeurt waar een slok bij hoort, krijg je een open slok
                  (een slok die je nog moet drinken). Open slokken mag je tijdens de race wegwerken
                  wanneer het veilig is. Zodra je over de finish bent moeten je open slokken op 0 staan,
                  wat nog open is kost 2 strafslokken per open slok.
                </p>
              <div className="space-y-4 text-sm text-gray-300">
                {CORE_RULES.map((rule) => (
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
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold text-white">
                  Finish regels
                </h2>
              </div>
              <p className="mt-3 text-sm text-gray-300">
                Na de race (in de lobby) drink je of deel je uit op basis van je finishpositie.
              </p>
              <div className="mt-6 space-y-4 text-sm text-gray-300">
                {RACE_FINISH_RULES.map((rule) => (
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
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Item regels
                  </h2>
                </div>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {ITEM_RULES.map((rule) => (
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
                    Grote Items
                  </h2>
                </div>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {BIG_ITEM_RULES.map((rule) => (
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
                  Track & Gameplay Events
                </h2>
              </div>
              <p className="mt-3 text-sm text-gray-300">
                Extra triggers die tijdens de race kunnen gebeuren, los van items en finish.
              </p>
              <div className="mt-6 space-y-4 text-sm text-gray-300">
                {TRACK_EVENTS.map((rule) => (
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
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Mid-Cup Tussenstand
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  Na race 2 check je de tussenstand. Vergelijk met de stand van de vorige race.
                </p>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {MID_CUP_RULES.map((rule) => (
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
                    Grand Prix Eindstand
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-300">
                  De finale straffen na een volledige Grand Prix van 4 races.
                </p>
                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  {GRAND_PRIX_FINISH_RULES.map((rule) => (
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
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

