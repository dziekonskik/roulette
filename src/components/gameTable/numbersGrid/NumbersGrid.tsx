import { observer } from "mobx-react-lite";
import { useGameTable } from "../../../store/tableStore/tableStoreProvider";
import { TABLE_CELLS } from "../../../utils/tableConfig";
import { GridCell } from "./GridCell";
import styles from "./numbersGrid.module.scss";

interface NumbersGridProps {
  startIndex: number;
}

export const NumbersGrid: React.FC<NumbersGridProps> = observer(
  ({ startIndex }) => {
    const { highlightedCells } = useGameTable();
    return (
      <div className={styles.container}>
        {Array.from({ length: 12 }, (_, i) => {
          const currentCell = TABLE_CELLS[startIndex + i];
          return (
            <GridCell
              key={currentCell.id}
              cellData={currentCell}
              isHighlighted={highlightedCells.includes(currentCell.value)}
            />
          );
        })}
      </div>
    );
  }
);
