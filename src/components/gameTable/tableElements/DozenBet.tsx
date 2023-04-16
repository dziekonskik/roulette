import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useStore } from "../../../store/rootStoreProvider";
import { MiniTokenCanvas } from "../numbersGrid/MiniTokenCanvas";
import styles from "./bottomAddons.module.scss";

interface DozenBetProps {
  offset: number;
}

export const DozenBet: React.FC<DozenBetProps> = observer(({ offset }) => {
  const {
    tableStore: { highlightCells, highlightedCells, selectedTokenValue },
    bettingStore: { placeBet },
  } = useStore();

  const dozenBetNumbers = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => offset + 1 + i);
  }, [offset]);

  const handleDozenBet = () => {
    placeBet("dozen", {
      stakedFields: highlightedCells,
      tokenValue: selectedTokenValue,
      id: Math.random(),
    });
  };
  return (
    <div
      className={styles.dozenBet}
      onMouseEnter={() => highlightCells(dozenBetNumbers)}
      onMouseLeave={() => highlightCells([])}
      onClick={handleDozenBet}
    >
      <MiniTokenCanvas
        betType="dozen"
        predicate={(numbers) =>
          numbers.every((n) => n > offset && n <= offset + 12)
        }
      />
      <span>{offset + 1}</span>-<span>{offset + 12}</span>
    </div>
  );
});
