import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageTitle from "@/components/PageTitle";
import RuleExample, { CardHand } from "@/components/RuleExample";
import { pokerHands } from "@/data/pokerHands";

export const metadata = {
  title: "Poker uitgelegd met kaarten | Rick Averesch",
  description: "Texas Hold’em voor een spelletjesavond: je beurt, de kaarten op tafel en alle pokerhanden met voorbeelden.",
};

export default function PokerBasicsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-sans text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header activeSection="" />
        <div className="flex-1 px-4 pb-24 pt-28">
          <div className="mx-auto w-full max-w-5xl space-y-10">
            <div>
              <PageTitle backHref="/drankspellen/poker" backLabel="Terug naar poker drankspel">Poker uitgelegd</PageTitle>
              <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">Hier spelen we Texas Hold’em. Je krijgt twee eigen kaarten en maakt met de kaarten op tafel de beste combinatie van vijf.</p>
            </div>

            <section className="surface-panel p-5 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">Jouw kaarten en de tafel</h2>
              <div className="mt-5">
                <RuleExample groups={[
                  { label: "Alleen jij mag deze twee kaarten zien", cards: [{ rank: "A", suit: "hearts" }, { rank: "K", suit: "clubs" }] },
                  { label: "Deze vijf kaarten deelt de hele tafel", cards: [{ rank: "A", suit: "spades", caption: "Flop" }, { rank: "7", suit: "diamonds", caption: "Flop" }, { rank: "2", suit: "clubs", caption: "Flop" }, { rank: "9", suit: "hearts", caption: "Turn" }, { rank: "J", suit: "spades", caption: "River" }] },
                ]} description="Hier heb je een paar azen. Kies de beste vijf uit alle zeven kaarten; je mag nul, één of twee van je eigen kaarten gebruiken." />
              </div>
            </section>

            <section className="surface-panel p-5 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">Zo verloopt een hand</h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-300">
                <li>Spreek het aantal fiches en de blinds af. Links van de dealer leggen twee spelers de small en big blind in; de big blind is meestal het dubbele.</li>
                <li>Iedereen krijgt twee dichte kaarten. Er volgt een inzetronde, beginnend links van de big blind.</li>
                <li><strong className="font-medium text-white">Flop:</strong> draai drie kaarten open op tafel. Iedereen die nog meedoet kan weer inzetten.</li>
                <li><strong className="font-medium text-white">Turn:</strong> draai de vierde tafelkaart open. Daarna weer een inzetronde.</li>
                <li><strong className="font-medium text-white">River:</strong> draai de vijfde tafelkaart open. Dit is de laatste inzetronde.</li>
                <li>Is er nog maar één speler over? Die wint de pot. Anders vergelijken de overgebleven spelers hun beste vijf kaarten bij de showdown.</li>
              </ol>
              <p className="mt-4 text-sm leading-relaxed text-muted">Vanaf de flop begint de eerste speler links van de dealer die nog meedoet.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">Na de hand schuift de dealerpositie één plek door. Bij een gelijkwaardige beste hand deel je de pot.</p>
            </section>

            <section className="surface-panel p-5 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">Wat kun je doen?</h2>
              <dl className="mt-5 divide-y divide-line text-sm">
                {[
                  ["Check", "Niets inzetten en blijven meedoen. Dit kan alleen als er nog geen inzet is om te volgen."],
                  ["Bet", "Als eerste fiches inzetten in deze inzetronde."],
                  ["Call", "De openstaande inzet aanvullen tot hetzelfde bedrag."],
                  ["Raise", "De inzet verhogen. De anderen moeten dan opnieuw kiezen."],
                  ["Fold", "Je kaarten wegleggen. Je doet deze hand niet meer mee."],
                  ["All-in", "Al je overgebleven fiches inzetten."],
                ].map(([label, explanation]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[6rem_1fr] sm:gap-5"><dt className="font-medium text-white">{label}</dt><dd className="leading-relaxed text-muted">{explanation}</dd></div>)}
              </dl>
            </section>

            <section aria-labelledby="hands-heading">
              <h2 id="hands-heading" className="text-2xl font-semibold tracking-tight">Welke hand is sterker?</h2>
              <p className="mt-2 text-sm text-muted">Van sterk naar zwak. Vergelijk eerst de combinatie, daarna de kaartwaarden. Een aas kan hoog zijn, of laag in de reeks A, 2, 3, 4, 5.</p>
              <div className="mt-5 divide-y divide-line border-t border-line">
                {pokerHands.map(({ title, description, cards }, index) => (
                  <article key={title} className="grid gap-5 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-center md:gap-10">
                    <div><h3 className="text-lg font-semibold">{index + 1}. {title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{description}</p></div>
                    <CardHand cards={cards} label={`Voorbeeld van ${title}`} />
                  </article>
                ))}
              </div>
            </section>

            <div className="space-y-3 text-sm leading-relaxed text-muted">
              <Link href="/drankspellen/poker" className="text-link">Terug naar de drankregels</Link>
              <p>Meer uitleg: <a className="text-link" href="https://www.youtube.com/watch?v=Id0f8mxTiWQ" target="_blank" rel="noopener noreferrer">de uitlegvideo</a>.</p>
              <p>Spelregels bij PokerStars: <a className="text-link" href="https://www.pokerstars.com/poker/games/texas-holdem/" target="_blank" rel="noopener noreferrer">Texas Hold’em</a>, <a className="text-link" href="https://www.pokerstars.com/poker/games/rules/" target="_blank" rel="noopener noreferrer">inzetten</a> en <a className="text-link" href="https://www.pokerstars.com/poker/games/rules/hand-rankings/" target="_blank" rel="noopener noreferrer">handwaardes</a>.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
