// app/drop/DropClient.tsx
'use client';
import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

const DropPageClient = dynamicImport(
  () => import('@/components/drop/dropPage'),
  { ssr: false }
);

export default function DropClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DropPageClient />
    </Suspense>
  );
}
