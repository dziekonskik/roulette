import styles from "./spinningWheel.module.scss";

export const SpinningWheel: React.FC = () => {
  return (
    <section className={styles.container}>
      <canvas />
    </section>
  );
};
