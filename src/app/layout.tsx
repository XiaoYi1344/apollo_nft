// // app/layout.tsx
// import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
// import './globals.css';
// import Navbar from '@/components/layout/navbar/navbar';
// import Footer from '@/components/layout/footer/footer';
// import { Box } from '@mui/material';
// import ClientWrapper from './ClientWrapper';
// import { WalletProvider } from '@/context/WalletContext';
// import QueryProvider from './ClientProvider';

// const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
// const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Apollo NFT',
//   description: 'Landing Apollo NFT Community',
//   icons: {
//     icon: [
//       { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' },
//       { rel: 'icon', url: '/digital-wallet.png', type: 'image/png' },
//       { rel: 'shortcut icon', url: '/favicon.ico', type: 'image/x-icon' },
//     ],
//     apple: { url: '/digital-wallet.png' },
//   },
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-nft-dark`}>
//         <WalletProvider>
//           <Navbar />
//           <Box sx={{ position: 'relative', overflow: 'hidden' }}>
//             <Box
//               className="glow"
//               sx={{
//                 position: 'absolute',
//                 width: 600,
//                 height: 600,
//                 borderRadius: '50%',
//                 zIndex: 0,
//                 top: '70%',
//                 left: '100%',
//                 transform: 'translate(-50%, -50%)',
//                 pointerEvents: 'none',
//               }}
//             />
//             <Box sx={{ position: 'relative', zIndex: 1 }}>
//              <QueryProvider>
//                 <ClientWrapper>{children}</ClientWrapper>
//               </QueryProvider>
//               <Footer />
//             </Box>
//           </Box>
//         </WalletProvider>
//       </body>
//     </html>
//   );
// }

import './globals.css';
import { WalletProvider } from '@/context/WalletContext';
import QueryProvider from './ClientProvider';
import ClientWrapper from './ClientWrapper';
import { Box } from '@mui/material';
import Rule from '@/components/Rule';
import AppNavFooter from './AppNavFooter';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-nft-dark">
        <WalletProvider>
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              className="glow"
              sx={{
                position: 'absolute',
                width: 600,
                height: 600,
                borderRadius: '50%',
                zIndex: 0,
                top: '70%',
                left: '100%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <QueryProvider>
                <Rule>
                  <ClientWrapper>{children}</ClientWrapper>
                </Rule>
              </QueryProvider>

              {/* Client Navbar + Footer */}
              <AppNavFooter />
            </Box>
          </Box>
        </WalletProvider>
      </body>
    </html>
  );
}
