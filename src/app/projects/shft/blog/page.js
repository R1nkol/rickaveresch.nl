import { Suspense } from "react";

import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "SHFT blog - Rick Averesch",
  description: "Updates over de ontwikkeling van SHFT.",
};

export default async function BlogPage({ searchParams }) {
  const params = (await searchParams) || {};
  const normalizedParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );

  return (
    <Suspense fallback={<BlogPageFallback />}>
      <BlogPageClient initialSearchParams={normalizedParams} />
    </Suspense>
  );
}

function BlogPageFallback() {
  return <main className="min-h-screen bg-[var(--background)]" aria-busy="true" />;
}
