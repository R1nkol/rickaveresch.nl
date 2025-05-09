"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function HomeCarousel() {
  const [page, setPage] = useState(0);

  const buttons = [
    { label: "CyberBox", href: "/projects", color: "from-green-400 to-teal-500", imageSrc: "/CyberBox.png" },
    { label: "Deze website", href: "/cv", color: "from-yellow-500 to-orange-600", imageSrc: "/Website.png" },
    { label: "CaveGame", href: "/contact", color: "from-red-400 to-pink-500", imageSrc: "/CaveGame.png" },
    { label: "ZuivelStad", href: "/about", color: "from-blue-500 to-indigo-600", imageSrc: "/ZuivelStad.png" },
  ];

  // Verdeel de knoppen in groepen van twee
  const pages = [buttons.slice(0, 2), buttons.slice(2, 4)];

  const nextPage = () => setPage((prev) => (prev + 0.5) % pages.length);
  const prevPage = () => setPage((prev) => (prev - 0.5 + pages.length) % pages.length);

  return (
    <>
      {/* Slider met paginagroepen */}
      <div className="relative w-full overflow-hidden mt-8">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)`, width: `${pages.length * 100}%` }}
        >
          {pages.map((group, groupIndex) => (
            <div key={groupIndex} className="flex gap-4 w-full">
              {group.map((btn, index) => (
                <Link key={index} href={btn.href} className="w-full">
                  <div className="relative h-60 flex items-center justify-center shadow-md cursor-pointer overflow-hidden group">
                    <Image
                      src={btn.imageSrc}
                      alt={btn.label}
                      fill
                      className="transition-transform duration-[5000ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
                    <span className="relative z-20 text-white text-2xl font-bold">
                      {btn.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevPage}
          className={`flex items-center gap-2 py-2 px-4 bg-gray-100 transition-opacity duration-500 ${
            page === 0 ? "opacity-20 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronLeft className="w-5 h-5" /> Vorige
        </button>
        <button
          onClick={nextPage}
          className={`flex items-center gap-2 py-2 px-4 bg-gray-100 transition-opacity duration-500 ${
            page === pages.length - 1.5 ? "opacity-20 pointer-events-none" : "opacity-100"
          }`}
        >
          Volgende <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
