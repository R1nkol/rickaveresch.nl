const hands = [
  { title: "Royal flush", description: "10, boer, vrouw, heer en aas van dezelfde soort.", cards: [["10", "spades"], ["J", "spades"], ["Q", "spades"], ["K", "spades"], ["A", "spades"]] },
  { title: "Straight flush", description: "Vijf opeenvolgende kaarten van dezelfde soort.", cards: [["5", "hearts"], ["6", "hearts"], ["7", "hearts"], ["8", "hearts"], ["9", "hearts"]] },
  { title: "Four of a kind", description: "Vier kaarten met dezelfde waarde.", cards: [["9", "hearts"], ["9", "diamonds"], ["9", "clubs"], ["9", "spades"], ["K", "clubs"]] },
  { title: "Full house", description: "Drie gelijke kaarten en een paar.", cards: [["K", "spades"], ["K", "hearts"], ["K", "clubs"], ["7", "diamonds"], ["7", "clubs"]] },
  { title: "Flush", description: "Vijf kaarten van dezelfde soort, zonder opeenvolgende reeks.", cards: [["A", "hearts"], ["J", "hearts"], ["8", "hearts"], ["4", "hearts"], ["2", "hearts"]] },
  { title: "Straight", description: "Vijf opeenvolgende waarden. De soorten mogen verschillen.", cards: [["5", "spades"], ["6", "diamonds"], ["7", "clubs"], ["8", "hearts"], ["9", "spades"]] },
  { title: "Three of a kind", description: "Drie kaarten met dezelfde waarde.", cards: [["8", "spades"], ["8", "hearts"], ["8", "clubs"], ["A", "diamonds"], ["K", "clubs"]] },
  { title: "Two pair", description: "Twee verschillende paren.", cards: [["Q", "hearts"], ["Q", "spades"], ["6", "clubs"], ["6", "diamonds"], ["A", "hearts"]] },
  { title: "One pair", description: "Twee kaarten met dezelfde waarde.", cards: [["J", "spades"], ["J", "diamonds"], ["A", "clubs"], ["9", "hearts"], ["4", "spades"]] },
  { title: "High card", description: "Geen combinatie? Dan telt eerst de hoogste kaart.", cards: [["A", "spades"], ["Q", "hearts"], ["9", "clubs"], ["6", "diamonds"], ["3", "hearts"]] },
];

export const pokerHands = hands.map((hand) => ({
  ...hand,
  cards: hand.cards.map(([rank, suit]) => ({ rank, suit })),
}));
