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
  const [imageCycle, setImageCycle] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveImage((prev) => (prev + 1) % PROFILE_IMAGES.length);
    }, IMAGE_INTERVAL_MS);

    return () => clearTimeout(timeout);
  }, [activeImage, imageCycle]);

  const selectImage = (index) => {
    setActiveImage(index);
    setImageCycle((cycle) => cycle + 1);
  };

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
          <div className="portrait-gallery">
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

            <div
              className="portrait-progress"
              role="group"
              aria-label={t("about.photoNavigation")}
            >
              {PROFILE_IMAGES.map((src, index) => {
                const isActive = index === activeImage;

                return (
                  <button
                    key={src}
                    type="button"
                    className={`portrait-progress-button ${isActive ? "is-active" : ""}`}
                    aria-label={t("about.showPhoto", { vars: { number: index + 1 } })}
                    aria-pressed={isActive}
                    onClick={() => selectImage(index)}
                  >
                    <span className="portrait-progress-track" aria-hidden="true">
                      <span
                        key={`${index}-${imageCycle}`}
                        className="portrait-progress-fill"
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
