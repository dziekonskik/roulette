import { makeAutoObservable } from "mobx";
import { RootStore } from "../rootStore";
import { CashInBets } from "./types";

export class BettingStore {
  public rootStore;
  private bets: CashInBets[] = [
    { name: "split", multiplier: 17, betTokens: [] },
    { name: "column", multiplier: 2, betTokens: [] },
    { name: "corner", multiplier: 8, betTokens: [] },
    { name: "dozen", multiplier: 2, betTokens: [] },
    { name: "even/odd", multiplier: 1, betTokens: [] },
    { name: "six-line", multiplier: 5, betTokens: [] },
    { name: "low/high", multiplier: 1, betTokens: [] },
    { name: "red/black", multiplier: 1, betTokens: [] },
    { name: "straight up", multiplier: 35, betTokens: [] },
    { name: "street", multiplier: 11, betTokens: [] },
  ];

  constructor(rootStore: RootStore) {
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

  get cashInBet() {
    return this.bets.reduce((total, current) => {
      current.betTokens.forEach((token) => {
        total += token.tokenValue;
      });
      return total;
    }, 0);
  }

  get betsDetails() {
    return this.bets;
  }
}
