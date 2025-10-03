"use client";

export default function ServicesSection({ skillsItems, isMobile }) {
  return (
    <section id="skills" className="relative overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15),_rgba(3,7,18,0))]" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Mijn <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">specialiteiten</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-200">
            De gebieden waar ik me het meest mee bezig houd.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-8 text-left shadow-[0_10px_24px_-12px_rgba(124,58,237,0.35)] transition duration-500 hover:-translate-y-2 hover:border-purple-300/40">
            <div className="absolute -right-10 -top-8 h-20 w-20 rounded-full bg-purple-500/15 blur-xl" />
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-400/20 text-purple-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m5.25-3-5.25 5.25 5.25 5.25 5.25-5.25-5.25-5.25z" />
              </svg>
            </div>
            <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">Game Development</h3>
            <p className="relative z-10 mt-3 text-sm text-gray-200">
              In mijn vrije tijd ben ik het vaakst bezig met het maken van games. Dit doe ik met Godot en GDScript.
            </p>
          </div>
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] p-8 text-left shadow-[0_10px_24px_-12px_rgba(236,72,153,0.35)] transition duration-500 hover:-translate-y-2 hover:border-pink-300/40">
            <div className="absolute -left-10 -top-12 h-24 w-24 rounded-full bg-pink-500/25 blur-xl transition group-hover:scale-125" />
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-pink-400/40 bg-pink-400/20 text-pink-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 17.25-2.25 2.25-2.25-2.25m11.25-7.5 2.25-2.25 2.25 2.25m-16.5 9 4.5-4.5 3 3 6-6 4.5 4.5m-9-7.5 2.25-2.25L16.5 9" />
              </svg>
            </div>
            <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">Web Development</h3>
            <p className="relative z-10 mt-3 text-sm text-gray-200">
              Op school en op stages ben ik voornamelijk bezig geweest met web development, vooral back-end werk.
            </p>
          </div>
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.01] to-transparent p-8 text-left shadow-[0_10px_24px_-12px_rgba(56,189,248,0.35)] transition duration-500 hover:-translate-y-2 hover:border-cyan-300/40">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-400/20 text-cyan-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.5 10.5-4.5 4.5m0 0-4.5-4.5m4.5 4.5V3" />
              </svg>
            </div>
            <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">Software Development</h3>
            <p className="relative z-10 mt-3 text-sm text-gray-200">
              Op school ben ik naast web development ook bezig met algemene software ontwikkeling, voornamelijk in C#.
            </p>
          </div>
        </div>
        <div className="relative mt-8 flex h-28 w-full items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 supports-[backdrop-filter]:bg-white/[0.06]">
          <div className={`marquee-track flex ${isMobile ? "w-full" : "w-[300%]"} gap-4`}>
            <div className={`flex ${isMobile ? "w-full" : "w-1/2"} justify-center gap-4`}>
              {skillsItems.map((item, index) => (
                <div
                  key={`set1-${index}`}
                  className="flex w-24 shrink-0 flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] px-3 py-3 text-center text-xs text-gray-100 transition hover:border-purple-200/30 hover:bg-white/[0.08] hover:text-white"
                >
                  <img src={item.src} alt={item.label} className="h-7 w-7 object-contain" />
                  <p className="mt-2 cursor-default">{item.label}</p>
                </div>
              ))}
            </div>
            {!isMobile && (
              <div className="flex w-1/2 justify-center gap-4">
                {skillsItems.map((item, index) => (
                  <div
                    key={`set2-${index}`}
                    className="flex w-24 shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 text-center text-xs text-gray-100 transition hover:border-purple-200/30 hover:bg-white/[0.08] hover:text-white"
                  >
                    <img src={item.src} alt={item.label} className="h-7 w-7 object-contain" />
                    <p className="mt-2 cursor-default">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
