import styles from "./token.module.scss";
import type { TokenColor, TokenValue } from "./types";

interface TokenProps {
  value: TokenValue;
  selected: boolean;
  onClick?: (x?: any) => void;
}

const colorMap: Record<TokenValue, TokenColor> = {
  1: "#52B5E2",
  10: "#F0564B",
  50: "#019137",
  100: "#F3C620",
};

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
