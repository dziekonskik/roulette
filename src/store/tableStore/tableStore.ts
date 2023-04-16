import { makeAutoObservable } from "mobx";
import type { TokenValue } from "../../components/gameToken/types";
import { RootStore } from "../rootStore";
import type { CashInBets, CellPosition } from "./types";

export class GameTableStore {
  public rootStore;
  public selectedTokenValue: TokenValue = 10;
  public cellsPositions: CellPosition[] = [];
  public highlightedCells: number[] = [];
  public bets: CashInBets[] = [
    { name: "split", multiplier: 17, betTokens: [] },
    { name: "column", multiplier: 2, betTokens: [] },
    { name: "corner", multiplier: 8, betTokens: [] },
    { name: "dozen", multiplier: 2, betTokens: [] },
    { name: "even/odd", multiplier: 1, betTokens: [] },
    { name: "line", multiplier: 5, betTokens: [] },
    { name: "low/high", multiplier: 1, betTokens: [] },
    { name: "red/black", multiplier: 1, betTokens: [] },
    { name: "straight up", multiplier: 35, betTokens: [] },
    { name: "street", multiplier: 11, betTokens: [] },
  ];

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public placeBet = (
    name: CashInBets["name"],
    betDetails: CashInBets["betTokens"][number]
  ) => {
    if (this.rootStore.gameStore.balance - betDetails.tokenValue < 0) return;
    this.bets = this.bets.map((bet) => {
      if (bet.name === name) {
        return {
          ...bet,
          betTokens: [...bet.betTokens, betDetails],
        };
      }
      return bet;
    });
  };

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
