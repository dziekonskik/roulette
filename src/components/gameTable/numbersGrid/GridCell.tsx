import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useGameTable } from "../../../store/tableStore/tableStoreProvider";
import {
  handleHoverLeft,
  handleHoverOnBottom,
  handleHoverOnTop,
  handleHoverRight,
} from "../../../utils/highlightFunctions";
import type { TableCell } from "../../../utils/types";
import styles from "./numbersGrid.module.scss";

interface GridCellProps {
  cellData: TableCell;
  isHighlighted: boolean;
}
type MouseHandler = React.MouseEvent<HTMLDivElement, MouseEvent>;
type CellDimensions = {
  width: number | undefined;
  height: number | undefined;
};

const BET_ACTIVATION_THRESHOLD = 20;

export const GridCell: React.FC<GridCellProps> = memo(
  ({ cellData, isHighlighted }) => {
    const [{ width, height }, setDimensions] = useState<CellDimensions>({
      width: undefined,
      height: undefined,
    });
    const cellRef = useRef<HTMLDivElement | null>(null);
    const { highlightCells, unhighlightCells } = useGameTable();
    const { color, value } = cellData;

    useEffect(() => {
      const width = cellRef.current?.clientWidth;
      const height = cellRef.current?.clientHeight;
      setDimensions({ width, height });
    }, [cellRef]);

    const handleMouseMove = useCallback(
      (event: MouseHandler) => {
        const {
          nativeEvent: { offsetX, offsetY },
        } = event;
        if (!width || !height) return;
        const hoverOnTop = offsetY < BET_ACTIVATION_THRESHOLD;
        const hoverOnBottom = height - offsetY < BET_ACTIVATION_THRESHOLD;
        const hoverOnLeft = offsetX < BET_ACTIVATION_THRESHOLD;
        const hoverOnRight = width - offsetX < BET_ACTIVATION_THRESHOLD;

        if (event.target !== event.currentTarget) {
          unhighlightCells();
          return;
        }

        if (!hoverOnBottom || !hoverOnTop || !hoverOnLeft || !hoverOnRight) {
          unhighlightCells();
        }

        if (hoverOnTop) {
          handleHoverOnTop(value, hoverOnLeft, hoverOnRight)(highlightCells);
        }
        if (hoverOnBottom) {
          handleHoverOnBottom(value, hoverOnLeft, hoverOnRight)(highlightCells);
        }
        if (!hoverOnTop && !hoverOnBottom && hoverOnLeft) {
          handleHoverLeft(value, highlightCells);
        }
        if (!hoverOnTop && !hoverOnBottom && hoverOnRight) {
          handleHoverRight(value, highlightCells);
        }
      },
      [height, width, highlightCells, value, unhighlightCells]
    );
    return (
      <div
        ref={cellRef}
        className={styles.cell}
        style={{
          backgroundColor: isHighlighted ? "var(--color-highlight)" : "",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={unhighlightCells}
      >
        <span style={{ backgroundColor: color }}>{value}</span>
      </div>
    );
  }
);
