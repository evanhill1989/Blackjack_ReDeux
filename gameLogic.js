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

export function updateHandScores() {
  const { userHandOne, userHandTwo, dealerHand } = state.getState();

  const updatedUserHandOne = {
    ...userHandOne,
    score: computeHandScore(userHandOne.cards),
  };
  const updatedUserHandTwo = {
    ...userHandTwo,
    score: computeHandScore(userHandTwo.cards),
  };
  const updatedDealerHand = {
    ...dealerHand,
    score: computeHandScore(dealerHand.cards),
  };

  state.setState({
    updatedUserHandOne,
    updatedUserHandTwo,
    updatedDealerHand,
  });
}

export function computeHandScore(cards) {
  let score = 0;
  let aceCount = 0;

  cards.forEach((card) => {
    if (card.value === "A") {
      aceCount++;
      score += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      score += 10;
    } else {
      score += Number(card.value);
    }
  });

  // Adjust for aces
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
}
