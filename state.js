const state = {
  bankroll: 1000, // Initial bankroll
  currentWager: 0, // Current wager
  deck: [], // The deck of cards
  dealerHand: {
    cards: [],
    score: 0,
  },
  userHand: {
    cards: [],
    score: 0,
  },
  isGameOver: false, // Tracks whether the game has ended
};

// Function to initialize/reset the state
function initializeGameState() {
  state.currentWager = 0;
  state.deck = [];
  state.dealerHand = { cards: [], score: 0 };
  state.userHand = { cards: [], score: 0 };
  state.isGameOver = false;
}

export { state, initializeGameState };
