// 'use client';
// import Marquee from 'react-fast-marquee';
// import { Box, Stack, Typography } from '@mui/material';
// import Image from 'next/image';

// const partners = [
//   {
//     name: 'Coinbase',
//     img: '/home/hero/logo.webp',
//     text: '',
//     width: 150,
//     height: 60,
//   },
//   {
//     name: 'Spotify',
//     img: '/home/hero/logo6.png',
//     text: '',
//     width: 160,
//     height: 60,
//   },
//   {
//     name: 'Slack',
//     img: '/home/hero/logo2.png',
//     text: 'Slack',
//     width: 57,
//     height: 40,
//   },
//   {
//     name: 'Dropbox',
//     img: '/home/hero/logo3.png',
//     text: 'Dropbox',
//     width: 45,
//     height: 40,
//   },
//   {
//     name: 'Webflow',
//     img: '/home/hero/logo4.png',
//     text: '',
//     width: 130,
//     height: 60,
//   },
// ];
// export default function PartnersMarquee() {
//   return (
//     <Box
//       sx={{
//         mt:2,
//         pb: 4,
//         overflow: 'hidden',
//         // backgroundColor: 'transparent',
//       }}
//     >
//       <Marquee gradient={false} speed={40} pauseOnHover direction="left">
//         <Stack direction="row" sx={{ mx: 4 }}>
//           {partners.map((p, i) => (
//             <Box
//               key={i}
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 px: 9, // 👈 khoảng cách giữa các logo
//                 opacity: 0.9,
//                 transition: 'all 0.3s ease',
//                 '&:hover': { opacity: 1, transform: 'scale(1.05)' },
//               }}
//             >
//               <Image
//                 src={p.img}
//                 alt={p.name}
//                 width={p.width} // 👈 fix kích thước đồng nhất
//                 height={p.height} // 👈 chiều cao cố định
//                 style={{
//                   objectFit: 'contain',
//                   filter: 'brightness(1.1)',
//                   marginRight: p.text ? 8 : 0,
//                 }}
//               />
//               {p.text && (
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: 'white',
//                     fontWeight: 600,
//                     letterSpacing: 0.5,
//                     fontSize: '1.6rem',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   {p.text}
//                 </Typography>
//               )}
//             </Box>
//           ))}
//         </Stack>
//       </Marquee>
//     </Box>
//   );
// }

'use client';
import Marquee from 'react-fast-marquee';
import { Box, Stack, Typography, Grid } from '@mui/material';
import Image from 'next/image';

const partners = [
  { name: 'Coinbase', img: '/home/hero/logo.webp', width: 150, height: 60 },
  { name: 'Spotify', img: '/home/hero/logo6.png', width: 160, height: 60 },
  { name: 'Slack', img: '/home/hero/logo2.png', width: 57, height: 40, text: 'Slack' },
  { name: 'Dropbox', img: '/home/hero/logo3.png', width: 45, height: 40, text: 'Dropbox' },
  { name: 'Webflow', img: '/home/hero/logo4.png', width: 130, height: 60 },
  { name: 'Zoom', img: '/home/hero/logo5.png', width: 100, height: 40 },
];

export default function PartnersMarquee() {
  return (
    <Box sx={{ mt: 2, pb: 4, overflow: 'hidden' }}>
      {/* 👉 Marquee chỉ hiện ở md trở lên */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Marquee gradient={false} speed={40} pauseOnHover direction="left">
          <Stack direction="row" sx={{ mx: 4 }}>
            {partners.map((p, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 9,
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  '&:hover': { opacity: 1, transform: 'scale(1.05)' },
                }}
              >
                <Image
                  src={p.img}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  style={{
                    objectFit: 'contain',
                    filter: 'brightness(1.1)',
                    marginRight: p.text ? 8 : 0,
                  }}
                />
                {p.text && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      letterSpacing: 0.5,
                      fontSize: '1.2rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.text}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </Marquee>
      </Box>

      {/* 👉 Grid layout cho mobile */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          mt: 1,
        }}
      >
        {partners.map((p, i) => (
          <Grid size={{ xs: 6 }} key={i}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.9,
                '&:hover': { opacity: 1 },
              }}
            >
              <Image
                src={p.img}
                alt={p.name}
                width={p.width / 1.3} // thu nhỏ 1 chút cho mobile
                height={p.height / 1.3}
                style={{ objectFit: 'contain', filter: 'brightness(1.1)' }}
              />
              {p.text && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    color: 'white',
                    fontWeight: 500,
                    textAlign: 'center',
                  }}
                >
                  {p.text}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
