"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SyncedBackground from "@/components/SyncedBackground";
import BackgroundSettingsStandalone from "@/components/BackgroundSettingsStandalone";
import { shftBlogPosts } from "@/data/shftBlog";
import { useLanguage } from "@/contexts/LanguageContext";

const DEFAULT_PER_PAGE = 5;
const PER_PAGE_OPTIONS = [5, 10, 25, 50, 100, 250, 500, 1000];
const PER_PAGE_ALL_VALUE = "all";

function parseDateSafe(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(+date) ? null : date;
}

function normalizePost(post) {
  const start = parseDateSafe(post.startDate) || parseDateSafe(post.date);
  const end = parseDateSafe(post.endDate) || start;
  const sortDate = end || start || new Date(0);
  return { ...post, dateStart: start, dateEnd: end, sortDate };
}

function getPosts(sort = "newest") {
  const posts = shftBlogPosts.map(normalizePost);
  posts.sort((a, b) => (sort === "oldest" ? +a.sortDate - +b.sortDate : +b.sortDate - +a.sortDate));
  return posts;
}

function formatPeriod(start, end, language) {
  const locale = language === "nl" ? "nl-NL" : "en-US";
  const longFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!start && !end) return "";
  if (!start) return longFormatter.format(end);
  if (!end) return longFormatter.format(start);

  if (start.toDateString() === end.toDateString()) {
    return longFormatter.format(start);
  }

  const monthFormatter = (date) => date.toLocaleDateString(locale, { month: "long" });
  const startMonth = monthFormatter(start);
  const endMonth = monthFormatter(end);
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear && start.getMonth() === end.getMonth()) {
    if (language === "nl") {
      return `${start.getDate()} t/m ${end.getDate()} ${startMonth} ${startYear}`;
    }
    return `${startMonth} ${start.getDate()}–${end.getDate()}, ${startYear}`;
  }

  if (startYear === endYear) {
    if (language === "nl") {
      return `${start.getDate()} ${startMonth} t/m ${end.getDate()} ${endMonth} ${startYear}`;
    }
    return `${startMonth} ${start.getDate()} – ${endMonth} ${end.getDate()}, ${startYear}`;
  }

  if (language === "nl") {
    return `${start.getDate()} ${startMonth} ${startYear} t/m ${end.getDate()} ${endMonth} ${endYear}`;
  }
  return `${startMonth} ${start.getDate()}, ${startYear} – ${endMonth} ${end.getDate()}, ${endYear}`;
}

