"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectCard({ title, description, imageSrc, link, tags, badge, featured = false }) {
  const { translateField, t } = useLanguage();
  const resolvedTitle = translateField(title);
  const resolvedBadge = translateField(badge);
  const Heading = featured ? "h3" : "h2";

  return (
    <article className={featured ? "project-card group min-w-0" : "project-card group grid gap-6 border-t border-line py-8 md:grid-cols-[1.1fr_1fr] md:gap-10"}>
      <Link href={link} className="project-image" aria-label={resolvedTitle}>
        <Image
          src={imageSrc}
          alt={resolvedTitle}
          fill
          sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1200px) 50vw, 560px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </Link>
      <div className={featured ? "pt-5" : "flex flex-col justify-center py-2"}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <Heading className="text-2xl font-semibold tracking-tight text-white">
            <Link href={link} className="transition-colors hover:text-accent">{resolvedTitle}</Link>
          </Heading>
          {resolvedBadge && <span className="text-sm text-muted">{resolvedBadge}</span>}
        </div>
        <p className="mt-3 text-base leading-relaxed text-muted">{translateField(description)}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {tags.map((tag) => (
              <Link href={"/projects?tag=" + encodeURIComponent(tag)} key={tag} className="project-tag">
                {tag}
              </Link>
            ))}
          </div>
          <Link href={link} className="text-link">
            {t("projectCard.moreInfo")} <FiArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
