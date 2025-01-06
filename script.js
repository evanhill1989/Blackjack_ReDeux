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
  updateBankroll,
  resetHands,
  captureWager,
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

// set the bankroll display on load
updateBankrollDisplay();

// Handle wager submission
wagerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Capture wager value
  handleWager(wagerInput.value);

  updateWagerDisplay();
  updateBankrollDisplay();

  // Switch views
  shuffleDeck();
  toggleView();

  console.log(state);

  // Reset input
  wagerInput.value = "";
});

testBtn.addEventListener("click", () => {
  // testElement();
  updateBankrollDisplay();
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

// Game Start setup
function handleWager(wagerInputValue) {
  const wager = parseInt(wagerInputValue, 10) || 50;
  const { bankroll } = state.getState();
  if (wager > 0 && wager <= bankroll) {
    // Batch updates and include a callback
    state.setState({
      currentWager: wager,
      bankroll: bankroll - wager,
    });
  }
}

// Game Actions

function hit() {
  dealCard("focusHand");
}

function stand() {
  console.log("stand");

  if ("ready for end") {
    dealerAction();
    handleBust();
    showdown(); // determine winner
    updateBankroll(); // update bankroll based on outcome from showdown
    resetHands(); // reset game state
  } else {
    handleBust();
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
