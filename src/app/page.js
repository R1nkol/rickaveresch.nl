"use client";

import RainBackground from "@/components/RainBackground";
import AnimatedBallsBackground from "@/components/AnimatedBallsBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Selecteer alle secties met een id
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Als een sectie voor minstens 60% zichtbaar is, stel die in als actief
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Detecteer of de gebruiker op een mobiel scherm zit (bijv. smaller dan 768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Directe check bij mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // De items voor de skills sectie
  const items = [
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
      {/* HEADER / NAVBAR */}
      <Header activeSection={activeSection} />

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative flex flex-col bg-gray-950 items-center justify-center h-screen text-center px-4"
      >
        {/* <RainBackground /> */}
        <AnimatedBallsBackground />

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

        {/* Scroll-indicator */}
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

      {/* OVER MIJ SECTION */}
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
            ROC van Twente, Almelo de Sumpel. Tijdens mijn opleiding leer ik HTML, CSS,
            JavaScript, PHP, MySQL en C#, en werk ik met Laravel, Next.js, Tailwind CSS en
            Bootstrap om webapplicaties te ontwikkelen.
          </p>
          <p className="text-gray-300">
            Naast mijn studie ben ik zelf bezig met game development in Godot met GDScript.
            Ik vind het leuk om nieuwe dingen te leren en mezelf continu uit te dagen door
            eigen projecten te maken en te experimenteren met verschillende technologieën.
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

      {/* SERVICES / SPECIALITEITEN SECTION */}
      <section id="services" className="py-16 px-4 max-w-7xl mx-auto min-h-[40vh]">
        <h2 className="text-center text-4xl font-bold mb-8">
          Mijn <span className="text-purple-400">Specialiteiten</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Backend Development */}
          <div className="bg-black border border-purple-500 rounded p-6 text-center hover:shadow-md transition-shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              className="mx-auto mb-4"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="6" rx="1" ry="1" />
              <rect x="3" y="14" width="18" height="6" rx="1" ry="1" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
            <p className="text-gray-300">
              Door mijn opleiding en eigen projecten heb ik veel ervaring met Laravel,
              MySQL en C#.
            </p>
          </div>
          {/* Game Development */}
          <div className="bg-black border border-purple-500 rounded p-6 text-center hover:shadow-md transition-shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              className="mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 10c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v4c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4v-4z" />
              <circle cx="9" cy="12" r="1" />
              <circle cx="15" cy="12" r="1" />
              <path d="M12 15v1" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Game Development</h3>
            <p className="text-gray-300">
              Als hobby naast mijn studie ben ik bezig met het maken van games in Godot
              met GDScript.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS & TOOLS SECTION */}
      <section id="skills" className="py-16 px-4 max-w-7xl mx-auto min-h-[35vh]">
        <h2 className="text-center text-4xl font-bold mb-4">
          Mijn <span className="text-purple-400">Development skills</span>
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-xl mx-auto">
          Alle talen en programma's waar ik ervaring mee heb.
        </p>

        <div className="relative overflow-hidden w-full h-32 flex items-center">
          {/* Op desktop gebruiken we twee sets (voor een vloeiende marquee), op mobiel maar één */}
          <div
            className={`marquee-track flex ${
              isMobile ? "w-full" : "w-[300%]"
            }`}
          >
            <div className={`flex ${isMobile ? "w-full" : "w-1/2"} justify-between`}>
              {items.map((item, idx) => (
                <div
                  key={`set1-${idx}`}
                  className="bg-[#151335] hover:bg-[#1e1b4b] p-4 rounded flex flex-col items-center mx-2 w-28 shrink-0 transition-transform duration-300 transform hover:scale-105"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-8 w-8 object-contain"
                  />
                  <p className="mt-2 text-sm cursor-default">{item.label}</p>
                </div>
              ))}
            </div>
            {!isMobile && (
              <div className="flex w-1/2 justify-between">
                {items.map((item, idx) => (
                  <div
                    key={`set2-${idx}`}
                    className="bg-[#151335] hover:bg-[#1e1b4b] p-4 rounded flex flex-col items-center mx-2 w-28 shrink-0 transition-transform duration-300 transform hover:scale-105"
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="h-8 w-8 object-contain"
                    />
                    <p className="mt-2 text-sm cursor-default">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RECENTE PROJECTS SECTION */}
      <section id="projects" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-4">
          Recente <span className="text-purple-400">Projecten</span>
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-xl mx-auto">
          Hieronder vind je een aantal projecten waar ik aan heb gewerkt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project card 1 */}
          <div className="bg-[#151335] border border-purple-600 rounded-lg overflow-hidden group">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <Image
                src="/Images/CyberBox.png"
                alt="Project 1"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">CyberBox</h3>
              <p className="text-gray-300 mt-2">
                Mijn eerste grote project met Godot.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    Godot
                  </div>
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    GDScript
                  </div>
                </div>
                <a
                  href="/projects/cyberbox"
                  className="text-purple-400 text-sm transition hover:underline hover:text-purple-300"
                >
                  Meer info →
                </a>
              </div>
            </div>
          </div>

          {/* Project card 2 */}
          <div className="bg-[#151335] border border-purple-600 rounded-lg overflow-hidden group">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <Image
                src="/Images/CaveGame.png"
                alt="Project 1"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">Cave Game</h3>
              <p className="text-gray-300 mt-2">
                Mijn meest recente project met Godot.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    Godot
                  </div>
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    GDScript
                  </div>
                </div>
                <a
                  href="/projects/cavegame"
                  className="text-purple-400 text-sm transition hover:underline hover:text-purple-300"
                >
                  Meer info →
                </a>
              </div>
            </div>
          </div>

          {/* Project card 3 */}
          <div className="bg-[#151335] border border-purple-600 rounded-lg overflow-hidden group">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <Image
                src="/Images/EventPlay.png"
                alt="Project 1"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">MBO EventPlay</h3>
              <p className="text-gray-300 mt-2">
                Mijn eerste solo project met Laravel.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    Laravel
                  </div>
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    Tailwind
                  </div>
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    MySQL
                  </div>
                </div>
                <a
                  href="/projects/eventplay"
                  className="text-purple-400 text-sm transition hover:underline hover:text-purple-300"
                >
                  Meer info →
                </a>
              </div>
            </div>
          </div>

          {/* Project card 4 */}
          <div className="bg-[#151335] border border-purple-600 rounded-lg overflow-hidden group">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <Image
                src="/Images/ZuivelStad.png"
                alt="Project 1"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">ZuivelStad</h3>
              <p className="text-gray-300 mt-2">
                Mijn eerste website gemaakt in een groep.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    HTML
                  </div>
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    CSS
                  </div>
                  <div className="border cursor-default border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white">
                    JavaScript
                  </div>
                </div>
                <a
                  href="/projects/zuivelstad"
                  className="text-purple-400 text-sm transition hover:underline hover:text-purple-300"
                >
                  Meer info →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
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
          <form className="bg-gray-900 border border-purple-500 rounded p-6 flex-1">
            <div className="flex flex-col gap-4 mb-4">
              <label className="text-sm font-medium text-gray-400">
                Naam
                <input
                  type="text"
                  className="block w-full rounded border border-purple-500 bg-gray-800 text-white mt-1 px-3 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-400">
                Email
                <input
                  type="email"
                  className="block w-full rounded border border-purple-500 bg-gray-800 text-white mt-1 px-3 py-2"
                />
              </label>
              <label className="text-sm font-medium text-gray-400">
                Bericht
                <textarea
                  rows={4}
                  className="block w-full rounded border border-purple-500 bg-gray-800 text-white mt-1 px-3 py-2"
                ></textarea>
              </label>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded font-medium hover:bg-purple-500 transition"
            >
              Verzend
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
