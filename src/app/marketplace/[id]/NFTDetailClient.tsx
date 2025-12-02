// app/marketplace/nft-detail/NFTDetailClient.tsx
'use client';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const NFTDetailClient = dynamic(
  () => import('@/components/marketplace/table/NFTDetail'),
  { ssr: false }
);

export default function NFTDetailClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NFTDetailClient />
    </Suspense>
  );
}
