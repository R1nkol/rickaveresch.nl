"use client";

import { FiArrowUpRight } from "react-icons/fi";

export default function ContactSection() {
  return (
    <section id="contact" className="relative px-4 pb-32">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_rgba(3,7,18,0))]" />
      <div className="absolute right-6 top-16 -z-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="mx-auto grid w-full max-w-6xl items-start gap-16 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold md:text-5xl text-white">
            Kom <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">in contact</span>
          </h2>
          <p className="max-w-xl text-base text-gray-200">
            Als je vragen hebt of een project wilt starten, stuur me dan gerust een bericht!
          </p>
          <div className="grid gap-3 text-sm text-gray-300"></div>
        </div>
        <form className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] p-8 shadow-[0_6px_12px_-4px_rgba(79,70,229,0.25)] supports-[backdrop-filter]:bg-white/[0.12]">
          <div className="absolute -top-24 left-0 h-44 w-44 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-0 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-gray-200">
              Naam
              <input
                type="text"
                className="mt-2 block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="Rick Averesch"
              />
            </label>
            <label className="text-sm font-medium text-gray-200">
              Email
              <input
                type="email"
                className="mt-2 block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="rick@averesch.nl"
              />
            </label>
          </div>
          <label className="relative mt-5 block text-sm font-medium text-gray-200">
            Bericht
            <textarea
              rows={5}
              className="mt-2 block w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              placeholder="Hallo Rick, ik heb een vraag over..."
            ></textarea>
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-purple-200/40 bg-purple-500/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-purple-200/60 hover:bg-purple-500/40 md:w-auto"
          >
            Verzend bericht
            <FiArrowUpRight className="text-base" />
          </button>
        </form>
      </div>
    </section>
  );
}
