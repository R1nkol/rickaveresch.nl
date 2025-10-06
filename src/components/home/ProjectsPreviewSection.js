"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import ProjectCard from "@/components/FeaturedProjectCard";
import { projects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectsPreviewSection() {
  const { t } = useLanguage();

  const heading = t("projectsPreview.heading");
  const headingParts = heading.split(" ");
  const highlight = headingParts.pop();
  const prefix = headingParts.join(" ");

  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.2),_rgba(3,7,18,0))]" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            {prefix ? `${prefix} ` : ""}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
              {highlight}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-200">
            {t("projectsPreview.description")}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-purple-300/50 hover:bg-purple-500/20"
          >
            {t("projectsPreview.cta")}
            <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
