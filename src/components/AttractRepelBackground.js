"use client";

import { useEffect, useRef } from "react";
import {
  smoothValue,
  startBackgroundAnimation,
  updateParticleCount,
  updateParticleFade,
} from "@/lib/backgroundAnimation";

function chooseDirection(particle) {
  const angle = Math.random() * Math.PI * 2;
  particle.desiredVx = Math.cos(angle) * particle.baseSpeed;
  particle.desiredVy = Math.sin(angle) * particle.baseSpeed;
  particle.directionTime = (Math.random() * 200 + 100) / 60;
}

export default function AttractRepelBackground({ numParticles = 80, interactionRadius = 120 }) {
  const canvasRef = useRef(null);
  const targetCountRef = useRef(numParticles);
  const interactionRadiusRef = useRef(interactionRadius);

  useEffect(() => {
    targetCountRef.current = numParticles;
  }, [numParticles]);

  useEffect(() => {
    interactionRadiusRef.current = interactionRadius;
  }, [interactionRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const particles = [];
    const pointer = { clientX: 0, clientY: 0, x: 0, y: 0, active: false, dirty: false, repel: false };
    let radius = interactionRadiusRef.current;
    let direction = 1;
    let previousWidth = 0;
    let previousHeight = 0;

    const handlePointerMove = (event) => {
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.active = true;
      pointer.dirty = true;
    };
    const resetPointer = () => {
      pointer.active = false;
      pointer.repel = false;
    };
    const handlePointerDown = (event) => {
      if (event.button !== 0 || event.target.closest?.("a, button, input, select, textarea, [role='button']")) return;
      handlePointerMove(event);
      pointer.repel = true;
    };
    const handlePointerUp = (event) => {
      pointer.repel = false;
      if (event.pointerType === "touch") resetPointer();
    };
    const invalidatePointer = () => { pointer.dirty = true; };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", resetPointer);
    window.addEventListener("blur", resetPointer);
    document.documentElement.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", invalidatePointer, { passive: true, capture: true });
    window.addEventListener("resize", invalidatePointer);

    const stopAnimation = startBackgroundAnimation(canvas, ({ ctx, width, height, delta }) => {
      if (width !== previousWidth || height !== previousHeight) {
        if (previousWidth && previousHeight) {
          for (const particle of particles) {
            particle.x *= width / previousWidth;
            particle.y *= height / previousHeight;
          }
        }
        previousWidth = width;
        previousHeight = height;
        pointer.dirty = true;
      }
      // Coalesce pointer events into one layout read per frame, including after scrolling.
      if (pointer.active && pointer.dirty) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = pointer.clientX - rect.left;
        pointer.y = pointer.clientY - rect.top;
        pointer.dirty = false;
      }
      const mouseInside = pointer.active && pointer.x >= 0 && pointer.y >= 0 && pointer.x <= width && pointer.y <= height;
      radius = smoothValue(radius, interactionRadiusRef.current, 10, delta);
      direction = smoothValue(direction, pointer.repel ? -1 : 1, 20, delta);
      const radiusSquared = radius * radius;

      updateParticleCount(particles, targetCountRef.current, () => {
        const particle = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.1,
          vy: (Math.random() - 0.5) * 1.1,
          radius: Math.random() * 2 + 1.5,
          baseAlpha: Math.random() * 0.4 + 0.25,
          baseSpeed: Math.random() * 0.35 + 0.18,
          fade: { value: 0, target: 1 },
        };
        chooseDirection(particle);
        return particle;
      }, delta);

      // Small physics steps retain the original drifting feel across refresh rates.
      const steps = Math.max(1, Math.ceil(delta * 60 - 1e-6));
      const step = delta * 60 / steps;
      const wanderBlend = -Math.expm1(Math.log(0.98) * step);
      const fullDamping = Math.pow(0.95, step);
      ctx.fillStyle = "#ffffff";
      let retained = 0;
      for (const particle of particles) {
        if (!updateParticleFade(particle, delta, 0.4)) continue;
        particles[retained++] = particle;
        particle.directionTime -= delta;
        if (particle.directionTime <= 0) chooseDirection(particle);

        for (let i = 0; i < steps; i++) {
          let influence = 0;
          let forceX = 0;
          let forceY = 0;
          if (mouseInside && radius > 0) {
            const dx = pointer.x - particle.x;
            const dy = pointer.y - particle.y;
            const distanceSquared = dx * dx + dy * dy;
            if (distanceSquared < radiusSquared) {
              const distance = Math.sqrt(distanceSquared);
              // Fade the force at the outer edge instead of abruptly switching modes.
              const edge = Math.min(1, (radius - distance) / (radius * 0.25));
              influence = edge * edge * (3 - 2 * edge);
              const force = Math.min(60 / Math.max(distance, 1), 2.5) * direction;
              forceX = dx / Math.max(distance, 1) * force;
              forceY = dy / Math.max(distance, 1) * force;
            }
          }
          const blend = wanderBlend * (1 - influence);
          particle.vx += (particle.desiredVx - particle.vx) * blend;
          particle.vy += (particle.desiredVy - particle.vy) * blend;
          if (influence > 0) {
            const damping = influence === 1 ? fullDamping : Math.pow(0.95, step * influence);
            const forceStep = (1 - damping) / 0.05 * 0.95 * 0.04;
            particle.vx = particle.vx * damping + forceX * forceStep;
            particle.vy = particle.vy * damping + forceY * forceStep;
          }
          particle.x += particle.vx * step;
          particle.y += particle.vy * step;
        }

        const margin = particle.radius;
        if (particle.x < -margin) particle.x = width + margin;
        if (particle.x > width + margin) particle.x = -margin;
        if (particle.y < -margin) particle.y = height + margin;
        if (particle.y > height + margin) particle.y = -margin;

        ctx.globalAlpha = particle.baseAlpha * particle.fade.value;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      particles.length = retained;
    });

    return () => {
      stopAnimation();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", resetPointer);
      window.removeEventListener("blur", resetPointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", invalidatePointer, true);
      window.removeEventListener("resize", invalidatePointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
    />
  );
}
