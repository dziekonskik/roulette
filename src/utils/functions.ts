import { TABLE_CELLS } from "./tableConfig";
import type { TableCellColor } from "./types";

export function getCellNumbersByColor(color: TableCellColor) {
  return TABLE_CELLS.reduce((total, current) => {
    if (current.color === color) {
      total.push(current.value);
    }
    return total;
  }, [] as number[]);
}
