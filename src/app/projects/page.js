import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import Link from "next/link";
import AnimatedBallsBackground from "@/components/AnimatedBallsBackground";

export default async function Projects({ searchParams }) {
  const params = await searchParams;

  const rawTag = params.tag;
  const tag = Array.isArray(rawTag) ? rawTag[0] : rawTag;

  const filteredProjects = tag
    ? projects.filter((p) => p.tags.includes(tag))
    : projects;

  return (
    <main className="relative text-white font-sans min-h-screen flex flex-col">
      <AnimatedBallsBackground />

      <div className="relative z-10">
        <Header activeSection="" />

        <section className="py-16 px-4 max-w-7xl mx-auto flex-1">
          <h1 className="text-center text-4xl font-bold mb-8">
            Mijn <span className="text-purple-400">Projecten</span>
          </h1>

          {tag && (
            <div className="text-center mb-6">
              <p className="text-gray-300">
                Gefilterd op:{" "}
                <span className="text-purple-400 font-semibold">{tag}</span>
                <Link href="/projects" className="ml-4 text-sm underline">
                  Reset
                </Link>
              </p>
            </div>
          )}

          <div className="space-y-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-gray-300 underline hover:text-white transition"
            >
              Terug naar Home
            </Link>
          </div>
        </section>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}
