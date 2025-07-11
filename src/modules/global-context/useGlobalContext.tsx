import { createContext, useContext } from "react";

export type GlobalContext = {
  aiChatBoxOpen: boolean;
  setAiChatBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  areaInfoOpen: boolean;
  setAreaInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedArea: string | null;
  setSelectedArea: React.Dispatch<React.SetStateAction<string | null>>;
};

export const GlobalContext = createContext<GlobalContext>({} as GlobalContext);

export const useGlobalContext = () => useContext(GlobalContext);
