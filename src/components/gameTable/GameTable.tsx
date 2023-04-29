import { observer } from "mobx-react-lite";
import type { BetType } from "../../store/gameStore/types";
import { useStore } from "../../store/rootStoreProvider";
import {
  betOnBlack,
  betOnRed,
  evenBet,
  highBet,
  lowBet,
  oddBet,
} from "../../utils/betHelpers";
import { highlightBy } from "../../utils/hoverHelpers";
import type { HoverPredicate } from "../../utils/types";
import { Token } from "../gameToken/Token";
import styles from "./gameTable.module.scss";
import { MiniTokenCanvas } from "./numbersGrid/MiniTokenCanvas";
import { DozenBet } from "./tableElements/DozenBet";
import { OtherBottomBets } from "./tableElements/OtherBottomBets";
import { TableSection } from "./tableElements/TableSection";
import { ActionButton } from "./tableElements/actionButton/ActionButton";

export const GameTable: React.FC = observer(() => {
  const {
    tableStore: {
      highlightedCells,
      selectedTokenValue,
      highlightCells,
      unhighlightCells,
      setSelectedToken,
    },
    bettingStore: { placeBet, clearTable },
    gameStore: { spinRoulette },
  } = useStore();

  const even: HoverPredicate = ({ value }) => value % 2 === 0;
  const odd: HoverPredicate = ({ value }) => value % 2 !== 0;
  const red: HoverPredicate = ({ color }) => color === "red";
  const black: HoverPredicate = ({ color }) => color === "black";
  const low: HoverPredicate = ({ value }) => value <= 18;
  const high: HoverPredicate = ({ value }) => value > 18;

  const handleAddBet = (type: BetType) => {
    placeBet(type, {
      stakedFields: highlightedCells,
      tokenValue: selectedTokenValue,
      id: Math.random(),
    });
  };

  return (
    <section className={styles.tableContainer}>
      <div>
        <div className={styles.gameTable}>
          <TableSection startIndex={0} variant="left" />
          <TableSection startIndex={12} variant="middle" />
          <TableSection startIndex={24} variant="right" />
        </div>
        <ActionButton action="spin" onClick={spinRoulette}>
          <img
            src="https://img.icons8.com/color/96/null/american-roulette.png"
            alt="spin the wheel"
          />
        </ActionButton>
        <ActionButton action="reset" onClick={clearTable}>
          <img
            src="https://img.icons8.com/fluency/94/null/delete-sign.png"
            alt="clear the table"
          />
        </ActionButton>
        <footer>
          <div className={styles.groupBettings}>
            <DozenBet offset={0} />
            <OtherBottomBets>
              <span
                onMouseEnter={() => highlightCells(highlightBy(low))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("low/high")}
              >
                <MiniTokenCanvas betType="low/high" predicate={lowBet} />1 - 18
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(even))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("even/odd")}
              >
                <MiniTokenCanvas betType="even/odd" predicate={evenBet} />
                even
              </span>
            </OtherBottomBets>
          </div>
          <div className={styles.groupBettings}>
            <DozenBet offset={12} />
            <OtherBottomBets>
              <span
                onMouseEnter={() => highlightCells(highlightBy(red))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("red/black")}
              >
                <MiniTokenCanvas betType="red/black" predicate={betOnRed} />
                <div data-color="red" />
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(black))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("red/black")}
              >
                <MiniTokenCanvas betType="red/black" predicate={betOnBlack} />
                <div data-color="black" />
              </span>
            </OtherBottomBets>
          </div>
          <div className={styles.groupBettings}>
            <DozenBet offset={24} />
            <OtherBottomBets>
              <span
                onMouseEnter={() => highlightCells(highlightBy(odd))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("even/odd")}
              >
                <MiniTokenCanvas betType="even/odd" predicate={oddBet} />
                odd
              </span>
              <span
                onMouseEnter={() => highlightCells(highlightBy(high))}
                onMouseLeave={unhighlightCells}
                onClick={() => handleAddBet("low/high")}
              >
                <MiniTokenCanvas betType="low/high" predicate={highBet} />
                19 - 36
              </span>
            </OtherBottomBets>
          </div>
        </footer>
      </div>
      <article className={styles.tokensWrapper}>
        <Token
          value={10}
          selected={selectedTokenValue === 10}
          onClick={setSelectedToken}
        />
        <Token
          value={50}
          selected={selectedTokenValue === 50}
          onClick={setSelectedToken}
        />
        <Token
          value={100}
          selected={selectedTokenValue === 100}
          onClick={setSelectedToken}
        />
        <Token
          value={500}
          selected={selectedTokenValue === 500}
          onClick={setSelectedToken}
        />
      </article>
    </section>
  );
});
