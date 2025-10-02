"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  const gallery = project?.gallery ?? [];
  const galleryLength = gallery.length;

  const prevImage = useCallback(() => {
    if (!galleryLength) return;
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + galleryLength) % galleryLength : prev,
    );
  }, [galleryLength]);

  const nextImage = useCallback(() => {
    if (!galleryLength) return;
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % galleryLength : prev,
    );
  }, [galleryLength]);

  const selectedImage =
    selectedIndex !== null && galleryLength > 0
      ? gallery[selectedIndex]
      : null;

  const handleCopyLink = useCallback(() => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(url)
        .then(() => setCopied(true))
        .catch(() => setCopied(true));
    } else {
      setCopied(true);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextImage, prevImage, selectedIndex]);

  const NotFoundContent = (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-white font-sans">
      <div className="relative flex min-h-screen flex-col">
        <Header activeSection="" />
        <div className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
            <h1 className="text-3xl font-bold">Project niet gevonden</h1>
            <p className="mt-3 text-gray-300">
              Het project dat je probeert te openen bestaat niet of is verplaatst.
            </p>
            <Link
              href="/projects"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-purple-500 px-6 py-2 text-sm font-medium text-purple-300 transition hover:bg-purple-500/20"
            >
              Terug naar projecten
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );

  if (!project) {
    return NotFoundContent;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-white font-sans">
      <div className="relative flex min-h-screen flex-col">
        <Header activeSection="" />

        <section className="relative">
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-24 lg:flex-row lg:items-center">
            <div className="flex-1 text-center lg:text-left">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" /> Terug naar projecten
              </Link>
              <h1 className="mt-10 text-4xl font-bold sm:text-5xl md:text-6xl">{project.title}</h1>
              <p className="mt-6 max-w-3xl text-base text-gray-300 sm:text-lg lg:max-w-none">
                {project.description}
              </p>
              {project.technologies?.length > 0 && (
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  {project.technologies.map((tech) => (
                    <Link
                      key={tech}
                      href={`/projects?tag=${encodeURIComponent(tech)}`}
                      className="inline-flex items-center justify-center rounded-full border border-purple-500/60 bg-purple-500/10 px-4 py-2 text-sm text-purple-200 transition hover:border-purple-400 hover:bg-purple-500/30"
                    >
                      {tech}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {project.heroImage && (
              <div className="flex flex-1 justify-center lg:justify-end">
                <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    width={960}
                    height={720}
                    priority
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="relative -mt-16 flex-1 pb-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <h2 className="text-2xl font-semibold text-white">
                  Over <span className="text-purple-300">het project</span>
                </h2>
                <div className="mt-6 space-y-4 text-gray-200 leading-relaxed">
                  {project.details.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white">Project info</h3>
                  <ul className="mt-4 space-y-3 text-gray-200">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                      <span>
                        <span className="font-semibold text-white">Categorie:&nbsp;</span>
                        {project.tags?.join(", ")}
                      </span>
                    </li>
                    {project.badge && (
                      <li className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                        <span>
                          <span className="font-semibold text-white">Status:&nbsp;</span>
                          {project.badge}
                        </span>
                      </li>
                    )}
                  </ul>
                  {project.extraLinks && project.extraLinks.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {project.extraLinks.map(({ href, label }) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-2xl border border-purple-500/50 bg-purple-500/10 px-4 py-3 text-sm font-medium text-purple-200 transition hover:border-purple-400 hover:bg-purple-500/30 hover:text-white"
                        >
                          <span>{label}</span>
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white">Deel dit project</h3>
                  <p className="mt-3 text-sm text-gray-300">
                    Laat anderen zien waar ik aan heb gewerkt. Kopieer de link of stuur een van de extra resources door.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 transition hover:border-purple-400 hover:bg-purple-500/20"
                    >
                      {copied ? "Gekopieerd!" : "Kopieer link"}
                    </button>
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 transition hover:border-purple-400 hover:bg-purple-500/20"
                    >
                      Terug naar Home
                    </Link>
                  </div>
                  <span className="sr-only" aria-live="polite">
                    {copied ? "De link is gekopieerd" : ""}
                  </span>
                </div>
              </div>
            </div>

            {galleryLength > 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-white">
                    Project <span className="text-purple-300">galerij</span>
                  </h2>
                  <p className="text-sm text-gray-300">Klik om te vergroten</p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gallery.map((imgSrc, index) => (
                    <button
                      type="button"
                      key={imgSrc}
                      onClick={() => setSelectedIndex(index)}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-1 text-left transition hover:border-purple-400 hover:bg-purple-500/20"
                    >
                      <div className="relative h-56 w-full overflow-hidden rounded-xl">
                        {imgSrc.endsWith(".gif") ? (
                          <img
                            src={imgSrc}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Image
                            src={imgSrc}
                            alt={`${project.title} screenshot ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                            className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 transition group-hover:opacity-100" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-2 transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
              >
                Bekijk alle projecten
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-2 transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
              >
                Terug naar Home
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {selectedIndex !== null && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-10 backdrop-blur"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#050816]/95 p-6 shadow-[0_40px_120px_-30px_rgba(124,58,237,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-purple-400 hover:bg-purple-500/30"
              onClick={() => setSelectedIndex(null)}
              aria-label="Sluit afbeelding"
            >
              ✕
            </button>
            {galleryLength > 1 && (
              <>
                <button
                  className="absolute left-6 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-purple-400 hover:bg-purple-500/30"
                  onClick={prevImage}
                  aria-label="Vorige afbeelding"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-6 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-purple-400 hover:bg-purple-500/30"
                  onClick={nextImage}
                  aria-label="Volgende afbeelding"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="relative mx-auto max-h-[75vh] w-full">
              {selectedImage.endsWith(".gif") ? (
                <img
                  src={selectedImage}
                  alt="Vergrote afbeelding"
                  className="mx-auto max-h-[75vh] w-full rounded-2xl object-contain"
                />
              ) : (
                <Image
                  src={selectedImage}
                  alt="Vergrote afbeelding"
                  width={1600}
                  height={900}
                  className="mx-auto max-h-[75vh] w-full rounded-2xl object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
