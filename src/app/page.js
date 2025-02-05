import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-16 bg-gray-900 text-white">
      
      {/* Profielfoto & Persoonlijke Info */}
      <div className="flex flex-col items-center sm:items-start gap-6 text-center sm:text-left">
        <Image
          className="rounded-full shadow-xl border-4 border-gray-700"
          src="/RickFoto.jpg" // Zorg dat dit bestand in /public staat
          alt="Rick Averesch"
          width={200}
          height={200}
        />

        <div>
          <h1 className="text-5xl font-bold text-white">Rick Averesch</h1>
          <p className="text-lg text-gray-400">Software Developer | 19 jaar</p>
          <p className="text-gray-400">ROC van Twente, Almelo de Sumpel</p>
        </div>
      </div>

      {/* Vaardigheden */}
      <section className="w-full max-w-3xl mt-10">
        <h2 className="text-2xl font-semibold text-center sm:text-left">Vaardigheden</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4 p-6 bg-gray-800 rounded-xl shadow-lg">
          <SkillItem icon="🌐" name="HTML" level="90%" />
          <SkillItem icon="🎨" name="CSS" level="85%" />
          <SkillItem icon="⚡" name="JavaScript" level="80%" />
          <SkillItem icon="🚀" name="Laravel" level="75%" />
          <SkillItem icon="💎" name="PHP" level="70%" />
          <SkillItem icon="🎯" name="C#" level="65%" />
          <SkillItem icon="🎨" name="Tailwind CSS" level="85%" />
        </div>
      </section>

      {/* Projecten */}
      <section className="w-full max-w-3xl mt-10">
        <h2 className="text-2xl font-semibold text-center sm:text-left">Projecten</h2>
        <div className="mt-4 space-y-6">
          <ProjectCard
            title="Catapult Creëert"
            description="Bij mijn stage bij Catapult Creëert heb ik gewerkt aan verschillende websites en bugfixes. Ik heb geleerd te werken met WordPress en PHP."
            image="/catapult/screenshot-1.png"
            link="/projects/catapult"
          />
          <ProjectCard
            title="Hostvio"
            description="Ik help met de ontwikkeling van Hostvio, een hostingbedrijf dat webhosting, VPS-hosting en domeinregistratie aanbiedt."
            image="/hostvio/screenshot-1.png"
            link="/projects/hostvio"
          />
        </div>
      </section>

      {/* Navigatie Knoppen */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          className="px-6 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition-all"
          href="/projects"
        >
          Bekijk Projecten
        </Link>
        
        <Link
          className="px-6 py-3 text-lg font-medium bg-gray-700 hover:bg-gray-600 rounded-full shadow-md transition-all"
          href="/contact"
        >
          Contact
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Rick Averesch. Alle rechten voorbehouden.
      </footer>
    </div>
  );
}

/* Component voor een Skill Item met een percentage */
const SkillItem = ({ icon, name, level }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl">{icon}</span>
    <h3 className="text-lg font-medium text-gray-300">{name}</h3>
    <div className="w-full bg-gray-700 rounded-full h-3 mt-1">
      <div
        className="h-full bg-blue-500 rounded-full"
        style={{ width: level }}
      ></div>
    </div>
    <span className="text-sm text-gray-400">{level}</span>
  </div>
);

/* Component voor een Project Card */
const ProjectCard = ({ title, description, image, link }) => (
  <div className="flex flex-col sm:flex-row bg-gray-800 rounded-xl shadow-lg overflow-hidden">
    <Image src={image} alt={title} width={300} height={200} className="object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-300 mt-2">{description}</p>
      <Link
        href={link}
        className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition"
      >
        Meer info
      </Link>
    </div>
  </div>
);
