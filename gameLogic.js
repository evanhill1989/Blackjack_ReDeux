import { state } from "./state.js";

export function shuffleDeck() {
  const { deck } = state.getState();

  if (!deck || deck.length === 0) {
    console.error("Deck is not defined or empty");
    return;
  }

  const shuffledDeck = deck;

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and randomIndex
    [shuffledDeck[i], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      deck[i],
    ];
  }

  state.setState({ deck: shuffledDeck });
}

export function getTopCard() {
  const { deck } = state.getState();

  if (!deck || deck.length === 0) {
    console.error("Deck is not defined or empty");
    return;
  }

  const topCard = deck[deck.length - 1];
  const updatedDeck = deck.slice(0, deck.length - 1);

  state.setState({ deck: updatedDeck });

  return topCard;
}

export function updateHandScores() {
  // TODO: why can't this be a subscription without too much recursion?

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
    userHandOne: updatedUserHandOne,
    userHandTwo: updatedUserHandTwo,
    dealerHand: updatedDealerHand,
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
