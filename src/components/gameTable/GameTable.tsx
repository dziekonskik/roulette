import { observer } from "mobx-react-lite";
import type { BetType } from "../../store/gameStore/types";
import { useStore } from "../../store/rootStoreProvider";
import { getCellNumbersByColor } from "../../utils/functions";
import { highlightBy } from "../../utils/hoverHelpers";
import type { Predicate } from "../../utils/types";
import styles from "./gameTable.module.scss";
import { MiniTokenCanvas } from "./numbersGrid/MiniTokenCanvas";
import { DozenBet } from "./tableElements/DozenBet";
import { OtherBottomBets } from "./tableElements/OtherBottomBets";
import { TableSection } from "./tableElements/TableSection";

export const GameTable: React.FC = observer(() => {
  const {
    tableStore: {
      highlightedCells,
      selectedTokenValue,
      highlightCells,
      unhighlightCells,
    },
    bettingStore: { placeBet },
  } = useStore();

  const even: Predicate = ({ value }) => value % 2 === 0;
  const odd: Predicate = ({ value }) => value % 2 !== 0;
  const red: Predicate = ({ color }) => color === "red";
  const black: Predicate = ({ color }) => color === "black";
  const low: Predicate = ({ value }) => value <= 18;
  const high: Predicate = ({ value }) => value > 18;

  const handleAddBet = (type: BetType) => {
    placeBet(type, {
      stakedFields: highlightedCells,
      tokenValue: selectedTokenValue,
      id: Math.random(),
    });
  };

  return (
    <section className={styles.tableContainer}>
      <div>
        <div className={styles.gameTable}>
          <TableSection startIndex={0} variant="left" />
          <TableSection startIndex={12} variant="middle" />
          <TableSection startIndex={24} variant="right" />
        </div>
        <footer>
          <div className={styles.groupBettings}>
            <DozenBet offset={0} />
            <OtherBottomBets>
              <span
                onMouseEnter={() => highlightCells(highlightBy(low))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("low/high")}
              >
                <MiniTokenCanvas
                  betType="low/high"
                  predicate={(numbers) => numbers.every((n) => n <= 18)}
                />
                1 - 18
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(even))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("even/odd")}
              >
                <MiniTokenCanvas
                  betType="even/odd"
                  predicate={(numbers) => numbers.every((n) => n % 2 === 0)}
                />
                even
              </span>
            </OtherBottomBets>
          </div>
          <div className={styles.groupBettings}>
            <DozenBet offset={12} />
            <OtherBottomBets>
              <span
                onMouseEnter={() => highlightCells(highlightBy(red))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("red/black")}
              >
                <MiniTokenCanvas
                  betType="red/black"
                  predicate={(numbers) =>
                    numbers.every((n) =>
                      getCellNumbersByColor("red").includes(n)
                    )
                  }
                />
                <div data-color="red" />
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(black))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("red/black")}
              >
                <MiniTokenCanvas
                  betType="red/black"
                  predicate={(numbers) =>
                    numbers.every((n) =>
                      getCellNumbersByColor("black").includes(n)
                    )
                  }
                />
                <div data-color="black" />
              </span>
            </OtherBottomBets>
          </div>
          <div className={styles.groupBettings}>
            <DozenBet offset={24} />
            <OtherBottomBets>
              <span
                onMouseEnter={() => highlightCells(highlightBy(odd))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("even/odd")}
              >
                <MiniTokenCanvas
                  betType="even/odd"
                  predicate={(numbers) => numbers.every((n) => n % 2 !== 0)}
                />
                odd
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(high))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("low/high")}
              >
                <MiniTokenCanvas
                  betType="low/high"
                  predicate={(numbers) => numbers.every((n) => n > 18)}
                />
                19 - 36
              </span>
            </OtherBottomBets>
          </div>
        </footer>
      </div>
    </section>
  );
});
