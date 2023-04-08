import styles from "./bottomAddons.module.scss";

interface BottomAddonOneProps {
  children: string;
}

export const DozenBet: React.FC<BottomAddonOneProps> = ({ children }) => {
  const parsedChildren = Number(children);
  return (
    <div className={styles.dozenBet}>
      <span>{parsedChildren + 1}</span>-<span>{parsedChildren + 12}</span>
    </div>
  );
};
