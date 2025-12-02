// app/privacy/PrivacyClient.tsx
'use client';
import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

const PrivacyClient = dynamicImport(
  () => import('@/components/privacy/privacy'),
  { ssr: false }
);

export default function PrivacyClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrivacyClient />
    </Suspense>
  );
}
