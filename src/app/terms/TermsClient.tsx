// app/terms/TermsClient.tsx
'use client';
import React, { Suspense } from 'react';

const TermsClient = React.lazy(() => import('@/components/term/term'));

export default function TermsClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TermsClient />
    </Suspense>
  );
}
