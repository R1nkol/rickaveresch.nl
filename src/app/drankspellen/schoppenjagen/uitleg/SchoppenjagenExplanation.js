"use client";

import { useState } from "react";
import Link from "next/link";

import ChoiceGroup from "@/components/ChoiceGroup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import RuleExample from "@/components/RuleExample";
import {
  SCHOPPENJAGEN_TARGETS as TARGETS,
  SCHOPPENJAGEN_TARGET_OPTIONS as TARGET_OPTIONS,
  SCHOPPENJAGEN_PLAYER_SETUPS as PLAYER_SETUPS,
  SCHOPPENJAGEN_PLAYER_OPTIONS as PLAYER_OPTIONS,
  schoppenjagenSettings,
} from "@/data/schoppenjagen";

function RuleSection({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="p-5 sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
      <h2 id={id} className="mb-5 text-2xl font-semibold tracking-tight lg:mb-0">{title}</h2>
      <div className="min-w-0 space-y-3 text-sm leading-relaxed text-gray-300">{children}</div>
    </section>
  );
}

export default function SchoppenjagenExplanation({ initialTarget = 100, initialPlayerCount = 4 }) {
  const initial = schoppenjagenSettings(initialTarget, initialPlayerCount);
  const [target, setTarget] = useState(initial.target);
  const [players, setPlayers] = useState(initial.playerCount);
  const { duration, jackPoints, doubleFrom } = TARGETS[target];
  const { lowestCard, deckSize, handSize } = PLAYER_SETUPS[players];

  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />
        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-5xl space-y-10">
            <div>
              <PageTitle backHref="/drankspellen/schoppenjagen" backLabel="Terug naar Schoppenjagen drankspel">
                Schoppenjagen uitgelegd
              </PageTitle>
              <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
                Onze eigen variant van Schoppenjagen, met twee fases en een eigen puntentelling.
              </p>
            </div>

            <div className="surface-panel divide-y divide-line overflow-hidden">
              <RuleSection id="target-heading" title="Doelscore en fases">
                <ChoiceGroup label="Doelscore" name="schoppenjagen-target" value={target} onChange={setTarget} options={TARGET_OPTIONS} />
                <p aria-live="polite" className="text-muted">Met doelscore {target} speel je ongeveer {duration}.</p>
                <p>Spreek de doelscore voor de start samen af.</p>
                <p><strong className="font-medium text-white">Fase 1:</strong> speel door tot je {target} punten raakt of passeert. Je gaat met je behaalde score naar fase 2. Gebruik je de optionele stuiterregel, dan tel je de overschrijding eerst terug vanaf {target}.</p>
                <p><strong className="font-medium text-white">Fase 2:</strong> speel daarna terug naar 0 of lager. De eerste speler die daar na een volledig uitgespeelde hand op eindigt, wint. Zo is 3 − 5 = −2 ook winst.</p>
                <p>Iedere speler heeft zijn eigen fase. Verwerk de punten altijd pas nadat de hele hand is uitgespeeld.</p>
              </RuleSection>

              <RuleSection id="cards-heading" title="Kaarten verdelen">
                <ChoiceGroup label="Aantal spelers" name="schoppenjagen-players" value={players} onChange={setPlayers} options={PLAYER_OPTIONS} controls="schoppenjagen-deal" />
                <div id="schoppenjagen-deal" aria-live="polite" aria-atomic="true" className="space-y-3">
                  <dl className="divide-y divide-line border-t border-line">
                    <div className="flex justify-between gap-4 py-3"><dt>Gebruik</dt><dd className="text-right font-medium text-white">{lowestCard} t/m aas ({deckSize} kaarten)</dd></div>
                    <div className="flex justify-between gap-4 py-3"><dt>Per speler</dt><dd className="text-right font-medium text-white">{handSize} kaarten</dd></div>
                  </dl>
                  {players === 5 && <p>Leg bij elke hand de bovenste 2 kaarten van het geschudde deck blind en ongezien weg. Deel daarna de overige 30 kaarten. De 2 weggelegde kaarten doen die hand niet mee.</p>}
                </div>
                <Link href={`/drankspellen/schoppenjagen/scorebord?doel=${target}&spelers=${players}`} className="button-primary">Score bijhouden</Link>
              </RuleSection>

              <RuleSection id="hand-heading" title="Een hand spelen">
                <p>Een hand begint met delen en eindigt wanneer iedereen alle kaarten heeft uitgespeeld. Speel elke hand helemaal uit, ook als iemand {target} punten bereikt of onder 0 zou komen.</p>
                <p>Na alle slagen tel je de schoppenpunten per speler bij elkaar op. In fase 1 tel je ze bij de totaalscore op; in fase 2 trek je ze ervan af. Noteer daarna de nieuwe totalen.</p>
                <p>Schud na iedere hand alle kaarten opnieuw en deel volgens het aantal spelers.</p>
                <p><strong className="font-medium text-white">Wie begint?</strong> De allereerste hand begint een willekeurig gekozen speler. Daarna begint degene met de meeste schoppenpunten uit de vorige hand.</p>
                <p>Bij een gelijke stand begint van die spelers degene met de hoogste totaalscore. Is ook dat gelijk, dan kies je willekeurig.</p>
              </RuleSection>

              <RuleSection id="trick-heading" title="Regels per slag">
                <ol className="list-decimal space-y-3 pl-5">
                  <li>De eerste kaart bepaalt de beginkleur.</li>
                  <li>Je moet kleur volgen als je die hebt.</li>
                  <li>Heb je die kleur niet, dan moet je schoppen spelen.</li>
                  <li>Heb je ook geen schoppen, dan mag je een andere kaart spelen.</li>
                  <li>Alleen de beginkleur kan de slag winnen. De hoogste kaart van die kleur wint; schoppen is hier geen troef.</li>
                  <li>Je mag een slag niet beginnen met schoppen, tenzij je alleen nog schoppen hebt.</li>
                  <li>De winnaar van de slag begint de volgende slag.</li>
                </ol>
                <div className="border-t border-line pt-5">
                  <RuleExample title="Voorbeeld: harten is de beginkleur" cards={[
                    { rank: "9", suit: "hearts", caption: "Begint de slag" },
                    { rank: "K", suit: "hearts", caption: "Wint de slag" },
                    { rank: "J", suit: "spades", caption: "Geen harten" },
                    { rank: "7", suit: "hearts", caption: "Volgt harten" },
                    ...(players >= 5 ? [{ rank: "8", suit: "hearts", caption: "Volgt harten" }] : []),
                    ...(players === 6 ? [{ rank: "Q", suit: "hearts", caption: "Volgt harten" }] : []),
                  ]} description={`De hartenheer is de hoogste hartenkaart en wint. De schoppenboer wint de slag niet: schoppen is geen troef. De winnaar krijgt de ${jackPoints} punten van de schoppenboer.`} />
                </div>
              </RuleSection>

              <RuleSection id="points-heading" title="Schoppenpunten">
                <p>Elke schoppenkaart is 1 punt waard. De boer telt als {jackPoints} punten in totaal. De winnaar van de slag krijgt die punten.</p>
                <RuleExample cards={[
                  { rank: "7", suit: "spades", caption: "1 punt" },
                  { rank: "J", suit: "spades", caption: `${jackPoints} punten` },
                ]} />
              </RuleSection>
            </div>

            <section aria-labelledby="extra-heading" className="space-y-5">
              <div className="space-y-2">
                <h2 id="extra-heading" className="text-2xl font-semibold tracking-tight">Optionele extra regels</h2>
                <p className="text-sm leading-relaxed text-muted">Spreek vooraf samen af welke jullie gebruiken.</p>
              </div>
              <div className="surface-panel divide-y divide-line overflow-hidden">
                <RuleSection id="double-heading" title="Dubbele punten">
                  <p>Vanaf <strong className="font-medium text-white">{doubleFrom} punten</strong> tellen de schoppenpunten voor die speler dubbel. Dit geldt alleen in fase 1, totdat die speler {target} punten raakt of passeert.</p>
                  <p>Een gewone schoppenkaart is dan 2 punten. De schoppenboer is dan <strong className="font-medium text-white">{jackPoints * 2} punten</strong>.</p>
                </RuleSection>

                <RuleSection id="ace-heading" title="Aas beïnvloedt boer">
                  <RuleExample title="Samen in dezelfde slag" cards={[
                    { rank: "A", suit: "spades", caption: "Schoppenaas" },
                    { rank: "J", suit: "spades", caption: "Boer wordt 1 punt" },
                  ]} />
                  <p>Ligt de schoppenaas in dezelfde slag als de schoppenboer? Dan telt de boer in die slag als 1 punt in plaats van {jackPoints} punten.</p>
                  <p>Is de dubbele regel actief, dan wordt die aangepaste waarde 2 punten. Deze aanpassing geldt alleen voor die slag.</p>
                </RuleSection>

                <RuleSection id="sweep-heading" title="Alle slagen winnen">
                  <p>Win je alle slagen in één hand, dan geldt de 20-puntenregel. De normale schoppenpunten tellen daarnaast gewoon mee.</p>
                  <p><strong className="font-medium text-white">Fase 1:</strong> kies tussen 20 punten van je eigen totaal afhalen, of 20 punten bij iedere andere speler optellen.</p>
                  <p><strong className="font-medium text-white">Fase 2:</strong> trek je schoppenpunten van je eigen totaal af. Alle andere spelers krijgen 20 punten erbij; je hebt dan geen keuze.</p>
                </RuleSection>

                <RuleSection id="bounce-heading" title="Stuiterregel in fase 1">
                  <p>De stuiterregel geldt alleen in fase 1. Kom je boven {target} punten uit, dan stuiter je terug vanaf {target}. Je gaat wel naar fase 2, omdat je de grens hebt geraakt.</p>
                  <p>Zo wordt <strong className="font-medium text-white">{target - 2} + 5 = {target - 3}</strong>: eerst naar {target}, dan 3 punten terug. Je speelt verder in fase 2 met {target - 3} punten.</p>
                </RuleSection>
              </div>
            </section>

            <div className="text-sm leading-relaxed text-muted">
              <Link href="/drankspellen/schoppenjagen" className="text-link">Bekijk de lichte drankvariant</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
