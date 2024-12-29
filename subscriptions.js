import { state } from "./state.js";

import {
  updateBankrollDisplay,
  updateWagerDisplay,
  updateScoresDisplay,
  renderDeck,
  renderHand,
} from "./ui.js";

import {} from "./gameLogic.js";

export function initializeSubscriptions() {
  state.subscribe(updateScoresDisplay);
  state.subscribe(updateBankrollDisplay);
  state.subscribe(updateWagerDisplay);
  state.subscribe(renderDeck);
  state.subscribe(() => renderHand("dealerHand"));
  state.subscribe(() => renderHand("userHandOne"));
}
