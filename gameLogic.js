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
export async function dealerAction() {
  while (state.getState().dealerHand.score < 17) {
    let staticTestCard = { suit: "♥", value: "J" };
    const topCard = getTopCard(staticTestCard);

    await dealDealerCard(topCard); // Wait for the card animation to complete

    const { dealerHand } = state.getState();
  }
}

function dealDealerCard(topCard) {
  addCardToHand(topCard, "dealerHand");
  updateHandScores();
  return animateDealCard(topCard, "dealerHand"); // Return the promise
}

export function handleBust(hand) {
  return new Promise((resolve) => {
    let didBust = checkBust();

    if (didBust) {
      showOverlay(didBust, 1500);

      // end the game
      // compare scores
      // update bankroll
      // reset game state
    }
    resolve();
  });
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
    return false;
  }
}

export function showdown() {
  return new Promise((resolve) => {
    compareScores();

    resolve();
  });
}

function compareScores() {
  const stateData = state.getState();
  const focusHandKey = stateData.focus; // "userHandOne" or "userHandTwo"
  const focusScore = state.focusHand.score;
  const dealerScore = stateData.dealerHand.score;

  console.log(stateData.dealerHand, "dealerHand obj in compareScores");
  let outcome;

  if (dealerScore > 21 || focusScore > dealerScore) {
    outcome = "win";
    console.log("win from compareScores");
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
  return new Promise((resolve, reject) => {
    const stateData = state.getState();
    const bankroll = stateData.bankroll;
    const wager = stateData.currentWager;
    const handOneOutcome = stateData.userHandOne.outcome;
    const handTwoOutcome = stateData.userHandTwo.outcome;

    console.log(wager, "wager inside handlePayouts");

    if (handOneOutcome === "win") {
      state.setState({ bankroll: bankroll + wager * 2 });
    } else if (handOneOutcome === "push") {
      state.setState({ bankroll: bankroll + wager });
    }

    if (handTwoOutcome === "win") {
      state.setState({ bankroll: bankroll + wager * 2 });
    } else if (handTwoOutcome === "push") {
      state.setState({ bankroll: bankroll + wager });
    }
    resolve();
  });
}

// Split Logic

export function toggleFocusHand() {
  const { focus, nonFocus } = state.getState();
  state.setState({ focus: nonFocus, nonFocus: focus });
}
