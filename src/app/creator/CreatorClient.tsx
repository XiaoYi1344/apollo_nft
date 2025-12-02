// app/creator/creator-detail/CreatorClient.tsx
'use client';
import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

const CreatorPageClient = dynamicImport(
  () => import('@/components/creator/page'),
  { ssr: false }
);

export default function CreatorClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatorPageClient />
    </Suspense>
  );
}
