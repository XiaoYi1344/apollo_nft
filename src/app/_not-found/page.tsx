'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const NotFoundClient = dynamic(
  () => import('@/components/_not-found/NotFoundClient'),
  { ssr: false }
);

export default function NotFoundPage() {
  return (
      <NotFoundClient />
  );
}
