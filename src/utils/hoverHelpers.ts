import { TABLE_CELLS } from "./tableConfig";
import type { Predicate } from "./types";

export const highlightBy = (fn: Predicate) => {
  const filteredCells = TABLE_CELLS.filter(fn);
  return filteredCells.map((cell) => cell.value);
};

// row 1
export const highlightColumn = (value: number) =>
  highlightBy((c) =>
    Boolean(c.value === value || c.value === value - 1 || c.value === value - 2)
  );
export const highlightColumnAndZero = [...highlightColumn(3), 0];
export const highlightCurrentAndPreviousColumn = (value: number) => [
  ...highlightColumn(value),
  ...highlightColumn(value - 3),
];
export const highlightCurrentAndNextColumn = (value: number) => [
  ...highlightColumn(value),
  ...highlightColumn(value + 3),
];
//row 2 and 3

export const highlightAdjecentTwo = (value: number) =>
  highlightBy((c) => c.value === value || c.value === value + 1);
export const highlightAdjecentTwoAndZero = (value: number) => [
  ...highlightAdjecentTwo(value),
  0,
];
export const highlightAdjecentMinusTwo = (value: number) =>
  highlightBy((c) => c.value === value || c.value === value - 1);
export const highlightAdjecentMinusTwoAndZero = (value: number) => [
  ...highlightAdjecentMinusTwo(value),
  0,
];

export const highlightAdjecentFourTop = (value: number) =>
  highlightBy(
    (c) =>
      c.value === value ||
      c.value === value + 1 ||
      c.value === value + 3 ||
      c.value === value + 4
  );
export const highlightPreviousFourTop = (value: number) =>
  highlightBy(
    (c) =>
      c.value === value ||
      c.value === value + 1 ||
      c.value === value - 2 ||
      c.value === value - 3
  );
export const highlightAdjecentFourBottom = (value: number) =>
  highlightBy(
    (c) =>
      c.value === value ||
      c.value === value - 1 ||
      c.value === value + 2 ||
      c.value === value + 3
  );
export const highlightPreviousFourBottom = (value: number) =>
  highlightBy(
    (c) =>
      c.value === value ||
      c.value === value - 1 ||
      c.value === value - 3 ||
      c.value === value - 4
  );
