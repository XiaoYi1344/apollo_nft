import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar/navbar';
import Footer from '@/components/layout/footer/footer';
import { Box } from '@mui/material';
import ClientWrapper from './ClientWrapper';
// import { ClientProvider } from './ClientProvider';
// import { WagmiAppProvider } from '@/providers/wagmi-provider';
// import ClientWrapper from './ClientWrapper'; // <--- client wrapper mới

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Apollo NFT',
  description: 'Landing Apollo NFT Community',
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'icon', url: '/digital-wallet.png', type: 'image/png' },
      { rel: 'shortcut icon', url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: { url: '/digital-wallet.png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-nft-dark`}
      >
        <Navbar />
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* Glow dưới nền */}
          <Box
            className="glow"
            style={{
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

          {/* Nội dung nổi trên glow */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* ✅ ClientWrapper sẽ wrap tất cả client components */}
            <ClientWrapper>{children}</ClientWrapper>
            <Footer />
          </Box>
        </Box>
      </body>
    </html>
  );
}
