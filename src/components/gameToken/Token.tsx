import styles from "./token.module.scss";
import type { TokenColor, TokenValue } from "./types";

interface TokenProps {
  value: TokenValue;
}

const colorMap: Record<TokenValue, TokenColor> = {
  1: "#52B5E2",
  10: "#F0564B",
  50: "#019137",
  100: "#F3C620",
};

export const Token: React.FC<TokenProps> = ({ value }) => {
  return (
    <div
      className={styles.tokenWrapper}
      style={{ backgroundColor: colorMap[value] }}
    >
      <div>
        <span className={styles.decoration}>{value}</span>
      </div>
    </div>
  );
};
