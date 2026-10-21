"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
    example: {
      groups: [
        { label: "Start: 11 punten", cards: [{ rank: "5", suit: "hearts" }, { rank: "6", suit: "clubs" }] },
        { label: "Precies 1 kaart erbij", cards: [{ rank: "K", suit: "diamonds" }] },
      ],
      description: "Je verdubbelt je inzet. Met deze heer kom je op 21; je beurt is daarna voorbij.",
    },
    description: "Verdubbel je inzet en neem 1 extra kaart, je mag daarna geen extra kaarten meer nemen.",
  },
  {
    title: "Split",
    example: {
      groups: [
        { label: "Voor: twee achten", cards: [{ rank: "8", suit: "hearts" }, { rank: "8", suit: "clubs" }] },
        { label: "Hand 1: 18 punten", cards: [{ rank: "8", suit: "hearts" }, { rank: "K", suit: "diamonds" }] },
        { label: "Hand 2: 11 punten", cards: [{ rank: "8", suit: "clubs" }, { rank: "3", suit: "spades" }] },
      ],
      description: "Elke acht begint een eigen hand met een eigen inzet. Hier krijg je een heer en een 3 erbij; je speelt de handen apart verder.",
    },
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
    example: {
      groups: [
        { label: "Blackjack", cards: [{ rank: "A", suit: "spades" }, { rank: "K", suit: "hearts" }] },
        { label: "Gewone 21", cards: [{ rank: "7", suit: "clubs" }, { rank: "5", suit: "diamonds" }, { rank: "9", suit: "spades" }] },
      ],
      description: "Allebei 21 punten, maar alleen aas + heer op de eerste twee kaarten is blackjack. Die hand is sterker.",
    },
    description: "Aas + een kaart met waarde 10 op je eerste twee kaarten.",
  },
  {
    title: "Bust",
    example: {
      groups: [
        { label: "10 + 8 + 6 = 24 punten", cards: [{ rank: "10", suit: "clubs" }, { rank: "8", suit: "diamonds" }, { rank: "6", suit: "spades" }] },
      ],
      description: "Met 18 neem je nog een kaart. Deze 6 brengt je boven 21: bust.",
    },
    description: "Je totaal komt boven de 21 uit, je verliest meteen.",
  },
  {
    title: "Push",
    example: {
      groups: [
        { label: "Jij: 18 punten", cards: [{ rank: "10", suit: "hearts" }, { rank: "8", suit: "clubs" }] },
        { label: "Dealer: 18 punten", cards: [{ rank: "K", suit: "spades" }, { rank: "8", suit: "diamonds" }] },
      ],
      description: "Jullie eindigen allebei op 18. Je krijgt je inzet terug.",
    },
    description: "Gelijkspel met de dealer: je verliest je inzet niet.",
  },
  {
    title: "Soft hand",
    example: {
      groups: [
        { label: "Soft 17: 11 + 6", cards: [{ rank: "A", suit: "hearts" }, { rank: "6", suit: "clubs" }] },
        { label: "Na een 9: 1 + 6 + 9 = 16", cards: [{ rank: "A", suit: "hearts" }, { rank: "6", suit: "clubs" }, { rank: "9", suit: "diamonds" }] },
      ],
      description: "Eerst telt de aas als 11. Na de 9 telt hij als 1 om onder 21 te blijven. De hand is dan niet meer soft.",
    },
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
  example,
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
        className={`flex w-full cursor-pointer items-center justify-between gap-3 text-left ${titleClassName}`}
      >
        {title}
        <ChevronRight
          aria-hidden="true"
          size={18}
          className={`shrink-0 text-muted transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? "rotate-90" : "rotate-0"}`}
        />
      </button>
      <div
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className={bodyClassName}>
            {children}
            {example && (
              <div className="mt-4 border-t border-line pt-4">
                <RuleExample title="Kaartvoorbeeld" groupLayout="paired" {...example} />
              </div>
            )}
          </div>
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
                      example={action.example}
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
                        example={term.example}
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
