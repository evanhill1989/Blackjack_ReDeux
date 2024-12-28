import { state } from "./state.js";

import {
  updateBankrollDisplay,
  updateWagerDisplay,
  renderDeck,
  renderHand,
} from "./ui.js";

export function initializeSubscriptions() {
  state.subscribe(updateBankrollDisplay);
  state.subscribe(updateWagerDisplay);
  state.subscribe(renderDeck);
  state.subscribe(() => renderHand("dealerHand"));
  state.subscribe(() => renderHand("userHandOne"));
}
