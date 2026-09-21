// Shared timing and canvas lifecycle for the interactive particle backgrounds.
export function startBackgroundAnimation(canvas, draw) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const parent = canvas.parentElement;
  let width = 0;
  let height = 0;
  let dpr = 0;
  let frame = null;
  let previousTime = null;
  let visible = true;
  let disposed = false;

  const resize = () => {
    const nextWidth = parent.offsetWidth;
    const nextHeight = parent.offsetHeight;
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
    if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;

    width = nextWidth;
    height = nextHeight;
    dpr = nextDpr;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const animate = (time) => {
    frame = null;
    if (disposed || !visible || document.hidden) return;
    // Cap catch-up after a stalled frame so particles never jump across the canvas.
    const delta = previousTime === null ? 1 / 60 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    if (width > 0 && height > 0) {
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, width, height);
      draw({ ctx, width, height, dpr, delta });
    }
    frame = requestAnimationFrame(animate);
  };

  const updatePlayback = () => {
    previousTime = null;
    if (disposed || !visible || document.hidden) {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    } else if (frame === null) {
      frame = requestAnimationFrame(animate);
    }
  };

  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(parent);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  });
  intersectionObserver.observe(canvas);
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", updatePlayback);
  updatePlayback();

  return () => {
    disposed = true;
    if (frame !== null) cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", updatePlayback);
  };
}

export function smoothValue(current, target, rate, delta) {
  return current + (target - current) * -Math.expm1(-rate * delta);
}

// Reuse particles fading out when the slider reverses; avoid bursts of allocations.
export function updateParticleCount(particles, target, createParticle, delta) {
  const count = Math.max(0, Math.round(Number.isFinite(target) ? target : 0));
  let active = 0;
  for (const particle of particles) active += particle.fade.target;
  let difference = count - active;

  if (difference < 0) {
    for (let i = particles.length - 1; i >= 0 && difference < 0; i--) {
      if (particles[i].fade.target === 1) {
        particles[i].fade.target = 0;
        difference++;
      }
    }
  } else if (difference > 0) {
    for (const particle of particles) {
      if (difference === 0) break;
      if (particle.fade.target === 0) {
        particle.fade.target = 1;
        difference--;
      }
    }
    const additions = Math.min(difference, Math.ceil(delta * 600));
    for (let i = 0; i < additions; i++) particles.push(createParticle());
  }
}

export function updateParticleFade(particle, delta, duration = 0.5) {
  const { fade } = particle;
  const step = delta / duration;
  fade.value = fade.target === 1
    ? Math.min(1, fade.value + step)
    : Math.max(0, fade.value - step);
  return fade.target === 1 || fade.value > 0;
}
