export default function Projects() {
    return (
      <main className="min-h-screen p-8 sm:p-20 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold mb-4">Mijn Projecten</h1>
        <p className="mb-6">
          Hier kun je je verschillende projecten uitlichten, met screenshots, beschrijvingen, enzovoorts.
        </p>
  
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Project 1</h2>
          <p className="text-gray-300 mb-2">Korte beschrijving van project 1...</p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Project 2</h2>
          <p className="text-gray-300 mb-2">Korte beschrijving van project 2...</p>
        </section>
  
        <a
          href="/"
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 inline-block"
        >
          Terug naar Home
        </a>
      </main>
    );
  }
  