"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import BackgroundSettingsPanel from "@/components/BackgroundSettingsPanel";
import { useLanguage } from "@/contexts/LanguageContext";

const AnimatedBallsBackground = dynamic(
  () => import("@/components/AnimatedBallsBackground"),
  { ssr: false }
);
const RainBackground = dynamic(
  () => import("@/components/RainBackground"),
  { ssr: false }
);
const StarsBackground = dynamic(
  () => import("@/components/StarsBackground"),
  { ssr: false }
);
const OrbitBackground = dynamic(
  () => import("@/components/OrbitBackground"),
  { ssr: false }
);
const FirefliesBackground = dynamic(
  () => import("@/components/FirefliesBackground"),
  { ssr: false }
);
const AttractRepelBackground = dynamic(
  () => import("@/components/AttractRepelBackground"),
  { ssr: false }
);

const backgroundRenderers = {
  balls: (values) => <AnimatedBallsBackground numBalls={values.ballCount} />,
  rain: (values) => <RainBackground numDrops={values.rainCount} />,
  stars: (values) => <StarsBackground numStars={values.starCount} />,
  orbit: (values) => (
    <OrbitBackground
      numOrbits={values.orbitCount}
      maxRadius={values.orbitRadius}
    />
  ),
  fireflies: (values) => (
    <FirefliesBackground numFireflies={values.firefliesCount} />
  ),
  "attract-repel": (values) => (
    <AttractRepelBackground
      numParticles={values.attractRepelCount}
      interactionRadius={values.attractRepelRange}
    />
  ),
};

export default function HeroSection({
  effect,
  setEffect,
  ballCount,
  setBallCount,
  rainCount,
  setRainCount,
  starCount,
  setStarCount,
  orbitCount,
  setOrbitCount,
  orbitRadius,
  setOrbitRadius,
  firefliesCount,
  setFirefliesCount,
  attractRepelCount,
  setAttractRepelCount,
  attractRepelRange,
  setAttractRepelRange,
  showSettings,
  setShowSettings,
}) {
  const { t } = useLanguage();

  const values = {
    ballCount,
    rainCount,
    starCount,
    orbitCount,
    orbitRadius,
    firefliesCount,
    attractRepelCount,
    attractRepelRange,
  };

  const renderBackground =
    backgroundRenderers[effect] ?? backgroundRenderers.balls;

  const handleScrollToAbout = () => {
    const section = document.getElementById("about");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden px-4 text-center bg-[#030712]"
    >
      <BackgroundSettingsPanel
        effect={effect}
        setEffect={setEffect}
        ballCount={ballCount}
        setBallCount={setBallCount}
        rainCount={rainCount}
        setRainCount={setRainCount}
        starCount={starCount}
        setStarCount={setStarCount}
        orbitCount={orbitCount}
        setOrbitCount={setOrbitCount}
        orbitRadius={orbitRadius}
        setOrbitRadius={setOrbitRadius}
        firefliesCount={firefliesCount}
        setFirefliesCount={setFirefliesCount}
        attractRepelCount={attractRepelCount}
        setAttractRepelCount={setAttractRepelCount}
        attractRepelRange={attractRepelRange}
        setAttractRepelRange={setAttractRepelRange}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        className="absolute bottom-6 left-6 z-20"
      />

      {renderBackground(values)}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mt-16 w-full max-w-3xl md:mt-0 text-center">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Rick <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">Averesch</span>
        </h1>
        <p className="mt-4 text-lg text-gray-200 md:text-xl">{t("hero.profession")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/20 px-6 py-2 text-sm font-semibold text-white transition hover:border-purple-300/60 hover:bg-purple-500/30"
          >
            {t("hero.workCta")}
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-2 text-sm font-semibold text-gray-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            {t("hero.contactCta")}
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
        onClick={handleScrollToAbout}
      >
        <div className="relative w-7 h-12">
          <div className="w-[2px] px-3 py-2 h-8 border-2 border-white rounded-xl opacity-75 box-content">
            <div className="w-[2px] h-2 bg-white rounded-md animate-scroll" />
          </div>
        </div>
      </div>
    </section>
  );
}
