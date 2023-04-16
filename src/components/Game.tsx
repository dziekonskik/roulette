import styles from "./game.module.scss";
import { GameTable } from "./gameTable/GameTable";
import { SettingsPanel } from "./settingsPanel/SettingsPanel";
import { SpinningWheel } from "./spinningWheel/SpinningWheel";

export const Game: React.FC = () => {
  return (
    <>
      <div className={styles.overlay} />
      <main className={styles.canvas}>
        <SpinningWheel />
        <SettingsPanel />
        <GameTable />
      </main>
    </>
  );
};
