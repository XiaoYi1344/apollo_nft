// // app/_not-found/NotFoundClient.tsx
// 'use client';

// import React from 'react';
// import { Box, Typography, Button, Stack } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// export default function NotFoundClient() {
//   const router = useRouter();

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         height: '100vh',
//         background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: '#fff',
//         textAlign: 'center',
//         px: 3,
//       }}
//     >
//       <Stack spacing={4} alignItems="center">
//         {/* NFT-style Illustration */}
//         <Box
//           sx={{
//             width: 250,
//             height: 250,
//             borderRadius: 4,
//             overflow: 'hidden',
//             boxShadow: '0 0 40px rgba(140,74,255,0.5)',
//           }}
//         >
//           <Image
//             src="/images/nft-robot.png" // bạn đặt file trong public/images/
//             alt="NFT 404"
//             width={250}
//             height={250}
//             style={{ objectFit: 'cover' }}
//           />
//         </Box>

//         <Typography variant="h3" sx={{ fontWeight: 800 }}>
//           404
//         </Typography>
//         <Typography variant="h6" sx={{ color: '#bcb9d3' }}>
//           Ooops! The NFT you are looking for does not exist.
//         </Typography>

//         <Button
//           variant="contained"
//           onClick={() => router.push('/')}
//           sx={{
//             background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
//             px: 4,
//             py: 1.5,
//             fontWeight: 600,
//             borderRadius: 2,
//             textTransform: 'none',
//             '&:hover': { opacity: 0.9 },
//           }}
//         >
//           Back to Marketplace
//         </Button>
//       </Stack>
//     </Box>
//   );
// }

// components/_not-found/NotFoundClient.tsx
'use client';
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NotFoundClient() {
  const router = useRouter();
  return (
    <Box sx={{ width: '100%', height: '100vh', background: 'linear-gradient(120deg,#12192b,#182858,#341a57)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', px: 3 }}>
      <Stack spacing={4} alignItems="center">
        <Box sx={{ width: 250, height: 250, borderRadius: 4, overflow: 'hidden', boxShadow: '0 0 40px rgba(140,74,255,0.5)' }}>
          <Image src="/images/nft-robot.png" alt="NFT 404" width={250} height={250} style={{ objectFit: 'cover' }} />
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>404</Typography>
        <Typography variant="h6" sx={{ color: '#bcb9d3' }}>Ooops! The NFT you are looking for does not exist.</Typography>
        <Button variant="contained" onClick={() => router.push('/')} sx={{ background: 'linear-gradient(90deg,#7a3bff,#b78eff)', px: 4, py: 1.5, fontWeight: 600, borderRadius: 2, textTransform: 'none', '&:hover': { opacity: 0.9 } }}>Back to Marketplace</Button>
      </Stack>
    </Box>
  );
}
