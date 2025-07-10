import { createContext, useContext } from "react";

export type GlobalContext = {
  aiChatBoxOpen: boolean;
  setAiChatBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContext>({} as GlobalContext);

export const useGlobalContext = () => useContext(GlobalContext);
