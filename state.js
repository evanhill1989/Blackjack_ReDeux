export const state = {
  bankroll: 1000, // Initial bankroll
  currentWager: 0, // Current wager
  deck: [], // The deck of cards
  dealerHand: {
    cards: [],
    score: 0,
  },
  userHandOne: {
    cards: [],
    score: 0,
  },
  userHandTwo: {
    cards: [],
    score: 0,
  },
  deck: [
    { suit: "♥", value: "2" },
    { suit: "♥", value: "3" },
    { suit: "♥", value: "4" },
    { suit: "♥", value: "5" },
    { suit: "♥", value: "6" },
    { suit: "♥", value: "7" },
    { suit: "♥", value: "8" },
    { suit: "♥", value: "9" },
    { suit: "♥", value: "10" },
    { suit: "♥", value: "J" },
    { suit: "♥", value: "Q" },
    { suit: "♥", value: "K" },
    { suit: "♥", value: "A" },
    { suit: "♦", value: "2" },
    { suit: "♦", value: "3" },
    { suit: "♦", value: "4" },
    { suit: "♦", value: "5" },
    { suit: "♦", value: "6" },
    { suit: "♦", value: "7" },
    { suit: "♦", value: "8" },
    { suit: "♦", value: "9" },
    { suit: "♦", value: "10" },
    { suit: "♦", value: "J" },
    { suit: "♦", value: "Q" },
    { suit: "♦", value: "K" },
    { suit: "♦", value: "A" },
    { suit: "♣", value: "2" },
    { suit: "♣", value: "3" },
    { suit: "♣", value: "4" },
    { suit: "♣", value: "5" },
    { suit: "♣", value: "6" },
    { suit: "♣", value: "7" },
    { suit: "♣", value: "8" },
    { suit: "♣", value: "9" },
    { suit: "♣", value: "10" },
    { suit: "♣", value: "J" },
    { suit: "♣", value: "Q" },
    { suit: "♣", value: "K" },
    { suit: "♣", value: "A" },
    { suit: "♠", value: "2" },
    { suit: "♠", value: "3" },
    { suit: "♠", value: "4" },
    { suit: "♠", value: "5" },
    { suit: "♠", value: "6" },
    { suit: "♠", value: "7" },
    { suit: "♠", value: "8" },
    { suit: "♠", value: "9" },
    { suit: "♠", value: "10" },
    { suit: "♠", value: "J" },
    { suit: "♠", value: "Q" },
    { suit: "♠", value: "K" },
    { suit: "♠", value: "A" },
  ],
};

// Function to initialize/reset the state
export function initializeGameState() {
  state.currentWager = 0;
  state.deck = [];
  state.dealerHand = { cards: [], score: 0 };
  state.userHand = { cards: [], score: 0 };
  state.isGameOver = false;
}
