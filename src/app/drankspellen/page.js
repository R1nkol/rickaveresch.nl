"use client";

import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const DRINK_GAMES = [
  {
    title: "Blackjack drankspel",
    label: "Kaartspel",
    description:
      "Speel blackjack met fiches, drinkregels en speciale momenten zoals blackjack en bust.",
    href: "/drankspellen/blackjack",
    links: [
      { label: "Bekijk regels", href: "/drankspellen/blackjack" },
      { label: "Basis uitleg", href: "/drankspellen/blackjack/uitleg" },
    ],
    tags: [""],
  },
];

export default function DrankspellenPage() {
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
            <section className="space-y-4 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Kies je spel
              </h1>
              <p className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg lg:mx-0">
                Hier vind je alle drankspellen met duidelijke regels en uitleg.
                Klik op een spel om direct te starten.
              </p>
            </section>

            <section className="space-y-6">
              {DRINK_GAMES.map((game) => (
                <article
                  key={game.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_6px_16px_rgba(3,7,18,0.35)] transition-all duration-700 hover:border-emerald-300/40 hover:shadow-[0_12px_24px_rgba(16,185,129,0.18)] supports-[backdrop-filter]:bg-white/[0.05] hover:backdrop-blur-sm"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                  </div>

                  <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                        {game.label}
                      </p>
                      <h2 className="text-3xl font-semibold text-white">
                        {game.title}
                      </h2>
                      <p className="max-w-2xl text-sm text-gray-300 sm:text-base">
                        {game.description}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                        {game.tags.join(" • ")}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
                      {game.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-2 text-sm text-gray-200 transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
