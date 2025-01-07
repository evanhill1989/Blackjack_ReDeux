import { state } from "./state.js";
import {
  updateBankrollDisplay,
  updateWagerDisplay,
  switchToGameboardView,
  toggleView,
  renderDeck,
  animateDealCard,
  testElement,
  clearCardDisplay,
} from "./ui.js";

import {
  shuffleDeck,
  updateHandScores,
  getTopCard,
  addCardToHand,
  dealerAction,
  showdown,
  handleBust,
  handlePayouts,
} from "./gameLogic.js";

console.log("running script.js again");

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
  console.log(state.getState());
});

// Player actions

dealCardBtn.addEventListener("click", () => {
  // Wait for the first dealCard to finish
  // staticCardTemplate { suit: "♥", value: "J" }
  dealInitialCards();
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

function dealInitialCards() {
  dealCard("focusHand");
  dealCard("dealerHand", { suit: "♣", value: "J" });
  setTimeout(() => {
    dealCard("focusHand");
    dealCard("dealerHand", { suit: "♦", value: "5" });
  }, 2000);
}

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

async function stand() {
  console.log("stand");

  if ("ready for end") {
    console.log("Am I running this stuff lol?");
    await dealerAction(); // Wait for dealer action to finish
    await handleBust(); // Wait for bust handling to complete
    await showdown(); // Wait for winner determination
    await handlePayouts(); // Wait for bankroll updates
    await resetHands(); // Finally, reset the game state
  } else {
    await handleBust();
    toggleFocusHand();
  }
  // end the game
  // compare scores
  // update bankroll
  // reset game state
}

function split() {
  console.log("split");
}

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

// End Game Funcs

function resetHands() {
  return new Promise((resolve) => {
    const stateData = state.getState();
    console.log(stateData, "<---- state data inside resetHands...");
    // Clear hands and prepare for the next round
    state.setState({
      dealerHand: { cards: [], score: 0 },
      userHandOne: { cards: [], score: 0 },
      userHandTwo: { cards: [], score: 0 },
    });

    // Clear UI
    clearCardDisplay();

    // Check if deck needs reshuffling
    const { deck } = state.getState();
    if (deck.length < 21) {
      state.setState({
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
      });
      shuffleDeck();
    }

    resolve(); // Reset complete
  });
}
