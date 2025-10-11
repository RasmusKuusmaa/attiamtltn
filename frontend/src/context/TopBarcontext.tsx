import { createContext, ReactNode, useState } from "react";

interface TopBarContextType {
  content: ReactNode;
  setContent: (content: ReactNode) => void;
}

export const TopBarContext = createContext<TopBarContextType>({
  content: null,
  setContent: () => {},
});

export const TopBarProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode>(null);

  return (
    <TopBarContext.Provider value={{ content, setContent }}>
      {children}
    </TopBarContext.Provider>
  );
};
