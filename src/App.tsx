import { Game } from "./components/Game";
import { GameStoreProvider } from "./store/gameStoreProvider";

function App() {
  return (
    <GameStoreProvider>
      <Game />
    </GameStoreProvider>
  );
}

export default App;
