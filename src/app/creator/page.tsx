// 'use client';
// import Page from '@/components/creator/page'
// import React from 'react'

// const page = () => {
//   return (
//     <Page />
//   )
// }

// export default page
// app/creator/creator-detail/page.tsx
import CreatorClient from './CreatorClient';

//export const dynamic = 'force-dynamic';

export default function Page() {
  return <CreatorClient />;
}
