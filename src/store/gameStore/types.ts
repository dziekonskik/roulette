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
  name: string;
  balance: number;
  win: number;
};

export type GameState = {
  result: number | null;
  state: "idle" | "spinning";
};

export type GameDetials = {
  player: Player;
  roulette: GameState;
};

export interface RouletteStoreInterface {
  spinRoulette: () => void;
  resetGame: () => void;
  calculateWinnings: () => void;
}
