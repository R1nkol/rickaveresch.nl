import Header from "../../../components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow px-8 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-700">Welkom op mijn website!</h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Ik ben Rick Averesch, 19 jaar oud en student software development aan ROC van Twente, Almelo de Sumpel.
          Ik ben bezig met het leren en toepassen van verschillende programmeertalen zoals HTML, CSS, JavaScript, PHP...
          {/* , MySQL en C#. Daarnaast werk ik met Laravel, Tailwind CSS en Bootstrap voor webontwikkeling.
          Daarnaast ben ik zelf bezig met het leren van game development in Godot met GDscript. */}
        </p>
        <div className="mt-8">
          <Link href="/about">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
              Lees meer over mij!
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-center items-center h-16 bg-gray-100 text-gray-500">
        <p> © {new Date().getFullYear()} Rick Averesch. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
