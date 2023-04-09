import { tableCells } from "../../../utils/tableConfig";
import { GridCell } from "./GridCell";
import styles from "./numbersGrid.module.scss";

interface NumbersGridProps {
  startIndex: number;
}

export const NumbersGrid: React.FC<NumbersGridProps> = ({ startIndex }) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 12 }, (_, i) => {
        const currentCell = tableCells[startIndex + i];
        return <GridCell key={currentCell.id} cellData={currentCell} />;
      })}
    </div>
  );
};
