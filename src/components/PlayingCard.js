import styles from "./PlayingCard.module.css";

export const CARD_SUITS = [
  { value: "hearts", label: "Harten", red: true },
  { value: "diamonds", label: "Ruiten", red: true },
  { value: "clubs", label: "Klaveren", red: false },
  { value: "spades", label: "Schoppen", red: false },
];

const PIPS = {
  "A": [[50, 70]],
  "2": [[50, 35], [50, 105]],
  "3": [[50, 32], [50, 70], [50, 108]],
  "4": [[32, 32], [68, 32], [32, 108], [68, 108]],
  "5": [[32, 32], [68, 32], [50, 70], [32, 108], [68, 108]],
  "6": [[32, 32], [68, 32], [32, 70], [68, 70], [32, 108], [68, 108]],
  "7": [[32, 32], [68, 32], [50, 51], [32, 70], [68, 70], [32, 108], [68, 108]],
  "8": [[32, 30], [68, 30], [50, 50], [32, 70], [68, 70], [50, 90], [32, 110], [68, 110]],
  "9": [[32, 26], [68, 26], [32, 55], [68, 55], [50, 70], [32, 85], [68, 85], [32, 114], [68, 114]],
  "10": [[32, 26], [68, 26], [50, 41], [32, 55], [68, 55], [32, 85], [68, 85], [50, 99], [32, 114], [68, 114]],
};

function CourtPortrait({ rank }) {
  return (
    <g>
      <path d="M29 70V60q0-7 12-10h18q12 3 12 10v10Z" fill="#344960" />
      <path d="m39 53 11 17 11-17-5-3H44Z" fill="#b69a5d" />
      <path d="m46 54 4 16 4-16" fill="currentColor" />
      <path d="M46 47h8v10l-4 4-4-4Z" fill="#dfc2a0" />
      <path d={rank === "Q" ? "M40 35q0-10 10-10t10 10l3 22H37Z" : "M40 35q0-10 10-10t10 10v15H40Z"} fill={rank === "Q" ? "#9b7751" : "#403639"} />
      <path d="M43 34h14v11q0 9-7 9t-7-9Z" fill="#ead0ad" />
      <path d="M44 39h3m6 0h3m-6 1v5h2m-5 3h6" fill="none" stroke="#61443b" strokeWidth="1" strokeLinecap="round" />
      {rank === "J" ? (
        <><path d="m39 34 3-9 14-1 6 10Z" fill="currentColor" /><path d="m55 25 6-10 2 10-6 5" fill="#b69a5d" /><path d="M38 34h25" stroke="#b69a5d" strokeWidth="2" /></>
      ) : (
        <><path d="m40 32-2-10 7 4 5-8 5 8 7-4-2 10Z" fill="#b69a5d" /><path d="M40 33h20" stroke="currentColor" strokeWidth="2" />{rank === "K" && <path d="m43 46 7 4 7-4-2 10-5 4-5-4Z" fill="#403639" />}</>
      )}
      <path d="m31 62 7-4m24 0 7 4M32 68h8m20 0h8" stroke="#b69a5d" strokeWidth="2" />
    </g>
  );
}

function CardBack() {
  return (
    <>
      <rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <svg x="10" y="10" width="80" height="120" viewBox="0 0 80 120" overflow="hidden" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35">
        {Array.from({ length: 18 }, (_, i) => i * 12 - 120).map((x) => <path key={x} d={`M${x} 0l120 120M${x + 120} 0l-120 120`} />)}
      </svg>
    </>
  );
}

function SuitSymbol({ suit }) {
  switch (suit) {
    case "hearts":
      return <path d="M12 21 3.2 12.5C-.7 8.8 1.9 2.5 6.7 2.5 9 2.5 10.8 3.8 12 5.7c1.2-1.9 3-3.2 5.3-3.2 4.8 0 7.4 6.3 3.5 10Z" />;
    case "diamonds":
      return <path d="m12 1 10 11-10 11L2 12Z" />;
    case "clubs":
      return <><circle cx="12" cy="6" r="5" /><circle cx="6.5" cy="13" r="5.5" /><circle cx="17.5" cy="13" r="5.5" /><path d="m12 13-3 9h6Z" /></>;
    case "spades":
      return <path d="M12 1.5C9 6 2 10 2 15c0 5 6 7 9 3l-1.5 4.5h5L13 18c3 4 9 2 9-3 0-5-7-9-10-13.5Z" />;
    default:
      return null;
  }
}

function Corner({ rank, suit }) {
  return (
    <>
      <text x="11" y="15" textAnchor="middle" fontSize="13" fontWeight="600">{rank}</text>
      <g transform="translate(6 18) scale(0.4167)"><SuitSymbol suit={suit} /></g>
    </>
  );
}

export default function PlayingCard({ rank, suit, faceDown = false }) {
  const cardSuit = typeof suit === "string" ? CARD_SUITS.find((item) => item.value === suit) : suit;
  const courtCard = ["J", "Q", "K"].includes(rank);
  const rankLabel = { A: "aas", J: "boer", Q: "vrouw", K: "heer" }[rank] ?? rank;
  const pipSize = rank === "A" ? 30 : 18;

  return (
    <svg
      viewBox="0 0 100 140"
      role="img"
      aria-label={faceDown ? "Dichte kaart" : `${cardSuit.label} ${rankLabel}`}
      focusable="false"
      className={styles.card}
      data-tone={cardSuit?.red ? "red" : "black"}
      data-face={faceDown ? "back" : "front"}
      fill="currentColor"
    >
      {faceDown ? <CardBack /> : <>
      <Corner rank={rank} suit={cardSuit.value} />
      <g transform="rotate(180 50 70)"><Corner rank={rank} suit={cardSuit.value} /></g>
      {courtCard ? <>
        <rect x="25" y="21" width="50" height="98" rx="2" fill="#eee6d6" stroke="#b69a5d" strokeWidth="0.8" />
        <CourtPortrait rank={rank} />
        <g transform="rotate(180 50 70)"><CourtPortrait rank={rank} /></g>
        <path d="M29 70h42" stroke="#b69a5d" strokeWidth="1" />
      </> : PIPS[rank].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x - pipSize / 2} ${y - pipSize / 2}) scale(${pipSize / 24})${y > 70 ? " rotate(180 12 12)" : ""}`}>
          <SuitSymbol suit={cardSuit.value} />
        </g>
      ))}
      </>}
    </svg>
  );
}
