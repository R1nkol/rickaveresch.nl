"use client";

import { useEffect, useRef } from "react";

import {
  startBackgroundAnimation,
  updateParticleCount,
  updateParticleFade,
} from "@/lib/backgroundAnimation";

export default function FlowLinesBackground({ numLines = 5 }) {
  const canvasRef = useRef(null);
  const targetCountRef = useRef(numLines);

  useEffect(() => {
    targetCountRef.current = numLines;
  }, [numLines]);

  useEffect(() => {
    const lines = [];
    let time = 0;
    let edgeFade = null;
    let gradientWidth = 0;

    return startBackgroundAnimation(
      canvasRef.current,
      ({ ctx, width, height, delta }) => {
        time = (time + delta) % 10000;

        updateParticleCount(
          lines,
          targetCountRef.current,
          () => ({
            verticalPosition: 0.2 + Math.random() * 0.6,
            phase: Math.random() * Math.PI * 2,
            speed: 0.75 + Math.random() * 0.5,
            amplitude: 0.75 + Math.random() * 0.5,
            opacity: 0.55 + Math.random() * 0.35,
            fade: { value: 0, target: 1 },
          }),
          delta,
        );

        const amplitude = Math.min(84, Math.max(38, height * 0.085));
        const segmentWidth = Math.max(12, Math.min(22, width / 70));
        if (!edgeFade || gradientWidth !== width) {
          edgeFade = ctx.createLinearGradient(0, 0, width, 0);
          edgeFade.addColorStop(0, "rgba(185, 163, 227, 0)");
          edgeFade.addColorStop(0.14, "rgba(185, 163, 227, 1)");
          edgeFade.addColorStop(0.86, "rgba(185, 163, 227, 1)");
          edgeFade.addColorStop(1, "rgba(185, 163, 227, 0)");
          gradientWidth = width;
        }

        let retained = 0;
        for (const line of lines) {
          if (!updateParticleFade(line, delta, 0.65)) continue;
          lines[retained++] = line;

          const phase = line.phase + time * 0.24 * line.speed;
          const baseY = height * line.verticalPosition;
          ctx.beginPath();

          for (let x = -segmentWidth; x <= width + segmentWidth; x += segmentWidth) {
            const progress = x / Math.max(width, 1);
            const y =
              baseY +
              Math.sin(progress * Math.PI * 2.1 + phase) *
                amplitude *
                line.amplitude +
              Math.sin(progress * Math.PI * 4.7 - phase * 0.62) *
                amplitude *
                0.24;

            if (x === -segmentWidth) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          const alpha = line.opacity * line.fade.value;
          ctx.strokeStyle = edgeFade;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalAlpha = alpha * 0.15;
          ctx.lineWidth = 14;
          ctx.stroke();
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.15;
          ctx.stroke();
        }
        lines.length = retained;
      },
    );
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
