import { BettingStore } from "./bettingStore/bettingStore";
import { GameStore } from "./gameStore/gameStore";
import { GameTableStore } from "./tableStore/tableStore";
import { WheelStore } from "./wheelStore/wheelStore";

export class RootStore {
  public gameStore;
  public tableStore;
  public bettingStore;
  public wheelStore;

  constructor() {
    this.tableStore = new GameTableStore(this);
    this.gameStore = new GameStore(this);
    this.bettingStore = new BettingStore(this);
    this.wheelStore = new WheelStore(this);
  }
}

export const rootStore = new RootStore();
