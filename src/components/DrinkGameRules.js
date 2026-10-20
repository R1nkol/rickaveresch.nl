"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { FiUser, FiUsers } from "react-icons/fi";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IntensityStars from "@/components/IntensityStars";
import PageTitle from "@/components/PageTitle";
import ChoiceGroup from "@/components/ChoiceGroup";
import RuleExample from "@/components/RuleExample";
import PlacementText from "@/components/PlacementText";

function RuleSection({ title, description, rules = [], notes = [], examples = [], extra }) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="min-w-0 p-5 sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
      <div className="mb-5 lg:mb-0">
        {extra && <p className="mb-2 text-xs font-medium text-muted">Uitgebreid</p>}
        <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-white"><PlacementText>{title}</PlacementText></h2>
        {description && <p className="mt-2 text-sm leading-relaxed text-muted"><PlacementText>{description}</PlacementText></p>}
      </div>
      <div className="min-w-0">
        {rules.length > 0 && (
          <dl className="divide-y divide-line border-t border-line lg:border-t-0">
            {rules.map(({ label, value }) => (
              <div key={label} className="grid min-h-14 grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] items-baseline gap-4 py-4 text-sm sm:gap-8">
                <dt className="text-gray-300"><PlacementText>{label}</PlacementText></dt>
                <dd className="text-right font-medium text-white"><PlacementText>{value}</PlacementText></dd>
              </div>
            ))}
          </dl>
        )}
        {examples.length > 0 && <div className="mt-5 space-y-6">
          {examples.map((example) => <RuleExample key={example.title} {...example} />)}
        </div>}
        {notes.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {notes.map((note) => <li key={note}><PlacementText>{note}</PlacementText></li>)}
          </ul>
        )}
      </div>
    </section>
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
  const activeTeamPlay = isTeamPlay ? teamPlay : null;
  const visibleNotes = [...notes, ...(activeTeamPlay?.notes ?? [])];
  const activeExtendedSections = activeTeamPlay?.extendedSections ?? extendedSections;
  const hasChoices = activeExtendedSections.length > 0 || Boolean(teamPlay);
  const visibleSections = [
    ...(activeTeamPlay?.sections ?? sections),
    ...(isExtended ? activeExtendedSections.map((section) => ({ ...section, extra: true })) : []),
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />
        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-5xl">
            <div className={`grid gap-6 pb-8 sm:pb-10 ${hasChoices ? "lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10" : ""}`}>
              <div className="min-w-0">
                <PageTitle backHref="/drankspellen" backLabel="Alle drankspellen">
                  {title} drankspel
                </PageTitle>
                <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg"><PlacementText>{description}</PlacementText></p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <IntensityStars intensity={intensity} />
                  {links.map(({ href, label, external }) => external ? (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="button-secondary">{label}</a>
                  ) : (
                    <Link key={href} href={href} className="button-secondary">{label}</Link>
                  ))}
                </div>
              </div>

              {hasChoices && (
                <div className="border-t border-line pt-5 lg:border-t-0 lg:pt-2">
                  <div className="grid gap-5 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-5 lg:grid lg:gap-5">
                    {activeExtendedSections.length > 0 && (
                      <ChoiceGroup
                        label="Spelregels"
                        name={`${controlsId}-mode`}
                        value={mode}
                        onChange={setMode}
                        controls="game-rules"
                        options={[
                          { value: "simple", label: "Simpel" },
                          { value: "extended", label: "Uitgebreid" },
                        ]}
                      />
                    )}
                    {teamPlay && (
                      <ChoiceGroup
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
            </div>

            <div id="game-rules" className="surface-panel divide-y divide-line overflow-hidden">
              {visibleSections.map((section) => <RuleSection key={section.title} {...section} />)}
            </div>
            {visibleNotes.length > 0 && (
              <ul className="mt-6 space-y-2 text-sm leading-relaxed text-muted">
                {visibleNotes.map((note) => <li key={note}><PlacementText>{note}</PlacementText></li>)}
              </ul>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
