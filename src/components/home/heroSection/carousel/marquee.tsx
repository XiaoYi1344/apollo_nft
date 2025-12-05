
'use client';
import Marquee from 'react-fast-marquee';
import { Box, Stack, Typography, Grid } from '@mui/material';
// import Image from 'next/image';

const partners = [
  { name: 'Coinbase', img: '/home/hero/logo.webp', width: 150, height: 60 },
  { name: 'Spotify', img: '/home/hero/logo6.png', width: 160, height: 60 },
  {
    name: 'Slack',
    img: '/home/hero/logo2.png',
    width: 57,
    height: 40,
    text: 'Slack',
  },
  {
    name: 'Dropbox',
    img: '/home/hero/logo3.png',
    width: 45,
    height: 40,
    text: 'Dropbox',
  },
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
                <Box
  component="img"
  src={p.img}
  alt={p.name}
  sx={{
    width: p.width,
    height: 'auto',           // preserves aspect ratio
    objectFit: 'contain',
    filter: 'brightness(1.1)',
    mr: p.text ? 1 : 0,       // margin-right if text exists
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
              <Box
  component="img"
  src={p.img}
  alt={p.name}
  sx={{
    width: Math.round(p.width / 1.3),
    height: 'auto',            // giữ tỉ lệ ảnh
    objectFit: 'contain',
    filter: 'brightness(1.1)',
  }}
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
