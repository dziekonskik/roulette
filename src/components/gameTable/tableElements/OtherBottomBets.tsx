import styles from "./bottomAddons.module.scss";

interface OtherBottomBetsProps {
  children: React.ReactNode[];
}

export const OtherBottomBets: React.FC<OtherBottomBetsProps> = ({
  children,
}) => {
  return <div className={styles.bottomAddonTwo}>{children}</div>;
};
