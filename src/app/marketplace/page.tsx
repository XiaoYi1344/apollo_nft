// 'use client';

// import Marketplace from '@/components/marketplace/Marketplace'
// import React from 'react'

// const page = () => {
//   return (
//     <Marketplace />
//   )
// }

// export default page

// app/marketplace/page.tsx
import MarketplaceClientWrapper from './MarketplaceClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <MarketplaceClientWrapper />;
}
