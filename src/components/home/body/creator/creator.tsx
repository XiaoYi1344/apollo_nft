'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const features = [
  {
    img: '/home/body/Wallet (4).jpg',
    title: 'Eka Prakasa',
  },
  {
    img: '/home/body/Wallet (5).jpg',
    title: 'Emil Tirtayasa Sinaga',
  },
  {
    img: '/home/body/Wallet (1).jpg',
    title: 'Dodo Opung Utama',
  },
  {
    img: '/home/body/Wallet (2).jpg',
    title: 'Emil Nainggolan',
  },
  {
    img: '/home/body/Wallet (3).jpg',
    title: 'Eja Nainggolan',
  },
  {
    img: '/home/body/Wallet (6).jpg',
    title: 'Among Suryono',
  },
];

export default function Creator() {
  const router = useRouter();
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 },}}>
      <Typography
        variant="h4"
        sx={{ color: 'white', fontWeight: 700, textAlign: 'start', mb: 3 }}
      >
        Creator of The Week
      </Typography>

      <Grid container spacing={3} justifyContent="center">
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
                  alignItems: 'start',
                  textAlign: 'start',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden', // ✅
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '1.4rem' },
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      pt: 1,
                      fontSize: { xs: '2.5rem', md: '1.0rem' },
                    }}
                  >
                    13.2K
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* === VIEW MORE BUTTON === */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => router.push('/explore')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '9999px',
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(90deg,#8c4aff,#2da1ff)',
            boxShadow: '0 0 20px rgba(140,74,255,0.5)',
            '&:hover': {
              boxShadow: '0 0 25px rgba(140,74,255,0.8)',
            },
          }}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
}
