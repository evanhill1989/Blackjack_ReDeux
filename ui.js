import { state } from "./state.js";

// Select DOM elements
const wagerView = document.getElementById("wager-view");
const gameboardView = document.getElementById("gameboard-view");
const bankrollDisplay = document.getElementById("bankroll-amount");
const currentWagerDisplay = document.getElementById("current-wager");
const deck = document.getElementById("deck");
// UI Functions
export function updateBankrollDisplay(bankroll) {
  bankrollDisplay.textContent = `$${bankroll}`;
}

export function buildDeck() {
  state.deck.map((card) => {
    const cardElement = createCard(card);

    document.getElementById("deck").appendChild(cardElement);
  });
}

export function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card-back");
  return cardElement;
}

export function updateWagerDisplay(wager) {
  currentWagerDisplay.textContent = `$${wager}`;
}

export function switchToGameboardView() {
  wagerView.classList.remove("active");
  wagerView.classList.add("hidden");
  gameboardView.classList.remove("hidden");
  gameboardView.classList.add("active");
}

// map over the deck object and create a deck of cards out of card elements
