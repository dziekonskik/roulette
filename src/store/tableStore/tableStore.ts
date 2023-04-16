import { makeAutoObservable } from "mobx";
import type { TokenValue } from "../../components/gameToken/types";
import { RootStore } from "../rootStore";
import type { CellPosition } from "./types";

export class GameTableStore {
  public rootStore;
  public selectedTokenValue: TokenValue = 10;
  public cellsPositions: CellPosition[] = [];
  public highlightedCells: number[] = [];

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setSelectedToken = (value: TokenValue) => {
    this.selectedTokenValue = value;
  };

  setCellsPosition = (positionObject: CellPosition) => {
    this.cellsPositions.push(positionObject);
  };

  public highlightCells = (newCells: number[]) => {
    this.highlightedCells = newCells;
  };
  public unhighlightCells = () => {
    this.highlightedCells = [];
  };
}
