"use client";
import { useEffect, useRef } from "react";

export default function StarsBackground({ numStars = 200 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const targetCountRef = useRef(numStars);
  const fadeSpeed = 1 / 30;

  useEffect(() => {
    targetCountRef.current = numStars;
  }, [numStars]);

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

    const addStar = () => {
      starsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        velocity: Math.random() * 0.5 + 0.1,
        fade: { value: 0, target: 1 },
      });
    };

    function animate() {
      const stars = starsRef.current;
      const diff =
        targetCountRef.current - stars.filter((s) => s.fade.target === 1).length;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) addStar();
      } else if (diff < 0) {
        let toFade = -diff;
        for (let i = 0; i < stars.length && toFade > 0; i++) {
          if (stars[i].fade.target === 1) {
            stars[i].fade.target = 0;
            toFade--;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        if (star.fade.target > star.fade.value) {
          star.fade.value = Math.min(star.fade.value + fadeSpeed, star.fade.target);
        } else if (star.fade.target < star.fade.value) {
          star.fade.value = Math.max(star.fade.value - fadeSpeed, star.fade.target);
        }

        if (star.fade.target === 0 && star.fade.value === 0) {
          stars.splice(i, 1);
          continue;
        }

        star.y += star.velocity;
        if (star.y > height) {
          star.y = -star.radius;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.fade.value})`;
        ctx.fill();
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
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}
    />
  );
}