import { state } from "./state.js";
import {
  updateBankrollDisplay,
  updateWagerDisplay,
  switchToGameboardView,
  buildDeck,
} from "./ui.js";

import { dealInitialCards, shuffleDeck } from "./gameLogic.js";

document.addEventListener("DOMContentLoaded", () => {
  // Select form and input
  const wagerForm = document.getElementById("wager-form");
  const wagerInput = document.getElementById("wager-input");

  // Initialize UI
  updateBankrollDisplay(state.bankroll);

  // Handle wager submission
  wagerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Capture wager value
    const wager = parseInt(wagerInput.value, 10) || 50;
    if (wager > 0 && wager <= state.bankroll) {
      state.currentWager = wager;
      state.bankroll -= wager;

      // Update UI
      updateBankrollDisplay(state.bankroll);
      updateWagerDisplay(state.currentWager);

      // Switch views
      switchToGameboardView();

      shuffleDeck();
      console.log(state.deck);

      buildDeck();
      // Deal initial cards
      // dealInitialCards();
      // console.log(state);
    } else {
      alert("Please enter a valid wager amount.");
    }

    // Reset input
    wagerInput.value = "";
  });
});
