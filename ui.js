// Select DOM elements
const wagerView = document.getElementById("wager-view");
const gameboardView = document.getElementById("gameboard-view");
const bankrollDisplay = document.getElementById("bankroll-amount");
const currentWagerDisplay = document.getElementById("current-wager");

// UI Functions
export function updateBankrollDisplay(bankroll) {
  bankrollDisplay.textContent = `$${bankroll}`;
}

export function updateWagerDisplay(wager) {
  currentWagerDisplay.textContent = `$${wager}`;
}

export function switchToGameboardView() {
  wagerView.classList.remove("active");
  wagerView.classList.add("hidden");
  gameboardView.classList.remove("hidden");
  gameboardView.classList.add("active");
}
