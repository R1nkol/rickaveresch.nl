"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import ColorThemePicker from "@/components/ColorThemePicker";
import LanguagePicker from "@/components/LanguagePicker";

const NAV_ITEMS = [
  { id: "home", labelKey: "navigation.home" },
  { id: "about", labelKey: "navigation.about" },
  { id: "skills", labelKey: "navigation.skills" },
  { id: "projects", labelKey: "navigation.projects" },
  { id: "contact", labelKey: "navigation.contact" },
];

export default function Header({ activeSection, navigationItems }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isPaymentPage = pathname === "/betaal-mij";
  const isDrinkGamesPage = pathname?.startsWith("/drankspellen");
  const isPadelPage = pathname === "/padel" || pathname?.startsWith("/padel/");
  const hideLanguagePicker =
    isPaymentPage || isDrinkGamesPage || isPadelPage || pathname === "/blackjack-drankspel";
  const navItems = navigationItems ?? (pathname === "/" ? NAV_ITEMS : []);

  const suffixSegments = (() => {
    if (!pathname) return [];
    const rawParts = pathname.split("/").filter(Boolean);
    if (!rawParts.length) return [];
    return rawParts.map((segment, index) => ({
      label: segment.replace(/[-_]+/g, " ").trim(),
      href: `/${rawParts.slice(0, index + 1).join("/")}`,
    }));
  })();

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-line bg-background font-sans">
      <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* Logo + breadcrumbs */}
        <div className="flex min-w-0 flex-1 items-baseline gap-1 sm:gap-2">
          <Link
            href="/"
            className="shrink-0 text-base font-medium tracking-tight text-white transition-colors hover:text-accent sm:text-xl"
          >
            Rick Averesch
          </Link>
          {suffixSegments.length > 0 && (
            <nav className="flex min-w-0 items-baseline gap-1 overflow-hidden text-sm text-muted sm:gap-2">
              {suffixSegments.map(({ label, href }, index) => {
                const isLast = index === suffixSegments.length - 1;
                return (
                  <span
                    key={href}
                    className={`flex min-w-0 items-baseline gap-1 sm:gap-2 ${
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

        {/* Navigation + site preferences */}
        <div className="flex shrink-0 items-center gap-3 lg:gap-8">
          {navItems.length > 0 && (
            <nav className="hidden md:flex gap-4 lg:gap-6 text-sm">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    href={item.href ?? "/#" + item.id}
                    aria-current={isActive ? "location" : undefined}
                    key={item.id}
                    className={`group relative cursor-pointer font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    {item.label ?? t(item.labelKey)}
                    <span
                      className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-accent transition-transform duration-300 ease-out"
                      style={{ transform: `scaleX(${isActive ? 1 : 0})` }}
                    />
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {!hideLanguagePicker && <LanguagePicker key={`language-${pathname}`} />}
            <ColorThemePicker key={`color-theme-${pathname}`} />
          </div>
        </div>
      </div>
    </header>
  );
}
