import type { TableCell } from "../../../utils/tableConfig";
import styles from "./numbersGrid.module.scss";

interface GridCellProps {
  cellData: TableCell;
}

export const GridCell: React.FC<GridCellProps> = ({ cellData }) => {
  const { color, value } = cellData;
  return (
    <div className={styles.cell}>
      <span style={{ backgroundColor: color }}>{value}</span>
    </div>
  );
};
