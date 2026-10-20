import styles from "./PlayingCard.module.css";

export const CARD_SUITS = [
  { value: "hearts", label: "Harten", red: true },
  { value: "diamonds", label: "Ruiten", red: true },
  { value: "clubs", label: "Klaveren", red: false },
  { value: "spades", label: "Schoppen", red: false },
];

const PIPS = {
  "2": [[50, 35], [50, 105]],
  "3": [[50, 32], [50, 70], [50, 108]],
  "7": [[32, 32], [68, 32], [50, 51], [32, 70], [68, 70], [32, 108], [68, 108]],
  "10": [[32, 26], [68, 26], [50, 41], [32, 55], [68, 55], [32, 85], [68, 85], [50, 99], [32, 114], [68, 114]],
};

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

export default function PlayingCard({ rank, suit }) {
  return (
    <svg
      viewBox="0 0 100 140"
      role="img"
      aria-label={`${suit.label} ${rank}`}
      focusable="false"
      className={styles.card}
      data-tone={suit.red ? "red" : "black"}
      fill="currentColor"
    >
      <Corner rank={rank} suit={suit.value} />
      <g transform="rotate(180 50 70)"><Corner rank={rank} suit={suit.value} /></g>
      {PIPS[rank].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x - 9} ${y - 9}) scale(0.75)${y > 70 ? " rotate(180 12 12)" : ""}`}>
          <SuitSymbol suit={suit.value} />
        </g>
      ))}
    </svg>
  );
}
