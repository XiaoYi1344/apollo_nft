// 'use client';
// import PivacySlidingPanel from '@/components/privacy/privacy'
// import React from 'react'

// const page = () => {
//   return (
//     <PivacySlidingPanel />
//   )
// }

// export default page

// app/privacy/page.tsx
import PrivacyClientWrapper from './PrivacyClient';

//export const dynamic = 'force-dynamic';

export default function Page() {
  return <PrivacyClientWrapper />;
}
