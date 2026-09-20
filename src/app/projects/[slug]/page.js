"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FiX, FiExternalLink } from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const galleryDialogRef = useRef(null);
  const galleryTriggerRef = useRef(null);
  const gallery = project?.gallery ?? [];
  const galleryLength = gallery.length;
  const { t, translateField } = useLanguage();
  const localizedTitle = translateField(project?.title);
  const localizedDescription = translateField(project?.description);
  const localizedBadge = translateField(project?.badge);
  const localizedDetailsRaw = translateField(project?.details);
  const localizedDetails = Array.isArray(localizedDetailsRaw)
    ? localizedDetailsRaw
    : localizedDetailsRaw
      ? [localizedDetailsRaw]
      : [];
  const extraLinks = project?.extraLinks?.map((link) => ({
    ...link,
    label: translateField(link.label),
  })) ?? [];

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

  const isGalleryOpen = Boolean(selectedImage);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const dialog = galleryDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      galleryTriggerRef.current?.focus({ preventScroll: true });
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();

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
          <div className="max-w-md surface-panel p-5 sm:p-8 text-center">
            <h1 className="text-3xl font-bold">{t("projectDetail.notFoundTitle")}</h1>
            <p className="mt-3 text-gray-300">{t("projectDetail.notFoundDescription")}</p>
            <Link
              href="/projects"
              className="button-secondary mt-6"
            >
              {t("projectDetail.backToProjects")}
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

  const primaryExtraLink =
    extraLinks.find(({ label }) => label?.toLowerCase?.().includes("blog")) ?? extraLinks[0] ?? null;
  const hasExtras = Boolean(localizedBadge || primaryExtraLink);
  const aboutHeading = t("projectDetail.aboutHeading");
  const galleryHeading = t("projectDetail.galleryHeading");
  const expandedAlt = localizedTitle ? `${localizedTitle} – ${galleryHeading}` : galleryHeading;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-white font-sans">
      <div className="relative flex min-h-screen flex-col">
        <Header activeSection="" />

        <section className="relative">
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-12 pt-28 sm:gap-10 sm:pb-16 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <PageTitle
                backHref="/projects"
                backLabel={t("projectDetail.backToProjectsShort")}
              >
                {localizedTitle}
              </PageTitle>
              <p className="mt-4 max-w-3xl text-base text-gray-300 sm:text-lg lg:max-w-none">
                {localizedDescription}
              </p>
              {project.technologies?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {project.technologies.map((tech) => (
                    <Link
                      key={tech}
                      href={`/projects?tag=${encodeURIComponent(tech)}`}
                      className="project-tag"
                    >
                      {tech}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {project.heroImage && (
              <div className="flex flex-1 justify-center lg:justify-end">
                <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={project.heroImage}
                    alt={localizedTitle}
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

        <section className="relative flex-1 pb-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <div className="surface-panel p-5 sm:p-8">
                <h2 className="text-2xl font-semibold text-white">
                  {aboutHeading}
                </h2>
                <div className="mt-6 space-y-4 text-gray-200 leading-relaxed">
                  {localizedDetails.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="surface-panel p-6">
                  {hasExtras ? (
                    <div>
                      <div className="flex flex-col gap-5">
                        {localizedBadge && (
                          <div>
                            <p className="text-base text-muted">{localizedBadge}</p>
                          </div>
                        )}
                        {primaryExtraLink && (
                          <a
                            href={primaryExtraLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-secondary w-full"
                          >
                            {primaryExtraLink.label}
                            <FiExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-md border border-white/10 bg-black/40 px-5 py-4 text-base text-muted">
                      {t("projectDetail.noExtras")}
                    </div>
                  )}
                </div>

                <div className="surface-panel p-5 sm:p-8">
                  <h3 className="text-xl font-semibold text-white">{t("projectDetail.moreHeading")}</h3>
                  <p className="mt-3 text-base text-muted">{t("projectDetail.moreDescription")}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/projects"
                      className="button-secondary"
                    >
                      {t("projectDetail.allProjects")}
                    </Link>
                    <Link
                      href="/"
                      className="button-secondary"
                    >
                      {t("projectDetail.backToHome")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {galleryLength > 0 && (
              <div className="surface-panel p-5 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-2xl font-semibold text-white">
                    {galleryHeading}
                  </h2>
                  <p className="text-base text-muted">{t("projectDetail.galleryHint")}</p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gallery.map((imgSrc, index) => (
                    <button
                      type="button"
                      key={imgSrc}
                      onClick={(event) => {
                        galleryTriggerRef.current = event.currentTarget;
                        setSelectedIndex(index);
                      }}
                      className="group relative overflow-hidden rounded-md border border-white/10 bg-black/30 p-1 text-left transition hover:border-accent hover:bg-surface"
                    >
                      <div className="relative h-56 w-full overflow-hidden rounded-md">
                        {imgSrc.endsWith(".gif") ? (
                          <img
                            src={imgSrc}
                            alt={`${localizedTitle} screenshot ${index + 1}`}
                            className="h-full w-full rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Image
                            src={imgSrc}
                            alt={`${localizedTitle} screenshot ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                            className="rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>

      {isGalleryOpen && (
        <dialog
          ref={galleryDialogRef}
          aria-labelledby="gallery-dialog-title"
          className="m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-6xl overflow-y-auto rounded-lg border border-line bg-surface p-0 text-white backdrop:bg-black/80"
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const buttons = event.currentTarget.querySelectorAll("button");
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }}
          onCancel={(event) => {
            event.preventDefault();
            setSelectedIndex(null);
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom
            ) {
              setSelectedIndex(null);
            }
          }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6 sm:py-4">
            <h2 id="gallery-dialog-title" className="min-w-0 text-base font-medium sm:text-lg">
              {localizedTitle}
            </h2>
            <button
              type="button"
              className="button-secondary h-11 w-11 shrink-0 !p-0"
              onClick={() => setSelectedIndex(null)}
              aria-label={t("projectDetail.modalClose")}
              autoFocus
            >
              <FiX aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {selectedImage.endsWith(".gif") ? (
              <img
                src={selectedImage}
                alt={expandedAlt}
                className="mx-auto max-h-[calc(100dvh_-_15rem)] w-full rounded-md bg-black object-contain"
              />
            ) : (
              <Image
                src={selectedImage}
                alt={expandedAlt}
                width={1600}
                height={900}
                className="mx-auto max-h-[calc(100dvh_-_15rem)] w-full rounded-md bg-black object-contain"
              />
            )}
          </div>

          {galleryLength > 1 && (
            <div className="flex items-center justify-center gap-4 border-t border-line px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
              <button
                type="button"
                className="button-secondary h-11 w-11 shrink-0 !p-0"
                onClick={prevImage}
                aria-label={t("projectDetail.modalPrev")}
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <p className="min-w-12 text-center text-sm tabular-nums text-muted" aria-live="polite" aria-atomic="true">
                {selectedIndex + 1} / {galleryLength}
              </p>
              <button
                type="button"
                className="button-secondary h-11 w-11 shrink-0 !p-0"
                onClick={nextImage}
                aria-label={t("projectDetail.modalNext")}
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          )}
        </dialog>
      )}
    </main>
  );
}
