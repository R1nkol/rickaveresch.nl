"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    // Selecteer alle secties die een id hebben
    const sections = document.querySelectorAll("section[id]");

    // Maak een nieuwe observer aan
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

    // Cleanup: unobserve alle secties bij unmount
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 bg-black bg-opacity-80 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo of naam */}
        <Link href="/" className="text-2xl font-bold uppercase hover:opacity-80">
          RickAveresch
        </Link>

        {/* Menu-items alleen weergeven op de hoofdpagina */}
        {pathname === "/" && (
          <nav className="hidden md:flex gap-6 text-sm">
            <div
              className={`cursor-pointer hover:text-purple-400 ${activeSection === "home" ? "font-bold text-purple-400" : ""}`}
              onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
            >
              Home
            </div>
            <div
              className={`cursor-pointer hover:text-purple-400 ${activeSection === "about" ? "font-bold text-purple-400" : ""}`}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              About
            </div>
            <div
              className={`cursor-pointer hover:text-purple-400 ${activeSection === "services" ? "font-bold text-purple-400" : ""}`}
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              Services
            </div>
            <div
              className={`cursor-pointer hover:text-purple-400 ${activeSection === "skills" ? "font-bold text-purple-400" : ""}`}
              onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
            >
              Skills
            </div>
            <div
              className={`cursor-pointer hover:text-purple-400 ${activeSection === "projects" ? "font-bold text-purple-400" : ""}`}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Projects
            </div>
            <div
              className={`cursor-pointer hover:text-purple-400 ${activeSection === "contact" ? "font-bold text-purple-400" : ""}`}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact
            </div>
          </nav>
        )}

        {/* Button voor mobile-menu (niet uitgewerkt) */}
        <button className="md:hidden px-3 py-2 rounded hover:bg-white/10">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            stroke="white"
            fill="none"
            strokeWidth="2"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg> */}
        </button>
      </div>
    </header>
  );
}
