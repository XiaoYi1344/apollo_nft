// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import { useSearchParams, useRouter } from 'next/navigation';
// // import CreatorDetail from '@/components/creator/CreatorDetail';
// // import creatorsDefault, { Creator, NFTItem } from '@/components/creator/data/creatorsData';

// // const CreatorDetailPage = () => {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();

// //   const nameParam = searchParams?.get('name') ?? '';
// //   const addressParam = searchParams?.get('address') ?? '';
// //   const walletModeParam = searchParams?.get('walletMode') === 'true';

// //   const baseCreator = creatorsDefault[0];

// //   const [walletMode, setWalletMode] = useState(walletModeParam);
// //   const [creator, setCreator] = useState<Creator>({
// //     ...baseCreator,
// //     name: nameParam || baseCreator.name,
// //     username: addressParam || baseCreator.username,
// //   });

// //   useEffect(() => {
// //     if (walletMode) {
// //       // Khi Wallet Mode, tạo dữ liệu test
// //       const tempCreator: Creator = {
// //         id: 'wallet-user',
// //         name: 'Wallet User',
// //         username: addressParam || 'wallet_address',
// //         avatar: '/default-avatar.png',
// //         banner: '/default-banner.png',
// //         totalVolume: '0 ETH',
// //         nftsSold: 0,
// //         followers: '0',
// //         floorPrice: '0 ETH',
// //         works: 0,
// //         bio: 'Wallet connected user',
// //         items: [
// //           { id: 'w1', title: 'Wallet NFT #1', price: '0.5 ETH', img: '/creator_detail/cyber.png' },
// //           { id: 'w2', title: 'Wallet NFT #2', price: '1.2 ETH', img: '/creator_detail/mecha.png' },
// //         ],


// //         timeRange: 'all',
// //       };
// //       setCreator(tempCreator);
// //     } else {
// //       const normalCreator = {
// //         ...baseCreator,
// //         name: nameParam || baseCreator.name,
// //         username: addressParam || baseCreator.username,
// //       };
// //       setCreator(normalCreator);
// //     }
// //   }, [walletMode, addressParam, nameParam]);

// //   return (
// //     <div>
// //       {/* Toggle Wallet Mode để test */}
// //       <div style={{ textAlign: 'center', margin: '1rem' }}>
// //         <button onClick={() => setWalletMode(prev => !prev)}>
// //           Toggle Wallet Mode (Current: {walletMode ? 'Sell' : 'Buy'})
// //         </button>
// //       </div>

// //       <CreatorDetail
// //         onBack={() => router.back()}
// //         isWalletMode={walletMode}
// //       />
// //     </div>
// //   );
// // };

// // export default CreatorDetailPage;
// 'use client';
// import React, { useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import ProfileDetail from '@/components/creator/ProfileDetail';

// const CreatorDetailPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const walletModeParam = searchParams?.get('walletMode') === 'true';
//   const [walletMode, setWalletMode] = useState(walletModeParam);

//   return (
//     <div>
//       <div style={{ textAlign: 'center', margin: '1rem' }}>
//         <button onClick={() => setWalletMode(prev => !prev)}>
//           Toggle Wallet Mode (Current: {walletMode ? 'Sell' : 'Buy'})
//         </button>
//       </div>

//       <ProfileDetail
//         onBack={() => router.back()}
//         isWalletMode={walletMode}
//       />
//     </div>
//   );
// };

// export default CreatorDetailPage;
// app/creator/creator-detail/page.tsx
'use client';

import dynamicImport from 'next/dynamic';
import React from 'react';

// Dynamic import client-only component
const CreatorDetailClient = dynamicImport(
  () => import('./_CreatorDetailPageClient'),
  { ssr: false }
);

// Ngăn prerender page
export const dynamic = 'force-dynamic';

export default function Page() {
  return <CreatorDetailClient />;
}
