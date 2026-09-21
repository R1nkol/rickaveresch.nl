"use client";

import { useEffect, useRef } from "react";
import {
  smoothValue,
  startBackgroundAnimation,
  updateParticleCount,
  updateParticleFade,
} from "@/lib/backgroundAnimation";

export default function OrbitBackground({ numOrbits = 15, maxRadius = 500 }) {
  const canvasRef = useRef(null);
  const targetCountRef = useRef(numOrbits);
  const maxRadiusRef = useRef(maxRadius);

  useEffect(() => {
    targetCountRef.current = numOrbits;
  }, [numOrbits]);

  useEffect(() => {
    maxRadiusRef.current = maxRadius;
  }, [maxRadius]);

  useEffect(() => {
    const orbits = [];
    let displayedRadius = null;

    return startBackgroundAnimation(canvasRef.current, ({ ctx, width, height, delta }) => {
      const targetRadius = Math.min(maxRadiusRef.current, width / 2, height / 2);
      displayedRadius = displayedRadius === null
        ? targetRadius
        : smoothValue(displayedRadius, targetRadius, 10, delta);

      updateParticleCount(orbits, targetCountRef.current, () => ({
        ratio: (20 + Math.random() * Math.max(displayedRadius - 20, 0)) / Math.max(displayedRadius, 20),
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.01 + 0.002) * 60,
        size: Math.random() * 3 + 2,
        fade: { value: 0, target: 1 },
      }), delta);

      ctx.fillStyle = "#ffffff";
      let retained = 0;
      for (const orbit of orbits) {
        if (!updateParticleFade(orbit, delta)) continue;
        orbits[retained++] = orbit;
        orbit.angle = (orbit.angle + orbit.speed * delta) % (Math.PI * 2);
        const radius = orbit.ratio * displayedRadius;
        const x = width / 2 + radius * Math.cos(orbit.angle);
        const y = height / 2 + radius * Math.sin(orbit.angle);

        ctx.globalAlpha = orbit.fade.value;
        ctx.beginPath();
        ctx.arc(x, y, orbit.size, 0, Math.PI * 2);
        ctx.fill();
      }
      orbits.length = retained;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
    />
  );
}
