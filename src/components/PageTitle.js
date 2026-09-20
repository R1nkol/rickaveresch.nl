import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PageTitle({ children, backHref, backLabel }) {
  return (
    <div className="flex flex-wrap items-start gap-x-3 gap-y-2 sm:gap-x-4">
      <Link
        href={backHref}
        aria-label={backLabel}
        title={backLabel}
        className="button-secondary h-11 w-11 shrink-0 !p-0 sm:mt-1 md:mt-2.5"
      >
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
      </Link>
      <h1 className="page-heading min-w-0 flex-[1_1_16rem]">{children}</h1>
    </div>
  );
}
