'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const features = [
  { name: 'Riki Prakasa', info: '19.2K ETH Sales' },
  { name: 'Eril Tetayasa Sirga', info: '17.8K ETH Sales' },
  { name: 'Gede Opung Utama', info: '15.4K ETH Sales' },
  { name: 'Eka Nainggolan', info: '12.5K ETH Sales' },
  { name: 'Eri Nainggolan', info: '9.7K ETH Sales' },
  { name: 'Among Suryono', info: '8.2K ETH Sales' },
];

export default function Creator() {
  const router = useRouter();

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
      {/* === HEADER SECTION === */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 700,
            textAlign: 'start',
          }}
        >
          Creator of The Week
        </Typography>

        <Button
          variant="contained"
          onClick={() => router.push('/explore')}
          sx={{
            px: 2.3,
            py: 1.5,
            borderRadius: '9999px',
            textTransform: 'none',
            background: '#8c4aff',
            boxShadow: '0 0 20px rgba(140,74,255,0.5)',
            '&:hover': {
              boxShadow: '0 0 25px rgba(140,74,255,0.8)',
            },
          }}
        >
          View All Creator
        </Button>
      </Box>

      {/* === CREATOR CARDS === */}
      <Grid container spacing={3} justifyContent="center">
        {features.map((item, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
            <Card
              sx={{
                borderRadius: 4,
                background: 'white',
                height: '90%',
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
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {/* === SỐ THỨ TỰ === */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    color: '#8c4aff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    flexShrink: 0,
                    mr: 6,
                  }}
                >
                  {i + 1}.
                </Box>

                {/* === TEXT === */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1.2rem', md: '1.2rem' },
                      fontWeight: 600,
                      color: 'black',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#9E9E9F',
                      pt: 0.5,
                      fontSize: { xs: '0.9rem', md: '0.9rem' },
                    }}
                  >
                    {item.info}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
