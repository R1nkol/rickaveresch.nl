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
    <main className="bg-black text-white font-sans scroll-smooth">
      <Header activeSection={activeSection} />

      <section
        id="home"
        className="relative flex flex-col bg-gray-950 items-center justify-center h-screen text-center px-4"
      >
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
        <div className="relative z-10 mt-16 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Rick <span className="text-purple-400">Averesch</span>
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Software & Game Developer
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="#projects"
              className="jun-gradient text-white px-6 py-2 rounded font-medium hover:brightness-90 transition"
            >
              Mijn werk
            </Link>
            <Link
              href="#contact"
              className="border border-purple-500 text-purple-400 px-6 py-2 rounded font-medium hover:bg-purple-500 hover:text-white transition"
            >
              Kom in contact
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10"
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

      <section
        id="about"
        className="min-h-[60vh] py-20 px-4 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8"
      >
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            About <span className="text-purple-400">Me</span>
          </h2>
          <p className="text-gray-300">
            Hoi! Ik ben Rick Averesch, 19 jaar oud en student Software Development aan
            ROC van Twente, Almelo de Sumpel...
          </p>
          <p className="text-gray-300">
            Naast mijn studie ben ik zelf bezig met game development in Godot met GDScript.
            Ik vind het leuk om nieuwe dingen te leren...
          </p>
          <Link
            href="#contact"
            className="inline-block jun-gradient px-6 py-2 text-white rounded font-medium hover:brightness-90 transition"
          >
            Kom in contact
          </Link>
        </div>
        <div className="flex-1 flex justify-center group">
          <div className="rounded-xl shadow-md overflow-hidden">
            <Image
              src="/Images/MyPicture.jpg"
              alt="Profile"
              width={400}
              height={400}
              className="object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-125"
            />
          </div>
        </div>
      </section>

      <section id="services" className="py-16 px-4 max-w-7xl mx-auto min-h-[40vh]">
        <h2 className="text-center text-4xl font-bold mb-8">
          Mijn <span className="text-purple-400">Specialiteiten</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black border border-purple-500 rounded p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
            <p className="text-gray-300">
              Door mijn opleiding en eigen projecten heb ik veel ervaring met Laravel,
              MySQL en C#.
            </p>
          </div>
          <div className="bg-black border border-purple-500 rounded p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Game Development</h3>
            <p className="text-gray-300">
              Als hobby naast mijn studie ben ik bezig met het maken van games in Godot
              met GDScript.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="py-16 px-4 max-w-7xl mx-auto min-h-[35vh]">
        <h2 className="text-center text-4xl font-bold mb-4">
          Development <span className="text-purple-400">skills</span>
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-xl mx-auto">
          Alle talen en programma's waar ik ervaring mee heb.
        </p>
        <div className="relative overflow-hidden w-full h-32 flex items-center">
          <div className={`marquee-track flex ${isMobile ? "w-full" : "w-[300%]"}`}>
            <div className={`flex ${isMobile ? "w-full" : "w-1/2"} justify-between`}>
              {SkillsItems.map((item, idx) => (
                <div
                  key={`set1-${idx}`}
                  className="bg-[#151335] hover:bg-[#1e1b4b] p-4 rounded flex flex-col items-center mx-2 w-28 shrink-0 transition-transform duration-300 transform hover:scale-105"
                >
                  <img src={item.src} alt={item.label} className="h-8 w-8 object-contain" />
                  <p className="mt-2 text-sm cursor-default">{item.label}</p>
                </div>
              ))}
            </div>
            {!isMobile && (
              <div className="flex w-1/2 justify-between">
                {SkillsItems.map((item, idx) => (
                  <div
                    key={`set2-${idx}`}
                    className="bg-[#151335] hover:bg-[#1e1b4b] p-4 rounded flex flex-col items-center mx-2 w-28 shrink-0 transition-transform duration-300 transform hover:scale-105"
                  >
                    <img src={item.src} alt={item.label} className="h-8 w-8 object-contain" />
                    <p className="mt-2 text-sm cursor-default">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-4">
          Mijn <span className="text-purple-400">Projecten</span>
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-xl mx-auto">
          Hieronder vind je een aantal projecten waar ik aan heb gewerkt.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="jun-gradient text-white px-6 py-2 rounded font-medium hover:brightness-90 transition"
          >
            Bekijk al mijn projecten
          </Link>
        </div>
      </section>

      <section
        id="contact"
        className="bg-black border border-purple-500 py-10 px-4 rounded mx-auto max-w-7xl mb-20"
      >
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Kom <span className="text-purple-400">In Contact</span>
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg">
              Als je vragen hebt of een project wilt starten, stuur me dan gerust een bericht!
            </p>
          </div>
          <form className="bg-gray-900 border border-purple-500 rounded p-6 flex-1 w-full">
            <div className="flex flex-col gap-4 mb-4">
              <label className="text-sm font-medium text-gray-400 w-full">
                Naam
                <input
                  type="text"
                  className="block w-full rounded border border-purple-500 bg-gray-800 text-white mt-1 px-3 py-2 md:w-full"
                />
              </label>
              <label className="text-sm font-medium text-gray-400 w-full">
                Email
                <input
                  type="email"
                  className="block w-full rounded border border-purple-500 bg-gray-800 text-white mt-1 px-3 py-2 md:w-full"
                />
              </label>
              <label className="text-sm font-medium text-gray-400 w-full">
                Bericht
                <textarea
                  rows={4}
                  className="block w-full rounded border border-purple-500 bg-gray-800 text-white mt-1 px-3 py-2 md:w-full"
                ></textarea>
              </label>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-500 transition w-full md:w-auto"
            >
              Verzend
            </button>
          </form>
        </div>
      </section>

{/* Instellingenpaneel linksonder in de hero (niet fixed) */}
<div className="absolute bottom-4 left-4 z-10">
  {showSettings ? (
    <div className="bg-black/80 border border-purple-500 text-white text-sm p-4 rounded-lg shadow-lg w-64 space-y-4 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Settings</h3>
        <button
          onClick={() => setShowSettings(false)}
          className="text-white hover:text-red-400 transition"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* 1) Select bovenaan */}
      <select
        value={effect}
        onChange={(e) => setEffect(e.target.value)}
        className="w-full bg-gray-900 border border-purple-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="balls">Ballen</option>
        <option value="rain">Regen</option>
        <option value="stars">Sneeuw</option>
        <option value="fireflies">Vuurvliegjes</option>
        <option value="attract-repel">Aantrekkingseffect</option>
        <option value="orbit">Roterende objecten</option>
      </select>

      {/* 2) Label + nummer-input */}
      <div className="flex justify-between items-center">
        <span className="font-medium flex items-center gap-1">
          {(() => {
            switch (effect) {
              case 'balls': return `Aantal ballen:`;
              case 'rain': return `Aantal regendruppels:`;
              case 'stars': return `Aantal sneeuwvlokken:`;
              case 'orbit': return `Aantal objecten:`;
              case 'fireflies': return `Aantal vuurvliegjes:`;
              case 'attract-repel': return `Aantal objecten:`;
              default: return '';
            }
          })()}
          <input
            type="number"
            min="0"
            max={(() => {
              switch (effect) {
                case 'balls': return 100;
                case 'rain': return 1000;
                case 'stars': return 500;
                case 'orbit': return 100;
                case 'fireflies': return 500;
                case 'attract-repel': return 500;
                default: return 100;
              }
            })()}
            value={(() => {
              switch (effect) {
                case 'balls': return ballCount.toString();
                case 'rain': return rainCount.toString();
                case 'stars': return starCount.toString();
                case 'orbit': return orbitCount.toString();
                case 'fireflies': return firefliesCount.toString();
                case 'attract-repel': return attractRepelCount.toString();
                default: return 0;
              }
            })()}
            onChange={(e) => {
              let v = parseInt(e.target.value, 10) || 0;
              const max = parseInt(e.target.max, 10);
              v = Math.min(v, max);
              switch (effect) {
                case 'balls': setBallCount(v); break;
                case 'rain': setRainCount(v); break;
                case 'stars': setStarCount(v); break;
                case 'orbit': setOrbitCount(v); break;
                case 'fireflies': setFirefliesCount(v); break;
                case 'attract-repel': setAttractRepelCount(v); break;
              }
            }}
            className="bg-transparent w-12 text-white text-left outline-none border-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
        </span>
      </div>

      {/* 3) Hoofd-slider */}
      <input
        type="range"
        min="0"
        max={(() => {
          switch (effect) {
            case 'balls': return 100;
            case 'rain': return 1000;
            case 'stars': return 500;
            case 'orbit': return 100;
            case 'fireflies': return 500;
            case 'attract-repel': return 500;
            default: return 100;
          }
        })()}
        value={(() => {
          switch (effect) {
            case 'balls': return ballCount;
            case 'rain': return rainCount;
            case 'stars': return starCount;
            case 'orbit': return orbitCount;
            case 'fireflies': return firefliesCount;
            case 'attract-repel': return attractRepelCount;
            default: return 0;
          }
        })()}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10) || 0;
          switch (effect) {
            case 'balls': setBallCount(v); break;
            case 'rain': setRainCount(v); break;
            case 'stars': setStarCount(v); break;
            case 'orbit': setOrbitCount(v); break;
            case 'fireflies': setFirefliesCount(v); break;
            case 'attract-repel': setAttractRepelCount(v); break;
          }
        }}
        className="w-full accent-purple-500"
      />

      {/* 4) Extra slider voor radius/muisbereik */}
{(effect === 'orbit' || effect === 'attract-repel') && (
  <div className="space-y-2">
    {/* Label + input direct naast elkaar */}
    <div className="inline-flex items-center gap-2">
      <span className="text-sm">
        {effect === 'orbit' ? 'Maximale radius:' : 'Muis reach:'}
      </span>
      <input
        type="number"
        min="20"
        max={effect === 'orbit' ? 500 : 300}
        value={effect === 'orbit' ? orbitRadius : attractRepelRange}
        onChange={(e) => {
          let v = parseInt(e.target.value, 10) || 0;
          const max = parseInt(e.target.max, 10);
          const min = parseInt(e.target.min, 10);
          v = Math.min(Math.max(v, min), max);
          if (effect === 'orbit') setOrbitRadius(v);
          else setAttractRepelRange(v);
        }}
        className="w-16 bg-transparent text-white outline-none border-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
      />
    </div>

    {/* Slider eronder */}
    <input
      type="range"
      min="20"
      max={effect === 'orbit' ? 500 : 300}
      value={effect === 'orbit' ? orbitRadius : attractRepelRange}
      onChange={(e) => {
        const v = parseInt(e.target.value, 10) || 0;
        if (effect === 'orbit') setOrbitRadius(v);
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
      className="bg-black/60 border border-purple-500 p-3 rounded-full text-white hover:bg-purple-600 transition"
      aria-label="Open instellingen"
    >
      <FiSettings size={20} />
    </button>
  )}
</div>

      <Footer />
    </main>
  );
}
