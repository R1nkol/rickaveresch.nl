"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FiSettings, FiX } from "react-icons/fi";

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

const effectMeta = {
  balls: {
    label: "Aantal ballen:",
    max: 100,
    renderBackground: (values) => (
      <AnimatedBallsBackground numBalls={values.ballCount} />
    ),
  },
  rain: {
    label: "Aantal regendruppels:",
    max: 1000,
    renderBackground: (values) => <RainBackground numDrops={values.rainCount} />,
  },
  stars: {
    label: "Aantal sneeuwvlokken:",
    max: 500,
    renderBackground: (values) => <StarsBackground numStars={values.starCount} />,
  },
  orbit: {
    label: "Aantal objecten:",
    max: 100,
    extraControl: {
      label: "Maximale radius:",
      min: 20,
      max: 500,
      getValue: (values) => values.orbitRadius,
    },
    renderBackground: (values) => (
      <OrbitBackground
        numOrbits={values.orbitCount}
        maxRadius={values.orbitRadius}
      />
    ),
  },
  fireflies: {
    label: "Aantal vuurvliegjes:",
    max: 500,
    renderBackground: (values) => (
      <FirefliesBackground numFireflies={values.firefliesCount} />
    ),
  },
  "attract-repel": {
    label: "Aantal objecten:",
    max: 500,
    extraControl: {
      label: "Muis reach:",
      min: 20,
      max: 300,
      getValue: (values) => values.attractRepelRange,
    },
    renderBackground: (values) => (
      <AttractRepelBackground
        numParticles={values.attractRepelCount}
        interactionRadius={values.attractRepelRange}
      />
    ),
  },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

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

  const effectDetails = effectMeta[effect] ?? effectMeta.balls;

  const getValueForEffect = () => {
    switch (effect) {
      case "balls":
        return ballCount;
      case "rain":
        return rainCount;
      case "stars":
        return starCount;
      case "orbit":
        return orbitCount;
      case "fireflies":
        return firefliesCount;
      case "attract-repel":
        return attractRepelCount;
      default:
        return 0;
    }
  };

  const handleEffectValueChange = (nextValue) => {
    switch (effect) {
      case "balls":
        setBallCount(nextValue);
        break;
      case "rain":
        setRainCount(nextValue);
        break;
      case "stars":
        setStarCount(nextValue);
        break;
      case "orbit":
        setOrbitCount(nextValue);
        break;
      case "fireflies":
        setFirefliesCount(nextValue);
        break;
      case "attract-repel":
        setAttractRepelCount(nextValue);
        break;
      default:
        break;
    }
  };

  const extraControl = effectDetails.extraControl;
  const extraValue = extraControl?.getValue?.(values) ?? 0;

  const handleExtraChange = (nextValue) => {
    if (!extraControl) return;
    if (effect === "orbit") {
      setOrbitRadius(nextValue);
    }
    if (effect === "attract-repel") {
      setAttractRepelRange(nextValue);
    }
  };

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
      <div className="absolute bottom-6 left-6 z-20" style={{ overflowAnchor: "none" }}>
        {showSettings ? (
          <div className="w-64 space-y-4 rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-sm text-white backdrop-blur supports-[backdrop-filter]:bg-white/[0.09] animate-fade-in-up">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-white transition hover:text-red-400"
              >
                <FiX size={18} />
              </button>
            </div>

            <select
              value={effect}
              onChange={(event) => setEffect(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            >
              <option value="balls">Ballen</option>
              <option value="rain">Regen</option>
              <option value="stars">Sneeuw</option>
              <option value="fireflies">Vuurvliegjes</option>
              <option value="attract-repel">Aantrekkingseffect</option>
              <option value="orbit">Roterende objecten</option>
            </select>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-medium">
                {effectDetails.label}
                <input
                  type="number"
                  min={0}
                  max={effectDetails.max}
                  value={getValueForEffect().toString()}
                  onChange={(event) => {
                    const numericValue = clamp(
                      parseInt(event.target.value, 10) || 0,
                      0,
                      effectDetails.max
                    );
                    handleEffectValueChange(numericValue);
                  }}
                  className="w-12 border-none bg-transparent text-left text-white outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={effectDetails.max}
              value={getValueForEffect()}
              onChange={(event) => {
                const numericValue = parseInt(event.target.value, 10) || 0;
                handleEffectValueChange(numericValue);
              }}
              className="w-full accent-purple-500"
            />

            {extraControl && (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="text-sm">{extraControl.label}</span>
                  <input
                    type="number"
                    min={extraControl.min}
                    max={extraControl.max}
                    value={extraValue}
                    onChange={(event) => {
                      const numericValue = clamp(
                        parseInt(event.target.value, 10) || 0,
                        extraControl.min,
                        extraControl.max
                      );
                      handleExtraChange(numericValue);
                    }}
                    className="w-16 border-none bg-transparent text-white outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>

                <input
                  type="range"
                  min={extraControl.min}
                  max={extraControl.max}
                  value={extraValue}
                  onChange={(event) => {
                    const numericValue = parseInt(event.target.value, 10) || 0;
                    handleExtraChange(numericValue);
                  }}
                  className="w-full accent-purple-500"
                />
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowSettings(true)}
            className="rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:border-purple-400/40 hover:bg-purple-500/25"
            aria-label="Open instellingen"
          >
            <FiSettings size={20} />
          </button>
        )}
      </div>

      {effectDetails.renderBackground(values)}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-2xl" />
      <div className="relative z-10 mt-16 w-full max-w-3xl md:mt-0 text-center">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Rick <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">Averesch</span>
        </h1>
        <p className="mt-4 text-lg text-gray-200 md:text-xl">Software &amp; Game Developer</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/20 px-6 py-2 text-sm font-semibold text-white transition hover:border-purple-300/60 hover:bg-purple-500/30"
          >
            Mijn werk
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-2 text-sm font-semibold text-gray-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            Kom in contact
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
