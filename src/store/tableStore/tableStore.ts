import { makeAutoObservable } from "mobx";
import type { TokenValue } from "../../components/gameToken/types";
import type { CashInBets } from "./types";

class GameTableStore {
  public selectedTokenValue: TokenValue = 1;
  public highlightedCells: number[] = [];
  public bets: CashInBets[] = [
    { name: "split", multiplier: 17, numbers: [] },
    { name: "column", multiplier: 2, numbers: [] },
    { name: "corner", multiplier: 8, numbers: [] },
    { name: "dozen", multiplier: 2, numbers: [] },
    { name: "even/odd", multiplier: 1, numbers: [] },
    { name: "line", multiplier: 5, numbers: [] },
    { name: "low/high", multiplier: 1, numbers: [] },
    { name: "red/black", multiplier: 1, numbers: [] },
    { name: "straight up", multiplier: 35, numbers: [] },
    { name: "street", multiplier: 11, numbers: [] },
  ];

  public constructor() {
    makeAutoObservable(this);
  }

  public setSelectedToken = (value: TokenValue) => {
    this.selectedTokenValue = value;
  };

  public highlightCells = (newCells: number[]) => {
    this.highlightedCells = newCells;
  };
  public unhighlightCells = () => {
    this.highlightedCells = [];
  };
}

export const tableStore = new GameTableStore();
