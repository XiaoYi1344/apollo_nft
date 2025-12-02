// app/view-all/news/NewsClient.tsx
'use client';
import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

const NewsClient = dynamicImport(
  () => import('@/components/view_all/news/News').then(m => m.News),
  { ssr: false }
);

export default function NewsClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsClient />
    </Suspense>
  );
}
