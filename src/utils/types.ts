export type TableCellColor = "red" | "black";
export type TableCell = {
  id: number;
  value: number;
  color: TableCellColor;
};
export type NumberPredicate = (numbers: number[]) => boolean;
export type HoverPredicate = (cell: TableCell) => boolean;
export type BetPredicate = (value: number) => NumberPredicate;
