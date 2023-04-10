import { createContext, useContext } from "react";
import { tableStore } from "./tableStore";

const GameTableContext = createContext<typeof tableStore | null>(null);

interface GameStoreProviderProps {
  children: React.ReactNode;
}

export const GameTableProvider: React.FC<GameStoreProviderProps> = ({
  children,
}) => {
  return (
    <GameTableContext.Provider value={tableStore}>
      {children}
    </GameTableContext.Provider>
  );
};

export const useGameTable = () => {
  const gameTable = useContext(GameTableContext);

  if (!gameTable) {
    throw new Error("You forgot GameTableContext Provider!");
  }

  return gameTable;
};
