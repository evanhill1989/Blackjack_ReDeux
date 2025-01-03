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

export function toggleView() {
  if (wagerView.classList.contains("hidden")) {
    wagerView.classList.remove("hidden");
    wagerView.classList.add("active");
    gameboardView.classList.remove("active");
    gameboardView.classList.add("hidden");
  } else {
    wagerView.classList.remove("active");
    wagerView.classList.add("hidden");
    gameboardView.classList.remove("hidden");
    gameboardView.classList.add("active");
  }
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

  const topCardElement = deckElement.lastElementChild;
  topCardElement.classList.toggle("flipped");

  // Get the position of the deck and the target hand
  const deckRect = deckElement.getBoundingClientRect();
  const targetRect = targetHandElement.getBoundingClientRect();

  // Clone the top card for animation purposes
  const animatedCard = topCardElement.cloneNode(true);
  document.body.appendChild(animatedCard);

  // Set the cloned card's initial position to match the top card
  gsap.set(animatedCard, {
    position: "absolute",
    top: deckRect.top + "px",
    left: deckRect.left + "px",
    width: topCardElement.offsetWidth + "px",
    height: topCardElement.offsetHeight + "px",
    zIndex: 1000,
  });

  // Animate the card moving to the target hand
  gsap.to(animatedCard, {
    duration: 0.5,
    top: targetRect.top + "px",
    left: targetRect.left + "px",
    onComplete: () => {
      // Remove the animated card and append the actual card to the hand
      animatedCard.remove();
      targetHandElement.appendChild(topCardElement);
      //Remove the topCardElement from the deckElement
    },
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
