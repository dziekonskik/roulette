import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store/rootStoreProvider";
import {
  corner,
  horizontalSplit,
  regularStreet,
  sixLine,
  splitWithZero,
  streetWithZero,
  verticalSplit,
} from "../../../utils/betHelpers";
import {
  handleHoverLeft,
  handleHoverOnBottom,
  handleHoverOnTop,
  handleHoverRight,
} from "../../../utils/highlightFunctions";
import type { TableCell } from "../../../utils/types";
import { MiniTokenCanvas } from "./MiniTokenCanvas";
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
    const { tableStore, bettingStore } = useStore();
    const {
      highlightedCells,
      selectedTokenValue,
      highlightCells,
      unhighlightCells,
      setCellsPosition,
    } = tableStore;
    const { placeBet } = bettingStore;
    const { color, value } = cellData;

    useEffect(() => {
      const cellBox = cellRef.current?.getBoundingClientRect();
      const width = cellRef.current?.clientWidth;
      const height = cellRef.current?.clientHeight;
      if (!cellBox) return;

      setCellsPosition({ cellBox, value });
      setDimensions({ width, height });
    }, [cellRef, setCellsPosition, value]);

    const handleMouseMove = (event: MouseHandler) => {
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
    };

    const handlePlaceBet = () => {
      if (!highlightedCells.length) {
        placeBet("straight up", {
          stakedFields: value,
          tokenValue: selectedTokenValue,
          id: Math.random(),
        });
      }
      if (highlightedCells.length === 2) {
        placeBet("split", {
          stakedFields: highlightedCells,
          tokenValue: selectedTokenValue,
          id: Math.random(),
        });
      }
      if (highlightedCells.length === 3) {
        placeBet("street", {
          stakedFields: highlightedCells,
          tokenValue: selectedTokenValue,
          id: Math.random(),
        });
      }
      if (highlightedCells.length === 4) {
        placeBet("corner", {
          stakedFields: highlightedCells,
          tokenValue: selectedTokenValue,
          id: Math.random(),
        });
      }
      if (highlightedCells.length === 6) {
        placeBet("six-line", {
          stakedFields: highlightedCells,
          tokenValue: selectedTokenValue,
          id: Math.random(),
        });
      }
    };

    return (
      <div
        ref={cellRef}
        className={styles.cell}
        style={{
          backgroundColor: isHighlighted ? "var(--color-highlight)" : "",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={unhighlightCells}
        onClick={handlePlaceBet}
      >
        <MiniTokenCanvas betType="split" predicate={verticalSplit(value)} />
        <MiniTokenCanvas betType="split" predicate={horizontalSplit(value)} />
        <MiniTokenCanvas betType="split" predicate={splitWithZero(value)} />
        <MiniTokenCanvas betType="street" predicate={regularStreet(value)} />
        <MiniTokenCanvas betType="street" predicate={streetWithZero(value)} />
        <MiniTokenCanvas betType="corner" predicate={corner(value)} />
        <MiniTokenCanvas betType="six-line" predicate={sixLine(value)} />
        <span style={{ backgroundColor: color }}>
          <MiniTokenCanvas value={value} betType="straight up" />
          {value}
        </span>
      </div>
    );
  }
);
