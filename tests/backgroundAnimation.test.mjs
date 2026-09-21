import assert from "node:assert/strict";
import test from "node:test";
import {
  smoothValue,
  startBackgroundAnimation,
  updateParticleCount,
  updateParticleFade,
} from "../src/lib/backgroundAnimation.js";
import { loadBackgroundSettings } from "../src/lib/backgroundSettings.js";

test("radius transitions take the same time at 30, 60 and 144 Hz", () => {
  const positions = [30, 60, 144].map((fps) => {
    let radius = 240;
    for (let i = 0; i < fps / 2; i++) radius = smoothValue(radius, 500, 10, 1 / fps);
    return radius;
  });
  assert.ok(Math.max(...positions) - Math.min(...positions) < 1e-9);
});

test("a radius transition immediately follows a reversed slider without jumping", () => {
  const outward = smoothValue(240, 500, 10, 1 / 60);
  const reversed = smoothValue(outward, 20, 10, 1 / 60);
  assert.ok(outward > 240 && outward < 500);
  assert.ok(reversed < outward && reversed > 20);
  assert.equal(smoothValue(240, 240, 10, 1 / 60), 240);
});

test("rapid count reversals reuse fading particles instead of duplicating them", () => {
  let created = 0;
  const create = () => ({ id: created++, fade: { value: 0, target: 1 } });
  const particles = [];
  updateParticleCount(particles, 500, create, 1 / 60);
  assert.ok(particles.length > 0 && particles.length < 500);
  for (let i = 0; i < 60; i++) updateParticleCount(particles, 500, create, 1 / 60);
  assert.equal(particles.length, 500);
  updateParticleCount(particles, 0, create, 1 / 60);
  assert.ok(particles.every((particle) => particle.fade.target === 0));
  updateParticleCount(particles, 500, create, 1 / 60);
  assert.equal(created, 500);
  assert.ok(particles.every((particle) => particle.fade.target === 1));
});

test("fades preserve their current opacity when reversed and finish at zero", () => {
  const particle = { fade: { value: 0, target: 1 } };
  updateParticleFade(particle, 0.2);
  assert.equal(particle.fade.value, 0.4);
  particle.fade.target = 0;
  assert.equal(updateParticleFade(particle, 0.05), true);
  assert.ok(Math.abs(particle.fade.value - 0.3) < 1e-10);
  particle.fade.target = 1;
  updateParticleFade(particle, 0.05);
  assert.equal(particle.fade.value, 0.4);
  particle.fade.target = 0;
  assert.equal(updateParticleFade(particle, 0.5), false);
  assert.equal(particle.fade.value, 0);
});

test("canvas pauses offscreen/hidden, resumes without jumps and cleans up", (t) => {
  const callbacks = new Map();
  const listeners = new Map();
  const frames = [];
  let nextId = 0;
  let resize;
  let intersect;
  let disconnected = 0;
  let transforms = 0;
  const addEventListener = (event, callback) => listeners.set(event, callback);
  const removeEventListener = (event) => listeners.delete(event);
  const document = { hidden: false, addEventListener, removeEventListener };
  const globals = {
    window: { devicePixelRatio: 3, addEventListener, removeEventListener },
    document,
    ResizeObserver: class {
      constructor(callback) { resize = callback; }
      observe() {}
      disconnect() { disconnected++; }
    },
    IntersectionObserver: class {
      constructor(callback) { intersect = callback; }
      observe() {}
      disconnect() { disconnected++; }
    },
    requestAnimationFrame: (callback) => { callbacks.set(++nextId, callback); return nextId; },
    cancelAnimationFrame: (id) => callbacks.delete(id),
  };
  for (const [name, value] of Object.entries(globals)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
    t.after(() => original ? Object.defineProperty(globalThis, name, original) : delete globalThis[name]);
  }
  const canvas = {
    parentElement: { offsetWidth: 800, offsetHeight: 600 },
    style: {},
    getContext: () => ({ setTransform: () => transforms++, clearRect() {} }),
  };
  const tick = (time) => {
    const pending = [...callbacks.values()];
    callbacks.clear();
    pending.forEach((callback) => callback(time));
  };
  const stop = startBackgroundAnimation(canvas, (frame) => frames.push(frame));
  assert.equal(canvas.width, 1600);
  assert.equal(canvas.height, 1200);
  resize();
  assert.equal(transforms, 1, "unchanged size must not reset the canvas");
  tick(0);
  tick(1000);
  assert.equal(frames.at(-1).delta, 0.05, "long frames have bounded catch-up");
  intersect([{ isIntersecting: false }]);
  assert.equal(callbacks.size, 0);
  intersect([{ isIntersecting: true }]);
  tick(10000);
  assert.equal(frames.at(-1).delta, 1 / 60);
  document.hidden = true;
  listeners.get("visibilitychange")();
  assert.equal(callbacks.size, 0);
  document.hidden = false;
  listeners.get("visibilitychange")();
  tick(20000);
  assert.equal(frames.at(-1).delta, 1 / 60);
  canvas.parentElement.offsetWidth = 400;
  resize();
  assert.equal(canvas.width, 800);
  stop();
  assert.equal(callbacks.size, 0);
  assert.equal(listeners.size, 0);
  assert.equal(disconnected, 2);
});

test("edited effects retain the panel's full range and zero after storage reload", (t) => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "window");
  const stored = new Map([
    ["orbitCount", "500"], ["orbitRadius", "20"], ["firefliesCount", "750"],
    ["attractRepelCount", "500"], ["attractRepelRange", "500"],
  ]);
  globalThis.window = { localStorage: { getItem: (key) => stored.get(key) ?? null } };
  t.after(() => original ? Object.defineProperty(globalThis, "window", original) : delete globalThis.window);
  const settings = loadBackgroundSettings();
  for (const [key, value] of stored) assert.equal(settings[key], Number(value));
  for (const key of ["orbitCount", "firefliesCount", "attractRepelCount"]) stored.set(key, "0");
  const empty = loadBackgroundSettings();
  assert.equal(empty.orbitCount, 0);
  assert.equal(empty.firefliesCount, 0);
  assert.equal(empty.attractRepelCount, 0);
});
