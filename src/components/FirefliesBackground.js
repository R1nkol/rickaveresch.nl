"use client";

import { useEffect, useRef } from "react";
import {
  startBackgroundAnimation,
  updateParticleCount,
  updateParticleFade,
} from "@/lib/backgroundAnimation";

function createGlowSprites(dpr) {
  return Array.from({ length: 9 }, (_, index) => {
    const radius = 1 + index / 4;
    const size = (radius + 16) * 2;
    const image = document.createElement("canvas");
    image.width = image.height = Math.ceil(size * dpr);
    const ctx = image.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Bake the original warm core and white shadow once, not for every fly/frame.
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#ffffff";
    ctx.fillStyle = "#ffffc8";
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
    ctx.fill();
    return { image, size: image.width / dpr };
  });
}

export default function FirefliesBackground({ numFireflies = 80 }) {
  const canvasRef = useRef(null);
  const targetCountRef = useRef(numFireflies);

  useEffect(() => {
    targetCountRef.current = numFireflies;
  }, [numFireflies]);

  useEffect(() => {
    const flies = [];
    let sprites = [];
    let spriteDpr = 0;
    let previousWidth = 0;
    let previousHeight = 0;

    return startBackgroundAnimation(canvasRef.current, ({ ctx, width, height, dpr, delta }) => {
      if (spriteDpr !== dpr) {
        sprites = createGlowSprites(dpr);
        spriteDpr = dpr;
      }
      if (previousWidth && previousHeight && (width !== previousWidth || height !== previousHeight)) {
        for (const fly of flies) {
          fly.x *= width / previousWidth;
          fly.y *= height / previousHeight;
        }
      }
      previousWidth = width;
      previousHeight = height;

      updateParticleCount(flies, targetCountRef.current, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 30,
        dy: (Math.random() - 0.5) * 30,
        spriteIndex: Math.round(Math.random() * (sprites.length - 1)),
        baseAlpha: Math.random() * 0.4 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        fade: { value: 0, target: 1 },
      }), delta);

      let retained = 0;
      for (const fly of flies) {
        if (!updateParticleFade(fly, delta)) continue;
        flies[retained++] = fly;
        fly.x += fly.dx * delta;
        fly.y += fly.dy * delta;
        if (fly.x < 0 || fly.x > width) {
          fly.x = Math.max(0, Math.min(width, fly.x));
          fly.dx *= -1;
        }
        if (fly.y < 0 || fly.y > height) {
          fly.y = Math.max(0, Math.min(height, fly.y));
          fly.dy *= -1;
        }

        fly.pulse = (fly.pulse + 3 * delta) % (Math.PI * 2);
        ctx.globalAlpha = fly.baseAlpha * (0.5 + 0.5 * Math.sin(fly.pulse)) * fly.fade.value;
        const { image, size } = sprites[fly.spriteIndex];
        ctx.drawImage(image, fly.x - size / 2, fly.y - size / 2, size, size);
      }
      flies.length = retained;
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
