"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const prevImage = () =>
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + project.gallery.length) % project.gallery.length
        : prev,
    );

  const nextImage = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % project.gallery.length : prev,
    );

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);
  if (!project) {
    return (
      <main className="bg-black text-white font-sans min-h-screen">
        <Header activeSection="" />
        <div className="px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Project niet gevonden</h1>
          <Link
            href="/projects"
            className="underline text-purple-400 mt-4 inline-block"
          >
            Terug naar projecten
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-black text-white font-sans min-h-screen">
      <Header activeSection="" />
      <section className="relative">
        <div className="w-full h-[60vh] relative">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover object-top opacity-60"
          />
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center mt-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mt-16">
              {project.title}
            </h1>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
            Over <span className="text-purple-400">het project</span>
          </h2>
          {project.details.map((paragraph, index) => (
            <p key={index} className="text-gray-300 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
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
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 gap-4 mb-4">
            {project.gallery.map((imgSrc, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg group sm:flex sm:justify-center cursor-pointer"
                onClick={() => setSelectedIndex(index)}
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
        )}
        {project.extraLinks && project.extraLinks.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-6">
            {project.extraLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block border border-purple-500 text-purple-400 px-6 py-2 rounded font-medium hover:bg-purple-500 hover:text-white transition"
              >
                {label}
              </a>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="text-gray-300 underline hover:text-white transition"
          >
            Terug naar Home
          </Link>
        </div>
      </section>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-6xl w-full mx-4 bg-[#1a1a1a] rounded-xl p-1 shadow-2xl border-4 border-purple-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center text-xl transition"
              onClick={() => setSelectedIndex(null)}
              aria-label="Sluit afbeelding"
            >
              ✕
            </button>
                        <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center"
              onClick={prevImage}
              aria-label="Vorige afbeelding"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white w-10 h-10 rounded-full flex items-center justify-center"
              onClick={nextImage}
              aria-label="Volgende afbeelding"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <Image
              src={project.gallery[selectedIndex]}
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