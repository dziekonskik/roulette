export type TableCell = {
  id: number;
  value: number;
  color: "red" | "black";
};

export type Predicate = (cell: TableCell) => boolean;
