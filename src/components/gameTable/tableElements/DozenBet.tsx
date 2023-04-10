import { memo, useMemo } from "react";
import { useGameTable } from "../../../store/tableStore/tableStoreProvider";
import styles from "./bottomAddons.module.scss";

interface DozenBetProps {
  offset: number;
}

export const DozenBet: React.FC<DozenBetProps> = memo(({ offset }) => {
  const { highlightCells } = useGameTable();

  const dozenBetNumbers = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => offset + 1 + i);
  }, [offset]);
  return (
    <div
      className={styles.dozenBet}
      onMouseEnter={() => highlightCells(dozenBetNumbers)}
      onMouseLeave={() => highlightCells([])}
    >
      <span>{offset + 1}</span>-<span>{offset + 12}</span>
    </div>
  );
});
