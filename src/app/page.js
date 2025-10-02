"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/FeaturedProjectCard";
import { projects } from "@/data/projects";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSettings, FiX } from "react-icons/fi";

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
        className={`relative flex flex-col items-center justify-center h-screen overflow-hidden px-4 text-center ${
          effect === "balls" ? "bg-[#030712]" : ""
        }`}
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
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/80 backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-2xl" />
        <div className="relative z-10 mt-16 w-full max-w-3xl md:mt-0">
          <div className="mx-auto rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-12 backdrop-blur supports-[backdrop-filter]:bg-white/[0.06]">
            <h1 className="text-4xl font-extrabold md:text-6xl">
              Rick <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">Averesch</span>
            </h1>
            <p className="mt-4 text-lg text-gray-200 md:text-xl">
              Software & Game Developer
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/20 px-6 py-2 text-sm font-semibold text-white transition hover:border-purple-300/60 hover:bg-purple-500/30"
              >
                Mijn werk
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm font-semibold text-gray-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                Kom in contact
              </Link>
            </div>
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
            <div className="w-[2px] px-3 py-2 h-8 border-2 border-white rounded-full opacity-75 box-content">
              <div className="w-[2px] h-2 bg-white rounded-md animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative px-4 py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-8 py-14 backdrop-blur supports-[backdrop-filter]:bg-white/[0.05] md:flex-row">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl">
              About <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-gray-200">
              Hoi! Ik ben Rick Averesch, 19 jaar oud en student Software Development aan ROC van Twente, Almelo de Sumpel...
            </p>
            <p className="text-gray-200">
              Naast mijn studie ben ik zelf bezig met game development in Godot met GDScript. Ik vind het leuk om nieuwe dingen te leren...
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/15 px-6 py-2 text-sm font-semibold text-white transition hover:border-purple-300/60 hover:bg-purple-500/25"
            >
              Kom in contact
            </Link>
          </div>
          <div className="group flex flex-1 justify-center">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-2 supports-[backdrop-filter]:bg-white/[0.05]">
              <Image
                src="/Images/MyPicture.jpg"
                alt="Profile"
                width={400}
                height={400}
                className="h-full w-full max-w-sm rounded-2xl object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative px-4 py-16">
        <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-8 py-14 backdrop-blur supports-[backdrop-filter]:bg-white/[0.05]">
          <h2 className="text-center text-4xl font-bold">
            Mijn <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">Specialiteiten</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="group rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center transition hover:border-purple-300/30 hover:bg-white/[0.08] supports-[backdrop-filter]:bg-white/[0.07]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-400/10 text-purple-200">
                <span className="text-xl font-semibold">&lt;/&gt;</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">Backend Development</h3>
              <p className="mt-3 text-sm text-gray-200">
                Door mijn opleiding en eigen projecten heb ik veel ervaring met Laravel, MySQL en C#.
              </p>
            </div>
            <div className="group rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center transition hover:border-purple-300/30 hover:bg-white/[0.08] supports-[backdrop-filter]:bg-white/[0.07]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-400/10 text-purple-200">
                <span className="text-xl">🎮</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">Game Development</h3>
              <p className="mt-3 text-sm text-gray-200">
                Als hobby naast mijn studie ben ik bezig met het maken van games in Godot met GDScript.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative px-4 py-16">
        <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-8 py-14 backdrop-blur supports-[backdrop-filter]:bg-white/[0.05]">
          <h2 className="text-center text-4xl font-bold">
            Development <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-200">
            Alle talen en programma's waar ik ervaring mee heb.
          </p>
          <div className="relative mt-10 flex h-28 w-full items-center overflow-hidden">
            <div className={`marquee-track flex ${isMobile ? "w-full" : "w-[300%]"}`}>
              <div className={`flex ${isMobile ? "w-full" : "w-1/2"} justify-between gap-3`}>
                {SkillsItems.map((item, idx) => (
                  <div
                    key={`set1-${idx}`}
                    className="flex w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3 text-center text-xs text-gray-100 transition hover:border-purple-200/30 hover:bg-white/[0.08] hover:text-white"
                  >
                    <img src={item.src} alt={item.label} className="h-7 w-7 object-contain" />
                    <p className="mt-2 cursor-default">{item.label}</p>
                  </div>
                ))}
              </div>
              {!isMobile && (
                <div className="flex w-1/2 justify-between gap-3">
                  {SkillsItems.map((item, idx) => (
                    <div
                      key={`set2-${idx}`}
                      className="flex w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-3 text-center text-xs text-gray-100 transition hover:border-purple-200/30 hover:bg-white/[0.08] hover:text-white"
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

      <section id="projects" className="relative px-4 py-16">
        <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-8 py-14 backdrop-blur supports-[backdrop-filter]:bg-white/[0.05]">
          <h2 className="text-center text-4xl font-bold">
            Mijn <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">Projecten</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-200">
            Hieronder vind je een aantal projecten waar ik aan heb gewerkt.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-purple-200/30 bg-white/[0.08] px-6 py-2 text-sm font-semibold text-white transition hover:border-purple-200/40 hover:bg-white/[0.12]"
            >
              Bekijk al mijn projecten
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="relative px-4 pb-24">
        <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-8 py-14 backdrop-blur supports-[backdrop-filter]:bg-white/[0.05]">
          <div className="flex flex-col items-start gap-10 lg:flex-row">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Kom <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">In Contact</span>
              </h2>
              <p className="mt-4 max-w-lg text-gray-200">
                Als je vragen hebt of een project wilt starten, stuur me dan gerust een bericht!
              </p>
              <p className="mt-3 max-w-lg text-sm text-gray-300">
                Ik reageer meestal binnen één werkdag met een voorstel of antwoord op je vraag.
              </p>
            </div>
            <form className="flex-1 w-full rounded-3xl border border-white/10 bg-white/[0.05] p-6 supports-[backdrop-filter]:bg-white/[0.07]">
              <div className="mb-5 flex flex-col gap-4">
                <label className="text-sm font-medium text-gray-200">
                  Naam
                  <input
                    type="text"
                    className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    placeholder="Hoe mag ik je noemen?"
                  />
                </label>
                <label className="text-sm font-medium text-gray-200">
                  Email
                  <input
                    type="email"
                    className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    placeholder="Waar kan ik je bereiken?"
                  />
                </label>
                <label className="text-sm font-medium text-gray-200">
                  Bericht
                  <textarea
                    rows={4}
                    className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    placeholder="Vertel me waar ik je mee kan helpen"
                  ></textarea>
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full border border-purple-200/40 bg-white/[0.1] px-6 py-3 text-sm font-semibold text-white transition hover:border-purple-200/50 hover:bg-white/[0.15] md:w-auto"
              >
                Verzend
              </button>
            </form>
          </div>
        </div>
      <Footer />
      </section>
    </main>
  );
}
