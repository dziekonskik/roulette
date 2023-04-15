import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGameTable } from "../../../store/tableStore/tableStoreProvider";
import {
  handleHoverLeft,
  handleHoverOnBottom,
  handleHoverOnTop,
  handleHoverRight,
} from "../../../utils/highlightFunctions";
import type { TableCell } from "../../../utils/types";
import { GridCellMiniTokenCanvas } from "./GridCellMiniTokenCanvas";
import styles from "./numbersGrid.module.scss";
import type { CellDimensions, MouseHandler } from "./types";

interface GridCellProps {
  cellData: TableCell;
  isHighlighted: boolean;
}

const BET_ACTIVATION_THRESHOLD = 20;

export const GridCell: React.FC<GridCellProps> = observer(
  ({ cellData, isHighlighted }) => {
    const [{ width, height }, setDimensions] = useState<CellDimensions>({
      width: undefined,
      height: undefined,
    });
    const cellRef = useRef<HTMLDivElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const {
      highlightedCells,
      selectedTokenValue,
      highlightCells,
      unhighlightCells,
      setCellsPosition,
      placeBet,
    } = useGameTable();
    const { color, value } = cellData;

    useEffect(() => {
      const cellBox = cellRef.current?.getBoundingClientRect();
      const spanBox = spanRef.current?.getBoundingClientRect();
      if (!cellBox || !spanBox) return;

      setCellsPosition({ cellBox, value });
      setDimensions({ width: cellBox?.width, height: cellBox?.height });
    }, [cellRef, spanRef, setCellsPosition, value]);

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

    const handleStraightUpBet = useCallback(() => {
      if (highlightedCells.length) return;
      placeBet("straight up", {
        number: value,
        tokenValue: selectedTokenValue,
        id: Math.random(),
      });
    }, [highlightedCells.length, placeBet, selectedTokenValue, value]);

    return (
      <div
        ref={cellRef}
        className={styles.cell}
        style={{
          backgroundColor: isHighlighted ? "var(--color-highlight)" : "",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={unhighlightCells}
        onMouseDown={handleStraightUpBet}
      >
        <span ref={spanRef} style={{ backgroundColor: color }}>
          <GridCellMiniTokenCanvas value={value} />
          {value}
        </span>
      </div>
    );
  }
);
