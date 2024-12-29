import { state } from "./state.js";

import {
  updateBankrollDisplay,
  updateWagerDisplay,
  updateScoresDisplay,
  renderDeck,
} from "./ui.js";

import {} from "./gameLogic.js";

export function initializeSubscriptions() {
  state.subscribe(updateScoresDisplay);
  state.subscribe(updateBankrollDisplay);
  state.subscribe(updateWagerDisplay);
  state.subscribe(renderDeck);
}
