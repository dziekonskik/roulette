type TableCell = {
  id: number;
  value: number;
  color: "red" | "black";
  row: 1 | 2 | 3;
};

export const tableCells: TableCell[] = [
  { id: 1, value: 3, color: "red", row: 1 },
  { id: 2, value: 6, color: "black", row: 1 },
  { id: 3, value: 9, color: "red", row: 1 },
  { id: 4, value: 12, color: "red", row: 1 },
  { id: 5, value: 2, color: "black", row: 2 },
  { id: 6, value: 5, color: "red", row: 2 },
  { id: 7, value: 8, color: "black", row: 2 },
  { id: 8, value: 11, color: "black", row: 2 },
  { id: 9, value: 1, color: "red", row: 3 },
  { id: 10, value: 4, color: "black", row: 3 },
  { id: 11, value: 7, color: "red", row: 3 },
  { id: 12, value: 10, color: "black", row: 3 },
  { id: 13, value: 15, color: "black", row: 1 },
  { id: 14, value: 18, color: "red", row: 1 },
  { id: 15, value: 21, color: "red", row: 1 },
  { id: 16, value: 24, color: "black", row: 1 },
  { id: 17, value: 14, color: "red", row: 2 },
  { id: 18, value: 17, color: "black", row: 2 },
  { id: 19, value: 20, color: "black", row: 2 },
  { id: 20, value: 23, color: "red", row: 2 },
  { id: 21, value: 13, color: "black", row: 3 },
  { id: 22, value: 16, color: "red", row: 3 },
  { id: 23, value: 19, color: "red", row: 3 },
  { id: 24, value: 22, color: "black", row: 3 },
  { id: 25, value: 27, color: "red", row: 1 },
  { id: 26, value: 30, color: "red", row: 1 },
  { id: 27, value: 33, color: "black", row: 1 },
  { id: 28, value: 36, color: "red", row: 1 },
  { id: 29, value: 26, color: "black", row: 2 },
  { id: 30, value: 29, color: "black", row: 2 },
  { id: 31, value: 32, color: "red", row: 2 },
  { id: 32, value: 35, color: "black", row: 2 },
  { id: 33, value: 25, color: "red", row: 3 },
  { id: 34, value: 28, color: "black", row: 3 },
  { id: 35, value: 31, color: "black", row: 3 },
  { id: 36, value: 34, color: "red", row: 3 },
];
