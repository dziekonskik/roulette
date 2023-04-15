import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useGameTable } from "../../../store/tableStore/tableStoreProvider";
import type { BetToken } from "../../../store/tableStore/types";
import { MiniToken } from "../../gameToken/MiniToken";

interface GridCellMiniTokenCanvasProps {
  value: number;
}

export const GridCellMiniTokenCanvas: React.FC<GridCellMiniTokenCanvasProps> =
  observer(({ value }) => {
    const { bets } = useGameTable();

    const straightUpBets = useMemo(() => {
      const straightUps = bets.find(({ name }) => name === "straight up");
      return straightUps?.betTokens.reduce(
        (total, current) => {
          if (current.number !== value) {
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
    }, [bets, value]);

    if (!straightUpBets) return null;
    return (
      <>
        {straightUpBets.map((array, i) => (
          <ul key={i}>
            {array.map((bet, index) => (
              <MiniToken value={bet.tokenValue} key={bet.id} index={index} />
            ))}
          </ul>
        ))}
      </>
    );
  });
