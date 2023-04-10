import { useGameTable } from "../../../store/tableStore/tableStoreProvider";
import { highlightBy } from "../../../utils/highlightFunctions";
import type { Predicate } from "../../../utils/types";
import styles from "./tableSection.module.scss";

export const RightAddon: React.FC = () => {
  const { highlightCells, unhighlightCells } = useGameTable();

  const rowOne: Predicate = ({ value }) => value % 3 === 0;
  const rowTwo: Predicate = ({ value }) => value % 3 === 2;
  const rowThree: Predicate = ({ value }) => value % 3 === 1;

  return (
    <div className={styles.rightAddon}>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowOne))}
        onMouseLeave={unhighlightCells}
      >
        <span className={styles.textContent}>
          1<small>st</small>
        </span>
      </div>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowTwo))}
        onMouseLeave={unhighlightCells}
      >
        <span className={styles.textContent}>
          2<small>nd</small>
        </span>
      </div>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowThree))}
        onMouseLeave={unhighlightCells}
      >
        <span className={styles.textContent}>
          3<small>rd</small>
        </span>
      </div>
    </div>
  );
};
