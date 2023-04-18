import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStoreProvider";
import {
  firstColumn,
  secondColumn,
  thirdColumn,
} from "../../../utils/betHelpers";
import { highlightBy } from "../../../utils/hoverHelpers";
import type { HoverPredicate } from "../../../utils/types";
import { MiniTokenCanvas } from "../numbersGrid/MiniTokenCanvas";
import styles from "./tableSection.module.scss";

export const RightAddon: React.FC = observer(() => {
  const {
    tableStore: {
      highlightCells,
      unhighlightCells,
      highlightedCells,
      selectedTokenValue,
    },
    bettingStore: { placeBet },
  } = useStore();

  const rowOne: HoverPredicate = ({ value }) => value % 3 === 0;
  const rowTwo: HoverPredicate = ({ value }) => value % 3 === 2;
  const rowThree: HoverPredicate = ({ value }) => value % 3 === 1;

  const handleLineBet = () => {
    placeBet("column", {
      stakedFields: highlightedCells,
      tokenValue: selectedTokenValue,
      id: Math.random(),
    });
  };

  return (
    <div className={styles.rightAddon}>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowOne))}
        onMouseLeave={unhighlightCells}
        onClick={handleLineBet}
      >
        <span className={styles.textContent}>
          <MiniTokenCanvas betType="column" predicate={firstColumn} />1
          <small>st</small>
        </span>
      </div>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowTwo))}
        onMouseLeave={unhighlightCells}
        onClick={handleLineBet}
      >
        <span className={styles.textContent}>
          <MiniTokenCanvas betType="column" predicate={secondColumn} />2
          <small>nd</small>
        </span>
      </div>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowThree))}
        onMouseLeave={unhighlightCells}
        onClick={handleLineBet}
      >
        <span className={styles.textContent}>
          <MiniTokenCanvas betType="column" predicate={thirdColumn} />3
          <small>rd</small>
        </span>
      </div>
    </div>
  );
});
