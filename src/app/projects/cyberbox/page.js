"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetail() {
  // Voorbeelddata; je kunt dit later vervangen door props of data uit een CMS
  const project = {
    title: "CyberBox",
    description:
      "Cyberbox was mijn eerste grote project met Godot, het was een puzzle platformer waarmee ik begon dit project in 2021. Het was een project waar ik veel van heb geleerd, helemaal omdat ik toen ik dit startte nog niet op school zat voor enige vorm van development. Helaas is dit project nooit afgekomen omdat ik gewoon te grote plannen had voor dit project, maar ik ben er nog steeds trots op.",
    technologies: ["Godot", "GDScript"],
    heroImage: "/Images/CyberBox.png",
    gallery: [
      "/Images/CyberBox_1.png",
      "/Images/CyberBox_2.png",
      "/Images/CyberBox_3.png",
    ],
    websiteLink: "/projects/cyberbox", // Of een externe link
    githubLink: "https://github.com/jouwnaam/cyberbox", // Of eventueel weglaten
  };

  return (
    <main className="bg-black text-white font-sans min-h-screen">
        <Header activeSection="" />

        {/* HERO SECTIE */}
        <section className="relative">
          <div className="w-full h-[60vh] relative">
            <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover opacity-60"
            />
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center mt-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mt-16">
              {project.title}
            </h1>
            </div>
          </div>
        </section>

        {/* PROJECT DETAILS */}
      <section className="max-w-7xl mx-auto px-4 py-12 ">
        {/* Over het project */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
            Over <span className="text-purple-400">het project</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </div>

        {/* Technologieën */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">
            Gebruikte <span className="text-purple-400">technologieën</span>
          </h2>
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            {project.technologies.map((tech, index) => (
              <div
                key={index}
                className="border border-purple-500 text-purple-400 px-4 py-2 rounded text-sm transition hover:bg-purple-500 hover:text-white"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Galerij */}
        <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-4">
            <span className="text-purple-400">Screenshots</span>
        </h2>
        <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 gap-4">
            {project.gallery.map((imgSrc, index) => (
            <div
                key={index}
                className="overflow-hidden rounded-lg group sm:flex sm:justify-center"
            >
                <Image
                src={imgSrc}
                alt={`${project.title} screenshot ${index + 1}`}
                width={500}
                height={300}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            ))}
        </div>
        </div>


        {/* Actieknoppen */}
        <div className="flex flex-wrap gap-4 mb-6">
        <a
            href="/projects/cyberbox/game"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block border border-purple-500 text-purple-400 px-6 py-2 rounded font-medium hover:bg-purple-500 hover:text-white transition"
            >
            Test CyberBox!
            </a>
        </div>
        <div className="flex flex-wrap gap-4">
            <Link
                href="/"
                className="text-gray-300 underline hover:text-white transition"
            >
            Terug naar Home
            </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
