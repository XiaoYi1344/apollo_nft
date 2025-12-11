

import './globals.css';
import { WalletProvider } from '@/context/WalletContext';
import QueryProvider from './ClientProvider';
import ClientWrapper from './ClientWrapper';
import { Box } from '@mui/material';
// import Rule from '@/components/Rule';
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
                {/* <Rule> */}
                  <ClientWrapper>{children}</ClientWrapper>
                {/* </Rule> */}
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
