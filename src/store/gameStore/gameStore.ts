import { makeAutoObservable, reaction } from "mobx";
import { RootStore } from "../rootStore";

import { CashInBets } from "../tableStore/types";
import type { GameState, RouletteStoreInterface } from "./types";

export class GameStore implements RouletteStoreInterface {
  public rootStore;
  private gameState: GameState;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    this.gameState = this.initialize();
    reaction(
      () => rootStore.tableStore.bets,
      (bets) => {
        this.updateCashInBet(bets);
      }
    );
  }

  private initialize = (): GameState => {
    return {
      player: { name: "", balance: 10000, bet: 0, win: 0 },
      roulette: { result: null, state: "idle" },
    };
  };

  private updateCashInBet = (bets: CashInBets[]) => {
    this.gameState.player.bet = bets.reduce((total, current) => {
      current.betTokens.forEach((token) => {
        total += token.tokenValue;
      });
      return total;
    }, 0);
  };

  public spinRoulette = () => {
    // some logic
  };

  resetGame = () => {
    this.gameState = this.initialize();
  };

  get totalBetValue() {
    return this.gameState.player.bet;
  }

  get balance() {
    return this.gameState.player.balance - this.gameState.player.bet;
  }

  get lastWin() {
    return 0;
  }

  calculateWinnings = () => {
    // should this be a reaction?
  };
}
