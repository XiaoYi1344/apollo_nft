// 'use client';
// import ContactPage from '@/components/contact_us/contact'
// import React from 'react'

// const page = () => {
//   return (
//     <ContactPage />
//   )
// }

// export default page

// app/contact/page.tsx
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic'; // tránh prerender

export default function Page() {
  return <ContactClient />;
}
