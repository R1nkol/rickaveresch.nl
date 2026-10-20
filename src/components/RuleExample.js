import { ArrowRight } from "lucide-react";
import PlayingCard from "@/components/PlayingCard";
import PlacementText from "@/components/PlacementText";

export function CardHand({ cards, label, compact = false }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-start gap-2 sm:gap-3">
      {cards.map(({ caption, ...card }, index) => (
        <figure key={`${card.rank}-${typeof card.suit === "string" ? card.suit : card.suit?.value}-${index}`} className={`${compact || cards.length > 3 ? "w-10 sm:w-14" : "w-16 sm:w-20"} shrink-0`}>
          <PlayingCard {...card} />
          {caption && <figcaption className="mt-2 text-center text-xs leading-snug text-muted"><PlacementText>{caption}</PlacementText></figcaption>}
        </figure>
      ))}
    </div>
  );
}

export default function RuleExample({ title, cards, groups = [], groupLayout = "stacked", steps = [], description }) {
  const isPaired = groupLayout === "paired";

  return (
    <div className="space-y-3">
      {title && <h3 className="text-sm font-medium text-white"><PlacementText>{title}</PlacementText></h3>}
      {cards && <CardHand cards={cards} label={title} />}
      {groups.length > 0 && <div className={isPaired ? "flex flex-wrap gap-x-6 gap-y-4" : "space-y-3"}>
        {groups.map(({ label, cards: groupCards }) => (
          <figure key={label} className="flex w-fit flex-col gap-2">
            <figcaption className={`text-xs font-medium text-muted ${isPaired ? "order-last text-center" : ""}`}><PlacementText>{label}</PlacementText></figcaption>
            <CardHand cards={groupCards} label={label} compact={isPaired} />
          </figure>
        ))}
      </div>}
      {steps.length > 0 && <ol className="flex flex-wrap items-center gap-x-4 gap-y-3">
        {steps.map(({ label, value }, index) => {
          return <li key={label} className="flex items-center gap-4">
            {index > 0 && <ArrowRight aria-hidden="true" size={16} className="shrink-0 text-muted" />}
            <div>
              <span className="mb-1 block text-xs text-muted"><PlacementText>{label}</PlacementText></span>
              <span className="text-sm font-medium text-white"><PlacementText>{value}</PlacementText></span>
            </div>
          </li>;
        })}
      </ol>}
      {description && <p className="text-sm leading-relaxed text-muted"><PlacementText>{description}</PlacementText></p>}
    </div>
  );
}
