import { Token } from "../gameToken/Token";
import styles from "./settingsPanel.module.scss";

export const SettingsPanel: React.FC = () => {
  return (
    <section className={styles.settingsContainer}>
      <div>x</div>
      <div>y</div>
      <div className={styles.tokensWrapper}>
        <Token value={1} />
        <Token value={10} />
        <Token value={50} />
        <Token value={100} />
      </div>
    </section>
  );
};
