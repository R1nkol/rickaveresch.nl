import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBallsBackground from "@/components/AnimatedBallsBackground";
import { shftBlogPosts } from "@/data/shftBlog";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "SHFT blog - Rick Averesch",
  description: "Updates over de ontwikkeling van SHFT.",
};

const DEFAULT_PER_PAGE = 5;
const PER_PAGE_OPTIONS = [5, 10, 25, 50, 100, 250, 500, 1000];
const PER_PAGE_ALL_VALUE = "all";

function parseDateSafe(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(+d) ? null : d;
}

function normalizePost(p) {
  const start = parseDateSafe(p.startDate) || parseDateSafe(p.date);
  const end = parseDateSafe(p.endDate) || start;
  const sortDate = end || start || new Date(0);
  return { ...p, dateStart: start, dateEnd: end, sortDate };
}

function getPosts(sort = "newest") {
  const posts = shftBlogPosts.map(normalizePost);
  posts.sort((a, b) => (sort === "oldest" ? +a.sortDate - +b.sortDate : +b.sortDate - +a.sortDate));
  return posts;
}

function formatPeriodNl(start, end) {
  if (!start && !end) return "";
  if (!start) {
    return end.toLocaleDateString("nl-NL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  if (!end) {
    return start.toLocaleDateString("nl-NL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    return start.toLocaleDateString("nl-NL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const monthStart = start.toLocaleDateString("nl-NL", { month: "long" });
  const monthEnd = end.toLocaleDateString("nl-NL", { month: "long" });
  const yearStart = start.getFullYear();
  const yearEnd = end.getFullYear();

  const sameMonth = yearStart === yearEnd && start.getMonth() === end.getMonth();
  if (sameMonth) return `${start.getDate()} t/m ${end.getDate()} ${monthStart} ${yearStart}`;

  const sameYear = yearStart === yearEnd;
  if (sameYear) return `${start.getDate()} ${monthStart} t/m ${end.getDate()} ${monthEnd} ${yearStart}`;

  return `${start.getDate()} ${monthStart} ${yearStart} t/m ${end.getDate()} ${monthEnd} ${yearEnd}`;
}

export default async function BlogPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const rawPage = Array.isArray(sp?.page) ? sp.page[0] : sp?.page;
  const page = parseInt(rawPage, 10) || 1;
  const rawSort = Array.isArray(sp?.sort) ? sp.sort[0] : sp?.sort;
  const sort = rawSort === "oldest" ? "oldest" : "newest";
  const rawPerPage = Array.isArray(sp?.perPage) ? sp.perPage[0] : sp?.perPage;
  const perPageIsAll = String(rawPerPage ?? "").toLowerCase() === PER_PAGE_ALL_VALUE;
  const perPageParsed = parseInt(rawPerPage, 10);
  const perPage = PER_PAGE_OPTIONS.includes(perPageParsed) ? perPageParsed : DEFAULT_PER_PAGE;

  const posts = getPosts(sort);
  const totalPosts = posts.length;
  const perPageOptions = PER_PAGE_OPTIONS.filter((opt) => opt <= Math.max(totalPosts, DEFAULT_PER_PAGE));
  const perPageEffective = perPageIsAll ? totalPosts : totalPosts ? Math.min(perPage, totalPosts) : perPage;
  const totalPages = Math.ceil(totalPosts / perPageEffective) || 1;
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPageEffective;
  const paginated = posts.slice(start, start + perPageEffective);
  const perPageParam = perPageIsAll ? PER_PAGE_ALL_VALUE : perPage;

  const pagesToShow = (() => {
    const siblingCount = 1;
    const totalNumbers = siblingCount * 2 + 5;

    const makeRange = (startAt, endAt) =>
      Array.from({ length: endAt - startAt + 1 }, (_, idx) => startAt + idx);

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
  })();

  return (
    <main className="relative min-h-screen overflow-hidden text-white antialiased">
      <AnimatedBallsBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />

        <section className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 pt-28">
          <h1 className="text-center text-4xl font-bold tracking-tight">
            SHFT{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>

          {/* Sort bar */}
          <div className="mx-auto mt-8 flex w-full max-w-md items-center justify-center gap-3">
            <Link
              href={`/projects/shft/blog?sort=newest&perPage=${perPageParam}`}
              className={`inline-flex items-center rounded-xl border px-4 py-1.5 text-sm transition ${
                sort === "newest"
                  ? "border-purple-500/50 bg-purple-500/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              Nieuwste eerst
            </Link>
            <Link
              href={`/projects/shft/blog?sort=oldest&perPage=${perPageParam}`}
              className={`inline-flex items-center rounded-xl border px-4 py-1.5 text-sm transition ${
                sort === "oldest"
                  ? "border-purple-500/50 bg-purple-500/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              Oudste eerst
            </Link>
          </div>

          {/* Posts */}
          <div className="mt-10 grid gap-6">
            {paginated.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur supports-[backdrop-filter]:bg-white/[0.04] transition hover:-translate-y-0.5 hover:border-purple-400/30 hover:shadow-[0_8px_40px_-10px_rgba(168,85,247,0.35)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-semibold leading-tight">
                    <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                      {post.title}
                    </span>
                  </h2>

                  <span
                    className="inline-flex max-w-full items-center gap-2 truncate rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs text-purple-200"
                    title={formatPeriodNl(post.dateStart, post.dateEnd)}
                  >
                    <span className="h-2 w-2 rounded-xl bg-purple-300/80 shadow-[0_0_8px_rgba(216,180,254,0.8)]" />
                    {formatPeriodNl(post.dateStart, post.dateEnd)}
                  </span>
                </div>

                <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <p className="mt-4 max-w-3xl whitespace-pre-wrap text-[15px] leading-7 text-gray-200">
                  {post.content}
                </p>
              </article>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Per-page */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <span className="mr-1 text-sm text-gray-400">Items per pagina:</span>
              {perPageOptions.map((opt) => {
                const active = !perPageIsAll && opt === perPage;
                return (
                  <Link
                    key={opt}
                    href={`/projects/shft/blog?sort=${sort}&perPage=${opt}`}
                    className={`inline-flex items-center rounded-xl border px-3 py-1 text-sm transition ${
                      active
                        ? "border-purple-500/50 bg-purple-500/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                        : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {opt}
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
                Alles
              </Link>
            </div>

            {/* <div className="flex justify-center">
              <Link
                href="/projects/shft"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 underline-offset-4 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                ← Terug naar SHFT
              </Link>
            </div> */}

            {/* Pager */}
            <nav className="flex items-center justify-center gap-2 md:justify-end">
              {pagesToShow.map((item, index) => {
                if (item === "ellipsis") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="rounded-full px-3 py-1.5 text-sm text-gray-400"
                    >
                      …
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
