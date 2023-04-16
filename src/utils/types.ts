export type TableCellColor = "red" | "black";
export type TableCell = {
  id: number;
  value: number;
  color: TableCellColor;
};

export type Predicate = (cell: TableCell) => boolean;
