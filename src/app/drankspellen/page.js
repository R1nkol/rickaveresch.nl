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
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_rgba(3,7,18,0))]" />
        <div className="absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-6xl space-y-12">
            <section className="space-y-4">
              <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:items-center lg:text-left">
                <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                  Kies een spel
                </h1>

                <button
                  type="button"
                  onClick={() =>
                    setSortBy((current) =>
                      current === "fun_desc" ? "intensity_desc" : "fun_desc"
                    )
                  }
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm text-gray-200 transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white"
                >
                  Sorteren:{" "}
                  {sortBy === "fun_desc"
                    ? "Mijn favoriete"
                    : "Heftigheid"}
                </button>
              </div>
              <p className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg lg:mx-0">
                Hier vind je al mijn favoriete drankspellen om te spelen
              </p>
            </section>

            <section className="space-y-6">
              {sortedGames.map((game) => (
                <article
                  key={game.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_6px_16px_rgba(3,7,18,0.35)] transition-all duration-700 hover:border-emerald-300/40 hover:shadow-[0_12px_24px_rgba(16,185,129,0.18)] supports-[backdrop-filter]:bg-white/[0.05] hover:backdrop-blur-sm"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                  </div>

                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                          {game.label}
                        </p>
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
                        const className = `inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                          index === 0
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-emerald-500/40 hover:scale-[1.02]"
                            : "border border-white/15 bg-white/5 text-gray-300 hover:border-emerald-400/40 hover:bg-white/10 hover:text-white"
                        }`;
                        
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

            <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_6px_16px_rgba(3,7,18,0.35)] supports-[backdrop-filter]:bg-white/[0.05] backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-white">
                Algemene regels
              </h2>
              <p className="mt-3 text-sm text-gray-300">
                Drink verantwoord en ken je grenzen. Let op de volgende punten:
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-gray-300">
                <li>Water en eten zijn altijd top om erbij te hebben.</li>
                <li>Geen druk: je mag altijd overslaan of wisselen naar fris/water.</li>
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
