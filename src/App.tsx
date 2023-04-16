import { Game } from "./components/Game";
import { StoreProvider } from "./store/rootStoreProvider";

function App() {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  );
}

export default App;
