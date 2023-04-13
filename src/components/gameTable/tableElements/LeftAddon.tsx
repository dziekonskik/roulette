import { observer } from "mobx-react-lite";
import { useGameTable } from "../../../store/tableStore/tableStoreProvider";
import styles from "./tableSection.module.scss";

export const LeftAddon: React.FC = observer(() => {
  const { highlightedCells } = useGameTable();

  return (
    <div
      className={styles.leftAddon}
      style={{
        backgroundColor: highlightedCells.includes(0)
          ? "var(--color-highlight)"
          : "",
      }}
    >
      <span>0</span>
    </div>
  );
});
