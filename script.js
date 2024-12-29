import { state } from "./state.js";
import {
  updateBankrollDisplay,
  updateWagerDisplay,
  switchToGameboardView,
  renderDeck,
} from "./ui.js";

import { shuffleDeck, dealCard, updateHandScores } from "./gameLogic.js";

import { initializeSubscriptions } from "./subscriptions.js";

initializeSubscriptions();

const dealCardBtn = document.getElementById("deal-hand-button");
const testBtn = document.getElementById("test-button");

document.addEventListener("DOMContentLoaded", () => {
  // Select form and input
  const wagerForm = document.getElementById("wager-form");
  const wagerInput = document.getElementById("wager-input");

  // Initialize UI

  shuffleDeck();
  renderDeck();

  // Handle wager submission
  wagerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { bankroll } = state.getState();

    // Capture wager value
    const wager = parseInt(wagerInput.value, 10) || 50;
    if (wager > 0 && wager <= bankroll) {
      // Update state
      const { bankroll, currentWager } = state.getState();
      state.setState({ currentWager: wager, bankroll: bankroll - wager });

      // Update UI
      updateBankrollDisplay(bankroll);
      updateWagerDisplay(currentWager);

      // Switch views
      switchToGameboardView();

      console.log(state);
    } else {
      alert("Please enter a valid wager amount.");
    }

    // Reset input
    wagerInput.value = "";
  });
});

testBtn.addEventListener("click", () => {
  updateHandScores();
  state.notify();
  console.log(state.getState());
});

dealCardBtn.addEventListener("click", () => {
  dealInitialCards();
  updateHandScores();
});

export function dealInitialCards() {
  for (let i = 0; i < 2; i++) {
    dealCard("userHandOne");
  }

  for (let i = 0; i < 2; i++) {
    dealCard("dealerHand");
  }
}
