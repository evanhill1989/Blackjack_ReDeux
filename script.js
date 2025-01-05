import { state } from "./state.js";
import {
  updateBankrollDisplay,
  updateWagerDisplay,
  switchToGameboardView,
  toggleView,
  renderDeck,
  animateDealCard,
  testElement,
} from "./ui.js";

import {
  shuffleDeck,
  updateHandScores,
  getTopCard,
  addCardToHand,
} from "./gameLogic.js";

import { initializeSubscriptions } from "./subscriptions.js";

initializeSubscriptions();

const dealCardBtn = document.getElementById("deal-hand-btn");
const testBtn = document.getElementById("test-btn");
const wagerForm = document.getElementById("wager-form");
const wagerInput = document.getElementById("wager-input");

const hitBtn = document.getElementById("hit-btn");

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
    shuffleDeck();
    toggleView();

    console.log(state);
  } else {
    alert("Please enter a valid wager amount.");
  }

  // Reset input
  wagerInput.value = "";
});

testBtn.addEventListener("click", () => {
  // testElement();
  dealCard("focusHand");
});

// Player actions

dealCardBtn.addEventListener("click", () => {
  // Wait for the first dealCard to finish
  dealCard("focusHand");
  dealCard("dealerHand");
  setTimeout(() => {
    dealCard("focusHand");
    dealCard("dealerHand");
  }, 2000);
});

hitBtn.addEventListener("click", () => {
  hit();
});

function dealCard(hand) {
  const topCard = getTopCard();
  addCardToHand(topCard, hand);
  updateHandScores();
  return animateDealCard(topCard, hand);
}

function hit() {
  dealCard("focusHand");
}
