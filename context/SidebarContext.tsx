'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isSidebarVisible: boolean;
  setIsSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, setIsSidebarVisible }}>
      {children}
    </SidebarContext.Provider>
  );
};
