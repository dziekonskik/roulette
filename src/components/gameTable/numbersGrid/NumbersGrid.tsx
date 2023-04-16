import { observer } from "mobx-react-lite";
import { useCallback, useMemo } from "react";
import { useStore } from "../../../store/rootStoreProvider";
import { TABLE_CELLS } from "../../../utils/tableConfig";
import { GridCell } from "./GridCell";
import styles from "./numbersGrid.module.scss";
import type { ClickHandler } from "./types";

interface NumbersGridProps {
  startIndex: number;
}

export const NumbersGrid: React.FC<NumbersGridProps> = observer(
  ({ startIndex }) => {
    const {
      tableStore: { highlightedCells, bets },
    } = useStore();

    const placedBets = useMemo(() => {
      const allBets: number[] = [];

      return allBets;
    }, [bets]);

    const handlePlaceBet = useCallback((event: ClickHandler) => {}, []);
    return (
      <div className={styles.container} onClick={handlePlaceBet}>
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
