'use client';

import { ClientProvider } from './ClientProvider';
import { WagmiAppProvider } from '@/providers/wagmi-provider';
import React from 'react';

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ClientProvider>
      <WagmiAppProvider>{children}</WagmiAppProvider>
    </ClientProvider>
  );
};

export default ClientWrapper;
