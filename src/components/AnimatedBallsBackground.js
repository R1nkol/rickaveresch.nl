"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBallsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const parent = canvas.parentElement;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const numBalls = 35; // Aantal ballen
    const balls = [];

    // Maak een array met ballen
    for (let i = 0; i < numBalls; i++) {
      balls.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 20 + 10, // radius tussen 10 en 30
        dx: (Math.random() - 0.5) * 1, // snelheid tussen -0.5 en 0.5 (pixels per frame)
        dy: (Math.random() - 0.5) * 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})` // willekeurige opacity tussen 0.1 en 0.4
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Update en teken elke bal
      balls.forEach(ball => {
        // Update positie
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Laat ballen stuiteren als ze de randen bereiken
        if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
          ball.dx = -ball.dx;
        }
        if (ball.y + ball.radius > height || ball.y - ball.radius < 0) {
          ball.dy = -ball.dy;
        }

        // Teken de bal
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = ball.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();

    const handleWindowResize = () => resize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      resizeObserver.disconnect();
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
        zIndex: 1 // Zorgt ervoor dat de ballen achter je content worden weergegeven
      }}
    />
  );
}
