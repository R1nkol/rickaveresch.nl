"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const NAV_ITEMS = [
  { id: "home", labelKey: "navigation.home" },
  { id: "about", labelKey: "navigation.about" },
  { id: "skills", labelKey: "navigation.skills" },
  { id: "projects", labelKey: "navigation.projects" },
  { id: "contact", labelKey: "navigation.contact" },
];

export default function Header({ activeSection }) {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const isPaymentPage = pathname === "/betaal-mij";
  const isDrinkGamesPage = pathname?.startsWith("/drankspellen");
  const hideLanguageToggle =
    isPaymentPage || isDrinkGamesPage || pathname === "/blackjack-drankspel";

  const suffixSegments = (() => {
    if (!pathname) return [];
    const rawParts = pathname.split("/").filter(Boolean);
    if (!rawParts.length) return [];
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
        {/* Logo + breadcrumbs */}
        <div className="flex min-w-0 flex-1 items-baseline gap-1 sm:gap-2">
          <Link
            href="/"
            className="shrink-0 text-lg font-bold uppercase text-white transition-opacity hover:opacity-80 sm:text-2xl"
          >
            RICKAVERESCH
          </Link>
          {suffixSegments.length > 0 && (
            <nav className="flex min-w-0 items-baseline gap-1 overflow-hidden text-xs font-semibold uppercase text-gray-300 sm:gap-2 sm:text-lg">
              {suffixSegments.map(({ label, href }, index) => {
                const isLast = index === suffixSegments.length - 1;
                return (
                  <span
                    key={href}
                    className={`flex shrink-0 items-baseline gap-1 sm:gap-2 ${
                      !isLast ? "hidden sm:flex" : ""
                    }`}
                  >
                    <span className="shrink-0 text-gray-500">/</span>
                    <Link
                      href={href}
                      className="truncate transition-opacity hover:text-white hover:opacity-80"
                      title={label}
                    >
                      {label}
                    </Link>
                  </span>
                );
              })}
            </nav>
          )}
        </div>

        {/* Navigation + language toggle */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-12">
          {pathname === "/" && (
            <nav className="hidden md:flex gap-6 text-sm">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <div
                    key={item.id}
                    className={`group relative cursor-pointer font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-purple-200"
                        : "text-gray-300 hover:text-purple-100"
                    }`}
                    onClick={() => handleNavigation(item.id)}
                  >
                    {t(item.labelKey)}
                    <span
                      className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-purple-400 transition-transform duration-300 ease-out"
                      style={{ transform: `scaleX(${isActive ? 1 : 0})` }}
                    />
                  </div>
                );
              })}
            </nav>
          )}

          {/* Language toggle - verberg op betaal-mij pagina */}
          {!hideLanguageToggle && (
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t("navigation.toggle")}
              className="inline-flex items-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-200 transition hover:border-purple-300/40 hover:bg-purple-500/25 hover:text-white"
            >
              {language === "nl" ? "NL" : "EN"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
