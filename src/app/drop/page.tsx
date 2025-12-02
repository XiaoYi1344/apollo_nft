// 'use client';

// import React from 'react';
// import DropPage from '@/components/drop/dropPage';

// export default function Page() {
//   return <DropPage />;
// }

// app/drop/page.tsx
import DropClient from './DropClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <DropClient />;
}
