"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  BACKGROUND_DEFAULTS,
  BACKGROUND_STORAGE_KEYS,
  loadBackgroundSettings,
} from "@/lib/backgroundSettings";

const AnimatedBallsBackground = dynamic(
  () => import("@/components/AnimatedBallsBackground"),
  { ssr: false },
);
const RainBackground = dynamic(() => import("@/components/RainBackground"), {
  ssr: false,
});
const StarsBackground = dynamic(
  () => import("@/components/StarsBackground"),
  { ssr: false },
);
const OrbitBackground = dynamic(
  () => import("@/components/OrbitBackground"),
  { ssr: false },
);
const FirefliesBackground = dynamic(
  () => import("@/components/FirefliesBackground"),
  { ssr: false },
);
const AttractRepelBackground = dynamic(
  () => import("@/components/AttractRepelBackground"),
  { ssr: false },
);

const WATCHED_STORAGE_KEYS = new Set(Object.values(BACKGROUND_STORAGE_KEYS));

const renderers = {
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

export default function SyncedBackground() {
  const [settings, setSettings] = useState(() => ({
    ...BACKGROUND_DEFAULTS,
  }));

  useEffect(() => {
    const updateSettings = () => {
      setSettings(loadBackgroundSettings());
    };

    updateSettings();

    const handleStorage = (event) => {
      if (event.key == null || WATCHED_STORAGE_KEYS.has(event.key)) {
        updateSettings();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("background-settings-change", updateSettings);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("background-settings-change", updateSettings);
    };
  }, []);

  const renderBackground = renderers[settings.effect] ?? renderers.balls;
  return renderBackground(settings);
}
