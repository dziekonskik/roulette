export type BetType =
  | "straight up"
  | "split"
  | "street"
  | "corner"
  | "line"
  | "dozen"
  | "column"
  | "even/odd"
  | "red/black"
  | "low/high";

export type Bet = {
  type: BetType;
  value: number; // token value
};

export type Player = {
  name: string;
  balance: number;
  bet: number;
  win: number;
};

export type Game = {
  result: number | null;
  state: "idle" | "spinning";
};

export type GameState = {
  player: Player;
  roulette: Game;
};

export interface RouletteStoreInterface {
  spinRoulette: () => void;
  resetGame: () => void;
  calculateWinnings: () => void;
}
