"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsPreviewSection from "@/components/home/ProjectsPreviewSection";
import ServicesSection from "@/components/home/ServicesSection";
import {
  BACKGROUND_DEFAULTS,
  BACKGROUND_STORAGE_KEYS,
  loadBackgroundSettings,
  saveBackgroundSetting,
} from "@/lib/backgroundSettings";

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
  const [ballCount, setBallCount] = useState(BACKGROUND_DEFAULTS.ballCount);
  const [rainCount, setRainCount] = useState(BACKGROUND_DEFAULTS.rainCount);
  const [starCount, setStarCount] = useState(BACKGROUND_DEFAULTS.starCount);
  const [orbitCount, setOrbitCount] = useState(BACKGROUND_DEFAULTS.orbitCount);
  const [orbitRadius, setOrbitRadius] = useState(
    BACKGROUND_DEFAULTS.orbitRadius,
  );
  const [firefliesCount, setFirefliesCount] = useState(
    BACKGROUND_DEFAULTS.firefliesCount,
  );
  const [attractRepelCount, setAttractRepelCount] = useState(
    BACKGROUND_DEFAULTS.attractRepelCount,
  );
  const [attractRepelRange, setAttractRepelRange] = useState(
    BACKGROUND_DEFAULTS.attractRepelRange,
  );
  const [effect, setEffect] = useState(BACKGROUND_DEFAULTS.effect);
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
    const settings = loadBackgroundSettings();
    setEffect(settings.effect);
    setBallCount(settings.ballCount);
    setRainCount(settings.rainCount);
    setStarCount(settings.starCount);
    setOrbitCount(settings.orbitCount);
    setOrbitRadius(settings.orbitRadius);
    setFirefliesCount(settings.firefliesCount);
    setAttractRepelCount(settings.attractRepelCount);
    setAttractRepelRange(settings.attractRepelRange);
  }, []);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.effect, effect);
  }, [effect]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.ballCount, ballCount);
  }, [ballCount]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.rainCount, rainCount);
  }, [rainCount]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.starCount, starCount);
  }, [starCount]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.orbitCount, orbitCount);
  }, [orbitCount]);

  useEffect(() => {
    saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.orbitRadius, orbitRadius);
  }, [orbitRadius]);

  useEffect(() => {
    saveBackgroundSetting(
      BACKGROUND_STORAGE_KEYS.firefliesCount,
      firefliesCount,
    );
  }, [firefliesCount]);

  useEffect(() => {
    saveBackgroundSetting(
      BACKGROUND_STORAGE_KEYS.attractRepelCount,
      attractRepelCount,
    );
  }, [attractRepelCount]);

  useEffect(() => {
    saveBackgroundSetting(
      BACKGROUND_STORAGE_KEYS.attractRepelRange,
      attractRepelRange,
    );
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
