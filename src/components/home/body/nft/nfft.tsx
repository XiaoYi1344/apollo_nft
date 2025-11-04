'use client';

import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Image from 'next/image';

const features = [
  {
    img: '/home/body/wallet.png',
    title: 'Connect Wallet',
    desc: 'This growth plan will help you reach your resolutions and achieve the goals you have been striving towards.',
  },
  {
    img: '/home/body/trolley.png',
    title: 'NFT Marketplace',
    desc: 'This growth plan will help you reach your resolutions and achieve the goals you have been striving towards.',
  },
  {
    img: '/home/body/menu.png',
    title: 'Collect NFT',
    desc: 'This growth plan will help you reach your resolutions and achieve the goals you have been striving towards.',
  },
];

export default function NFT() {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 }, }}>
      <Typography
        variant="h4"
        sx={{ color: 'white', fontWeight: 700, textAlign: 'start', mb: 3 }}
      >
        Create Your Sell NFT
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((item, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <Card
              sx={{
                borderRadius: 4,
                background: 'linear-gradient(135deg, #2E1A5F, #3B0D7D)',
                color: 'white',
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  textAlign: 'start',
                  gap: 2,
                }}
              >
                <Box sx={{ width: 64, height: 64, position: 'relative' }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
