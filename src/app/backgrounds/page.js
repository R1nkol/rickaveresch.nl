"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBallsBackground from "@/components/AnimatedBallsBackground";
import RainBackground from "@/components/RainBackground";
import StarsBackground from "@/components/StarsBackground";

const options = [
  { id: "balls", name: "Ballen", Component: AnimatedBallsBackground },
  { id: "rain", name: "Regen", Component: RainBackground },
  { id: "stars", name: "Sterren", Component: StarsBackground },
];

export default function BackgroundSettings() {
  const [selected, setSelected] = useState("balls");

  useEffect(() => {
    const stored = localStorage.getItem("homepageEffect");
    if (stored) setSelected(stored);
  }, []);

  const setDefault = (id) => {
    localStorage.setItem("homepageEffect", id);
    setSelected(id);
  };

  return (
    <main className="relative bg-black text-white min-h-screen flex flex-col">
      <Header activeSection="" />
      <div className="relative z-10 flex-1 py-20 px-4 max-w-5xl mx-auto">
        <h1 className="text-center text-3xl font-bold mb-8">
          Achtergrond <span className="text-purple-400">Instellingen</span>
        </h1>
        <div className="space-y-8">
          {options.map(({ id, name, Component }) => (
            <div key={id} className="relative h-64 border border-purple-500 rounded overflow-hidden">
              <Component />
              <div className="relative z-10 h-full flex items-end justify-between p-4 bg-black/30">
                <span className="text-lg font-semibold">{name}</span>
                <button
                  onClick={() => setDefault(id)}
                  className={`jun-gradient text-white px-4 py-2 rounded font-medium hover:brightness-90 transition ${selected === id ? "opacity-60" : ""}`}
                  disabled={selected === id}
                >
                  {selected === id ? "In gebruik" : "Gebruik"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}