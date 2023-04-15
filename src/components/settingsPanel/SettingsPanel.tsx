import { observer } from "mobx-react-lite";
import { useStore } from "../../store/gameStoreProvider";
import { useGameTable } from "../../store/tableStore/tableStoreProvider";
import { Token } from "../gameToken/Token";
import styles from "./settingsPanel.module.scss";

export const SettingsPanel: React.FC = observer(() => {
  const { selectedTokenValue, setSelectedToken } = useGameTable();
  const { totalBetValue, balance, thisRoundWin } = useStore();

  return (
    <section className={styles.settingsContainer}>
      <div className={styles.stats}>Cash: ${balance}</div>
      <div className={styles.stats}>Bet: ${totalBetValue}</div>
      <div className={styles.stats}>Win: ${thisRoundWin}</div>
      <div className={styles.tokensWrapper}>
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
        <Token
          value={500}
          selected={selectedTokenValue === 500}
          onClick={setSelectedToken}
        />
      </div>
    </section>
  );
});
