"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const params = useParams() || {};
  const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const project = useMemo(
    () => projects.find((p) => p.slug === String(rawSlug || "")),
    [rawSlug],
  );

  const gallery = Array.isArray(project?.gallery) ? project.gallery : [];
  const galleryLen = gallery.length;

  const [selectedIndex, setSelectedIndex] = useState(null);

  const prevImage = () =>
    setSelectedIndex((prev) => {
      if (prev === null || galleryLen === 0) return prev;
      return (prev - 1 + galleryLen) % galleryLen;
    });

  const nextImage = () =>
    setSelectedIndex((prev) => {
      if (prev === null || galleryLen === 0) return prev;
      return (prev + 1) % galleryLen;
    });

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  if (!project) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#07060a] text-white antialiased">
        {/* Aurora background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-[36rem] w-[36rem] rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute top-1/4 -right-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>

        <Header activeSection="" />
        <section className="mx-auto max-w-7xl px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Project{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              niet gevonden
            </span>
          </h1>
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 underline-offset-4 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              ← Terug naar projecten
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07060a] text-white antialiased">
      {/* Aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[36rem] w-[36rem] rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-1/4 -right-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <Header activeSection="" />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[46vh] w-full overflow-hidden rounded-b-[2.5rem] border-b border-white/10 bg-white/[0.03] backdrop-blur supports-[backdrop-filter]:bg-white/[0.04]">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07060a] via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-x-0 top-20 flex items-center justify-center px-4">
            <h1 className="text-center text-4xl font-extrabold tracking-tight md:text-6xl">
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent drop-shadow">
                {project.title}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar projecten
          </Link>
        </div>

        {/* About card */}
        <article className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur supports-[backdrop-filter]:bg-white/[0.04] transition hover:-translate-y-0.5 hover:border-purple-400/30 hover:shadow-[0_8px_40px_-10px_rgba(168,85,247,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold leading-tight">
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                Over het project
              </span>
            </h2>

            {project.technologies?.length ? (
              <div className="hidden max-w-xl flex-wrap items-center gap-2 sm:flex">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Link
                    key={tech}
                    href={`/projects?tag=${encodeURIComponent(tech)}`}
                    className="inline-flex items-center gap-2 truncate rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs text-purple-200 transition hover:border-purple-400/30 hover:bg-purple-400/15"
                    title={tech}
                  >
                    <span className="h-2 w-2 rounded-full bg-purple-300/80 shadow-[0_0_8px_rgba(216,180,254,0.8)]" />
                    {tech}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-200">
            {project.details?.map((paragraph, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Full technologies */}
        {project.technologies?.length ? (
          <div className="mx-auto mt-8 flex w-full flex-wrap items-center justify-start gap-2">
            <span className="mr-1 text-sm text-gray-400">Gebruikte technologieën:</span>
            {project.technologies.map((tech) => (
              <Link
                href={`/projects?tag=${encodeURIComponent(tech)}`}
                key={tech}
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm transition border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {tech}
              </Link>
            ))}
          </div>
        ) : null}

        {/* Gallery */}
        {galleryLen > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((imgSrc, index) => {
              const isGif = String(imgSrc).toLowerCase().endsWith(".gif");
              return (
                <button
                  type="button"
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur supports-[backdrop-filter]:bg-white/[0.04] transition hover:-translate-y-0.5 hover:border-purple-400/30 hover:shadow-[0_8px_40px_-10px_rgba(168,85,247,0.35)]"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Open screenshot ${index + 1}`}
                >
                  {isGif ? (
                    <img
                      src={imgSrc}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src={imgSrc}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={800}
                      height={500}
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              );
            })}
          </div>
        )}

        {/* Extra links */}
        {project.extraLinks?.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.extraLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        ) : null}

        {/* Bottom nav */}
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 underline-offset-4 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            ← Terug naar projecten
          </Link>
        </div>
      </section>

      {/* Modal */}
      {selectedIndex !== null && galleryLen > 0 && gallery[selectedIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative mx-4 w-full max-w-6xl overflow-hidden rounded-2xl border border-purple-400/30 bg-white/[0.04] p-1 shadow-[0_8px_60px_-10px_rgba(168,85,247,0.6)] supports-[backdrop-filter]:bg-white/[0.06]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/20 text-white transition hover:bg-purple-500/30"
              onClick={() => setSelectedIndex(null)}
              aria-label="Sluit afbeelding"
            >
              ✕
            </button>

            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/20 text-white transition hover:bg-purple-500/30"
              onClick={prevImage}
              aria-label="Vorige afbeelding"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/20 text-white transition hover:bg-purple-500/30"
              onClick={nextImage}
              aria-label="Volgende afbeelding"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="rounded-xl p-1">
              {String(gallery[selectedIndex]).toLowerCase().endsWith(".gif") ? (
                <img
                  src={gallery[selectedIndex]}
                  alt="Vergrote afbeelding"
                  className="max-h-[85vh] w-full rounded-xl object-contain"
                />
              ) : (
                <Image
                  src={gallery[selectedIndex]}
                  alt="Vergrote afbeelding"
                  width={1600}
                  height={1000}
                  className="max-h-[85vh] w-full rounded-xl object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
