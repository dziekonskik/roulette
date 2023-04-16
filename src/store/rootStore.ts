import { GameStore } from "./gameStore/gameStore";
import { GameTableStore } from "./tableStore/tableStore";

export class RootStore {
  public gameStore;
  public tableStore;

  constructor() {
    this.tableStore = new GameTableStore(this);
    this.gameStore = new GameStore(this);
  }
}

export const rootStore = new RootStore();
