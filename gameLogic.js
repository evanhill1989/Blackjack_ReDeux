import { state } from "./state.js";

export function shuffleDeck() {
  const { deck } = state.getState();

  if (!deck || deck.length === 0) {
    console.error("Deck is not defined or empty");
    return;
  }

  const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
  state.setState({ deck: shuffledDeck });
}

export function dealCard(handKey) {
  const { deck, [handKey]: handState } = state.getState();

  if (deck.length === 0) {
    console.error("No more cards in the deck");
    return null;
  }

  const dealtCard = deck.pop();
  handState.cards.push(dealtCard);
  state.setState({ deck, [handKey]: handState }); //

  return dealtCard;
}
