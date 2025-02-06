"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CVWebsite() {
  const [page, setPage] = useState(0);

  const slides = [
    `Hoi! Ik ben Rick Averesch, 19 jaar oud en student Software Development aan ROC van Twente, Almelo de Sumpel. Tijdens mijn opleiding leer ik HTML, CSS, JavaScript, PHP, MySQL en C#, en werk ik met Laravel, Next.js, Tailwind CSS en Bootstrap om webapplicaties te ontwikkelen.`,

    `Naast mijn studie ben ik zelf bezig met game development in Godot met GDScript. Ik vind het leuk om nieuwe dingen te leren en mezelf continu uit te dagen door eigen projecten te maken en te experimenteren met verschillende technologieën.`,

    `Ik ben altijd op zoek naar nieuwe uitdagingen en mogelijkheden om mijn vaardigheden verder te ontwikkelen! Er is altijd wel iets nieuws te ontdekken in de wereld van software en games.`,
  ];

  const nextPage = () => setPage((prev) => (prev + 1) % slides.length);
  const prevPage = () =>
    setPage((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="w-full max-w-[60rem] mx-auto">
        <Header />
        
        <main className="px-6 pb-24 text-center">
          <div className="relative w-full mx-auto py-10 bg-black bg-opacity-30 text-white shadow-lg">
            <h2 className="text-2xl font-bold">Over mij</h2>

            <div className="relative w-full min-h-[200px] overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{
                  transform: `translateX(-${page * 100}%)`,
                  width: `${slides.length * 34}%`,
                }}
              >
                {slides.map((text, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 flex items-center justify-center p-6"
                    style={{ minWidth: "100%", height: "100%" }}
                  >
                    <p className="text-lg leading-relaxed break-words max-w-[80%] mx-auto whitespace-pre-line">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between px-8">
              <button
                onClick={prevPage}
                className={`flex items-center gap-2 px-4 bg-gray-200 bg-opacity-0 text-gray-50 rounded transition ${
                  page === 0 ? "opacity-0 pointer-events-none" : "hover:bg-gray-300 hover:bg-opacity-0 hover:text-white"
                }`}
              >
                <ChevronLeft className="w-5 h-5" /> Vorige
              </button>
              <button
                onClick={nextPage}
                className={`flex items-center gap-2 px-4 bg-gray-200 text-gray-50 bg-opacity-0 rounded transition ${
                  page === slides.length - 1 ? "opacity-0 pointer-events-none" : "hover:bg-gray-300 hover:bg-opacity-0 hover:text-white"
                }`}
              >
                Volgende <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10  text-left">

          {/* Left Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Opleidingen</h2>
            <h3 className="font-semibold text-gray-800 mb-1">VMBO - TL</h3>
            <p className="italic text-gray-700 mb-1">Diploma | CSG Reggesteyn, Rijssen | 2018 - 2022</p>
            <p className="text-gray-600 mb-5">
              Succesvol afgeronde opleiding VMBO-TL bij CSG Reggesteyn in
              Rijssen.
            </p>
            <h3 className="font-semibold text-gray-800 mb-1">Software Developer Niveau 4</h3>
            <p className="italic text-gray-700 mb-1"> ROC De Sumpel - Almelo | 2022 - Heden</p>
            <p className="text-gray-600 mb-5">
              Huidige studie Software Development aan het ROC Van Twente, De
              Sumpel in Almelo.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-5 pt-6">WERKERVARING</h2>
            <h3 className="font-semibold text-gray-800 mb-1">Folder Bezorger</h3>
            <p className="italic text-gray-700 mb-1">Zuna | 2017- 2021</p>
            <p className="text-gray-600 mb-5">
              Als folderbezorger van mijn elfde tot mijn vijftiende leerde ik
              verantwoordelijkheid en communicatieve vaardigheden, wat een
              solide basis vormde voor mijn latere werkervaring.
            </p>
            <h3 className="font-semibold text-gray-800 mb-1">SuperMarkt Medewerker</h3>
            <p className="italic text-gray-700 mb-1">NettoRama Rijssen | 2021 - 2024</p>
            <p className="text-gray-600 mb-5">
              Gestart als vakkenvuller bij NettoRama, evalueerde mijn rol naar
              hoofd schoonmaker en vakkenvuller. Deze ervaring in de
              supermarkt heeft mijn teamwork, multitasken en
              aanpassingsvermogen versterkt, waardoor ik in een dynamische
              werkomgeving goed kan functioneren.
            </p>
            <p className="italic text-gray-700 mb-1">Lidl Nijverdal | 2024 - heden</p>
            <p className="text-gray-600 mb-5">
              Met mijn eerdere ervaring bij NettoRama Rijssen, was ik goed en snel ingewerkt bij Lidl Nijverdal. 
              Hierdoor kon ik nieuwe uitdagingen aangaan zoals kassa, groente, etc.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-5 pt-6">vaardigheden</h2>
            <h3 className="font-semibold text-gray-800 mb-1">Creativiteit</h3>
            <p className="text-gray-600 mb-5">
              Sterke focus op mooi, praktisch en functioneel ontwerp
            </p>
            <h3 className="font-semibold text-gray-800 mb-1">Teamwork</h3>
            <p className="text-gray-600">
              Goed in samenwerken binnen een team
            </p>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-5">Personalia</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Naam: Rick Averesch</li>
              {/* <li>Adres: Verlengde Dennenweg 2</li>
              <li>Postcode: 7466 PT</li> */}
              <li>Woonplaats: Zuna</li>
              {/* <li>Telefoon: +31 6 20991831</li> */}
              <li>Email: rick.maisweg@gmail.com</li>
              <li>Nationaliteit: Nederlands</li>
              <li>Geslacht: Man</li>
              <li>Geboortedatum: 07-10-2005</li>
            </ul>
            <h3 className="font-semibold text-gray-800 mb-5">Eigenschappen</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Doorzetter</li>
              <li>Nieuwsgierig</li>
              <li>Geordend</li>
              <li>Nauwkeurig</li>
            </ul>
            <h3 className="font-semibold text-gray-800 mb-5">Hobby's</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Sporten</li>
              <li>Creatief bezig zijn</li>
            </ul>
            <h3 className="font-semibold text-gray-800 mb-5">Programmeertalen</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>HTML</li>
              {/* <li>Css</li> */}
              <li>JavaScript</li>
              <li>PHP</li>
              <li>C#</li>
              <li>GDScript</li>
            </ul>
            <h3 className="font-semibold text-gray-800 mb-5">Andere programma's</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Laravel</li>
              <li>Next.js</li>
              {/* <li>React</li> */}
              <li>MySQL</li>
              <li>Tailwind CSS</li>
              <li>Bootstrap</li>
              <li>Godot</li>
            </ul>
          </div>
        </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
