import { ReactNode, useState } from "react";
import { GlobalContext } from "./useGlobalContext";

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [aiChatBoxOpen, setAiChatBoxOpen] = useState(false);
  return (
    <GlobalContext.Provider value={{ aiChatBoxOpen, setAiChatBoxOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
