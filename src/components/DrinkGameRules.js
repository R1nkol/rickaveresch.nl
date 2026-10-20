"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { FiLayers, FiUser, FiUsers, FiZap } from "react-icons/fi";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IntensityStars from "@/components/IntensityStars";

function RuleSection({ title, description, rules = [], notes = [], extra }) {
  return (
    <section className="surface-panel min-w-0 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {extra && <span className="text-xs font-medium text-accent">Extra</span>}
      </div>
      {description && <p className="mt-2 text-sm text-gray-300">{description}</p>}
      {rules.length > 0 && (
        <dl className="mt-5 divide-y divide-white/10">
          {rules.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-5">
              <dt className="text-gray-300">{label}</dt>
              <dd className="font-medium text-white sm:max-w-[60%] sm:text-right">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {notes.length > 0 && (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-300">
          {notes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      )}
    </section>
  );
}

function RuleChoices({ label, name, value, onChange, options, controls }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map(({ value: optionValue, label: optionLabel, Icon }) => (
          <label key={optionValue} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => onChange(optionValue)}
              aria-controls={controls}
              className="peer sr-only"
            />
            <span className={`${value === optionValue ? "button-primary" : "button-secondary"} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[var(--accent)]`}>
              <Icon aria-hidden="true" size={16} />
              {optionLabel}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function DrinkGameRules({
  title,
  intensity,
  description,
  links = [],
  notes = [],
  sections,
  extendedSections = [],
  teamPlay,
}) {
  const controlsId = useId();
  const [mode, setMode] = useState("simple");
  const [playStyle, setPlayStyle] = useState("individual");
  const isExtended = mode === "extended";
  const isTeamPlay = Boolean(teamPlay) && playStyle === "teams";
  const visibleSections = [
    ...(isTeamPlay && teamPlay.sections ? teamPlay.sections : sections),
    ...(isExtended ? extendedSections.map((section) => ({ ...section, extra: true })) : []),
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />
        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-5xl space-y-8">
            <div className="space-y-4">
              <Link href="/drankspellen" className="inline-block text-sm text-accent hover:underline">
                ← Alle drankspellen
              </Link>
              <h1 className="page-heading">{title} drankspel regels</h1>
              <p className="max-w-2xl text-gray-300">{description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <IntensityStars intensity={intensity} />
                {links.map(({ href, label, external }) => external ? (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="button-secondary">{label}</a>
                ) : (
                  <Link key={href} href={href} className="button-secondary">{label}</Link>
                ))}
              </div>
            </div>

            {(extendedSections.length > 0 || teamPlay) && (
              <div className="border-y border-line py-6">
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  {extendedSections.length > 0 && (
                    <RuleChoices
                      label="Spelregels"
                      name={`${controlsId}-mode`}
                      value={mode}
                      onChange={setMode}
                      controls="game-rules"
                      options={[
                        { value: "simple", label: "Simpel", Icon: FiZap },
                        { value: "extended", label: "Uitgebreid", Icon: FiLayers },
                      ]}
                    />
                  )}
                  {teamPlay && (
                    <RuleChoices
                      label="Spelen als"
                      name={`${controlsId}-players`}
                      value={playStyle}
                      onChange={setPlayStyle}
                      controls="game-rules"
                      options={[
                        { value: "individual", label: "Individueel", Icon: FiUser },
                        { value: "teams", label: "Teams van 2", Icon: FiUsers },
                      ]}
                    />
                  )}
                </div>
                <p className="sr-only" role="status">
                  {isExtended ? "Uitgebreid." : "Simpel."}
                  {teamPlay && (isTeamPlay ? " Teams van 2." : " Individueel.")}
                </p>
              </div>
            )}

            {notes.length > 0 && (
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-300">
                {notes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            )}

            <div id="game-rules" className={`grid items-start gap-5 ${visibleSections.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {visibleSections.map((section) => <RuleSection key={section.title} {...section} />)}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
