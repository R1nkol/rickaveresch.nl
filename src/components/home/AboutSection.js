"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";

import { useLanguage } from "@/contexts/LanguageContext";

const PROFILE_IMAGES = ["/Images/MyPicture.jpg", "/Images/MyPicture2.jpg"];
const IMAGE_INTERVAL_MS = 7000;

function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

export default function AboutSection() {
  const { t } = useLanguage();
  const age = calculateAge(new Date(2005, 9, 7));
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % PROFILE_IMAGES.length);
    }, IMAGE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const heading = t("about.badge");
  const headingParts = heading.split(" ");
  const highlight = headingParts.pop();
  const prefix = headingParts.join(" ");

  return (
    <section id="about" className="relative px-4 py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6 text-left">
          <h2 className="text-4xl font-bold md:text-5xl">
            {prefix ? `${prefix} ` : ""}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
              {highlight}
            </span>
          </h2>
          <div className="space-y-4 text-lg text-gray-200">
            <p>{t("about.intro", { vars: { age } })}</p>
            <p>{t("about.hobby")}</p>
            <p>{t("about.editing")}</p>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-500/20 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_12px_rgb(168,85,247,0.2)] transition hover:border-purple-300/60 hover:bg-purple-500/30"
          >
            <FiMail className="h-4 w-4" />
            {t("about.contactCta")}
          </Link>
        </div>

        <div className="relative flex w-full justify-center">
          <div className="relative w-full max-w-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_12px_24px_-10px_rgba(109,40,217,0.25)] supports-[backdrop-filter]:bg-white/[0.08]">
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl" />
            <div className="absolute -bottom-0 -right-0 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />

            <div className="group relative aspect-square w-full">
              {PROFILE_IMAGES.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt="Profile"
                  fill
                  priority={index === 0}
                  sizes="420px"
                  className={`rounded-2xl object-cover transition-[opacity,transform] duration-[3000ms] ease-in-out group-hover:scale-105 ${
                    index === activeImage ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-4 rounded-2xl border border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
