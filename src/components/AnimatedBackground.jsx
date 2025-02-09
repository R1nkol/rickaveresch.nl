"use client";
import { useRef, useEffect } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Dynamische canvas-grootte
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Bollen-parameters
    const NUM_BALLS = 20;
    const balls = [];

    // Helper: random getal in range
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Maak bollen met random positie, snelheid, grootte, kleur
    for (let i = 0; i < NUM_BALLS; i++) {
      balls.push({
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        vx: random(-0.5, 0.5), // horizontale snelheid
        vy: random(-0.5, 0.5), // verticale snelheid
        r: random(10, 40),     // straal
        color: `hsl(${random(260, 300)}, 70%, 60%)`,
      });
    }

    function animate() {
      // Canvas opschonen
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update en teken elke bol
      balls.forEach((ball) => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // "Stuiteren" bij de randen
        if (ball.x < ball.r || ball.x > canvas.width - ball.r) {
          ball.vx = -ball.vx;
        }
        if (ball.y < ball.r || ball.y > canvas.height - ball.r) {
          ball.vy = -ball.vy;
        }

        // Teken bol
        ctx.beginPath();
        ctx.fillStyle = ball.color;
        ctx.globalAlpha = 0.6;
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup bij unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
}
