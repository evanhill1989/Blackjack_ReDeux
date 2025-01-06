class State {
  constructor() {
    this.state = {
      bankroll: 1000, // Initial bankroll
      currentWager: 0, // Current wager

      dealerHand: {
        cards: [],
        score: 0,
        outcome: null,
      },
      userHandOne: {
        cards: [],
        score: 0,
        outcome: null,
      },
      userHandTwo: {
        cards: [],
        score: 0,
        outcome: null,
      },
      focus: "userHandOne", // "userHandOne" or "userHandTwo"
      nonFocus: "userHandTwo", // "userHandOne" or "userHandTwo"
      // ♥   ♦   ♣   ♠
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

  get focusHand() {
    return this.state.focus === "userHandOne"
      ? this.state.userHandOne
      : this.state.userHandTwo;
  }

  get nonFocusHand() {
    return this.state.focus === "userHandOne"
      ? this.state.userHandTwo
      : this.state.userHandOne;
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
