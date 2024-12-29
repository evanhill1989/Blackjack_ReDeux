import { state } from "./state.js";

// Select DOM elements
const wagerView = document.getElementById("wager-view");
const gameboardView = document.getElementById("gameboard-view");
const bankrollDisplay = document.getElementById("bankroll-amount");
const currentWagerDisplay = document.getElementById("current-wager");
const deckElement = document.getElementById("deck");
const dealerHand = document.getElementById("dealer-hand");
const focusHand = document.getElementById("focus-hand");
const nonFocusHand = document.getElementById("non-focus-hand");
const dealerHandScore = document.getElementById("dealer-hand-score");
const focusHandScore = document.getElementById("focus-hand-score");
const nonFocusHandScore = document.getElementById("non-focus-hand-score");

// Display Functions
export function updateBankrollDisplay() {
  const { bankroll } = state.getState();
  bankrollDisplay.textContent = `$${bankroll}`;
}

export function updateWagerDisplay() {
  const { currentWager } = state.getState();
  currentWagerDisplay.textContent = `$${currentWager}`;
}

export function updateScoresDisplay() {
  const { dealerHand } = state.getState();
  dealerHandScore.textContent = `Dealer: ${dealerHand.score}`;
  focusHandScore.textContent = `Focus: ${state.focusHand.score}`;
  nonFocusHandScore.textContent = `Non-Focus: ${state.nonFocusHand.score}`;
}

// Game Element Rendering Functions
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

export function switchToGameboardView() {
  wagerView.classList.remove("active");
  wagerView.classList.add("hidden");
  gameboardView.classList.remove("hidden");
  gameboardView.classList.add("active");
}

export function animateDealCard(targetHandKey) {
  // Select the deck and target hand elements
  let targetHandId;
  if (targetHandKey === "dealerHand") {
    targetHandId = "dealer-hand";
  } else if (targetHandKey === "focusHand") {
    targetHandId = "focus-hand";
  } else if (targetHandKey === "nonFocusHand") {
    targetHandId = "non-focus-hand";
  }

  const targetHandElement = document.getElementById(targetHandId);

  // Ensure there is at least one card in the deck
  if (deckElement.children.length === 0) {
    console.error("The deck is empty, no card to deal!");
    return;
  }

  // Get the top card from the deck
  const topCardElement = deckElement.lastElementChild;

  // Move the card to the target hand
  targetHandElement.appendChild(topCardElement);

  // Optionally, add a simple animation for visual effect
  topCardElement.style.transition = "transform 3s ease-in-out";
  topCardElement.style.transform = "translate(0, 0)"; // Reset any transformations
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
