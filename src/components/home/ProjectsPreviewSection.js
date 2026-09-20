"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectCard from "@/components/FeaturedProjectCard";
import { projects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectsPreviewSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="section-heading">{t("projectsPreview.heading")}</h2>
          <Link href="/projects" className="text-link">
            {t("projectsPreview.cta")}
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="featured-projects mt-12 grid items-start gap-x-10 gap-y-14 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
