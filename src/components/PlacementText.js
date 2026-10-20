const PLACEMENT_COLORS = {
  1: "text-[var(--rank-gold)]",
  2: "text-[var(--rank-silver)]",
  3: "text-[var(--rank-bronze)]",
};

export default function PlacementText({ children }) {
  if (typeof children !== "string") return children;

  const parts = children.split(/\b((?:[123](?:e|de|ste)?|eerste|tweede|derde)\s+(?:plek|plaats|positie))\b/gi);

  return parts.map((part, index) => {
    if (index % 2 === 0) return part;

    const place = /^(?:1|eerste)/i.test(part) ? 1 : /^(?:2|tweede)/i.test(part) ? 2 : 3;
    return <span key={index} className={PLACEMENT_COLORS[place]}>{part}</span>;
  });
}
