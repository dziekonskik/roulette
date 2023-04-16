import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStoreProvider";
import { MiniTokenCanvas } from "../numbersGrid/MiniTokenCanvas";
import styles from "./tableSection.module.scss";

export const LeftAddon: React.FC = observer(() => {
  const {
    tableStore: { highlightedCells, selectedTokenValue },
    bettingStore: { placeBet },
  } = useStore();

  const handleZeroBet = () => {
    if (highlightedCells.length !== 0) return;
    placeBet("straight up", {
      stakedFields: 0,
      tokenValue: selectedTokenValue,
      id: Math.random(),
    });
  };

  return (
    <div
      onClick={handleZeroBet}
      className={styles.leftAddon}
      style={{
        backgroundColor: highlightedCells.includes(0)
          ? "var(--color-highlight)"
          : "",
      }}
    >
      <span>
        <MiniTokenCanvas betType="straight up" value={0} />0
      </span>
    </div>
  );
});