export default function BlogPageClient({ initialSearchParams = {} }) {
  const searchParams = useSearchParams();
  const { t, translateField, language } = useLanguage();

  const rawSort = searchParams.get("sort") ?? initialSearchParams.sort;
  const sort = rawSort === "oldest" ? "oldest" : "newest";
  const rawPerPage = searchParams.get("perPage") ?? initialSearchParams.perPage;
  const perPageIsAll = String(rawPerPage ?? "").toLowerCase() === PER_PAGE_ALL_VALUE;
  const perPageParsed = parseInt(rawPerPage ?? "", 10);
  const perPage = PER_PAGE_OPTIONS.includes(perPageParsed) ? perPageParsed : DEFAULT_PER_PAGE;
  const rawPage = searchParams.get("page") ?? initialSearchParams.page;
  const page = parseInt(rawPage ?? "", 10) || 1;

  const posts = useMemo(() => getPosts(sort), [sort]);
  const translatedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        title: translateField(post.title),
        content: translateField(post.content),
      })),
    [posts, translateField],
  );

  const totalPosts = translatedPosts.length;
  const perPageOptions = PER_PAGE_OPTIONS.filter((opt) => opt <= Math.max(totalPosts, DEFAULT_PER_PAGE));
  const perPageEffective = perPageIsAll ? totalPosts : totalPosts ? Math.min(perPage, totalPosts) : perPage;
  const totalPages = Math.ceil(totalPosts / (perPageEffective || 1)) || 1;
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * (perPageEffective || 1);
  const paginated = perPageIsAll ? translatedPosts : translatedPosts.slice(startIndex, startIndex + perPageEffective);
  const perPageParam = perPageIsAll ? PER_PAGE_ALL_VALUE : perPage;

  const pagesToShow = useMemo(() => {
    const siblingCount = 1;
    const totalNumbers = siblingCount * 2 + 5;

    const makeRange = (startAt, endAt) => Array.from({ length: endAt - startAt + 1 }, (_, index) => startAt + index);

    if (totalPages <= totalNumbers) {
      return makeRange(1, totalPages);
    }

    const leftSiblingIndex = Math.max(safePage - siblingCount, 1);
    const rightSiblingIndex = Math.min(safePage + siblingCount, totalPages);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + siblingCount * 2;
      const leftRange = makeRange(1, leftItemCount);
      return [...leftRange, "ellipsis", totalPages];
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + siblingCount * 2;
      const rightRange = makeRange(totalPages - rightItemCount + 1, totalPages);
      return [1, "ellipsis", ...rightRange];
    }

    const middleRange = makeRange(leftSiblingIndex, rightSiblingIndex);
    return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
  }, [safePage, totalPages]);

  const localePeriod = (start, end) => formatPeriod(start, end, language);

  const heading = t("blog.heading");
  const headingParts = heading.split(" ");
  const headingHighlight = headingParts.pop();
  const headingPrefix = headingParts.join(" ");

  return (
    <main className="relative min-h-screen overflow-hidden text-white antialiased">
      <SyncedBackground />
      <BackgroundSettingsStandalone variant="floating" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <section className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 pt-28">
          <h1 className="text-center text-4xl font-bold tracking-tight">
            {headingPrefix ? `${headingPrefix} ` : ""}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              {headingHighlight}
            </span>
          </h1>

          <div className="mx-auto mt-8 flex w-full max-w-md items-center justify-center gap-3">
            <Link
              href={`/projects/shft/blog?sort=newest&perPage=${perPageParam}`}
              className={`inline-flex items-center rounded-xl border px-4 py-1.5 text-sm transition ${
                sort === "newest"
                  ? "border-purple-500/50 bg-purple-500/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t("blog.sort.newest")}
            </Link>
            <Link
              href={`/projects/shft/blog?sort=oldest&perPage=${perPageParam}`}
              className={`inline-flex items-center rounded-xl border px-4 py-1.5 text-sm transition ${
                sort === "oldest"
                  ? "border-purple-500/50 bg-purple-500/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t("blog.sort.oldest")}
            </Link>
          </div>

          <div className="mt-10 grid gap-6">
            {paginated.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-px hover:border-purple-400/20 hover:shadow-[0_6px_30px_-15px_rgba(168,85,247,0.3)] hover:backdrop-blur-xl hover:supports-[backdrop-filter]:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-semibold leading-tight">
                    <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                      {post.title}
                    </span>
                  </h2>

                  <span
                    className="inline-flex max-w-full items-center gap-2 truncate rounded-lg border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs text-purple-200"
                    title={localePeriod(post.dateStart, post.dateEnd)}
                  >
                    <span className="h-2 w-2 rounded-xl bg-purple-300/80 shadow-[0_0_8px_rgba(216,180,254,0.8)]" />
                    {localePeriod(post.dateStart, post.dateEnd)}
                  </span>
                </div>

                <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <p className="mt-4 max-w-3xl whitespace-pre-wrap text-[15px] leading-7 text-gray-200">
                  {post.content}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <span className="mr-1 text-sm text-gray-400">{t("blog.perPageLabel")}</span>
              {perPageOptions.map((option) => {
                const active = !perPageIsAll && option === perPage;
                return (
                  <Link
                    key={option}
                    href={`/projects/shft/blog?sort=${sort}&perPage=${option}`}
                    className={`inline-flex items-center rounded-xl border px-3 py-1 text-sm transition ${
                      active
                        ? "border-purple-500/50 bg-purple-500/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                        : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {option}
                  </Link>
                );
              })}
              <Link
                href={`/projects/shft/blog?sort=${sort}&perPage=${PER_PAGE_ALL_VALUE}`}
                className={`inline-flex items-center rounded-xl border px-3 py-1 text-sm transition ${
                  perPageIsAll
                    ? "border-purple-500/50 bg-purple-500/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t("blog.perPageAll")}
              </Link>
            </div>

            <nav className="flex items-center justify-center gap-2 md:justify-end">
              {pagesToShow.map((item, index) => {
                if (item === "ellipsis") {
                  return (
                    <span key={`ellipsis-${index}`} className="rounded-xl px-3 py-1.5 text-sm text-gray-400">
                      {t("blog.pagerEllipsis")}
                    </span>
                  );
                }

                const active = item === safePage;
                return (
                  <Link
                    key={item}
                    href={`/projects/shft/blog?page=${item}&sort=${sort}&perPage=${perPageParam}`}
                    className={`rounded-xl px-3 py-1.5 text-sm transition ${
                      active
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_10px_30px_-12px_rgba(168,85,247,0.6)]"
                        : "border border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
