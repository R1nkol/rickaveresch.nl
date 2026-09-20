import { Youtube, Instagram, Github } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear().toString();
  const copyright = t("footer.copyright").replace("{{year}}", year);

  return (
    <footer className="mt-auto w-full border-t border-line bg-background">
      <div className="mx-auto flex w-full max-w-[76rem] flex-col items-center justify-between gap-4 px-5 py-8 sm:px-8 text-sm text-gray-300 sm:flex-row">
        <p>{copyright}</p>
        <div className="flex items-center gap-4 text-gray-400">
          <a
            href="https://www.youtube.com/@R1nkol"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/rick.averesch/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/R1nkol"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
