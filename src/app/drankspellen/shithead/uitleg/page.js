import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import PlayingCard, { CARD_SUITS } from "@/components/PlayingCard";
import { shitheadHandSizeNote } from "@/data/shithead";

export const metadata = {
  title: "Shithead spelregels | Rick Averesch",
  description: "Leer Shithead spelen: de opzet, je beurt, speciale kaarten en de open en dichte kaarten.",
};

const SPECIAL_CARDS = [
  {
    value: "2",
    title: "Reset",
    description: "Mag altijd gespeeld worden. De volgende speler mag daarna iedere kaart spelen.",
  },
  {
    value: "3",
    title: "Transparant",
    description: "De 3 telt niet mee. Kijk naar de kaart eronder om te bepalen wat je moet spelen.",
  },
  {
    value: "7",
    title: "Lager",
    description: "De volgende speler moet 7 of lager spelen. Daarna gaat het spel weer normaal verder.",
  },
  {
    value: "10",
    title: "Verbranden",
    description: "Haal de hele aflegstapel uit het spel. Wie de 10 speelde, mag opnieuw beginnen.",
  },
];

export default function ShitheadBasicsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-5xl space-y-10">
            <div>
              <PageTitle backHref="/drankspellen/shithead" backLabel="Terug naar Shithead drankspel">
                Shithead uitgelegd
              </PageTitle>
              <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
                Raak als eerste al je kaarten kwijt. De laatste speler met kaarten over is de Shithead.
              </p>
            </div>

            <div className="surface-panel divide-y divide-line overflow-hidden">
              <section aria-labelledby="setup-heading" className="p-5 sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
                <h2 id="setup-heading" className="mb-5 text-2xl font-semibold tracking-tight lg:mb-0">Opzetten</h2>
                <div className="min-w-0 text-sm leading-relaxed text-gray-300">
                  <p>Een voorbeeldopzet per speler:</p>
                  <dl className="mt-3 divide-y divide-line border-t border-line">
                    <div className="flex justify-between gap-4 py-3"><dt>Dicht op tafel</dt><dd className="shrink-0 font-medium text-white">3 kaarten</dd></div>
                    <div className="flex justify-between gap-4 py-3"><dt>Open bovenop de dichte kaarten</dt><dd className="shrink-0 font-medium text-white">3 kaarten</dd></div>
                    <div className="flex justify-between gap-4 py-3"><dt>In de hand</dt><dd className="shrink-0 font-medium text-white">5 kaarten</dd></div>
                  </dl>
                  <p className="mt-4">De overige kaarten vormen de trekstapel.</p>
                  <p className="mt-3">Voordat het spel begint mag je kaarten uit je hand wisselen met je 3 open kaarten. Zodra het spel begint, mag dit niet meer.</p>
                </div>
              </section>

              <section aria-labelledby="turn-heading" className="p-5 sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
                <h2 id="turn-heading" className="mb-5 text-2xl font-semibold tracking-tight lg:mb-0">Je beurt</h2>
                <div className="min-w-0 space-y-3 text-sm leading-relaxed text-gray-300">
                  <p>Speel om de beurt een kaart op de aflegstapel. Je kaart moet <strong className="font-medium text-white">gelijk aan of hoger zijn dan</strong> de bovenste kaart. Voor de speciale kaarten hieronder gelden andere regels.</p>
                  <p>Heb je meerdere kaarten met dezelfde waarde? Dan mag je ze tegelijk spelen.</p>
                  <p>Zolang de trekstapel niet leeg is, vul je na je beurt je hand weer aan tot <strong className="font-medium text-white">het afgesproken aantal handkaarten</strong>.</p>
                  <p>Kun je geen kaart spelen? Dan kun je:</p>
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>De volledige aflegstapel pakken.</li>
                    <li>Gokken met de bovenste kaart van de trekstapel.</li>
                  </ol>
                  <p>Kan de gegokte kaart gespeeld worden, dan leg je hem op de stapel. Kan dat niet, dan moet je alsnog de aflegstapel pakken.</p>
                  <p>Wanneer iemand de stapel pakt, is zijn beurt voorbij. De volgende speler begint op een lege stapel.</p>
                </div>
              </section>
            </div>

            <section aria-labelledby="special-cards-heading">
              <h2 id="special-cards-heading" className="text-2xl font-semibold tracking-tight">Speciale kaarten</h2>
              <div className="mt-5 divide-y divide-line border-t border-line">
                {SPECIAL_CARDS.map(({ value, title, description }) => (
                  <article key={value} className="grid min-w-0 gap-5 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-center md:gap-10">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{value}: {title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                    </div>
                    <div className="grid w-full max-w-md grid-cols-4 gap-2 sm:gap-4" role="group" aria-label={`Alle kaarten met waarde ${value}`}>
                      {CARD_SUITS.map((suit) => <PlayingCard key={suit.value} rank={value} suit={suit} />)}
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                <strong className="font-medium text-white">Vier dezelfde kaarten achter elkaar?</strong> Dan verbrand je de stapel ook. Wie de vierde kaart speelt, mag opnieuw beginnen.
              </p>
            </section>

            <div className="surface-panel divide-y divide-line overflow-hidden">
              <section aria-labelledby="table-cards-heading" className="p-5 sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
                <h2 id="table-cards-heading" className="mb-5 text-2xl font-semibold tracking-tight lg:mb-0">Open en dichte kaarten</h2>
                <div className="min-w-0 space-y-3 text-sm leading-relaxed text-gray-300">
                  <p>Wanneer de trekstapel leeg is, speel je eerst alle kaarten uit je hand weg. Daarna gebruik je je <strong className="font-medium text-white">3 open kaarten</strong>.</p>
                  <p>Zijn die ook weg? Dan speel je je <strong className="font-medium text-white">3 dichte kaarten blind</strong>. Draai tijdens je beurt één kaart om.</p>
                  <p>Kan die gespeeld worden, dan blijft hij op de aflegstapel liggen. Kan dat niet, dan pak je de volledige stapel. Speel eerst je hand weer leeg voordat je verdergaat met de kaarten op tafel.</p>
                </div>
              </section>

              <section aria-labelledby="round-end-heading" className="p-5 sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
                <h2 id="round-end-heading" className="mb-5 text-2xl font-semibold tracking-tight lg:mb-0">Einde van de ronde</h2>
                <div className="min-w-0 space-y-3 text-sm leading-relaxed text-gray-300">
                  <p>De eerste speler zonder kaarten is klaar en wint. De rest speelt verder totdat er nog één speler met kaarten over is: de <strong className="font-medium text-white">Shithead</strong>.</p>
                  <Link href="/drankspellen/shithead" className="text-link">Bekijk de drankregels</Link>
                </div>
              </section>
            </div>
            <p className="text-sm leading-relaxed text-muted">{shitheadHandSizeNote}</p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
