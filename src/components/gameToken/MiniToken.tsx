import { colorMap } from "./token.data";
import styles from "./token.module.scss";
import type { TokenValue } from "./types";

interface MiniTokenProps {
  value: TokenValue;
  index: number;
  revertedCanvas: boolean;
}

export const MiniToken: React.FC<MiniTokenProps> = ({
  value,
  index,
  revertedCanvas,
}) => {
  return (
    <li
      className={styles.miniToken}
      style={{
        backgroundColor: colorMap[value],
        transform: revertedCanvas
          ? `translateX(${Math.min(index * 0.5, 20)}px) rotate(90deg)`
          : `translateY(-${Math.min(index * 0.5, 20)}px)`,
      }}
    >
      {index + 1}
    </li>
  );
};
