'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const Upload = dynamic(() => import('@/components/uploads/Upload'), {
  ssr: false,
});

export default function Page() {
  return (
      <Upload />
  );
}
