import { memo } from "react";
import type { TableCell } from "../../../utils/types";
import styles from "./numbersGrid.module.scss";

interface GridCellProps {
  cellData: TableCell;
  isHighlighted: boolean;
}

export const GridCell: React.FC<GridCellProps> = memo(
  ({ cellData, isHighlighted }) => {
    const { color, value } = cellData;
    return (
      <div
        className={styles.cell}
        style={{
          backgroundColor: isHighlighted ? "var(--color-highlight)" : "",
        }}
      >
        <span style={{ backgroundColor: color }}>{value}</span>
      </div>
    );
  }
);
