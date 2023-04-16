import { BettingStore } from "./bettingStore/bettingStore";
import { GameStore } from "./gameStore/gameStore";
import { GameTableStore } from "./tableStore/tableStore";

export class RootStore {
  public gameStore;
  public tableStore;
  public bettingStore;

  constructor() {
    this.tableStore = new GameTableStore(this);
    this.gameStore = new GameStore(this);
    this.bettingStore = new BettingStore(this);
  }
}

export const rootStore = new RootStore();
