import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import type { BetToken } from "../../../store/bettingStore/types";
import type { BetType } from "../../../store/gameStore/types";
import { useStore } from "../../../store/rootStoreProvider";
import { MiniToken } from "../../gameToken/MiniToken";
import styles from "./numbersGrid.module.scss";

interface GridCellMiniTokenCanvasProps {
  value?: number;
  predicate?: (numbers: number[]) => boolean;
  betType: BetType;
}

export const MiniTokenCanvas: React.FC<GridCellMiniTokenCanvasProps> = observer(
  ({ value, betType, predicate }) => {
    const {
      bettingStore: { betsDetails },
    } = useStore();

    const tableBets = useMemo(() => {
      const foundBet = betsDetails.find(({ name }) => name === betType);

      return foundBet?.betTokens.reduce(
        (total, current) => {
          const singleValueBetNotCurrentField =
            betType === "straight up" && current.stakedFields !== value;
          const multipleValuesBetNotCurrentField =
            Array.isArray(current.stakedFields) &&
            predicate &&
            !predicate(current.stakedFields);

          if (
            singleValueBetNotCurrentField ||
            multipleValuesBetNotCurrentField
          ) {
            return total;
          }

          switch (current.tokenValue) {
            case 10:
              total[0].push(current);
              break;
            case 50:
              total[1].push(current);
              break;
            case 100:
              total[2].push(current);
              break;
            case 500:
              total[3].push(current);
              break;
            default:
              break;
          }
          return total;
        },
        [[], [], [], []] as BetToken[][]
      );
    }, [betsDetails, betType, value, predicate]);

    if (!tableBets) return null;
    return (
      <>
        {tableBets.map((array, i) => (
          <ul key={i} className={styles[betType]}>
            {array.map((bet, index) => (
              <MiniToken
                value={bet.tokenValue}
                key={bet.id}
                index={index}
                revertedCanvas={betType === "column" || value === 0}
              />
            ))}
          </ul>
        ))}
      </>
    );
  }
);
