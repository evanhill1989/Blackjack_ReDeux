import { state } from "./state.js";
import {
  animateDealCard,
  showOverlay,
  clearCardDisplay,
  updateBankrollDisplay,
  updateWagerDisplay,
} from "./ui.js";

// Begin Hand Logic
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

export function getTopCard(staticTestCard) {
  if (staticTestCard) {
    return staticTestCard;
  }
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

export function addCardToHand(topCard, hand) {
  const { userHandOne, userHandTwo, dealerHand, focus, nonFocus } =
    state.getState();

  // console.log(hand, "hand inside addCardToHand");
  // console.log(focus, "focus inside addCardToHand");
  // console.log(dealerHand, "dealerHand inside addCardToHand");
  // console.log(userHandOne, "userHandOne inside addCardToHand");
  // console.log(userHandTwo, "userHandTwo inside addCardToHand");

  // do i want to make this be reusable for my split and double scenarios? Probably
  // so i need to check if focus is userHandOne or userHandTwo
  // Essentially I need to convert hand to a key

  let handKey = hand === "focusHand" ? focus : "dealerHand";

  let updatedHand;
  if (handKey === "userHandOne") {
    updatedHand = {
      ...userHandOne,
      cards: [...userHandOne.cards, topCard],
    };
  } else if (handKey === "userHandTwo") {
    updatedHand = {
      ...userHandTwo,
      cards: [...userHandTwo.cards, topCard],
    };
  } else if (handKey === "dealerHand") {
    updatedHand = {
      ...dealerHand,
      cards: [...dealerHand.cards, topCard],
    };
  } else {
    console.error("Invalid hand key");
    return;
  }

  state.setState({ [handKey]: updatedHand });
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

// End game logic
export function dealerAction() {
  while (state.getState().dealerHand.score < 17) {
    let staticTestCard = { suit: "♥", value: "J" };
    const topCard = getTopCard(staticTestCard);
    dealDealerCard(topCard);

    // Ensure the state is updated with the new score after the card is dealt
    const { dealerHand } = state.getState();
    console.log(`Dealer's new score: ${dealerHand.score}`);
  }
}

function dealDealerCard(topCard) {
  addCardToHand(topCard, "dealerHand");
  updateHandScores();
  animateDealCard(topCard, "dealerHand");
}

export function handleBust(hand) {
  let didBust = checkBust();
  console.log(didBust);
  if (didBust) {
    showOverlay(didBust, 1500);
    // end the game
    // compare scores
    // update bankroll
    // reset game state
  }
  // am i setting a state or passing a parameter?
}

function checkBust() {
  const { dealerHand } = state.getState();
  const focusHand = state.focusHand;
  const focus = state.getState().focus;

  if (dealerHand.score > 21) {
    state.setState({ dealerHand: { outcome: "Bust" } });
    return "Dealer Busts";
  } else if (focusHand.score > 21) {
    // set outcome state using focus as key
    state.setState({ [focus]: { outcome: "Bust" } });
    return "You Bust";
  } else {
    return "ooopsy";
  }
}

export function showdown() {
  if (state.getState().dealerHand.outcome === "Bust") {
    console.log("Dealer Busts");
  } else if (state.getState().focusHand.outcome === "Bust") {
    console.log("You Bust");
  } else {
    compareScores();
  }
}

function compareScores() {
  const stateData = state.getState();
  const focusHandKey = stateData.focus; // "userHandOne" or "userHandTwo"
  const focusScore = state.focusHand.score;
  const dealerScore = stateData.dealerHand.score;

  let outcome;

  if (dealerScore > 21 || focusScore > dealerScore) {
    outcome = "win";
  } else if (focusScore < dealerScore) {
    outcome = "lose";
  } else {
    outcome = "push";

    state.setState({
      [focusHandKey]: {
        ...stateData[focusHandKey],
        outcome,
      },
    });

    console.log(`${focusHandKey} outcome:`, outcome);
  }
}

export function handlePayouts() {
  const stateData = state.getState();
  if (stateData.userHandOne.outcome === "win") {
    state.setState({ bankroll: bankroll + wager * 2 });
  } else if (stateData.userHandOne.outcome === "push") {
    state.setState({ bankroll: bankroll + wager });
  }

  if (stateData.userHandTwo.outcome === "win") {
    state.setState({ bankroll: bankroll + wager * 2 });
  } else if (stateData.userHandTwo.outcome === "push") {
    state.setState({ bankroll: bankroll + wager });
  }
}

// Split Logic

export function toggleFocusHand() {
  const { focus, nonFocus } = state.getState();
  state.setState({ focus: nonFocus, nonFocus: focus });
}
