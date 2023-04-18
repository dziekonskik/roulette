import { TABLE_CELLS } from "./tableConfig";
import type { BetPredicate, NumberPredicate, TableCellColor } from "./types";

function getCellNumbersByColor(color: TableCellColor) {
  return TABLE_CELLS.reduce((total, current) => {
    if (current.color === color) {
      total.push(current.value);
    }
    return total;
  }, [] as number[]);
}

export const verticalSplit: BetPredicate = (value) => (numbers) =>
  numbers.every((n) => n === value || n === value + 1);
export const horizontalSplit: BetPredicate = (value) => (numbers) =>
  numbers.every((n) => n === value || n === value + 3);
export const splitWithZero: BetPredicate = (value) => (numbers) =>
  numbers.every((n) => n === value || n === 0);

export const regularStreet: BetPredicate = (value) => (numbers) =>
  numbers.every((n) => n === value || n === value - 1 || n === value - 2);
export const streetWithZero: BetPredicate = (value) => (numbers) =>
  numbers.every((n) => n === 0 || n === value || n === value - 1);

export const corner: BetPredicate = (value: number) => (numbers) =>
  numbers.every(
    (n) => n === value || n === value + 1 || n === value + 3 || n === value + 4
  );

export const sixLine: BetPredicate = (value) => (numbers) =>
  numbers.every(
    (n) =>
      n === value ||
      n === value - 1 ||
      n === value - 2 ||
      n === value + 3 ||
      n === value + 1 ||
      n === value + 2
  );

export const firstColumn: NumberPredicate = (numbers) =>
  numbers.every((n) => n % 3 === 0);
export const secondColumn: NumberPredicate = (numbers) =>
  numbers.every((n) => n % 3 === 2);
export const thirdColumn: NumberPredicate = (numbers) =>
  numbers.every((n) => n % 3 === 1);

export const lowBet: NumberPredicate = (numbers) =>
  numbers.every((n) => n <= 18);
export const highBet: NumberPredicate = (numbers) =>
  numbers.every((n) => n > 18);
export const evenBet: NumberPredicate = (numbers) =>
  numbers.every((n) => n % 2 === 0);
export const oddBet: NumberPredicate = (numbers) =>
  numbers.every((n) => n % 2 !== 0);
export const betOnRed: NumberPredicate = (numbers) =>
  numbers.every((n) => getCellNumbersByColor("red").includes(n));
export const betOnBlack: NumberPredicate = (numbers) =>
  numbers.every((n) => getCellNumbersByColor("black").includes(n));
