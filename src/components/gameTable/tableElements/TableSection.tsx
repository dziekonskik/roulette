import { NumbersGrid } from "../numbersGrid/NumbersGrid";
import { LeftAddon } from "./LeftAddon";
import { RightAddon } from "./RightAddon";
import styles from "./tableSection.module.scss";

interface TablePartProps {
  startIndex: number;
  variant: "left" | "middle" | "right";
}

export const TableSection: React.FC<TablePartProps> = ({
  startIndex,
  variant,
}) => {
  return (
    <div className={styles.wrapper}>
      {variant === "left" && <LeftAddon />}
      <NumbersGrid {...{ startIndex }} />
      {variant === "right" && <RightAddon />}
    </div>
  );
};
