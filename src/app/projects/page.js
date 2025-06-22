"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <main className="bg-black text-white font-sans min-h-screen">
      <Header activeSection="" />
            <section className="py-16 px-4 max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold mb-8">
          Mijn <span className="text-purple-400">Projecten</span>
        </h1>
        <div className="space-y-8">
          {projects.map((project) => (
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
    <Footer />
    </main>
  );
}