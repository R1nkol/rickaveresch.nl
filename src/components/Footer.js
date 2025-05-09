import { Youtube, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 py-6 text-sm text-gray-500 border-t border-gray-700 flex justify-between items-center px-4 rounded mx-auto max-w-7xl">
    {/* <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-800"> */}

      <p>© {new Date().getFullYear()} door Rick Averesch.</p>
      <div className="flex space-x-4">
        <a
          href="https://www.youtube.com/@R1nkol"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors"
        >
          <Youtube className="w-5 h-5" />
        </a>
        <a
          href="https://www.instagram.com/rick.averesch/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition-colors"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/R1nkol"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}
