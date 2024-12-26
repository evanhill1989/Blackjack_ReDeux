// A function to choose a random card from the deck
import { state } from "./state.js";

export function getRandomCard() {
  const suits = ["♥", "♦", "♣", "♠"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
}

// shuffle the deck
export function shuffleDeck() {
  state.deck.sort(() => Math.random() - 0.5);
}

// Use getRandomCard within a function that deals a card to the userHand.cards array

export function dealCard(hand) {
  const card = getRandomCard();
  // Push cards to the appropriate hand within the state object using computed property of hand argument(userHandOne, userHandTwo, dealerHand)

  // hand.cards.push(card); doesn't work
  console.log(state[hand].cards);
  state[hand].cards.push(card);

  // Remove the card from the deck
  state.deck = state.deck.filter(
    (c) => c.suit !== card.suit && c.value !== card.value
  );
}

// function that deals the intial two cards to userHand and two cards to the dealerHand
export function dealInitialCards() {
  for (let i = 0; i < 2; i++) {
    dealCard("userHandOne");
  }

  for (let i = 0; i < 2; i++) {
    dealCard("dealerHand");
  }
}
