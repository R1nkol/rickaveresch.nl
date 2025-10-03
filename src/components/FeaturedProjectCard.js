import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({ title, description, imageSrc, link, tags, badge }) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-[0_2px_6px_rgba(5,6,25,0.2)] transition-all duration-700 hover:border-purple-300/40 hover:shadow-[0_4px_10px_rgba(89,70,255,0.2)] supports-[backdrop-filter]:bg-white/[0.05] backdrop-blur-0 group-hover:backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/25" />
      </div>
      <div className="relative">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-[#030712]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {badge && (
            <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/20 bg-[#030712]/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-purple-100 shadow-[0_8px_20px_rgba(17,12,48,0.4)]">
              {badge}
            </div>
          )}
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-5 p-6 md:p-8">
        <div>
          <h3 className="text-2xl font-semibold text-white md:text-3xl">{title}</h3>
          <p className="mt-3 text-gray-200/90">{description}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
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
    </article>
  );
}
