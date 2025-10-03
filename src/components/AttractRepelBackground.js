"use client";
import { useEffect, useRef } from "react";

export default function AttractRepelBackground({
  numParticles = 200,
  interactionRadius = 150, // nieuw: bereik van de muis
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const targetCountRef = useRef(numParticles);
    const interactionRadiusRef = useRef(interactionRadius);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const attractRef = useRef(true);

  useEffect(() => {
    targetCountRef.current = numParticles;
  }, [numParticles]);

    useEffect(() => {
    interactionRadiusRef.current = interactionRadius;
  }, [interactionRadius]);


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
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    window.addEventListener("resize", resize);

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 3 + 2,
      baseAlpha: Math.random() * 0.5 + 0.3,
      fade: { value: 0, target: 1 },
      // voor random movement
      targetAngle: Math.random() * Math.PI * 2,
      changeInterval: Math.floor(Math.random() * 200 + 100),
      frameCount: 0,
      baseSpeed: Math.random() * 0.5 + 0.2,
    });

    particlesRef.current = [];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const handleMouseDown = () => { attractRef.current = false; };
    const handleMouseUp = () => { attractRef.current = true; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const fadeSpeed = 1 / 30;

    function animate() {
      const particles = particlesRef.current;
      const visibleCount = particles.filter(p => p.fade.target === 1).length;
      const diff = targetCountRef.current - visibleCount;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) particles.push(createParticle());
      } else if (diff < 0) {
        let toFade = -diff;
        for (const p of particles) {
          if (toFade <= 0) break;
          if (p.fade.target === 1) {
            p.fade.target = 0;
            toFade--;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      const mouseInside =
        mouseRef.current.x >= 0 &&
        mouseRef.current.y >= 0 &&
        mouseRef.current.x <= width &&
        mouseRef.current.y <= height;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // fade update
        if (p.fade.value < p.fade.target) {
          p.fade.value = Math.min(p.fade.value + fadeSpeed, p.fade.target);
        } else if (p.fade.value > p.fade.target) {
          p.fade.value = Math.max(p.fade.value - fadeSpeed, p.fade.target);
        }
        if (p.fade.value === 0 && p.fade.target === 0) {
          particles.splice(i, 1);
          continue;
        }

        let didInteract = false;
        if (mouseInside) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist <= interactionRadiusRef.current) {
            // binnen bereik: attract/repel
            const force = Math.min(100 / dist, 5);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            if (attractRef.current) {
              p.vx += fx * 0.05;
              p.vy += fy * 0.05;
            } else {
              p.vx -= fx * 0.05;
              p.vy -= fy * 0.05;
            }
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.x += p.vx;
            p.y += p.vy;
            didInteract = true;
          }
        }

        if (!didInteract) {
          // random movement
          p.frameCount++;
          if (p.frameCount >= p.changeInterval) {
            p.targetAngle = Math.random() * Math.PI * 2;
            p.changeInterval = Math.floor(Math.random() * 200 + 100);
            p.frameCount = 0;
          }
          const desiredVx = Math.cos(p.targetAngle) * p.baseSpeed;
          const desiredVy = Math.sin(p.targetAngle) * p.baseSpeed;
          const lerpFactor = 0.02;
          p.vx += (desiredVx - p.vx) * lerpFactor;
          p.vy += (desiredVy - p.vy) * lerpFactor;
          p.x += p.vx;
          p.y += p.vy;
        }

        // wrap-around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // teken
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.baseAlpha * p.fade.value})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", resize);
      ro.disconnect();
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
