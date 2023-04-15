import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGameTable } from "../../../store/tableStore/tableStoreProvider";
import { BetToken } from "../../../store/tableStore/types";
import {
  handleHoverLeft,
  handleHoverOnBottom,
  handleHoverOnTop,
  handleHoverRight,
} from "../../../utils/highlightFunctions";
import type { TableCell } from "../../../utils/types";
import { MiniToken } from "../../gameToken/MiniToken";
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
      bets,
      highlightedCells,
      selectedTokenValue,
      highlightCells,
      unhighlightCells,
      setCellsPosition,
      placeBet,
    } = useGameTable();
    const { color, value } = cellData;

    const straightUpBets = useMemo(() => {
      const straightUps = bets.find(({ name }) => name === "straight up");
      return straightUps?.betTokens.reduce(
        (total, current) => {
          if (current.number !== value) {
            return total;
          }
          switch (current.tokenValue) {
            case 1:
              total[0].push(current);
              break;
            case 10:
              total[1].push(current);
              break;
            case 50:
              total[2].push(current);
              break;
            case 100:
              total[3].push(current);
              break;
            default:
              break;
          }
          return total;
        },
        [[], [], [], []] as BetToken[][]
      );
    }, [bets, value]);

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

    const handleStraightUpBet = () => {
      if (highlightedCells.length) return;
      placeBet("straight up", {
        number: value,
        tokenValue: selectedTokenValue,
        id: Math.random(),
      });
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
        onMouseDown={handleStraightUpBet}
      >
        <span ref={spanRef} style={{ backgroundColor: color }}>
          {straightUpBets?.map((array) => (
            <ul>
              {array.map((bet, index) => (
                <MiniToken value={bet.tokenValue} key={bet.id} index={index} />
              ))}
            </ul>
          ))}
          {value}
        </span>
      </div>
    );
  }
);
