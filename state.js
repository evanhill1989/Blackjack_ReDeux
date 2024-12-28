class State {
  constructor() {
    this.state = {
      bankroll: 1000, // Initial bankroll
      currentWager: 0, // Current wager

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
      // "♥", "♦", "♣", "♠"
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
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const state = new State();

// Function to initialize/reset the state
export function initializeGameState() {
  state.setState({
    currentWager: 0,
    deck: [],
    dealerHand: { cards: [], score: 0 },
    userHand: { cards: [], score: 0 },
    isGameOver: false,
  });
}
