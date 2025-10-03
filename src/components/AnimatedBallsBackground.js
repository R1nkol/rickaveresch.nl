"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBallsBackground({ numBalls = 35 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const ballsRef = useRef([]);
  const targetCountRef = useRef(numBalls);
  const fadeSpeed = 1 / 30; // ≈ 0.5s bij 60fps

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    let width = 0;
    let height = 0;

    const syncCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const resize = () => {
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      syncCanvasSize();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const randomVelocity = () => {
      const speed = Math.random() * 0.6 + 0.2;
      return (Math.random() < 0.5 ? -1 : 1) * speed;
    };

    const addBall = () => {
      ballsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 20 + 10,
        dx: randomVelocity(),
        dy: randomVelocity(),
        baseAlpha: Math.random() * 0.3 + 0.1,
        fade: { value: 0, target: 1 }, // Begin met fade-in
      });
    };

    function animate() {
      const current = ballsRef.current;

      const diff = targetCountRef.current - current.filter((b) => b.fade.target === 1).length;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) addBall();
      } else if (diff < 0) {
        let toFade = -diff;
        for (let i = 0; i < current.length && toFade > 0; i++) {
          const ball = current[i];
          if (ball.fade.target === 1) {
            ball.fade.target = 0; // Start fade-out
            toFade--;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = current.length - 1; i >= 0; i--) {
        const ball = current[i];

        // Update fade richting target
        if (ball.fade.target > ball.fade.value) {
          ball.fade.value = Math.min(ball.fade.value + fadeSpeed, ball.fade.target);
        } else if (ball.fade.target < ball.fade.value) {
          ball.fade.value = Math.max(ball.fade.value - fadeSpeed, ball.fade.target);
        }

        // Verwijder ballen die volledig uitgefaded zijn
        if (ball.fade.value === 0 && ball.fade.target === 0) {
          current.splice(i, 1);
          continue;
        }

        // Update positie
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.radius > width) {
          ball.x = Math.max(width - ball.radius, ball.radius);
          ball.dx = -Math.abs(ball.dx || randomVelocity());
        } else if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.dx = Math.abs(ball.dx || randomVelocity());
        }

        if (ball.y + ball.radius > height) {
          ball.y = Math.max(height - ball.radius, ball.radius);
          ball.dy = -Math.abs(ball.dy || randomVelocity());
        } else if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.dy = Math.abs(ball.dy || randomVelocity());
        }

        // Teken met geanimeerde opacity
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ball.baseAlpha * ball.fade.value})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    targetCountRef.current = Math.max(0, Math.round(numBalls));
  }, [numBalls]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1
      }}
    />
  );
}
