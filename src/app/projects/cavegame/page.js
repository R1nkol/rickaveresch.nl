"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetail() {
    const [selectedImage, setSelectedImage] = useState(null);

  // Scroll blokkeren wanneer modal open is
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedImage]);

  const project = {
    title: "Cave Game",
    // Test om de description op te splitsen door het in een array te zetten
    description: [
        "Dit is een project waar ik een tijd aan heb gewerkt. Het idee was om een platformer te maken waarin je je een weg door de levels hakt om verder te komen en onderweg resources verzamelt. Ik ben uiteindelijk gestopt met dit project, vooral omdat ik het moeilijk vond om een passende artstyle te vinden waar ik tevreden over was. Rond die tijd begon ik ook aan mijn andere project, Versura, waardoor de focus verschoof.",
        "Dit project heeft me wel veel geleerd over de Godot engine, bijvoorbeeld hoe je een inventory systeem kan maken, hoe de speler een level kan hakken (een level kan aanpassen in game) en hoe ik dan die aangepaste levels kan opslaan."
      ],
      
     technologies: ["Godot", "GDScript"],
    heroImage: "/Images/CaveGame.png",
    gallery: [
      "/Images/CaveGame_1.png",
      "/Images/CaveGame_2.png",
      "/Images/CaveGame_3.png",
    ],
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
                    className="object-cover object-bottom opacity-60"
                />
                <div className="absolute top-0 left-0 right-0 flex items-center justify-center mt-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mt-16">
                        {project.title}
                    </h1>
                </div>
            </div>
        </section>

        {/* PROJECT DETAILS */}
        <section className="max-w-7xl mx-auto px-4 py-12">
            {/* Over het project */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
                    Over <span className="text-purple-400">het project</span>
                </h2>
                {project.description.map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                </p>
                ))}            
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
                            className="overflow-hidden rounded-lg group sm:flex sm:justify-center cursor-pointer"
                            onClick={() => setSelectedImage(imgSrc)}
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
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/"
                    className="text-gray-300 underline hover:text-white transition"
                >
                    Terug naar Home
                </Link>
            </div>
        </section>

        <Footer />

        {/* MODAL */}
        {selectedImage && (
            <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
            >
                    <div
                    className="relative max-w-6xl w-full mx-4 bg-[#1a1a1a] rounded-xl p-1 shadow-2xl border-4 border-purple-700"
                    onClick={(e) => e.stopPropagation()} // Voorkomt sluiten bij klik op afbeelding
                    >
                    {/* Sluitknop */}
                    <button
                            className="absolute top-4 right-4 text-white bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center text-xl transition"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Sluit afbeelding"
                    >
                            ✕
                    </button>

                    {/* Afbeelding */}
                    <Image
                            src={selectedImage}
                            alt="Vergrote afbeelding"
                            width={1400}
                            height={900}
                            className="rounded-lg w-full h-auto max-h-[85vh] object-contain"
                    />
                    </div>
            </div>
            )}

    </main>
);
}
