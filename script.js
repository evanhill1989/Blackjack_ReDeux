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
  dealerAction,
  showdown,
  handleBust,
} from "./gameLogic.js";

import { initializeSubscriptions } from "./subscriptions.js";

initializeSubscriptions();

const dealCardBtn = document.getElementById("deal-hand-btn");
const testBtn = document.getElementById("test-btn");
const wagerForm = document.getElementById("wager-form");
const wagerInput = document.getElementById("wager-input");

const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const splitBtn = document.getElementById("split-btn");
const doubleBtn = document.getElementById("double-btn");

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
  // staticCardTemplate { suit: "♥", value: "J" }
  dealCard("focusHand");
  dealCard("dealerHand", { suit: "♣", value: "J" });
  setTimeout(() => {
    dealCard("focusHand");
    dealCard("dealerHand", { suit: "♦", value: "5" });
  }, 2000);
});

hitBtn.addEventListener("click", () => {
  hit();
});

standBtn.addEventListener("click", () => {
  stand();
});

splitBtn.addEventListener("click", () => {
  split();
});

doubleBtn.addEventListener("click", () => {
  double();
});

function dealCard(hand, staticTestCard) {
  const topCard = getTopCard(staticTestCard);
  addCardToHand(topCard, hand);
  updateHandScores();

  animateDealCard(topCard, hand);
}

function hit() {
  dealCard("focusHand");
}

function stand() {
  console.log("stand");

  if ("ready for end") {
    dealerAction();
    handleBust();
    showdown();
  } else {
    toggleFocusHand();
  }

  // end the game
  // compare scores
  // update bankroll
  // reset game state
}

// function split() {
//   console.log("split");
// }

function double() {
  console.log("double");

  //   // double the wager
  //   // deal one card
  //   // stand

  //   // end the game
  //   // compare scores
  //   // update bankroll
  //   // reset game state
}
