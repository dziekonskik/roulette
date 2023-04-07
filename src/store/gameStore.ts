import { makeAutoObservable } from "mobx";

import type { Bet, GameState, RouletteStoreInterface } from "./types";

class RouletteStore implements RouletteStoreInterface {
  public gameState: GameState;

  constructor() {
    this.gameState = this.initialize();
    makeAutoObservable(this);
  }

  private initialize = (): GameState => {
    return {
      player: { name: "", balance: 1000, bet: null },
      roulette: { result: null, state: "idle" },
    };
  };

  public placeBet = (bet: Bet) => {
    this.gameState.player.bet = bet;
    this.gameState.player.balance -= this.totalBetValue;
  };

  public spinRoulette = () => {
    // some logic
  };

  resetGame = () => {
    this.gameState = this.initialize();
  };

  get totalBetValue() {
    // some logic
    return 0;
  }

  calculateWinnings = () => {
    // should this be a reaction?
  };
}

export const rouletteStore = new RouletteStore();
