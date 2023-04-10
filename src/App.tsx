import { Game } from "./components/Game";
import { GameStoreProvider } from "./store/gameStoreProvider";
import { GameTableProvider } from "./store/tableStore/tableStoreProvider";

function App() {
  return (
    <GameStoreProvider>
      <GameTableProvider>
        <Game />
      </GameTableProvider>
    </GameStoreProvider>
  );
}

export default App;
