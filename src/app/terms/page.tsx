
// import TermsSlidingPanel from '@/components/term/term'
// import React from 'react'

// const page = () => {
//   return (
//     <TermsSlidingPanel />
//   )
// }

// export default page


// app/terms/page.tsx
import TermsClientWrapper from './TermsClient';

export const dynamic = 'force-dynamic';

export default function Page() {
  return <TermsClientWrapper />;
}
