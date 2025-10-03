import { Youtube, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-300 sm:flex-row">
        <p>© {new Date().getFullYear()} door Rick Averesch.</p>
        <div className="flex items-center gap-4 text-gray-400">
          <a
            href="https://www.youtube.com/@R1nkol"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-red-400"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/rick.averesch/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-pink-400"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/R1nkol"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

