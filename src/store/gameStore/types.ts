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

export type WheelState = "idle" | "spinning" | "stopped";

export type Player = {
  balance: number;
  win: number;
};

export type GameState = {
  result: number | null;
  state: WheelState;
};

export type GameDetials = {
  player: Player;
  roulette: GameState;
};

export interface RouletteStoreInterface {
  spinRoulette: () => void;
  calculateWinnings: () => void;
}
