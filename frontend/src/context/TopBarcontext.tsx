import { createContext, JSX, ReactNode, useState } from "react";
import { TopBarContextType } from "../types/TopBarContextType";

export const TopBarContext = createContext<TopBarContextType>({
  content: null,
  setContent: () => {}, 
});

interface TopBarProviderProps {
  children: ReactNode;
}

function TopBarProvider({ children }: TopBarProviderProps): JSX.Element {
  const [content, setContent] = useState<ReactNode>(null);

  return (
    <TopBarContext.Provider value={{ content, setContent }}>
      {children}
    </TopBarContext.Provider>
  );
}

export default TopBarProvider;
