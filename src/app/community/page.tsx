// 'use client';
// import Community from '@/components/community/community'
// import React from 'react'

// const page = () => {
//   return (
//     <Community />
//   )
// }

// export default page


// app/community/page.tsx
import CommunityClient from './CommunityClient';

export const dynamic = 'force-dynamic'; // tránh prerender

export default function Page() {
  return <CommunityClient />;
}
