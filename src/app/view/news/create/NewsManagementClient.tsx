// app/community/news-management/NewsManagementClient.tsx
'use client';
import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

const NewsManagement = dynamicImport(
  () => import('@/components/community/new&update/manager/News'),
  { ssr: false }
);

export default function NewsManagementClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsManagement />
    </Suspense>
  );
}
