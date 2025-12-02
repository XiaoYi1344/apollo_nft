// app/uploads/UploadClient.tsx
'use client';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const UploadClient = dynamic(
  () => import('@/components/uploads/Upload'),
  { ssr: false }
);

export default function UploadClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadClient />
    </Suspense>
  );
}
