"use client";
import { useEffect, useRef } from "react";

export default function AttractRepelBackground({
  numParticles = 80,
  interactionRadius = 120,
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
      vx: (Math.random() - 0.5) * 1.1,
      vy: (Math.random() - 0.5) * 1.1,
      radius: Math.random() * 2 + 1.5,
      baseAlpha: Math.random() * 0.4 + 0.25,
      fade: { value: 0, target: 1 },
      // voor random movement
      targetAngle: Math.random() * Math.PI * 2,
      changeInterval: Math.floor(Math.random() * 200 + 100),
      frameCount: 0,
      baseSpeed: Math.random() * 0.35 + 0.18,
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

    const fadeSpeed = 1 / 24;
    const MAX_ADJUST_PER_FRAME = 4;

    function animate() {
      const particles = particlesRef.current;
      let visibleCount = 0;
      for (let i = 0; i < particles.length; i += 1) {
        if (particles[i].fade.target === 1) {
          visibleCount += 1;
        }
      }

      const diff = targetCountRef.current - visibleCount;
      if (diff > 0) {
        const spawnCount = Math.min(diff, MAX_ADJUST_PER_FRAME);
        for (let i = 0; i < spawnCount; i += 1) {
          particles.push(createParticle());
        }
      } else if (diff < 0) {
        let toFade = Math.min(-diff, MAX_ADJUST_PER_FRAME);
        for (let i = particles.length - 1; i >= 0 && toFade > 0; i -= 1) {
          const particle = particles[i];
          if (particle.fade.target === 1) {
            particle.fade.target = 0;
            toFade -= 1;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      const mouseInside =
        mouseRef.current.x >= 0 &&
        mouseRef.current.y >= 0 &&
        mouseRef.current.x <= width &&
        mouseRef.current.y <= height;

      const radius = interactionRadiusRef.current;
      const radiusSquared = radius * radius;

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];

        if (particle.fade.value < particle.fade.target) {
          particle.fade.value = Math.min(
            particle.fade.value + fadeSpeed,
            particle.fade.target,
          );
        } else if (particle.fade.value > particle.fade.target) {
          particle.fade.value = Math.max(
            particle.fade.value - fadeSpeed,
            particle.fade.target,
          );
        }

        if (particle.fade.value === 0 && particle.fade.target === 0) {
          particles.splice(i, 1);
          continue;
        }

        let didInteract = false;
        if (mouseInside) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distSquared = dx * dx + dy * dy;

          if (distSquared <= radiusSquared) {
            const dist = Math.sqrt(distSquared) || 1;
            const force = Math.min(60 / dist, 2.5);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            const direction = attractRef.current ? 1 : -1;

            particle.vx = (particle.vx + fx * direction * 0.04) * 0.95;
            particle.vy = (particle.vy + fy * direction * 0.04) * 0.95;
            particle.x += particle.vx;
            particle.y += particle.vy;
            didInteract = true;
          }
        }

        if (!didInteract) {
          particle.frameCount += 1;
          if (particle.frameCount >= particle.changeInterval) {
            particle.targetAngle = Math.random() * Math.PI * 2;
            particle.changeInterval = Math.floor(Math.random() * 200 + 100);
            particle.frameCount = 0;
          }
          const desiredVx = Math.cos(particle.targetAngle) * particle.baseSpeed;
          const desiredVy = Math.sin(particle.targetAngle) * particle.baseSpeed;
          const lerpFactor = 0.02;
          particle.vx += (desiredVx - particle.vx) * lerpFactor;
          particle.vy += (desiredVy - particle.vy) * lerpFactor;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${particle.baseAlpha * particle.fade.value})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
