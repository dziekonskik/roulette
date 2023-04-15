import { colorMap } from "./token.data";
import styles from "./token.module.scss";
import type { TokenValue } from "./types";

interface MiniTokenProps {
  value: TokenValue;
  index: number;
}

export const MiniToken: React.FC<MiniTokenProps> = ({ value, index }) => {
  return (
    <li
      className={styles.miniToken}
      style={{
        backgroundColor: colorMap[value],
        transform: `translateY(-${Math.min(index * 0.5, 20)}px)`,
      }}
    >
      {index + 1}
    </li>
  );
};
