import { observer } from "mobx-react-lite";
import { useGameTable } from "../../store/tableStore/tableStoreProvider";
import { Token } from "../gameToken/Token";
import styles from "./settingsPanel.module.scss";

export const SettingsPanel: React.FC = observer(() => {
  const { selectedTokenValue, setSelectedToken } = useGameTable();

  return (
    <section className={styles.settingsContainer}>
      <div className={styles.stats}>Cash: $1000,00</div>
      <div className={styles.stats}>Bet: $700,00</div>
      <div className={styles.stats}>Win: $100,34</div>
      <div className={styles.tokensWrapper}>
        <Token
          value={1}
          selected={selectedTokenValue === 1}
          onClick={setSelectedToken}
        />
        <Token
          value={10}
          selected={selectedTokenValue === 10}
          onClick={setSelectedToken}
        />
        <Token
          value={50}
          selected={selectedTokenValue === 50}
          onClick={setSelectedToken}
        />
        <Token
          value={100}
          selected={selectedTokenValue === 100}
          onClick={setSelectedToken}
        />
      </div>
    </section>
  );
});
