"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/contexts/LanguageContext";

const PROFILE_IMAGES = [
  "/Images/MyPicture3.png",
  "/Images/MyPicture2.jpg",
  "/Images/MyPicture.jpg",
];
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

  return (
    <section id="about" className="section-shell">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
        <div className="space-y-6 text-left">
          <h2 className="section-heading">{t("navigation.about")}</h2>
          <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>{t("about.intro", { vars: { age } })}</p>
            <p>{t("about.hobby")}</p>
            <p>{t("about.editing")}</p>
          </div>
          <Link
            href="#contact"
            className="text-link"
          >
            {t("about.contactCta")}
          </Link>
        </div>

        <div className="relative flex w-full justify-center px-3 py-3">
          <div className="portrait-frame">
            <div className="portrait-photo">
              {PROFILE_IMAGES.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt="Rick Averesch"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 480px) calc(100vw - 40px), 420px"
                  className={`object-cover transition-opacity duration-1000 ease-in-out ${
                    index === activeImage ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
