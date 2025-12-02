// app/marketplace/MarketplaceClient.tsx
'use client';
import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

const MarketplaceClient = dynamicImport(
  () => import('@/components/marketplace/Marketplace'),
  { ssr: false }
);

export default function MarketplaceClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketplaceClient />
    </Suspense>
  );
}
