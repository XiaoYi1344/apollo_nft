// app/creator/creator-detail/page.tsx
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const CreatorDetailClient = dynamic(
  () => import('./_CreatorDetailPageClient'),
  { ssr: false } // chỉ render trên client
);

export default function Page() {
  return <CreatorDetailClient />;
}
