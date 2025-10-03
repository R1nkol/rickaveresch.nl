"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6 text-left">
          <span className="inline-flex items-center rounded-lg bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.4em] text-purple-200/90">
            Wie ik ben
          </span>
          <h2 className="text-4xl font-bold md:text-5xl">
            Een{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
              developer
            </span>{" "}
            met oog voor{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
              detail
            </span>
          </h2>
          <div className="space-y-4 text-lg text-gray-200">
            <p>
              Hoi! Ik ben Rick Averesch, 19 jaar en student Software Development
              aan ROC van Twente, Almelo de Sumpel.
            </p>
            <p>
              Buiten mijn studie verdiep ik me in game development in Godot met
              GDScript.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-500/20 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_12px_rgb(168,85,247,0.2)] transition hover:border-purple-300/60 hover:bg-purple-500/30"
          >
            Kom in contact
          </Link>
        </div>

        <div className="relative flex justify-center">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_12px_24px_-10px_rgba(109,40,217,0.25)] supports-[backdrop-filter]:bg-white/[0.08]">
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl" />
            <div className="absolute -bottom-0 -right-0 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />

            <Image
              src="/Images/MyPicture.jpg"
              alt="Profile"
              width={420}
              height={420}
              className="h-full w-full max-w-sm rounded-2xl object-cover transition-transform duration-[12000ms] ease-out hover:scale-105"
            />
            <div className="absolute inset-4 rounded-2xl border border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
