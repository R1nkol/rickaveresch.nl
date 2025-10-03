"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/FeaturedProjectCard";
import { projects } from "@/data/projects";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSettings, FiX, FiArrowUpRight } from "react-icons/fi";

const AnimatedBallsBackground = dynamic(
  () => import("@/components/AnimatedBallsBackground"),
  { ssr: false }
);
const RainBackground = dynamic(
  () => import("@/components/RainBackground"),
  { ssr: false }
);
const StarsBackground = dynamic(
  () => import("@/components/StarsBackground"),
  { ssr: false }
);
const OrbitBackground = dynamic(
  () => import("@/components/OrbitBackground"),
  { ssr: false }
);
const FirefliesBackground = dynamic(
  () => import("@/components/FirefliesBackground"),
  { ssr: false }
);
const AttractRepelBackground = dynamic(
  () => import("@/components/AttractRepelBackground"),
  { ssr: false }
);

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [ballCount, setBallCount] = useState(35);
  const [rainCount, setRainCount] = useState(250);
  const [starCount, setStarCount] = useState(200);
  const [orbitCount, setOrbitCount] = useState(50);
    const [orbitRadius, setOrbitRadius] = useState(300);
  const [firefliesCount, setFirefliesCount] = useState(250);
  const [attractRepelCount, setAttractRepelCount] = useState(200);
    const [attractRepelRange, setAttractRepelRange] = useState(150);
  const [effect, setEffect] = useState("balls");
  const [showSettings, setShowSettings] = useState(false);

  // Prevent small scroll jump when opening the settings menu
  useEffect(() => {
    if (!showSettings) return;
    const y = window.scrollY;
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const raf1 = requestAnimationFrame(() => {
      window.scrollTo({ top: y });
      requestAnimationFrame(() => {
        html.style.scrollBehavior = prevBehavior || "";
      });
    });
    return () => {
      html.style.scrollBehavior = prevBehavior || "";
      cancelAnimationFrame(raf1);
    };
  }, [showSettings]);

  useEffect(() => {
    const storedEffect = localStorage.getItem("homepageEffect");
    const storedBalls = localStorage.getItem("ballCount");
    const storedRain = localStorage.getItem("rainCount");
    const storedStars = localStorage.getItem("starCount");
    const storedOrbit = localStorage.getItem("orbitCount");
        const storedOrbitRadius = localStorage.getItem("orbitRadius");
    const storedFireflies = localStorage.getItem("firefliesCount");
    const storedAttractRepel = localStorage.getItem("attractRepelCount");
        const storedAttractRepelRange = localStorage.getItem("attractRepelRange");
    if (storedEffect) setEffect(storedEffect);
    if (storedBalls) setBallCount(parseInt(storedBalls, 10));
    if (storedRain) setRainCount(parseInt(storedRain, 10));
    if (storedStars) setStarCount(parseInt(storedStars, 10));
    if (storedOrbit) setOrbitCount(parseInt(storedOrbit, 10));
    if (storedOrbitRadius) setOrbitRadius(parseInt(storedOrbitRadius, 10));
    if (storedFireflies) setFirefliesCount(parseInt(storedFireflies, 10));
    if (storedAttractRepel) setAttractRepelCount(parseInt(storedAttractRepel, 10));
    if (storedAttractRepelRange) setAttractRepelRange(parseInt(storedAttractRepelRange, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("homepageEffect", effect);
  }, [effect]);

  useEffect(() => {
    localStorage.setItem("ballCount", ballCount.toString());
  }, [ballCount]);

  useEffect(() => {
    localStorage.setItem("rainCount", rainCount.toString());
  }, [rainCount]);

  useEffect(() => {
    localStorage.setItem("starCount", starCount.toString());
  }, [starCount]);

  useEffect(() => {
    localStorage.setItem("orbitCount", orbitCount.toString());
  }, [orbitCount]);

  useEffect(() => {
    localStorage.setItem("orbitRadius", orbitRadius.toString());
  }, [orbitRadius]);

  useEffect(() => {
    localStorage.setItem("firefliesCount", firefliesCount.toString());
  }, [firefliesCount]);

  useEffect(() => {
    localStorage.setItem("attractRepelCount", attractRepelCount.toString());
  }, [attractRepelCount]);

  useEffect(() => {
    localStorage.setItem("attractRepelRange", attractRepelRange.toString());
  }, [attractRepelRange]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SkillsItems = [
    { src: "/icons/html.webp", label: "HTML5" },
    { src: "/icons/css.webp", label: "CSS3" },
    { src: "/icons/javascript.svg", label: "JavaScript" },
    { src: "/icons/laravel.webp", label: "Laravel" },
    { src: "/icons/c_sharp.webp", label: "C#" },
    { src: "/icons/nextdotjs.svg", label: "Next.js" },
    { src: "/icons/react.svg", label: "React" },
    { src: "/icons/tailwind.webp", label: "Tailwind CSS" },
    { src: "/icons/bootstrap.svg", label: "Bootstrap" },
    { src: "/icons/php.webp", label: "PHP" },
    { src: "/icons/mongodb.webp", label: "MongoDB" },
    { src: "/icons/MySQL.webp", label: "MySQL" },
    { src: "/icons/godot.webp", label: "Godot" },
    { src: "/icons/wordpress.svg", label: "WordPress" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-white font-sans scroll-smooth">
      <Header activeSection={activeSection} />

      <section
        id="home"
        className="relative flex flex-col items-center justify-center h-screen overflow-hidden px-4 text-center bg-[#030712]"
      >
        <div className="absolute bottom-6 left-6 z-20" style={{ overflowAnchor: "none" }}>
          {showSettings ? (
            <div className="w-64 space-y-4 rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-sm text-white backdrop-blur supports-[backdrop-filter]:bg-white/[0.09] animate-fade-in-up">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-white transition hover:text-red-400"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* 1) Select bovenaan */}
              <select
                value={effect}
                onChange={(e) => setEffect(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              >
                <option value="balls">Ballen</option>
                <option value="rain">Regen</option>
                <option value="stars">Sneeuw</option>
                <option value="fireflies">Vuurvliegjes</option>
                <option value="attract-repel">Aantrekkingseffect</option>
                <option value="orbit">Roterende objecten</option>
              </select>

              {/* 2) Label + nummer-input */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 font-medium">
                  {(() => {
                    switch (effect) {
                      case "balls":
                        return `Aantal ballen:`;
                      case "rain":
                        return `Aantal regendruppels:`;
                      case "stars":
                        return `Aantal sneeuwvlokken:`;
                      case "orbit":
                        return `Aantal objecten:`;
                      case "fireflies":
                        return `Aantal vuurvliegjes:`;
                      case "attract-repel":
                        return `Aantal objecten:`;
                      default:
                        return "";
                    }
                  })()}
                  <input
                    type="number"
                    min="0"
                    max={(() => {
                      switch (effect) {
                        case "balls":
                          return 100;
                        case "rain":
                          return 1000;
                        case "stars":
                          return 500;
                        case "orbit":
                          return 100;
                        case "fireflies":
                          return 500;
                        case "attract-repel":
                          return 500;
                        default:
                          return 100;
                      }
                    })()}
                    value={(() => {
                      switch (effect) {
                        case "balls":
                          return ballCount.toString();
                        case "rain":
                          return rainCount.toString();
                        case "stars":
                          return starCount.toString();
                        case "orbit":
                          return orbitCount.toString();
                        case "fireflies":
                          return firefliesCount.toString();
                        case "attract-repel":
                          return attractRepelCount.toString();
                        default:
                          return 0;
                      }
                    })()}
                    onChange={(e) => {
                      let v = parseInt(e.target.value, 10) || 0;
                      const max = parseInt(e.target.max, 10);
                      v = Math.min(v, max);
                      switch (effect) {
                        case "balls":
                          setBallCount(v);
                          break;
                        case "rain":
                          setRainCount(v);
                          break;
                        case "stars":
                          setStarCount(v);
                          break;
                        case "orbit":
                          setOrbitCount(v);
                          break;
                        case "fireflies":
                          setFirefliesCount(v);
                          break;
                        case "attract-repel":
                          setAttractRepelCount(v);
                          break;
                      }
                    }}
                    className="w-12 border-none bg-transparent text-left text-white outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </span>
              </div>

              {/* 3) Hoofd-slider */}
              <input
                type="range"
                min="0"
                max={(() => {
                  switch (effect) {
                    case "balls":
                      return 100;
                    case "rain":
                      return 1000;
                    case "stars":
                      return 500;
                    case "orbit":
                      return 100;
                    case "fireflies":
                      return 500;
                    case "attract-repel":
                      return 500;
                    default:
                      return 100;
                  }
                })()}
                value={(() => {
                  switch (effect) {
                    case "balls":
                      return ballCount;
                    case "rain":
                      return rainCount;
                    case "stars":
                      return starCount;
                    case "orbit":
                      return orbitCount;
                    case "fireflies":
                      return firefliesCount;
                    case "attract-repel":
                      return attractRepelCount;
                    default:
                      return 0;
                  }
                })()}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10) || 0;
                  switch (effect) {
                    case "balls":
                      setBallCount(v);
                      break;
                    case "rain":
                      setRainCount(v);
                      break;
                    case "stars":
                      setStarCount(v);
                      break;
                    case "orbit":
                      setOrbitCount(v);
                      break;
                    case "fireflies":
                      setFirefliesCount(v);
                      break;
                    case "attract-repel":
                      setAttractRepelCount(v);
                      break;
                  }
                }}
                className="w-full accent-purple-500"
              />

              {/* 4) Extra slider voor radius/muisbereik */}
              {(effect === "orbit" || effect === "attract-repel") && (
                <div className="space-y-2">
                  {/* Label + input direct naast elkaar */}
                  <div className="inline-flex items-center gap-2">
                    <span className="text-sm">
                      {effect === "orbit" ? "Maximale radius:" : "Muis reach:"}
                    </span>
                    <input
                      type="number"
                      min="20"
                      max={effect === "orbit" ? 500 : 300}
                      value={effect === "orbit" ? orbitRadius : attractRepelRange}
                      onChange={(e) => {
                        let v = parseInt(e.target.value, 10) || 0;
                        const max = parseInt(e.target.max, 10);
                        const min = parseInt(e.target.min, 10);
                        v = Math.min(Math.max(v, min), max);
                        if (effect === "orbit") setOrbitRadius(v);
                        else setAttractRepelRange(v);
                      }}
                      className="w-16 border-none bg-transparent text-white outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                    />
                  </div>

                  {/* Slider eronder */}
                  <input
                    type="range"
                    min="20"
                    max={effect === "orbit" ? 500 : 300}
                    value={effect === "orbit" ? orbitRadius : attractRepelRange}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10) || 0;
                      if (effect === "orbit") setOrbitRadius(v);
                      else setAttractRepelRange(v);
                    }}
                    className="w-full accent-purple-500"
                  />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowSettings(true)}
              className="rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:border-purple-400/40 hover:bg-purple-500/25"
              aria-label="Open instellingen"
            >
              <FiSettings size={20} />
            </button>
          )}
        </div>

        {effect === "balls" ? (
          <AnimatedBallsBackground numBalls={ballCount} />
        ) : effect === "rain" ? (
          <RainBackground numDrops={rainCount} />
        ) : effect === "stars" ? (
          <StarsBackground numStars={starCount} />
        ) : effect === "orbit" ? (
          <OrbitBackground numOrbits={orbitCount} maxRadius={orbitRadius} />
        ) : effect === "fireflies" ? (
          <FirefliesBackground numFireflies={firefliesCount} />
        ) : effect === "attract-repel" ? (
          <AttractRepelBackground numParticles={attractRepelCount} interactionRadius={attractRepelRange} />
        ) : null}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-2xl" />
        <div className="relative z-10 mt-16 w-full max-w-3xl md:mt-0 text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl">
            Rick <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">Averesch</span>
          </h1>
          <p className="mt-4 text-lg text-gray-200 md:text-xl">
            Software & Game Developer
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/20 px-6 py-2 text-sm font-semibold text-white transition hover:border-purple-300/60 hover:bg-purple-500/30"
            >
              Mijn werk
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-2 text-sm font-semibold text-gray-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              Kom in contact
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
          onClick={() =>
            document
              .getElementById("about")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          <div className="relative w-7 h-12">
            <div className="w-[2px] px-3 py-2 h-8 border-2 border-white rounded-xl opacity-75 box-content">
              <div className="w-[2px] h-2 bg-white rounded-md animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative px-4 py-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-r from-purple-500/40 via-fuchsia-500/20 to-transparent blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-gradient-to-r from-indigo-500/30 via-purple-500/10 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6 text-left">
            <span className="inline-flex items-center rounded-lg bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.4em] text-purple-200/90">
              Wie ik ben
            </span>
            <h2 className="text-4xl font-bold md:text-5xl">
              Een creatieve <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">ontwikkelaar</span> met liefde voor detail
            </h2>
            <div className="space-y-4 text-lg text-gray-200">
              <p>
                Hoi! Ik ben Rick Averesch, 19 jaar en student Software Development aan ROC van Twente, Almelo de Sumpel.
              </p>
              <p>
                Buiten mijn studie verdiep ik me in game development in Godot met GDScript.
              </p>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-500/20 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgb(168,85,247,0.25)] transition hover:border-purple-300/60 hover:bg-purple-500/30"
            >
              Kom in contact
            </Link>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute -top-6 -left-6 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-4 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_25px_50px_-20px_rgba(109,40,217,0.45)] supports-[backdrop-filter]:bg-white/[0.08]">
              <Image
                src="/Images/MyPicture.jpg"
                alt="Profile"
                width={420}
                height={420}
                className="h-full w-full max-w-sm rounded-2xl object-cover transition-transform duration-[12000ms] ease-out hover:scale-105"
              />
              <div className="absolute inset-4 rounded-2xl border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative overflow-hidden px-4 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15),_rgba(3,7,18,0))]" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
          <div className="text-center">
            {/* <span className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.45em] text-purple-200/80">
              Skills
            </span> */}
            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
              Mijn <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">specialiteiten</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-200">
              Een mix van technische skills en creatieve flair waarmee ik digitale producten vormgeef van idee tot oplevering.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-8 text-left shadow-[0_20px_45px_-30px_rgba(124,58,237,0.75)] transition duration-500 hover:-translate-y-2 hover:border-purple-300/40">
              <div className="absolute -right-12 -top-10 h-28 w-28 rounded-full bg-purple-500/25 blur-2xl transition group-hover:scale-125" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-400/20 text-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m5.25-3-5.25 5.25 5.25 5.25 5.25-5.25-5.25-5.25z" />
                </svg>
              </div>
              <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">Game Development</h3>
              <p className="relative z-10 mt-3 text-sm text-gray-200">
                In mijn vrije tijd ben ik het vaakst bezig met het maken van games. Dit doe ik met Godot en GDScript.
              </p>
            </div>
            <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] p-8 text-left shadow-[0_20px_45px_-30px_rgba(236,72,153,0.75)] transition duration-500 hover:-translate-y-2 hover:border-pink-300/40">
              <div className="absolute -left-10 -top-12 h-28 w-28 rounded-full bg-pink-500/25 blur-2xl transition group-hover:scale-125" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-pink-400/40 bg-pink-400/20 text-pink-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 17.25-2.25 2.25-2.25-2.25m11.25-7.5 2.25-2.25 2.25 2.25m-16.5 9 4.5-4.5 3 3 6-6 4.5 4.5m-9-7.5 2.25-2.25L16.5 9" />
                </svg>
              </div>
              <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">Web Development</h3>
              <p className="relative z-10 mt-3 text-sm text-gray-200">
                Op school en op stages ben ik voornaam bezig geweest met web development, voornamelijk back-end.
              </p>
            </div>
            <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.01] to-transparent p-8 text-left shadow-[0_20px_45px_-30px_rgba(56,189,248,0.75)] transition duration-500 hover:-translate-y-2 hover:border-cyan-300/40">
              <div className="absolute -bottom-12 right-0 h-32 w-32 rounded-full bg-cyan-400/25 blur-2xl transition group-hover:scale-125" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-400/20 text-cyan-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.5 10.5-4.5 4.5m0 0-4.5-4.5m4.5 4.5V3" />
                </svg>
              </div>
              <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">Software Development</h3>
              <p className="relative z-10 mt-3 text-sm text-gray-200">
                Op school ben ik naast web development ook bezig met algemene software ontwikkeling, voornamelijk in C#.
              </p>
            </div>
          </div>
          <div className="relative mt-16 flex h-28 w-full items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 supports-[backdrop-filter]:bg-white/[0.06]">
            <div className={`marquee-track flex ${isMobile ? "w-full" : "w-[300%]"} gap-4`}>
              <div className={`flex ${isMobile ? "w-full" : "w-1/2"} justify-center gap-4`}>
                {SkillsItems.map((item, idx) => (
                  <div
                    key={`set1-${idx}`}
                    className="flex w-24 shrink-0 flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] px-3 py-3 text-center text-xs text-gray-100 transition hover:border-purple-200/30 hover:bg-white/[0.08] hover:text-white"
                  >
                    <img src={item.src} alt={item.label} className="h-7 w-7 object-contain" />
                    <p className="mt-2 cursor-default">{item.label}</p>
                  </div>
                ))}
              </div>
              {!isMobile && (
                <div className="flex w-1/2 justify-center gap-4">
                  {SkillsItems.map((item, idx) => (
                    <div
                      key={`set2-${idx}`}
                      className="flex w-24 shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 text-center text-xs text-gray-100 transition hover:border-purple-200/30 hover:bg-white/[0.08] hover:text-white"
                    >
                      <img src={item.src} alt={item.label} className="h-7 w-7 object-contain" />
                      <p className="mt-2 cursor-default">{item.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative px-4 py-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[28rem] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.2),_rgba(3,7,18,0))]" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        </div>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
          <div className="space-y-4 text-center">
            {/* <span className="inline-flex items-center justify-center rounded-full bg-white/5 px-5 py-1 text-xs uppercase tracking-[0.5em] text-indigo-200/80">
              Portfolio
            </span> */}
            <h2 className="text-4xl font-bold md:text-5xl">
              Mijn <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">Projecten</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-200">
              Hieronder vind je een aantal projecten waar ik aan heb gewerkt.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-purple-300/50 hover:bg-purple-500/20"
            >
              Bekijk al mijn projecten
              <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="relative px-4 pb-32">
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_rgba(3,7,18,0))]" />
        <div className="absolute right-6 top-16 -z-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="mx-auto grid w-full max-w-6xl items-start gap-16 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold md:text-5xl text-white">
              Kom <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">in contact</span>
            </h2>
            <p className="max-w-xl text-base text-gray-200">
              Zin om samen te werken of gewoon iets te vragen? Stuur me een bericht met je ideeën en ik kom zo snel mogelijk bij je terug.
            </p>
            <div className="grid gap-3 text-sm text-gray-300">
              {/* <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Beschikbaar voor freelance projecten &amp; stages
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                Reactie binnen één werkdag
              </div> */}
            </div>
          </div>
          <form className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] p-8 shadow-[0_30px_60px_-35px_rgba(79,70,229,0.6)] supports-[backdrop-filter]:bg-white/[0.12]">
            <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="relative grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-200">
                Naam
                <input
                  type="text"
                  className="mt-2 block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  placeholder="Rick Averesch"
                />
              </label>
              <label className="text-sm font-medium text-gray-200">
                Email
                <input
                  type="email"
                  className="mt-2 block w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  placeholder="rick@averesch.nl"
                />
              </label>
            </div>
            <label className="relative mt-5 block text-sm font-medium text-gray-200">
              Bericht
              <textarea
                rows={5}
                className="mt-2 block w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                placeholder="Hallo Rick, ik heb een vraag over..."
              ></textarea>
            </label>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-purple-200/40 bg-purple-500/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-purple-200/60 hover:bg-purple-500/40 md:w-auto"
            >
              Verzend bericht
              <FiArrowUpRight className="text-base" />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
