import { useStore } from "../store/gameStoreProvider";
import styles from "./game.module.scss";
import { GameTable } from "./gameTable/GameTable";
import { SpinningWheel } from "./spinningWheel/SpinningWheel";

export const Game: React.FC = () => {
  const { gameState } = useStore();
  return (
    <>
      <div className={styles.overlay} />
      <main className={styles.canvas}>
        <SpinningWheel />
        <GameTable />
      </main>
    </>
  );
};
