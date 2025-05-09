"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ activeSection }) {
  const pathname = usePathname();

  return (
    <header className="w-full fixed top-0 left-0 bg-black bg-opacity-80 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold uppercase hover:opacity-80">
          RickAveresch
        </Link>

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

        <button className="md:hidden px-3 py-2 rounded hover:bg-white/10">
          {/* Mobile-menu icon */}
        </button>
      </div>
    </header>
  );
}
