import Header from "../components/Header";
import Footer from "../components/Footer";

import Link from "next/link";
import Image from "next/image";
import { HomeCarousel } from "@/components/HomeCarousel";

export default function Home() {
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
          <HomeCarousel />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
