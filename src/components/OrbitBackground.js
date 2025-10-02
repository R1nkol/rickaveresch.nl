import { useEffect, useRef } from "react";

export default function OrbitBackground({ numOrbits = 15, maxRadius = 500 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const orbitsRef = useRef([]);
  const targetCountRef = useRef(numOrbits);
  const maxRadiusRef = useRef(maxRadius);
  const fadeSpeed = 1 / 30;

  // Update refs when props change
  useEffect(() => {
    targetCountRef.current = numOrbits;
  }, [numOrbits]);

  useEffect(() => {
    maxRadiusRef.current = maxRadius;
  }, [maxRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    let width = parent.offsetWidth;
    let height = parent.offsetHeight;

    const syncCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    syncCanvasSize();

    const resize = () => {
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      syncCanvasSize();
    };

    const addOrbit = () => {
      const limit = Math.min(maxRadiusRef.current, Math.min(width, height) / 2);
      const radius = Math.random() * Math.max(limit - 20, 0) + 20;
      // Store ratio for smooth scaling
      const ratio = limit > 0 ? radius / limit : 0;
      orbitsRef.current.push({
        centerX: width / 2,
        centerY: height / 2,
        radius,
        ratio,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.002,
        size: Math.random() * 3 + 2,
        fade: { value: 0, target: 1 },
        // for smooth radius transitions
        targetRadius: radius,
        startRadius: radius,
        radiusAnimating: false,
      });
    };

    const animate = () => {
      const orbits = orbitsRef.current;
      const activeCount = orbits.filter(o => o.fade.target === 1).length;
      const diff = targetCountRef.current - activeCount;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) addOrbit();
      } else if (diff < 0) {
        let toRemove = -diff;
        for (let i = 0; i < orbits.length && toRemove > 0; i++) {
          if (orbits[i].fade.target === 1) {
            orbits[i].fade.target = 0;
            toRemove--;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Handle radius animation based on stored ratio
      const newLimit = Math.min(maxRadiusRef.current, Math.min(width, height) / 2);
      orbits.forEach(orbit => {
        if (orbit.radiusAnimating) {
          // ease from startRadius to targetRadius
          orbit.radius += (orbit.targetRadius - orbit.radius) * 0.1;
          if (Math.abs(orbit.radius - orbit.targetRadius) < 0.5) {
            orbit.radius = orbit.targetRadius;
            orbit.radiusAnimating = false;
          }
        }
      });

      for (let i = orbits.length - 1; i >= 0; i--) {
        const orbit = orbits[i];
        // Update targetRadius based on ratio if not animating yet
        if (!orbit.radiusAnimating && orbit.ratio >= 0) {
          orbit.startRadius = orbit.radius;
          orbit.targetRadius = orbit.ratio * newLimit;
          orbit.radiusAnimating = true;
        }
        // Fade logic
        if (orbit.fade.target > orbit.fade.value) {
          orbit.fade.value = Math.min(orbit.fade.value + fadeSpeed, orbit.fade.target);
        } else if (orbit.fade.target < orbit.fade.value) {
          orbit.fade.value = Math.max(orbit.fade.value - fadeSpeed, orbit.fade.target);
        }
        // Remove fully faded out orbits
        if (orbit.fade.target === 0 && orbit.fade.value === 0) {
          orbits.splice(i, 1);
          continue;
        }

        orbit.angle += orbit.speed;
        const x = orbit.centerX + orbit.radius * Math.cos(orbit.angle);
        const y = orbit.centerY + orbit.radius * Math.sin(orbit.angle);

        ctx.beginPath();
        ctx.arc(x, y, orbit.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${orbit.fade.value})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

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
