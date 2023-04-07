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
  bet: Bet | null;
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
  gameState: GameState;
  placeBet: (bet: Bet) => void;
  spinRoulette: () => void;
  resetGame: () => void;
  calculateWinnings: () => void;
}
