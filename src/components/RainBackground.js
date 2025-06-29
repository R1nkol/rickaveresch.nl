"use client";
import { useEffect, useRef } from "react";

export default function RainBackground({ numDrops = 100 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dropsRef = useRef([]);
  const targetCountRef = useRef(numDrops);
  const fadeSpeed = 1 / 30; // ≈ 0.5s bij 60fps

  useEffect(() => {
    targetCountRef.current = numDrops;
  }, [numDrops]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const parent = canvas.parentElement;
    let width = parent.offsetWidth;
    let height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const addDrop = () => {
      dropsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        velocity: Math.random() * 4 + 2,
        fade: { value: 0, target: 1 }, // Start fade-in
      });
    };

    function animate() {
      const drops = dropsRef.current;
      const diff = targetCountRef.current - drops.filter(d => d.fade.target === 1).length;

      if (diff > 0) {
        for (let i = 0; i < diff; i++) addDrop();
      } else if (diff < 0) {
        let toFade = -diff;
        for (let i = 0; i < drops.length && toFade > 0; i++) {
          if (drops[i].fade.target === 1) {
            drops[i].fade.target = 0; // Start fade-out
            toFade--;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i];

        // Fade up/down
        if (drop.fade.target > drop.fade.value) {
          drop.fade.value = Math.min(drop.fade.value + fadeSpeed, drop.fade.target);
        } else if (drop.fade.target < drop.fade.value) {
          drop.fade.value = Math.max(drop.fade.value - fadeSpeed, drop.fade.target);
        }

        // Remove when fully faded out
        if (drop.fade.target === 0 && drop.fade.value === 0) {
          drops.splice(i, 1);
          continue;
        }

        // Update drop position
        drop.y += drop.velocity;
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }

        // Draw drop with fade alpha
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(255,255,255,${0.5 * drop.fade.value})`;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resize);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    return () => {
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}
