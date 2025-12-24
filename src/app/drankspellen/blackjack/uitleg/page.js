"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const CARD_VALUES = [
  { label: "Kaarten 2 t/m 10", value: "Punten gelijk aan de kaartwaarde." },
  { label: "Boer, vrouw, heer", value: "Elke kaart is 10 punten." },
  { label: "Aas", value: "1 of 11, wat voor jouw hand het beste uitkomt." },
];

const FLOW_STEPS = [
  "Iedereen legt een inzet neer.",
  "Dealer deelt 2 kaarten aan elke speler en zichzelf, 1 kaart van de dealer ligt open.",
  "Spelers kiezen voor hit of stand (optioneel: double down of split).",
  "Dealer hit totdat hij 17 of hoger heeft en stopt op soft 17.",
  "Vergelijk totals: hoogste onder of gelijk aan 21 wint.",
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
        Split je azen, dan krijgt elke hand één extra kaart en moet je direct stoppen.
      </>
    ),
  },
  {
    title: "Opgeven",
    description: "Je stopt meteen en krijgt de helft van je inzet terug. Dit mag alleen als je nog niet hebt gehit.",
  },
  {
    title: "Side bet",
    description: "Extra inzet naast je hoofd inzet, kies hieronder een variant.",
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
    description: "Je total komt boven de 21 uit, je verliest meteen.",
  },
  {
    title: "Push",
    description: "Gelijkspel met de dealer, je inzet blijft staan.",
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
              Terug naar drankspel blackjack
            </Link>

            <section className="space-y-4">
              <h1 className="text-4xl font-extrabold sm:text-5xl">
                Blackjack basis uitgelegd
              </h1>
              <p className="max-w-2xl text-base text-gray-300 sm:text-lg">
                Deze uitleg is voor mensen die nog nooit blackjack hebben gespeeld.
                We starten met het tellen van kaarten en lopen daarna door het spelverloop.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Kaartwaardes</h2>
              <p className="mt-2 text-sm text-gray-300">
                Zo tel je je hand in punten voordat je keuzes maakt.
              </p>
              <div className="mt-4 space-y-3 text-sm text-gray-300">
                {CARD_VALUES.map((item) => (
                  <ExpandableItem
                    key={item.label}
                    title={item.label}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    titleClassName="font-semibold text-white"
                    bodyClassName="mt-2 text-gray-300"
                  >
                    {item.value}
                  </ExpandableItem>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Spelverloop</h2>
              <p className="mt-2 text-sm text-gray-300">
                Dit is hoe een ronde blackjack verloopt, van inzetten tot uitslag.
              </p>
              <ol className="mt-4 space-y-3 text-sm text-gray-300">
                {FLOW_STEPS.map((step) => (
                  <li
                    key={step}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <div className="order-2 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:order-1">
                <h2 className="text-2xl font-semibold text-white">
                  Geavanceerde acties
                </h2>
                <p className="mt-2 text-sm text-gray-300">
                  Dit zijn de extra acties die je kunt doen tijdens je beurt.
                </p>
                <div className="mt-4 space-y-3 text-sm text-gray-300">
                  {ADVANCED_ACTIONS.map((action) => (
                    <ExpandableItem
                      key={action.title}
                      title={action.title}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      {action.description}
                    </ExpandableItem>
                  ))}
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  Side bets
                </p>
                <div className="mt-3 space-y-3 text-sm text-gray-300">
                  {SIDEBET_LINKS.map((link) => (
                    <ExpandableItem
                      key={link.href}
                      title={link.title}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                      bodyClassName="mt-2"
                    >
                      <p className="text-gray-300">{link.description}</p>
                      <Link
                        href={link.href}
                        className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200"
                      >
                        Open uitleg
                      </Link>
                    </ExpandableItem>
                  ))}
                </div>
              </div>

              <div className="order-1 space-y-6 lg:order-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h2 className="text-2xl font-semibold text-white">
                    Basis acties
                  </h2>
                  <div className="mt-4 space-y-3 text-sm text-gray-300">
                    {BASIC_ACTIONS.map((action) => (
                      <ExpandableItem
                        key={action.title}
                        title={action.title}
                        className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                      >
                        {action.description}
                      </ExpandableItem>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h2 className="text-2xl font-semibold text-white">Begrippen</h2>
                  <div className="mt-4 space-y-3 text-sm text-gray-300">
                    {TERMS.map((term) => (
                      <ExpandableItem
                        key={term.title}
                        title={term.title}
                        className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                      >
                        {term.description}
                      </ExpandableItem>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">
                Wie wint de ronde?
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                {WIN_RULES.map((rule) => (
                  <li
                    key={rule}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
                  >
                    {rule}
                  </li>
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
