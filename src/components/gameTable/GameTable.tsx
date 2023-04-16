import { useStore } from "../../store/rootStoreProvider";
import { highlightBy } from "../../utils/hoverHelpers";
import type { Predicate } from "../../utils/types";
import styles from "./gameTable.module.scss";
import { DozenBet } from "./tableElements/DozenBet";
import { OtherBottomBets } from "./tableElements/OtherBottomBets";
import { TableSection } from "./tableElements/TableSection";

export const GameTable: React.FC = () => {
  const { tableStore } = useStore();
  const { highlightCells, unhighlightCells } = tableStore;

  const even: Predicate = ({ value }) => value % 2 === 0;
  const odd: Predicate = ({ value }) => value % 2 !== 0;
  const red: Predicate = ({ color }) => color === "red";
  const black: Predicate = ({ color }) => color === "black";
  const low: Predicate = ({ value }) => value <= 18;
  const high: Predicate = ({ value }) => value > 18;

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
              >
                1 - 18
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(even))}
                onMouseLeave={unhighlightCells}
              >
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
              >
                <div data-color="red" />
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(black))}
                onMouseLeave={unhighlightCells}
              >
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
              >
                odd
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(high))}
                onMouseLeave={unhighlightCells}
              >
                19 - 36
              </span>
            </OtherBottomBets>
          </div>
        </footer>
      </div>
    </section>
  );
};
