export type BetType =
  | "straight up"
  | "split"
  | "street"
  | "corner"
  | "six-line"
  | "dozen"
  | "column"
  | "even/odd"
  | "red/black"
  | "low/high";

export type Player = {
  balance: number;
  win: number;
};

export type GameState = {
  result: number | null;
};

export type GameDetials = {
  player: Player;
  roulette: GameState;
};

export interface RouletteStoreInterface {
  calculateWinnings: () => void;
}
