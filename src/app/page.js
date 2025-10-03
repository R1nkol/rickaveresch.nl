"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsPreviewSection from "@/components/home/ProjectsPreviewSection";
import ServicesSection from "@/components/home/ServicesSection";

const skillsItems = [
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
    if (!showSettings) return;
    const y = window.scrollY;
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: y });
      requestAnimationFrame(() => {
        html.style.scrollBehavior = previousBehavior || "";
      });
    });
    return () => {
      html.style.scrollBehavior = previousBehavior || "";
      cancelAnimationFrame(rafId);
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
    if (storedAttractRepelRange)
      setAttractRepelRange(parseInt(storedAttractRepelRange, 10));
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

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-white font-sans scroll-smooth">
      <Header activeSection={activeSection} />

      <HeroSection
        effect={effect}
        setEffect={setEffect}
        ballCount={ballCount}
        setBallCount={setBallCount}
        rainCount={rainCount}
        setRainCount={setRainCount}
        starCount={starCount}
        setStarCount={setStarCount}
        orbitCount={orbitCount}
        setOrbitCount={setOrbitCount}
        orbitRadius={orbitRadius}
        setOrbitRadius={setOrbitRadius}
        firefliesCount={firefliesCount}
        setFirefliesCount={setFirefliesCount}
        attractRepelCount={attractRepelCount}
        setAttractRepelCount={setAttractRepelCount}
        attractRepelRange={attractRepelRange}
        setAttractRepelRange={setAttractRepelRange}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      <AboutSection />
      <ServicesSection skillsItems={skillsItems} isMobile={isMobile} />
      <ProjectsPreviewSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
