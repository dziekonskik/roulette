import { TABLE_CELLS } from "./tableConfig";
import type { Predicate } from "./types";

export const highlightBy = (fn: Predicate) => {
  const filteredCells = TABLE_CELLS.filter(fn);
  return filteredCells.map((cell) => cell.value);
};
