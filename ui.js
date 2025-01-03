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
  const cardColor = getCardColor(card.suit); // Determine color based on the suit

  // Create the card's HTML structure using a template literal
  const cardHTML = `
    <div class="card-container">
      <div class="card card-back"></div>
      <div class="card card-front">
        <p class="card-num-topleft" style="color: ${cardColor};">${card.value}</p>
        <p class="card-suit-topleft" style="color: ${cardColor};">${card.suit}</p>
        <p class="card-suit-middle" style="color: ${cardColor};">${card.suit}</p>
        <p class="card-suit-bottomright" style="color: ${cardColor};">${card.suit}</p>
        <p class="card-num-bottomright" style="color: ${cardColor};">${card.value}</p>
      </div>
    </div>
  `;

  // Convert the HTML string into a DOM element
  const cardContainer = document.createElement("div");
  cardContainer.innerHTML = cardHTML;
  const cardElement = cardContainer.firstElementChild;

  // Add the flipping functionality
  cardElement.addEventListener("click", () => {
    cardElement.classList.toggle("flipped");
  });

  return cardElement;
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
