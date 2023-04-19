import { observer } from "mobx-react-lite";
import { useStore } from "../../store/rootStoreProvider";
import styles from "./settingsPanel.module.scss";

export const SettingsPanel: React.FC = observer(() => {
  const { bettingStore, gameStore } = useStore();
  const { cashInBet } = bettingStore;
  const { balance, lastWin } = gameStore;

  return (
    <section className={styles.settingsContainer}>
      <div className={styles.stats} data-text={balance}>
        Cash: $ {balance}
      </div>
      <div className={styles.stats} data-text={cashInBet}>
        Bet: $ {cashInBet}
      </div>
      <div className={styles.stats} data-text={lastWin}>
        Win: $ {lastWin}
      </div>
    </section>
  );
});
