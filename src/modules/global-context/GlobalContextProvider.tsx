import { ReactNode, useState } from "react";
import { GlobalContext } from "./useGlobalContext";

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [aiChatBoxOpen, setAiChatBoxOpen] = useState(false);
  const [areaInfoOpen, setAreaInfoOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        aiChatBoxOpen,
        setAiChatBoxOpen,
        areaInfoOpen,
        setAreaInfoOpen,
        selectedArea,
        setSelectedArea,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
