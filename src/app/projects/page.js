"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import BackgroundSettingsStandalone from "@/components/BackgroundSettingsStandalone";
import { projects } from "@/data/projects";
import SyncedBackground from "@/components/SyncedBackground";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsPageFallback />}>
      <ProjectsPageContent />
    </Suspense>
  );
}

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const { t } = useLanguage();

  const filteredProjects = useMemo(() => {
    if (!tag) return projects;
    return projects.filter((project) => project.tags.includes(tag));
  }, [tag]);

  const heading = t("projectsPage.heading");
  const headingParts = heading.split(" ");
  const highlight = headingParts.pop();
  const prefix = headingParts.join(" ");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <SyncedBackground />
      <BackgroundSettingsStandalone variant="floating" />

      <div className="relative z-10">
        <Header activeSection="" />

        <section className="flex-1 px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
              {prefix ? `${prefix} ` : ""}
              <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                {highlight}
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
              {t("projectsPage.description")}
            </p>
          </div>

          {tag && (
            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-xl border border-purple-400/40 bg-purple-500/10 px-5 py-2 text-sm text-purple-200">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-200/80">
                  {t("projectsPage.filterBadge")}
                </span>
                <span className="text-sm font-medium text-white">{tag}</span>
                <Link
                  href="/projects"
                  className="inline-flex items-center rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-gray-200 transition hover:border-purple-300/50 hover:bg-purple-500/20 hover:text-white"
                >
                  {t("projectsPage.reset")}
                </Link>
              </div>
            </div>
          )}

          <div className="mx-auto mt-12 max-w-7xl space-y-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-6 py-2 text-sm font-medium text-gray-200 transition hover:border-purple-300/50 hover:bg-purple-500/20 hover:text-white"
            >
              {t("projectsPage.backHome")}
            </Link>
          </div>
        </section>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}

function ProjectsPageFallback() {
  return <main className="min-h-screen bg-[var(--background)]" aria-busy="true" />;
}
