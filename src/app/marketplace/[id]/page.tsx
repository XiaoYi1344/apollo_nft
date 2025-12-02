// 'use client';

// import NFTDetail from '@/components/marketplace/table/NFTDetail'
// import React from 'react'

// const page = () => {
//   return (
//     <NFTDetail />
//   )
// }

// export default page

// app/marketplace/nft-detail/page.tsx
import NFTDetailClientWrapper from './NFTDetailClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <NFTDetailClientWrapper />;
}
