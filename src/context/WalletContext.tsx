// context/WalletContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextProps {
  account: string;
  setAccount: (acc: string) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState('');
  return (
    <WalletContext.Provider value={{ account, setAccount }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWalletContext must be used inside WalletProvider');
  return ctx;
};
