import styles from "./gameTable.module.scss";
import { DozenBet } from "./tableElements/DozenBet";
import { OtherBottomBets } from "./tableElements/OtherBottomBets";
import { TableSection } from "./tableElements/TableSection";

export const GameTable: React.FC = () => {
  return (
    <section className={styles.tableContainer}>
      <div>
        <div className={styles.gameTable}>
          <TableSection startIndex={0} variant="left" />
          <TableSection startIndex={12} variant="middle" />
          <TableSection startIndex={24} variant="right" />
        </div>
        <footer>
          <div className={styles.groupBettings}>
            <DozenBet>0</DozenBet>
            <OtherBottomBets>
              <span>1 - 18</span>
              <span>even</span>
            </OtherBottomBets>
          </div>
          <div className={styles.groupBettings}>
            <DozenBet>12</DozenBet>
            <OtherBottomBets>
              <span>
                <div data-color="red" />
              </span>
              <span>
                <div data-color="black" />
              </span>
            </OtherBottomBets>
          </div>
          <div className={styles.groupBettings}>
            <DozenBet>24</DozenBet>
            <OtherBottomBets>
              <span>odd</span>
              <span>19 - 36</span>
            </OtherBottomBets>
          </div>
        </footer>
      </div>
    </section>
  );
};
