"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header({ activeSection }) {
  const pathname = usePathname();

  const suffix = (() => {
    if (!pathname) return "";

    const parts = pathname
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        segment
          .replace(/[-_]+/g, " ")
          .trim()
          .toUpperCase()
      );

    if (!parts.length) {
      return "HOME";
    }

    return parts.join(" / ");
  })();

  const handleNavigation = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-2xl font-bold uppercase text-white transition-opacity hover:opacity-80"
        >
          <span>RICKAVERESCH</span>
          {suffix && (
            <span className="text-xl font-semibold text-gray-300">
              / <span className="align-baseline">{suffix}</span>
            </span>
          )}
        </Link>

        {pathname === "/" && (
          <nav className="hidden gap-6 text-sm md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <div
                  key={item.id}
                  className={`group relative cursor-pointer font-medium transition-colors duration-300 ${
                    isActive ? "text-purple-200" : "text-gray-300 hover:text-purple-100"
                  }`}
                  onClick={() => handleNavigation(item.id)}
                >
                  {item.label}
                  <span
                    className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-purple-400 transition-transform duration-300 ease-out"
                    style={{ transform: `scaleX(${isActive ? 1 : 0})` }}
                  />
                </div>
              );
            })}
          </nav>
        )}

        <button className="rounded px-3 py-2 transition-colors hover:bg-white/10 md:hidden">
          {/* Mobile-menu icon */}
        </button>
      </div>
    </header>
  );
}
