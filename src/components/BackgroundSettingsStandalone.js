"use client";

import { useState } from "react";

import BackgroundSettingsPanel from "@/components/BackgroundSettingsPanel";
import useBackgroundSettingsControls from "@/hooks/useBackgroundSettingsControls";

export default function BackgroundSettingsStandalone({
  variant = "floating",
  stopSelector,
  className,
  style,
  gap,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const {
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
  } = useBackgroundSettingsControls();

  return (
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
      variant={variant}
      stopSelector={stopSelector}
      className={className}
      style={style}
      gap={gap}
    />
  );
}
