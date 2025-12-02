// // app/ClientWrapper.tsx
// 'use client';

// import React, { Suspense } from 'react';
// import dynamic from 'next/dynamic';
// import { WagmiAppProvider } from '@/providers/wagmi-provider';

// export default function ClientWrapper({ children }: { children: React.ReactNode }) {
//   const DynamicChildren = dynamic(() => Promise.resolve(() => <>{children}</>), { ssr: false });
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <DynamicChildren />
//       <WagmiAppProvider>{children}</WagmiAppProvider>
//     </Suspense>
//   );
// }

// app/ClientWrapper.tsx
'use client';

import React, { Suspense } from 'react';
import { WagmiAppProvider } from '@/providers/wagmi-provider';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WagmiAppProvider>
        {children}
      </WagmiAppProvider>
    </Suspense>
  );
}
