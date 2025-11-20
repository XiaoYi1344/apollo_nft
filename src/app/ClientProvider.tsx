'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';

const queryClient = new QueryClient();

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </QueryClientProvider>
  );
};
