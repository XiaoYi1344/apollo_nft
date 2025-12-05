// 'use client';
// import { Up_events } from '@/components/view_all/Upcoming/Up_events'
// import React from 'react'

// export default function Page() {
//   return <Up_events />
// }

// app/view-all/upcoming/page.tsx
import UpEventsClientWrapper from './UpEventsClient';

//export const dynamic = 'force-dynamic';

export default function Page() {
  return <UpEventsClientWrapper />;
}
