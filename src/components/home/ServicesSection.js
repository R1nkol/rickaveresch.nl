"use client";

import Image from "next/image";
import { FiCode, FiGlobe, FiTerminal, FiVideo } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

const SPECIALITIES = [
  { id: "game", Icon: FiCode },
  { id: "web", Icon: FiGlobe },
  { id: "software", Icon: FiTerminal },
  { id: "video", Icon: FiVideo },
];

export default function ServicesSection({ skillsItems }) {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-shell skills-section">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="section-heading max-w-[9ch]">{t("services.heading")}</h2>
            <p className="mt-5 max-w-xs text-base text-muted">{t("services.description")}</p>
          </div>
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {SPECIALITIES.map(({ id, Icon }) => (
              <div key={id} className="speciality-item">
                <h3 className="flex items-center gap-3 text-xl font-medium text-white">
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                  <span>{t("services.items." + id + ".title")}</span>
                </h3>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
                  {t("services.items." + id + ".description")}
                </p>
              </div>
            ))}
          </div>
        </div>
        <ul className="skills-tools">
          {skillsItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="skill-tool"
              >
                <Image src={item.src} alt="" width={22} height={22} className="h-[22px] w-[22px] shrink-0 object-contain" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
