'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const NewsClient = dynamic(
  () => import('@/components/view_all/news/News').then(mod => mod.NewsClient),
  { ssr: false }
);

export default function NewsClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsClient />
    </Suspense>
  );
}
