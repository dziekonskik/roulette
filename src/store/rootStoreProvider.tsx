import { createContext, useContext } from "react";
import { rootStore } from "./rootStore";

const StoreContext = createContext<typeof rootStore | null>(null);

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("You forgot StoreContext Provider!");
  }

  return store;
};
