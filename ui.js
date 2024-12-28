import { state } from "./state.js";

// Select DOM elements
const wagerView = document.getElementById("wager-view");
const gameboardView = document.getElementById("gameboard-view");
const bankrollDisplay = document.getElementById("bankroll-amount");
const currentWagerDisplay = document.getElementById("current-wager");
const deck = document.getElementById("deck");
// UI Functions
export function updateBankrollDisplay() {
  const { bankroll } = state.getState();
  bankrollDisplay.textContent = `$${bankroll}`;
}

export function createCard(card) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card", "card-back");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card", "card-front");

  const cardValue = document.createElement("div");
  cardValue.classList.add("card-value");
  cardValue.textContent = card.value;

  const cardSuit = document.createElement("div");
  cardSuit.classList.add("card-suit");
  cardSuit.textContent = card.suit;

  // Set the color based on the card suit
  const cardColor = getCardColor(card.suit);
  cardValue.style.color = cardColor;
  cardSuit.style.color = cardColor;

  cardFront.appendChild(cardValue);
  cardFront.appendChild(cardSuit);

  cardContainer.appendChild(cardBack);
  cardContainer.appendChild(cardFront);

  cardContainer.addEventListener("click", () => {
    cardContainer.classList.toggle("flipped");
  });

  return cardContainer;
}

function getCardColor(suit) {
  if (suit === "♥" || suit === "♦") {
    return "red";
  } else {
    return "black";
  }
}

export function updateWagerDisplay() {
  const { currentWager } = state.getState();
  currentWagerDisplay.textContent = `$${currentWager}`;
}

export function switchToGameboardView() {
  wagerView.classList.remove("active");
  wagerView.classList.add("hidden");
  gameboardView.classList.remove("hidden");
  gameboardView.classList.add("active");
}

export function renderHand(handKey) {
  const { [handKey]: handState } = state.getState(); // Destructure the specific hand's state
  console.log(handKey);

  const handId = handKey === "userHandOne" ? "user-cards" : "dealer-cards";
  const handElement = document.getElementById(handId);
  handElement.innerHTML = ""; // Clear the current hand

  handState.cards.forEach((card) => {
    const cardElement = createCard(card);
    handElement.appendChild(cardElement);
  });
}

export function renderDeck() {
  const { deck } = state.getState(); // Destructure the deck

  const deckElement = document.getElementById("deck");
  deckElement.innerHTML = ""; // Clear the current deck

  deck.forEach((card) => {
    const cardElement = createCard(card);
    deckElement.appendChild(cardElement);
  });
}

// map over the deck object and create a deck of cards out of card elements
