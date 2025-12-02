// 'use client';
// import Upload from '@/components/uploads/Upload'
// import React from 'react'

// const page = () => {
//   return (
//     <Upload />
//   )
// }

// export default page


// app/uploads/page.tsx
import UploadClientWrapper from './UploadClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <UploadClientWrapper />;
}
