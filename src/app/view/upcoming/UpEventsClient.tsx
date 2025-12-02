// app/view-all/upcoming/UpEventsClient.tsx
'use client';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const UpEventsClient = dynamic(
  () => import('@/components/view_all/Upcoming/Up_events').then(m => m.Up_events),
  { ssr: false }
);

export default function UpEventsClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpEventsClient />
    </Suspense>
  );
}
