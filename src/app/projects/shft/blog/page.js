import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  // Support either single `date` or range `startDate`/`endDate`
  const start = parseDateSafe(p.startDate) || parseDateSafe(p.date);
  const end = parseDateSafe(p.endDate) || start;
  const sortDate = end || start || new Date(0);
  return {
    ...p,
    dateStart: start,
    dateEnd: end,
    sortDate,
  };
}

function getPosts(sort = "newest") {
  const posts = shftBlogPosts.map(normalizePost);
  posts.sort((a, b) => (sort === "oldest" ? +a.sortDate - +b.sortDate : +b.sortDate - +a.sortDate));
  return posts;
}

function formatPeriodNl(start, end) {
  if (!start && !end) return "";
  if (!start) return end.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  if (!end) return start.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

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
  if (sameMonth) {
    return `${start.getDate()} t/m ${end.getDate()} ${monthStart} ${yearStart}`;
  }
  const sameYear = yearStart === yearEnd;
  if (sameYear) {
    return `${start.getDate()} ${monthStart} t/m ${end.getDate()} ${monthEnd} ${yearStart}`;
  }
  return `${start.getDate()} ${monthStart} ${yearStart} t/m ${end.getDate()} ${monthEnd} ${yearEnd}`;
}

export default async function BlogPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const rawPage = Array.isArray(sp?.page) ? sp.page[0] : sp?.page;
  const page = parseInt(rawPage, 10) || 1;
  const rawSort = Array.isArray(sp?.sort) ? sp.sort[0] : sp?.sort;
  const sort = rawSort === "oldest" ? "oldest" : "newest";
  const rawPerPage = Array.isArray(sp?.perPage) ? sp.perPage[0] : sp?.perPage;
  const perPageIsAll = String(rawPerPage).toLowerCase() === PER_PAGE_ALL_VALUE;
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


  // Limit visible page numbers to max 4
  const maxPagesToShow = 4;
  let pagesToShow = [];
  if (totalPages <= maxPagesToShow) {
    pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    let startPage = Math.max(1, safePage - Math.floor(maxPagesToShow / 2));
    if (startPage + maxPagesToShow - 1 > totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
    }
    pagesToShow = Array.from({ length: maxPagesToShow }, (_, i) => startPage + i);
  }

return (
    <main className="bg-black text-white font-sans min-h-screen">
        <Header activeSection="" />

        <section className="max-w-7xl mx-auto px-4 py-12">
                        <h1 className="text-4xl font-bold mb-6 text-center mt-6">SHFT <span className="text-purple-400">Blog</span></h1>


            {/* Sort bar */}
            <div className="flex items-center justify-center gap-6 mb-8">
                <Link
                    href={`/projects/shft/blog?sort=newest&perPage=${perPageParam}`}
                    className={`underline-offset-4 ${
                        sort === "newest"
                            ? "underline text-white"
                            : "text-gray-400 hover:text-gray-200 hover:underline"
                    }`}
                >
                    Nieuwste eerst
                </Link>
                <span className="text-gray-600">·</span>
                <Link
                    href={`/projects/shft/blog?sort=oldest&perPage=${perPageParam}`}
                    className={`underline-offset-4 ${
                        sort === "oldest"
                            ? "underline text-white"
                            : "text-gray-400 hover:text-gray-200 hover:underline"
                    }`}
                >
                    Oudste eerst
                </Link>
            </div>

            {/* Posts list with dashed separators */}
            <div className="divide-y divide-dashed divide-purple-500/20">
                {paginated.map((post) => (
                    <article key={post.slug} className="py-6">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-2">
                            <h2 className="text-2xl font-semibold leading-tight text-purple-400">{post.title}</h2>
                            <span className="text-sm text-gray-400">
                                {formatPeriodNl(post.dateStart, post.dateEnd)}
                            </span>
                        </div>
                        <p className="whitespace-pre-wrap text-gray-200 text-[15px] leading-7">
                            {post.content}
                        </p>
                    </article>
                ))}
            </div>

            {/* Bottom bar: per-page left, pager right */}
            <div className="mt-8 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-400 text-sm mr-1">Items per pagina:</span>
                    {perPageOptions.map((opt) => (
                        <Link
                            key={opt}
                            href={`/projects/shft/blog?sort=${sort}&perPage=${opt}`}
                            className={`px-2 underline-offset-4 ${
                                !perPageIsAll && opt === perPage
                                    ? "underline text-white"
                                    : "text-gray-400 hover:text-gray-200 hover:underline"
                            }`}
                        >
                            {opt}
                        </Link>
                    ))}
                    <Link
                        key={PER_PAGE_ALL_VALUE}
                        href={`/projects/shft/blog?sort=${sort}&perPage=${PER_PAGE_ALL_VALUE}`}
                        className={`px-2 underline-offset-4 ${
                            perPageIsAll
                                ? "underline text-white"
                                : "text-gray-400 hover:text-gray-200 hover:underline"
                        }`}
                    >
                        Alles
                    </Link>
                </div>

                <div className="flex items-center gap-2 justify-end">
                    <nav className="flex items-center gap-2 flex-wrap justify-center">
                        {pagesToShow.map((n) => (
                            <Link
                                key={n}
                                href={`/projects/shft/blog?page=${n}&sort=${sort}&perPage=${perPageParam}`}
                                className={
                                    n === safePage
                                        ? "px-3 py-1 rounded bg-purple-600 text-white"
                                        : "px-2 text-gray-300 hover:text-white hover:underline underline-offset-4"
                                }
                            >
                                {n}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="mt-8">
                <Link href="/projects/shft" className="underline underline-offset-4 text-gray-300 hover:text-gray-100">
                    Terug naar SHFT
                </Link>
            </div>
        </section>

        <Footer />
    </main>
);
}





