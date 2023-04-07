import { useStore } from "../store/gameStoreProvider";
import styles from "./game.module.scss";

export const Game: React.FC = () => {
  const { gameState } = useStore();
  return <main className={styles.canvas}></main>;
};
