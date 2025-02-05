"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getLinkClass = (href) => 
    pathname === href 
      ? "text-gray-400" 
      : "text-gray-700 hover:text-black";

  return (
    <header className="flex items-center justify-between px-6 pt-24 pb-16">
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-gray-700 leading-[1.1]">Rick Averesch</span>
        <span className="text-gray-500 relative top-[2px]">Software developer</span>
      </div>
      <nav className="space-x-6">
        <Link href="/" className={getLinkClass("/")}>
          HOME
        </Link>
        <Link href="/about" className={getLinkClass("/about")}>
          ABOUT
        </Link>
        <Link href="/projects" className={getLinkClass("/projects")}>
          PROJECTS
        </Link>
      </nav>
    </header>
  );
}
