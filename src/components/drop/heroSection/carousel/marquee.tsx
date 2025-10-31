'use client';
import { Box, Typography, Stack } from '@mui/material';

const partners = [
  { name: 'Powered by', text: 'Powered by' },
  { name: 'coinbase', text: 'coinbase' },
  { name: 'Spotify', text: 'Spotify' },
  { name: 'slack', text: 'slack' },
  { name: 'Dropbox', text: 'Dropbox' },
  { name: 'webflow', text: 'webflow' },
];

export default function PartnersMarquee() {
  const liveItems = Array(6).fill('LIVE AUCTION');

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Partners row */}
      <Stack direction="row" spacing={4} justifyContent="center" sx={{ py: 2 }}>
        {partners.map((p, i) => (
          <Typography
            key={i}
            sx={{
              color: '#D0D1CC',
              fontSize: '0.8rem',
              letterSpacing: 0.5,
              opacity: 0.9,
              transition: 'all 0.3s ease',
              '&:hover': { opacity: 1, transform: 'scale(1.05)' },
              whiteSpace: 'nowrap',
            }}
          >
            {p.text}
          </Typography>
        ))}
      </Stack>

      {/* LIVE AUCTION marquee */}
      <Stack direction="row" spacing={4} justifyContent="center"  sx={{ backgroundColor: '#FFD511', }} >
        {liveItems.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              px: 4,
              py: 2,
              mx: 1,
              borderRadius: 1,
              
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '0.7rem',
                letterSpacing: '1px',
                color: 'black',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
