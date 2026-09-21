"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBallsBackground from "@/components/AnimatedBallsBackground";
import RainBackground from "@/components/RainBackground";
import StarsBackground from "@/components/StarsBackground";
import OrbitBackground from "@/components/OrbitBackground";
import FirefliesBackground from "@/components/FirefliesBackground";
import AttractRepelBackground from "@/components/AttractRepelBackground";
import FlowLinesBackground from "@/components/FlowLinesBackground";
import { BACKGROUND_STORAGE_KEYS, saveBackgroundSetting } from "@/lib/backgroundSettings";

const options = [
    { id: "balls", name: "Ballen", Component: AnimatedBallsBackground },
    { id: "rain", name: "Regen", Component: RainBackground },
    { id: "stars", name: "Sterren", Component: StarsBackground },
    { id: "orbit", name: "Orbit", Component: OrbitBackground },
    { id: "fireflies", name: "Fireflies", Component: FirefliesBackground },
    { id: "attract-repel", name: "Aantrekken/Stoten", Component: AttractRepelBackground },
    { id: "flow-lines", name: "Flowlijnen", Component: FlowLinesBackground },
];

export default function BackgroundSettings() {
    const [selected, setSelected] = useState("balls");

    useEffect(() => {
        const stored = localStorage.getItem("homepageEffect");
        if (stored) setSelected(stored);
    }, []);

    const setDefault = (id) => {
        saveBackgroundSetting(BACKGROUND_STORAGE_KEYS.effect, id);
        setSelected(id);
    };

    return (
        <main className="relative text-white min-h-screen flex flex-col">
            <Header activeSection="" />
            <div className="relative z-10 flex-1 pb-20 pt-28 px-5 w-full max-w-6xl mx-auto">
                <h1 className="page-heading mb-10">
                    Achtergrondinstellingen
                </h1>
                <div className="space-y-8">
                    {options.map(({ id, name, Component }) => (
                        <div key={id} className="relative h-64 rounded-lg border border-line overflow-hidden">
                            <Component />
                            <div className="relative z-10 h-full flex items-end justify-between p-4 bg-black/30">
                                <span className="text-lg font-semibold">{name}</span>
                                <button
                                    onClick={() => setDefault(id)}
                                    className={`button-primary ${selected === id ? "opacity-60" : ""}`}
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
