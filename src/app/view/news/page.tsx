// 'use client';

// import { News } from '@/components/view_all/news/News'
// import React from 'react'

// export default function Page() {
//   return <News />
// }

// app/view-all/news/page.tsx
import NewsClientWrapper from './NewsClient';

//export const dynamic = 'force-dynamic';

export default function Page() {
  return <NewsClientWrapper />;
}
