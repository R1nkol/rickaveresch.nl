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

  const suffixSegments = (() => {
    if (!pathname) return [];

    const rawParts = pathname.split("/").filter(Boolean);

    if (!rawParts.length) {
      return [];
    }

    return rawParts.map((segment, index) => ({
      label: segment.replace(/[-_]+/g, " ").trim().toUpperCase(),
      href: `/${rawParts.slice(0, index + 1).join("/")}`,
    }));
  })();

  const handleNavigation = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/80 backdrop-blur font-sans">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-baseline gap-2">
          <Link
            href="/"
            className="text-2xl font-bold uppercase text-white transition-opacity hover:opacity-80"
          >
            RICKAVERESCH
          </Link>
          {suffixSegments.length > 0 && (
            <nav className="flex items-baseline gap-2 text-lg font-semibold uppercase text-gray-300">
              {suffixSegments.map(({ label, href }) => (
                <span key={href} className="flex items-baseline gap-2">
                  <span className="text-gray-500">/</span>
                  <Link
                    href={href}
                    className="transition-opacity hover:text-white hover:opacity-80"
                  >
                    {label}
                  </Link>
                </span>
              ))}
            </nav>
          )}
        </div>

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
