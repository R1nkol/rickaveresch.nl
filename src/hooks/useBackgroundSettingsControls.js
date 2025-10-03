"use client";

import { useEffect, useState } from "react";

import {
  BACKGROUND_DEFAULTS,
  BACKGROUND_STORAGE_KEYS,
  loadBackgroundSettings,
  saveBackgroundSetting,
} from "@/lib/backgroundSettings";

export default function useBackgroundSettingsControls() {
  const [effect, setEffect] = useState(BACKGROUND_DEFAULTS.effect);
  const [ballCount, setBallCount] = useState(BACKGROUND_DEFAULTS.ballCount);
  const [rainCount, setRainCount] = useState(BACKGROUND_DEFAULTS.rainCount);
  const [starCount, setStarCount] = useState(BACKGROUND_DEFAULTS.starCount);
  const [orbitCount, setOrbitCount] = useState(BACKGROUND_DEFAULTS.orbitCount);
  const [orbitRadius, setOrbitRadius] = useState(
    BACKGROUND_DEFAULTS.orbitRadius,
  );
  const [firefliesCount, setFirefliesCount] = useState(
    BACKGROUND_DEFAULTS.firefliesCount,
  );
  const [attractRepelCount, setAttractRepelCount] = useState(
    BACKGROUND_DEFAULTS.attractRepelCount,
  );
  const [attractRepelRange, setAttractRepelRange] = useState(
    BACKGROUND_DEFAULTS.attractRepelRange,
  );

  useEffect(() => {
    const settings = loadBackgroundSettings();
    setEffect(settings.effect);
    setBallCount(settings.ballCount);
    setRainCount(settings.rainCount);
    setStarCount(settings.starCount);
    setOrbitCount(settings.orbitCount);
    setOrbitRadius(settings.orbitRadius);
    setFirefliesCount(settings.firefliesCount);
    setAttractRepelCount(settings.attractRepelCount);
    setAttractRepelRange(settings.attractRepelRange);
  }, []);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.effect, effect);
  }, [effect]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.ballCount, ballCount);
  }, [ballCount]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.rainCount, rainCount);
  }, [rainCount]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.starCount, starCount);
  }, [starCount]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.orbitCount, orbitCount);
  }, [orbitCount]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.orbitRadius, orbitRadius);
  }, [orbitRadius]);

  useEffect(() => {
    saveBackgroundSetting(
      BACKGROUND_STORAGE_KEYS.firefliesCount,
      firefliesCount,
    );
  }, [firefliesCount]);

  useEffect(() => {
    saveBackgroundSetting(
      BACKGROUND_STORAGE_KEYS.attractRepelCount,
      attractRepelCount,
    );
  }, [attractRepelCount]);

  useEffect(() => {
    saveBackgroundSetting(
      BACKGROUND_STORAGE_KEYS.attractRepelRange,
      attractRepelRange,
    );
  }, [attractRepelRange]);

  return {
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
  };
}
