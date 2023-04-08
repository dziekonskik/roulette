import { GridCell } from "./GridCell";
import styles from "./numbersGrid.module.scss";

interface NumbersGridProps {
  startIndex: number;
}

export const NumbersGrid: React.FC<NumbersGridProps> = ({ startIndex }) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 12 }, (_, i) => (
        <GridCell index={startIndex + i} />
      ))}
    </div>
  );
};
