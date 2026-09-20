"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const DRINK_GAMES = [
  {
    title: "Blackjack",
    label: "Kaartspel",
    href: "/drankspellen/blackjack",
    intensity: 4,
    fun: 3,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/blackjack" },
      { label: "Basis uitleg", href: "/drankspellen/blackjack/uitleg" },
    ],
  },
  {
    title: "Poker",
    label: "Kaartspel",
    href: "/drankspellen/poker",
    intensity: 3,
    fun: 2,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/poker" },
      { label: "Uitleg video", href: "https://www.youtube.com/watch?v=Id0f8mxTiWQ", external: true },
    ],
  },
  {
    title: "Mario Party",
    label: "Party game",
    href: "/drankspellen/mario-party",
    intensity: 4,
    fun: 4,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/mario-party" },
    ],
  },
  {
    title: "Mario Kart",
    label: "Party game",
    href: "/drankspellen/mario-kart",
    intensity: 5,
    fun: 1,
    links: [
      { label: "Bekijk regels", href: "/drankspellen/mario-kart" },
    ],
  },
];

function IntensityStars({ intensity }) {
  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 1:
        return "text-green-400";
      case 2:
        return "text-green-300";
      case 3:
        return "text-yellow-400";
      case 4:
        return "text-orange-400";
      case 5:
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const starColor = getIntensityColor(intensity);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-medium text-gray-400">Heftigheid:</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= intensity ? starColor : "text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

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
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-12">
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <h1 className="page-heading">
                  Kies een spel
                </h1>

                <button
                  type="button"
                  onClick={() =>
                    setSortBy((current) =>
                      current === "fun_desc" ? "intensity_desc" : "fun_desc"
                    )
                  }
                  className="button-secondary"
                >
                  Sorteren:{" "}
                  {sortBy === "fun_desc"
                    ? "Mijn favoriete"
                    : "Heftigheid"}
                </button>
              </div>
              <p className="max-w-2xl text-base text-gray-300 sm:text-lg lg:mx-0">
                Hier vind je al mijn favoriete drankspellen om te spelen
              </p>
            </section>

            <section className="space-y-6">
              {sortedGames.map((game) => (
                <article
                  key={game.title}
                  className="border-t border-line py-8"
                >

                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-3xl font-semibold text-white">
                          {game.title}
                        </h2>
                        <div className="pt-1">
                          <IntensityStars intensity={game.intensity} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {game.links.map((link, index) => {
                        const className = index === 0 ? "button-primary" : "button-secondary";
                        
                        if (link.external) {
                          return (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={className}
                            >
                              {link.label}
                            </a>
                          );
                        }
                        
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={className}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <section className="surface-panel p-5 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Algemene regels
              </h2>
              <p className="mt-3 text-base text-gray-300">
                Drink verantwoord en ken je grenzen. Let op de volgende punten:
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-gray-300">
                <li>Definities: 1 slok = kleine slok. 1 vol adtje = 5 slokken (adten in een keer of verdelen).</li>
                <li>Per moment geldt alleen de zwaarste regel (scheelt discussies en stapelen).</li>
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
