"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiX } from "react-icons/fi";

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <SyncedBackground />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[#101013]/80" aria-hidden="true" />
      <BackgroundSettingsStandalone variant="floating" />

      <div className="relative z-10">
        <Header activeSection="" />

        <section className="flex-1 px-5 pb-20 pt-32 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="page-heading">{heading}</h1>
            <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
              {t("projectsPage.description")}
            </p>
          </div>

          {tag && (
            <div className="mx-auto mt-8 flex max-w-6xl">
              <div className="surface-panel inline-flex flex-wrap items-center gap-3 px-4 py-2 text-sm">
                <span className="text-sm text-muted">
                  {t("projectsPage.filterBadge")}
                </span>
                <span className="text-sm font-medium text-white">{tag}</span>
                <Link
                  href="/projects"
                  className="text-link"
                >
                  <FiX className="h-3 w-3" />
                  {t("projectsPage.reset")}
                </Link>
              </div>
            </div>
          )}

          <div className="mx-auto mt-12 max-w-6xl">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
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
