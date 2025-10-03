"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-r from-purple-500/40 via-fuchsia-500/20 to-transparent blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-gradient-to-r from-indigo-500/30 via-purple-500/10 to-transparent blur-3xl" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6 text-left">
          <span className="inline-flex items-center rounded-lg bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.4em] text-purple-200/90">
            Wie ik ben
          </span>
          <h2 className="text-4xl font-bold md:text-5xl">
            Een creatieve <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">ontwikkelaar</span> met liefde voor detail
          </h2>
          <div className="space-y-4 text-lg text-gray-200">
            <p>
              Hoi! Ik ben Rick Averesch, 19 jaar en student Software Development aan ROC van Twente, Almelo de Sumpel.
            </p>
            <p>Buiten mijn studie verdiep ik me in game development in Godot met GDScript.</p>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-500/20 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgb(168,85,247,0.25)] transition hover:border-purple-300/60 hover:bg-purple-500/30"
          >
            Kom in contact
          </Link>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute -top-6 -left-6 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-10 -right-4 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_25px_50px_-20px_rgba(109,40,217,0.45)] supports-[backdrop-filter]:bg-white/[0.08]">
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
