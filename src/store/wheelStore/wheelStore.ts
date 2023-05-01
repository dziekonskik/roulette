import { makeAutoObservable } from "mobx";
import { RootStore } from "../rootStore";
import { WheelState } from "./types";

export class WheelStore {
  public rootStore;
  private wheelState: WheelState = "idle";

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public spinTheWheel = () => {
    this.wheelState = "spinning";
  };

  public resetWheelState = () => {
    this.wheelState = "idle";
  };

  get wheelStatus() {
    return this.wheelState;
  }
}
