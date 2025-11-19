"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsPreviewSection from "@/components/home/ProjectsPreviewSection";
import ServicesSection from "@/components/home/ServicesSection";
import useBackgroundSettingsControls from "@/hooks/useBackgroundSettingsControls";

const skillsItems = [
  { src: "/icons/html.webp", label: "HTML5", href: "https://developer.mozilla.org/docs/Web/HTML" },
  { src: "/icons/css.webp", label: "CSS3", href: "https://developer.mozilla.org/docs/Web/CSS" },
  { src: "/icons/javascript.svg", label: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
  { src: "/icons/typescript.svg", label: "TypeScript", href: "https://www.typescriptlang.org/docs/" },
  { src: "/icons/laravel.webp", label: "Laravel", href: "https://laravel.com/" },
  { src: "/icons/c_sharp.webp", label: "C#", href: "https://learn.microsoft.com/dotnet/csharp/" },
  { src: "/icons/nextdotjs.svg", label: "Next.js", href: "https://nextjs.org/" },
  { src: "/icons/react.svg", label: "React", href: "https://react.dev/" },
  { src: "/icons/tailwind.webp", label: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { src: "/icons/bootstrap.svg", label: "Bootstrap", href: "https://getbootstrap.com/" },
  { src: "/icons/php.webp", label: "PHP", href: "https://www.php.net/" },
  { src: "/icons/mongodb.webp", label: "MongoDB", href: "https://www.mongodb.com/docs/" },
  { src: "/icons/MySQL.webp", label: "MySQL", href: "https://dev.mysql.com/doc/" },
  { src: "/icons/godot.webp", label: "Godot", href: "https://godotengine.org/" },
  { src: "/icons/wordpress.svg", label: "WordPress", href: "https://wordpress.org/" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const {
    effect,
    setEffect,
    ballCount,
    setBallCount,
    rainCount,
    setRainCount,
    starCount,
    setStarCount,
    orbitCount,
    setOrbitCount,
    orbitRadius,
    setOrbitRadius,
    firefliesCount,
    setFirefliesCount,
    attractRepelCount,
    setAttractRepelCount,
    attractRepelRange,
    setAttractRepelRange,
  } = useBackgroundSettingsControls();
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
