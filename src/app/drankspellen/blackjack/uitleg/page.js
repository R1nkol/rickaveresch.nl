"use client";

import { useState } from "react";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RuleExample, { CardHand } from "@/components/RuleExample";

const CARD_VALUES = [
  { label: "Kaarten 2 t/m 10", value: "Het getal op de kaart is ook het aantal punten.", cards: [{ rank: "2", suit: "diamonds", caption: "2 punten" }, { rank: "7", suit: "clubs", caption: "7 punten" }, { rank: "10", suit: "spades", caption: "10 punten" }] },
  { label: "Boer, vrouw, heer", value: "Deze drie kaarten zijn ieder 10 punten waard.", cards: [{ rank: "J", suit: "clubs", caption: "10 punten" }, { rank: "Q", suit: "hearts", caption: "10 punten" }, { rank: "K", suit: "spades", caption: "10 punten" }] },
  { label: "Aas", value: "Een aas telt als 1 of 11. Gebruik de waarde waarmee je niet boven 21 komt.", cards: [{ rank: "A", suit: "hearts", caption: "1 of 11 punten" }] },
];

const FLOW_STEPS = [
  "Iedereen legt een inzet neer.",
  "De dealer deelt aan iedereen twee kaarten, ook aan zichzelf. Van de dealer ligt er één open en één dicht.",
  "Kies om de beurt: een kaart erbij (hit), of stoppen (stand). Double down en split zijn extra keuzes.",
  "De dealer neemt kaarten tot minstens 17 punten. In deze huisregels stopt de dealer ook bij een aas + 6 (soft 17).",
  "Vergelijk de punten: de hoogste hand van maximaal 21 wint. Een blackjack op de eerste twee kaarten is sterker dan een gewone 21.",
];

const BASIC_ACTIONS = [
  {
    title: "Hit",
    description: "Neem een extra kaart om dichter bij 21 te komen.",
  },
  {
    title: "Stand",
    description: "Je past, je neemt geen extra kaarten meer deze ronde.",
  },
];

const ADVANCED_ACTIONS = [
  {
    title: "Double down",
    description: "Verdubbel je inzet en neem 1 extra kaart, je mag daarna geen extra kaarten meer nemen.",
  },
  {
    title: "Split",
    description: (
      <>
        Heb je twee kaarten met dezelfde waarde, dan mag je splitsen.
        Je legt een extra inzet neer gelijk aan je oorspronkelijke inzet en speelt
        daarna twee handen tegelijk.
        <br /> <br />
        Split je azen, dan krijgt elke hand een extra kaart en verder geen kaarten meer.
      </>
    ),
  },
  {
    title: "Opgeven",
    description: "Je stopt meteen en krijgt de helft van je inzet terug. Dit mag alleen als je nog niet hebt gehit.",
  },
];

const SIDEBET_LINKS = [
  {
    title: "Insurance",
    description: "Extra inzet wanneer de dealer een aas open heeft liggen.",
    href: "/drankspellen/blackjack/uitleg/insurance",
  },
  {
    title: "Perfect Pair",
    description: "Bonus als je eerste twee kaarten een pair vormen.",
    href: "/drankspellen/blackjack/uitleg/perfect-pair",
  },
  {
    title: "21+3",
    description: "Bonus op een 3-kaart pokerhand met jouw kaarten en de dealerkaart.",
    href: "/drankspellen/blackjack/uitleg/21-plus-3",
  },
];

const TERMS = [
  {
    title: "Blackjack",
    description: "Aas + een kaart met waarde 10 op je eerste twee kaarten.",
  },
  {
    title: "Bust",
    description: "Je totaal komt boven de 21 uit, je verliest meteen.",
  },
  {
    title: "Push",
    description: "Gelijkspel met de dealer: je verliest je inzet niet.",
  },
  {
    title: "Soft hand",
    description: "Een hand met een aas dat als 11 telt.",
  },
];

const WIN_RULES = [
  "Je wint als je dichter bij 21 zit dan de dealer, zonder bust te gaan.",
  "Blackjack verslaat elke normale 21.",
  "Als de dealer bust gaat, winnen alle overgebleven spelers.",
];

