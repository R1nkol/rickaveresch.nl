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
      "CyberBox is mijn eerste grote project met Godot, waarbij ik me heb gericht op innovatieve gameplay-mechanismen en een unieke sfeer. Tijdens dit project heb ik veel geleerd over zowel game design als technische implementatie met GDScript.",
    technologies: ["Godot", "GDScript", "HTML", "CSS"],
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
      {/* HEADER */}
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
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* PROJECT DETAILS */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Over het project */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Over <span className="text-purple-400">het project</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </div>

        {/* Technologieën */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Gebruikte <span className="text-purple-400">technologieën</span>
          </h2>
          <div className="flex flex-wrap gap-4">
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-purple-400">Screenshots</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.gallery.map((imgSrc, index) => (
              <div key={index} className="overflow-hidden rounded-lg group">
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
        <div className="flex flex-wrap gap-4">
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="jun-gradient text-white px-6 py-2 rounded font-medium hover:brightness-90 transition"
            >
              Bekijk Website
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-purple-500 text-purple-400 px-6 py-2 rounded font-medium hover:bg-purple-500 hover:text-white transition"
            >
              Bekijk Code
            </a>
          )}
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
