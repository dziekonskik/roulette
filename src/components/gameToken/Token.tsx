import { colorMap } from "./token.data";
import styles from "./token.module.scss";
import type { TokenValue } from "./types";

interface TokenProps {
  value: TokenValue;
  selected: boolean;
  onClick?: (x?: any) => void;
}

export const Token: React.FC<TokenProps> = ({ value, selected, onClick }) => {
  return (
    <div
      className={styles.token}
      style={{ backgroundColor: colorMap[value] }}
      onClick={() => onClick && onClick(value)}
    >
      <div>
        <span className={styles.decoration}>{value}</span>
      </div>
      {selected && (
        <div
          className={styles.orbit}
          style={{ backgroundColor: colorMap[value] }}
        />
      )}
    </div>
  );
};
