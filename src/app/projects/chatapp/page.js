"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetail() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedImage]);

  const project = {
    title: "Chat App",
    description: [
        "Voor school kregen we de opdracht om een chatapplicatie te ontwikkelen waarin gebruikers vrienden konden toevoegen, uitnodigingen konden versturen en met elkaar konden chatten. We begonnen met een team van vijf personen, maar doordat twee groepsleden uitvielen, hebben we het project uiteindelijk met z’n drieën afgerond.",
        "De backend van de applicatie hebben we ontwikkeld in C# met behulp van ASP.NET. Dit was voor ons erg wennen, aangezien we tot dat moment voornamelijk met Laravel werkten.",
        "Ondanks dat de chatapp aan het einde nog niet volledig functioneel was, hebben we toch interessante onderdelen weten te implementeren. Zo hebben we onder andere geëxperimenteerd met het integreren van een AI-chatbot, geïnspireerd op de AI-functie van Snapchat."
      ],
          technologies: ["C#", "DotNet"],
    heroImage: "/Images/PapenChat.png",
    // gallery: [
    //   "/Images/CyberBox_1.png",
    //   "/Images/CyberBox_2.png",
    //   "/Images/CyberBox_3.png",
    // ],
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
      <section className="max-w-7xl mx-auto px-4 py-12 ">
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
        {/* <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 gap-4 mb-4">
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
      </div> */}


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

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-full mx-4 bg-[#1a1a1a] rounded-xl p-1 shadow-2xl border-4 border-purple-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center text-xl transition"
              onClick={() => setSelectedImage(null)}
              aria-label="Sluit afbeelding"
            >
              ✕
            </button>
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
      {/* FOOTER */}
      <Footer />
    </main>
  );
}
