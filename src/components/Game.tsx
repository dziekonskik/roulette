import styles from "./game.module.scss";
import { GameTable } from "./gameTable/GameTable";
import { SettingsPanel } from "./settingsPanel/SettingsPanel";
import { SpinningWheel } from "./spinningWheel/SpinningWheel";

export const Game: React.FC = () => {
  return (
    <>
      <div className={styles.overlay} />
      <main className={styles.gameBoard}>
        <SettingsPanel />
        <SpinningWheel />
        <GameTable />
      </main>
      <aside className={styles.attributions}>
        <a href="https://www.freepik.com/free-photo/dark-green-wall_4246302.htm#query=green%20casino%20canvas%20texture&position=24&from_view=search&track=ais">
          Image by rawpixel.com
        </a>{" "}
        on Freepik
        <a href="https://www.freepik.com/free-vector/ribbon-cutting-ceremony-poster-with-red-curtains-vector-illustration_16305272.htm#query=casino&position=38&from_view=search&track=sph">
          Image by nuraghies
        </a>{" "}
        on Freepik
        <a href="https://www.freepik.com/free-photo/weathered-wooden-surface_968894.htm#query=wood%20texture&position=19&from_view=search&track=ais">
          Image by fwstudio
        </a>{" "}
        on Freepik
        <a href="https://www.freepik.com/free-photo/brown-wooden-textured-flooring-background_17848009.htm#query=wood%20texture&position=49&from_view=search&track=ais">
          Image by rawpixel.com
        </a>{" "}
        on Freepik
      </aside>
    </>
  );
};
