"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

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

  return (
    <section
      id="home"
      className="home-hero"
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
        className="hero-settings"
      />

      {renderBackground(values)}
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-intro">
        <h1 className="hero-name">
          Rick <span>Averesch</span>
        </h1>
        <p className="hero-profession">{t("hero.profession")}</p>
        <div className="hero-actions">
          <Link href="#projects" className="button-primary">
            {t("hero.workCta")}
            <FiArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="#contact" className="button-secondary">
            {t("hero.contactCta")}
          </Link>
        </div>
      </div>
      <Link href="#about" className="hero-scroll" aria-label={t("navigation.about")}>
        <span className="scroll-mouse" aria-hidden="true">
          <span className="scroll-wheel" />
        </span>
      </Link>
    </section>
  );
}
