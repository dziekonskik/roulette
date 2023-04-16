import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStoreProvider";
import styles from "./tableSection.module.scss";

export const LeftAddon: React.FC = observer(() => {
  const {
    tableStore: { highlightedCells },
  } = useStore();

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
