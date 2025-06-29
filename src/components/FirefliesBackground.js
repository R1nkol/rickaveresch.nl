"use client";
import { useEffect, useRef } from "react";

export default function FirefliesBackground({ numFireflies = 80 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const fliesRef = useRef([]);
  const targetCountRef = useRef(numFireflies);
  const fadeSpeed = 1 / 30;

  useEffect(() => {
    targetCountRef.current = numFireflies;
  }, [numFireflies]);

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

    const addFly = () => {
      fliesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.4 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        fade: { value: 0, target: 1 },
      });
    };

    function animate() {
      const flies = fliesRef.current;
      const diff = targetCountRef.current - flies.filter((f) => f.fade.target === 1).length;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) addFly();
      } else if (diff < 0) {
        let toFade = -diff;
        for (let i = 0; i < flies.length && toFade > 0; i++) {
          if (flies[i].fade.target === 1) {
            flies[i].fade.target = 0;
            toFade--;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#ffffff";

      for (let i = flies.length - 1; i >= 0; i--) {
        const fly = flies[i];
        if (fly.fade.target > fly.fade.value) {
          fly.fade.value = Math.min(fly.fade.value + fadeSpeed, fly.fade.target);
        } else if (fly.fade.target < fly.fade.value) {
          fly.fade.value = Math.max(fly.fade.value - fadeSpeed, fly.fade.target);
        }

        if (fly.fade.target === 0 && fly.fade.value === 0) {
          flies.splice(i, 1);
          continue;
        }

        fly.x += fly.dx;
        fly.y += fly.dy;
        if (fly.x < 0 || fly.x > width) fly.dx *= -1;
        if (fly.y < 0 || fly.y > height) fly.dy *= -1;

        fly.pulse += 0.05;
        const alpha = fly.baseAlpha * (0.5 + 0.5 * Math.sin(fly.pulse));

        ctx.beginPath();
        ctx.arc(fly.x, fly.y, fly.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,200,${alpha * fly.fade.value})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
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