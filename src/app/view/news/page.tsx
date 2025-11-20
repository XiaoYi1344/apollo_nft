'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const NewsClient = dynamic(
  () => import('@/components/view_all/news/News').then((mod) => mod.NewsClient),
  { ssr: false }
);

export default function Page() {
  return (

      <NewsClient />
  );
}
