import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useStore } from "../../../store/rootStoreProvider";
import { highlightBy } from "../../../utils/hoverHelpers";
import type { Predicate } from "../../../utils/types";
import { MiniTokenCanvas } from "../numbersGrid/MiniTokenCanvas";
import styles from "./tableSection.module.scss";

export const RightAddon: React.FC = observer(() => {
  const {
    tableStore: {
      highlightCells,
      unhighlightCells,
      highlightedCells,
      selectedTokenValue,
      placeBet,
    },
  } = useStore();

  const rowOne: Predicate = ({ value }) => value % 3 === 0;
  const rowTwo: Predicate = ({ value }) => value % 3 === 2;
  const rowThree: Predicate = ({ value }) => value % 3 === 1;

  const handleLineBet = useCallback(() => {
    placeBet("line", {
      stakedFields: highlightedCells,
      tokenValue: selectedTokenValue,
      id: Math.random(),
    });
  }, [placeBet, highlightedCells, selectedTokenValue]);

  return (
    <div className={styles.rightAddon}>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowOne))}
        onMouseLeave={unhighlightCells}
        onClick={handleLineBet}
      >
        <span className={styles.textContent}>
          <MiniTokenCanvas
            betType="line"
            predicate={(numbers) => numbers.every((n) => n % 3 === 0)}
          />
          1<small>st</small>
        </span>
      </div>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowTwo))}
        onMouseLeave={unhighlightCells}
        onClick={handleLineBet}
      >
        <span className={styles.textContent}>
          <MiniTokenCanvas
            betType="line"
            predicate={(numbers) => numbers.every((n) => n % 3 === 2)}
          />
          2<small>nd</small>
        </span>
      </div>
      <div
        onMouseEnter={() => highlightCells(highlightBy(rowThree))}
        onMouseLeave={unhighlightCells}
        onClick={handleLineBet}
      >
        <span className={styles.textContent}>
          <MiniTokenCanvas
            betType="line"
            predicate={(numbers) => numbers.every((n) => n % 3 === 1)}
          />
          3<small>rd</small>
        </span>
      </div>
    </div>
  );
});
