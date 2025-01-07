import { state } from "./state.js";

// Select DOM elements
const wagerView = document.getElementById("wager-view");
const gameboardView = document.getElementById("gameboard-view");
const bankrollDisplay = document.getElementById("bankroll-amount");
const gameboardBankrollDisplay = document.getElementById(
  "gameboard-bankroll-amount"
);
const currentWagerDisplay = document.getElementById("current-wager");
const deckElement = document.getElementById("deck");
const dealerCards = document.getElementById("dealer-cards");
const focusCards = document.getElementById("focus-cards");
const nonFocusCards = document.getElementById("non-focus-cards");
const dealerHandScore = document.getElementById("dealer-hand-score");
const focusHandScore = document.getElementById("focus-hand-score");
const nonFocusHandScore = document.getElementById("non-focus-hand-score");

// Display Functions
export function updateBankrollDisplay() {
  const { bankroll } = state.getState();

  bankrollDisplay.textContent = `$${bankroll}`;
  gameboardBankrollDisplay.textContent = `$${bankroll}`;
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

export function animateDealCard(topCard, targetHandKey) {
  return new Promise((resolve) => {
    let targetHandElement =
      targetHandKey === "focusHand" ? focusCards : dealerCards;

    const topCardElement = createCard(topCard);
    const clonedCardElement = topCardElement.cloneNode(true);

    clonedCardElement.classList.toggle("flipped");
    topCardElement.classList.toggle("flipped");

    const deckRect = deckElement.getBoundingClientRect();
    const targetRect = targetHandElement.getBoundingClientRect();
    const parentRect = deckElement.offsetParent.getBoundingClientRect();

    const targetTop = targetRect.top - parentRect.top;
    const targetLeft = targetRect.left - parentRect.left;
    const deckTop = deckRect.top - parentRect.top;
    const deckLeft = deckRect.left - parentRect.left;

    deckElement.appendChild(topCardElement);

    gsap.set(topCardElement, {
      position: "absolute",
      top: deckTop + "px",
      left: deckLeft + "px",
      width: topCardElement.offsetWidth + "px",
      height: topCardElement.offsetHeight + "px",
      zIndex: 1000,
    });

    gsap.to(topCardElement, {
      duration: 0.5,
      top: targetTop + "px",
      left: targetLeft + "px",
      onComplete: () => {
        deckElement.removeChild(topCardElement);
        targetHandElement.appendChild(clonedCardElement);
        resolve(); // Resolve the promise when animation is complete
      },
    });
  });
}

export function testElement() {
  const testElement = document.createElement("div");
  testElement.textContent = "Test";
  // height and width
  testElement.style.height = "100px";
  testElement.style.width = "100px";
  // background color
  testElement.style.backgroundColor = "red";
  focusCards.appendChild(testElement);
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

export function showOverlay(message, duration = 1000) {
  // Get the overlay element or create one if it doesn't exist
  let overlay = document.getElementById("game-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "game-overlay";
    overlay.classList.add("hidden");
    document.body.appendChild(overlay);
  }

  // Set the message text
  overlay.textContent = message;

  // Display the overlay
  overlay.classList.add("show");

  // Hide the overlay after the specified duration
  setTimeout(() => {
    overlay.classList.remove("show");
  }, duration);
}

// Split-Double UI

// End Game Funcs

export function clearCardDisplay() {
  dealerCards.innerHTML = "";
  focusCards.innerHTML = "";
  nonFocusCards.innerHTML = "";
}
