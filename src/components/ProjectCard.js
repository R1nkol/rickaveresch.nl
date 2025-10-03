import Image from "next/image";
import PropTypes from "prop-types";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({ title, description, imageSrc, link, tags, badge }) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-[0_4px_10px_rgba(5,6,25,0.15)] transition-all duration-700 hover:border-purple-300/40 hover:shadow-[0_6px_14px_rgba(89,70,255,0.15)] supports-[backdrop-filter]:bg-white/[0.05] hover:backdrop-blur-sm">

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/6 via-transparent to-indigo-500/10" />
      </div>
      <div className="grid gap-0 md:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[220px] overflow-hidden md:min-h-[260px]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/85 via-[#030712]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {badge && (
            <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/20 bg-[#030712]/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-purple-100 shadow-[0_8px_20px_rgba(17,12,48,0.45)]">
              {badge}
            </div>
          )}
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between gap-6 p-6 md:p-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="text-gray-200/90">{description}</p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  href={`/projects?tag=${encodeURIComponent(tag)}`}
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-gray-100 transition-colors duration-300 hover:border-purple-200/40 hover:bg-purple-500/20 hover:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <Link
              href={link}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-200 transition-colors duration-300 hover:text-white"
            >
              Meer info <FiArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  title:        PropTypes.string.isRequired,
  description:  PropTypes.string.isRequired,
  imageSrc:     PropTypes.string.isRequired,
  link:         PropTypes.string.isRequired,
  tags:         PropTypes.arrayOf(PropTypes.string).isRequired,
  badge:        PropTypes.string,
};

ProjectCard.defaultProps = {
  badge: null,
};
