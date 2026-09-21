import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PageTitle({ children, backHref, backLabel }) {
  return (
    <div className="flex flex-wrap items-start gap-x-3 gap-y-2 sm:gap-x-4">
      <Link
        href={backHref}
        aria-label={backLabel}
        title={backLabel}
        className="group mt-1 inline-flex h-10 w-7 shrink-0 items-center justify-start text-muted transition-colors hover:text-white sm:mt-1.5 md:mt-2.5"
      >
        <ChevronLeft aria-hidden="true" className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
      </Link>
      <h1 className="page-heading min-w-0 flex-[1_1_16rem]">{children}</h1>
    </div>
  );
}
