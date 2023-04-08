import styles from "./tableSection.module.scss";

export const RightAddon: React.FC = () => {
  return (
    <div className={styles.rightAddon}>
      <div>
        <span className={styles.textContent}>
          1<small>st</small>
        </span>
      </div>
      <div>
        <span className={styles.textContent}>
          2<small>nd</small>
        </span>
      </div>
      <div>
        <span className={styles.textContent}>
          3<small>rd</small>
        </span>
      </div>
    </div>
  );
};
