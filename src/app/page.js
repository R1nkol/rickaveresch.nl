"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [page, setPage] = useState(0);
  const buttons = [
    { label: "CyberBox", href: "/projects", color: "from-green-400 to-teal-500", imageSrc: "/CyberBox.png" },
    { label: "Deze website", href: "/cv", color: "from-yellow-500 to-orange-600", imageSrc: "/Website.png" },
    { label: "CaveGame", href: "/contact", color: "from-red-400 to-pink-500", imageSrc: "/CaveGame.png" },
    { label: "ZuivelStad", href: "/about", color: "from-blue-500 to-indigo-600", imageSrc: "/ZuivelStad.png" },
  ];

  const nextPage = () => setPage((prev) => (prev + 1) % 2);
  const prevPage = () => setPage((prev) => (prev - 1 + 2) % 2);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="w-full max-w-[60rem] mx-auto">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="px-6 pb-24 text-center">
          {/* Hero Section */}
          <div className="relative w-full h-[500px] overflow-hidden shadow-lg mx-auto group">
            <Image
              src="/RickFoto2.png"
              alt="Achtergrond"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority
              /* Belangrijk: voeg onderstaande classes toe */
              className="transition-transform duration-[50000ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">



              <h2 className="text-2xl font-bold text-center">
                Rick Averesch, 19 jaar oud<br /> Student Software Development
              </h2>
              <div className="mt-8">
                <Link href="/about">
                  <button className="px-6 py-3 bg-gray-700 text-white rounded-[1rem] shadow-lg hover:bg-gray-800">
                    Lees meer over mij!
                  </button>
                </Link>
              </div>
            </div>
          </div>


          {/* Slider Buttons */}
          <div className="relative w-full overflow-hidden mt-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${page * 50}%)`, width: "200%" }}
            >
              {buttons.map((btn, index) => (
                <Link key={index} href={btn.href} className="w-1/2 min-w-1/2">
                  {/* Gebruik een groep-container voor de hover-state */}
                  <div className="relative h-60 flex items-center justify-center shadow-md cursor-pointer overflow-hidden group">
                    <Image
                      src={btn.imageSrc}
                      alt={btn.label}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
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
          </div>


          {/* Slider Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevPage}
              className={`flex items-center gap-2 py-2 bg-gray-100 transition-opacity duration-500 ${
                page === 0 ? "opacity-20 pointer-events-none" : "opacity-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5" /> Vorige
            </button>
            <button
              onClick={nextPage}
              className={`flex items-center gap-2py-2 bg-gray-100 transition-opacity duration-500 ${
                page === 1 ? "opacity-20 pointer-events-none" : "opacity-100"
              }`}
            >
              Volgende <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
