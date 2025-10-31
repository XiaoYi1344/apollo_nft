'use client';

import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Image from 'next/image';

const features = [
  {
    img: '/drop/wallet.png',
    title: 'Set up your wallet',
    desc: 'Once you&apos;ve set up your wallet of choice, connect it to Apollo by clicking the wallet icon in the top right corner. Learn about the wallets we support.',
  },
  {
    img: '/drop/frame.png',
    title: 'Create your collection',
    desc: 'Click "My Collections" and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.',
  },
  {
    img: '/drop/add.png',
    title: 'Add your NFTs',
    desc: 'Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.',
  },
];

export default function NFT() {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
      <Typography
        variant="h4"
        sx={{ color: 'white', fontWeight: 700, textAlign: 'center', mb: 3 }}
      >
        Create Your Sell NFT
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((item, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <Card
              sx={{
                borderRadius: 4,
                backgroundColor: 'transparent',
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
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    position: 'relative',
                    backgroundColor: '#f3e8ff',
                    borderRadius: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={32}
                    height={32}
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
