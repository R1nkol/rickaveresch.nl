"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Club, Dices, Flag, Spade } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IntensityStars from "@/components/IntensityStars";
import ChoiceGroup from "@/components/ChoiceGroup";
import PlacementText from "@/components/PlacementText";
import { drinkGameDescriptions } from "@/data/drinkGameDescriptions";

const DRINK_GAMES = [
  {
    title: "Blackjack",
    Icon: Club,
    description: drinkGameDescriptions.blackjack,
    href: "/drankspellen/blackjack",
    intensity: 4,
    fun: 2,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/blackjack" },
      { label: "Basis uitleg", href: "/drankspellen/blackjack/uitleg" },
    ],
  },
  {
    title: "Poker",
    Icon: Spade,
    description: drinkGameDescriptions.poker,
    href: "/drankspellen/poker",
    intensity: 3,
    fun: 1,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/poker" },
      { label: "Basis uitleg", href: "/drankspellen/poker/uitleg" },
    ],
  },
  {
    title: "Mario Party",
    Icon: Dices,
    description: drinkGameDescriptions["mario-party"],
    href: "/drankspellen/mario-party",
    intensity: 4,
    fun: 4,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/mario-party" },
    ],
  },
  {
    title: "Mario Kart",
    Icon: Flag,
    description: drinkGameDescriptions["mario-kart"],
    href: "/drankspellen/mario-kart",
    intensity: 5,
    fun: 3,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/mario-kart" },
    ],
  },
  {
    title: "Shithead",
    Icon: Spade,
    description: drinkGameDescriptions.shithead,
    href: "/drankspellen/shithead",
    intensity: 3,
    fun: 0,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/shithead" },
      { label: "Basis uitleg", href: "/drankspellen/shithead/uitleg" },
    ],
  },
  {
    title: "Schoppenjagen",
    Icon: Spade,
    description: drinkGameDescriptions.schoppenjagen,
    href: "/drankspellen/schoppenjagen",
    intensity: 1,
    fun: -1,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/schoppenjagen" },
      { label: "Basis uitleg", href: "/drankspellen/schoppenjagen/uitleg" },
    ],
  },
];

export default function DrankspellenPage() {
  const [sortBy, setSortBy] = useState("fun_desc");

  const sortedGames = useMemo(() => {
    const compareTitle = (a, b) => a.title.localeCompare(b.title, "nl");

    return [...DRINK_GAMES].sort((a, b) => {
      const intensityA = Number(a.intensity ?? 3);
      const intensityB = Number(b.intensity ?? 3);
      const funA = Number(a.fun ?? 3);
      const funB = Number(b.fun ?? 3);

      switch (sortBy) {
        case "intensity_desc":
          return intensityB - intensityA || funB - funA || compareTitle(a, b);
        case "fun_desc":
          return funB - funA || intensityB - intensityA || compareTitle(a, b);
        default:
          return 0;
      }
    });
  }, [sortBy]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-5xl space-y-8 sm:space-y-10">
            <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0 space-y-4">
                <h1 className="page-heading">
                  Kies een spel
                </h1>
                <p className="max-w-2xl text-base text-gray-300 sm:text-lg">
                  Mijn favoriete drankspellen, met de regels bij de hand.
                </p>
              </div>
              <div className="shrink-0">
                <ChoiceGroup
                  label="Sorteren op"
                  name="drink-game-sort"
                  value={sortBy}
                  onChange={setSortBy}
                  controls="drink-games"
                  options={[
                    { value: "fun_desc", label: "Mijn favorieten" },
                    { value: "intensity_desc", label: "Heftigheid" },
                  ]}
                />
              </div>
            </section>

            <section id="drink-games" aria-label="Drankspellen" className="border-b border-line">
              {sortedGames.map(({ Icon, ...game }) => (
                <article
                  key={game.title}
                  className="grid gap-4 border-t border-line py-6 md:grid-cols-[minmax(0,1fr)_10rem_17rem] md:items-center md:gap-6"
                >
                  <div className="min-w-0">
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                      <Link href={game.href} className="flex w-fit items-center gap-3 transition-colors hover:text-accent">
                        <Icon aria-hidden="true" focusable="false" strokeWidth={1.75} className="h-5 w-5 shrink-0 text-accent" />
                        <span>{game.title}</span>
                      </Link>
                    </h2>
                    <p className="mt-1 pl-8 text-sm leading-relaxed text-muted"><PlacementText>{game.description}</PlacementText></p>
                  </div>

                  <IntensityStars intensity={game.intensity} />

                  <div className="flex flex-wrap items-center gap-4 md:flex-row-reverse">
                    <Link href={game.href} className="button-primary" aria-label={`Bekijk de regels van ${game.title}`}>
                      Bekijk regels
                    </Link>
                    {game.links.filter((link) => link.href !== game.href).map((link) => link.external ? (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
                        {link.label}
                      </a>
                    ) : (
                      <Link key={link.href} href={link.href} className="text-link">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </section>

            <section className="surface-panel p-5 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Algemene regels
              </h2>
              <p className="mt-2 text-sm text-muted">
                Spreek van tevoren af hoe jullie spelen en let een beetje op elkaar.
              </p>
              <ul className="mt-5 grid list-disc gap-x-10 gap-y-3 pl-5 text-sm leading-relaxed text-gray-300 sm:grid-cols-2">
                <li>Met een slok bedoelen we een kleine slok. Een adtje telt als 5 slokken, die je ook mag verdelen.</li>
                <li>Tel straffen niet bij elkaar op; neem het hoogste aantal. Staat er expliciet ‘extra’ bij, dan tel je die slokken erbij.</li>
                <li>Als iemand het slecht heeft geef diegene dan iets van 10 minuten water.</li>
                <li>Water en eten zijn altijd top om erbij te hebben.</li>
                <li>Je mag altijd overslaan of wisselen naar fris/water.</li>
                <li>Let een beetje op elkaar. Als je merkt dat het niet goed gaat, help elkaar.</li>
              </ul>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
