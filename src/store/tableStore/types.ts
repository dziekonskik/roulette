import type { BetType } from "../types";

export interface CashInBets {
  name: BetType;
  multiplier: number;
  numbers: { number: number | null; cash: number }[];
}
