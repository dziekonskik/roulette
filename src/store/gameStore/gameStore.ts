import { makeAutoObservable } from "mobx";
import { RootStore } from "../rootStore";

import type { GameDetials, RouletteStoreInterface } from "./types";

export class GameStore implements RouletteStoreInterface {
  public rootStore;
  private gameState: GameDetials;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    this.gameState = this.initialize();
  }

  private initialize = (): GameDetials => {
    return {
      player: { balance: 10000, win: 0 },
      roulette: { result: null, state: "idle" },
    };
  };

  public spinRoulette = () => {
    this.gameState.roulette.state = "spinning";
  };

  get balance() {
    return (
      this.gameState.player.balance - this.rootStore.bettingStore.cashInBet
    );
  }

  get lastWin() {
    return 0;
  }

  get wheelState() {
    return this.gameState.roulette.state;
  }

  calculateWinnings = () => {
    // should this be a reaction?
  };
}
