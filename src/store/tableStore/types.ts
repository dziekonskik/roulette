import type { TokenValue } from "../../components/gameToken/types";
import type { BetType } from "../gameStore/types";

export interface BetToken {
  id: number;
  stakedFields: number | number[];
  tokenValue: TokenValue;
}
export interface CashInBets {
  name: BetType;
  multiplier: number;
  betTokens: BetToken[];
}

export interface CellPosition {
  cellBox: DOMRect;
  value: number;
}
