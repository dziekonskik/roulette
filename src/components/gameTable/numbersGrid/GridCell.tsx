import { tableCells } from "../../../utils/tableConfig";
import styles from "./numbersGrid.module.scss";

interface GridCellProps {
  index: number;
}

export const GridCell: React.FC<GridCellProps> = ({ index }) => {
  const currenCell = tableCells[index];

  return (
    <div className={styles.cell}>
      <span style={{ backgroundColor: currenCell.color }}>
        {currenCell.value}
      </span>
    </div>
  );
};
