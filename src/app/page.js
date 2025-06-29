"use client";

import AnimatedBallsBackground from "@/components/AnimatedBallsBackground";
import RainBackground from "@/components/RainBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/FeaturedProjectCard";
import { projects } from "@/data/projects";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSettings, FiX } from "react-icons/fi";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [ballCount, setBallCount] = useState(35);
  const [rainCount, setRainCount] = useState(100);
  const [effect, setEffect] = useState("balls");
  const [showSettings, setShowSettings] = useState(false);

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
        ) : (
          <RainBackground numDrops={rainCount} />
        )}
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
    <div className="bg-black/80 border border-purple-500 text-white text-sm p-4 rounded-lg shadow-lg w-64">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">
          {effect === "balls" ? `Ballen: ${ballCount}` : `Regen: ${rainCount}`}
        </span>
        <button
          onClick={() => setShowSettings(false)}
          className="text-white hover:text-red-400 transition"
        >
          <FiX size={18} />
        </button>
      </div>
      <select
        value={effect}
        onChange={(e) => setEffect(e.target.value)}
        className="mb-2 w-full text-black rounded p-1"
      >
        <option value="balls">Ballen</option>
        <option value="rain">Regen</option>
      </select>
      <input
        type="range"
        min="0"
        max={effect === "balls" ? "250" : "1000"}
        value={effect === "balls" ? ballCount : rainCount}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (effect === "balls") {
            setBallCount(value);
          } else {
            setRainCount(value);
          }
        }}
        className="w-full accent-purple-500"
      />
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