function ExpandableItem({
  title,
  children,
  className,
  titleClassName = "font-semibold text-white",
  bodyClassName = "mt-2 text-gray-300",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`w-full cursor-pointer text-left ${titleClassName}`}
      >
        {title}
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className={bodyClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function BlackjackBasicsPage() {
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
              <PageTitle backHref="/drankspellen/blackjack" backLabel="Terug naar drankspel blackjack">
                Blackjack basis uitgelegd
              </PageTitle>
              <p className="max-w-2xl text-base text-gray-300 sm:text-lg">
                Kom dichter bij 21 dan de dealer, zonder boven de 21 uit te komen.
              </p>
            </section>

            <section className="surface-panel p-6">
              <h2 className="text-2xl font-semibold text-white">Kaartwaardes</h2>
              <div className="mt-5 divide-y divide-line text-gray-300">
                {CARD_VALUES.map((item) => (
                  <div key={item.label} className="grid gap-5 py-5 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-center md:gap-10">
                    <div><h3 className="font-semibold text-white">{item.label}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{item.value}</p></div>
                    <CardHand cards={item.cards} label={item.label} />
                  </div>
                ))}
              </div>
            </section>

            <section className="surface-panel p-6">
              <h2 className="text-2xl font-semibold text-white">Zo tel je een hand</h2>
              <div className="mt-5 divide-y divide-line">
                {[
                  { title: "Blackjack: meteen 21", cards: [{ rank: "A", suit: "spades" }, { rank: "K", suit: "hearts" }], description: "Aas (11) + heer (10) = 21 op je eerste twee kaarten: blackjack." },
                  {
                    title: "De aas past zich aan",
                    cards: [{ rank: "A", suit: "hearts" }, { rank: "6", suit: "clubs" }, { rank: "9", suit: "diamonds" }],
                    description: <>
                      Een aas kan 11 of 1 waard zijn.
                      <br />
                      Met 11: 11 + 6 + 9 = 26. Dat is bust.
                      <br />
                      Daarom telt de aas hier als 1: 1 + 6 + 9 = 16. Je bent dus niet bust.
                    </>,
                  },
                  { title: "Boven 21 is bust", cards: [{ rank: "10", suit: "clubs" }, { rank: "8", suit: "diamonds" }, { rank: "6", suit: "spades" }], description: "10 + 8 + 6 = 24. Je bent bust en verliest deze hand meteen." },
                ].map((example) => <div key={example.title} className="py-5 first:pt-0 last:pb-0"><RuleExample {...example} /></div>)}
              </div>
            </section>

            <section className="surface-panel p-6">
              <h2 className="text-2xl font-semibold text-white">Spelverloop</h2>
              <div className="mt-5"><RuleExample title="Zo zien de dealerkaarten er bij de start uit" cards={[{ rank: "A", suit: "diamonds", caption: "Open kaart" }, { faceDown: true, caption: "Dichte kaart" }]} /></div>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-300">
                {FLOW_STEPS.map((step) => (
                  <li
                    key={step}
                    className="surface-inset px-4 py-3"
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <div className="order-2 surface-panel p-6 lg:order-1">
                <h2 className="text-2xl font-semibold text-white">
                  Geavanceerde acties
                </h2>
                <div className="mt-4 space-y-3 text-base text-gray-300">
                  {ADVANCED_ACTIONS.map((action) => (
                    <ExpandableItem
                      key={action.title}
                      title={action.title}
                      className="surface-inset px-4 py-3"
                    >
                      {action.description}
                    </ExpandableItem>
                  ))}
                </div>
                <p className="mt-6 font-medium text-accent">
                  Side bets
                </p>
                <div className="mt-3 space-y-3 text-base text-gray-300">
                  {SIDEBET_LINKS.map((link) => (
                    <ExpandableItem
                      key={link.href}
                      title={link.title}
                      className="surface-inset px-4 py-3"
                      bodyClassName="mt-2"
                    >
                      <p className="text-gray-300">{link.description}</p>
                      <Link
                        href={link.href}
                        className="mt-3 inline-flex font-medium text-accent"
                      >
                        Open uitleg
                      </Link>
                    </ExpandableItem>
                  ))}
                </div>
              </div>

              <div className="order-1 space-y-6 lg:order-2">
                <div className="surface-panel p-6">
                  <h2 className="text-2xl font-semibold text-white">
                    Basis acties
                  </h2>
                  <div className="mt-4 space-y-3 text-base text-gray-300">
                    {BASIC_ACTIONS.map((action) => (
                      <ExpandableItem
                        key={action.title}
                        title={action.title}
                        className="surface-inset px-4 py-3"
                      >
                        {action.description}
                      </ExpandableItem>
                    ))}
                  </div>
                </div>

                <div className="surface-panel p-6">
                  <h2 className="text-2xl font-semibold text-white">Begrippen</h2>
                  <div className="mt-4 space-y-3 text-base text-gray-300">
                    {TERMS.map((term) => (
                      <ExpandableItem
                        key={term.title}
                        title={term.title}
                        className="surface-inset px-4 py-3"
                      >
                        {term.description}
                      </ExpandableItem>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="surface-panel p-6">
              <h2 className="text-2xl font-semibold text-white">
                Wie wint de ronde?
              </h2>
              <ul className="mt-4 space-y-3 text-base text-gray-300">
                {WIN_RULES.map((rule) => (
                  <li
                    key={rule}
                    className="surface-inset px-4 py-3"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </section>
            <p className="text-sm text-muted">Meer over de basisregels: <a href="https://bicyclecards.com/how-to-play/blackjack/" target="_blank" rel="noopener noreferrer" className="text-link">Blackjack bij Bicycle Cards</a>. De drinkregels en de dealerregel hierboven zijn onze huisregels.</p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
