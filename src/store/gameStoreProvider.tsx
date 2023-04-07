import { createContext, useContext } from "react";
import { rouletteStore } from "./gameStore";

const StoreContext = createContext<typeof rouletteStore | null>(null);

interface GameStoreProviderProps {
  children: React.ReactNode;
}

export const GameStoreProvider: React.FC<GameStoreProviderProps> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={rouletteStore}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("You forgot StoreContext Provider!");
  }

  return store;
};
