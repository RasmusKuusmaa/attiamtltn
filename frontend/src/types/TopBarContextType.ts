import React, { ReactNode } from "react";

export interface TopBarContextType {
    content: ReactNode;
    setContent: (content: ReactNode) => void;
}