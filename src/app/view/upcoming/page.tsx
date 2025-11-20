'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Dynamic import client component, ssr false
const Up_events = dynamic(
  () => import('@/components/view_all/Upcoming/Up_events').then((mod) => mod.Up_events),
  {
    ssr: false, // chỉ chạy client
    // Thay vì dùng loading riêng, bạn có thể bọc Suspense
  }
);

export default function Page() {
  return (

      <Up_events />

  );
}
