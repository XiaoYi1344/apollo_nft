'use client';
import Marquee from 'react-fast-marquee';
import { Box, Stack, Typography, Grid, Button } from '@mui/material';
import Image from 'next/image';

const partners = [
  {
    name: 'Join our Discord Server',
    img: '/community/discord.png',
    text: 'Join 24/7 discussions, access exclusive AMAs, and get early drop notifications.',
    button: 'Join Server',
    color_button: '#5146e5',
    link: '/',
  },
  {
    name: 'Follow us on X',
    img: '/community/x.png',
    text: 'Get the latest news, major announcements, and join the global conversation.',
    button: 'Follow Us',
    color_button: '#2563eb',
    link: '',
  },
];

const pattern = [
  { type: 'discord', color: '#b78eff' },
  { type: 'x', color: '#00d2ff' },
  { type: 'discord', color: '#f6d365' },
  { type: 'x', color: '#ffd200' },
];

export default function Connect() {
  return (
    <Box sx={{ mt: 2, pb: 6, overflow: 'hidden' }}>
      {/* 👉 Marquee cho tablet, laptop, desktop */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Marquee
          gradient={false}
          speed={35}
          pauseOnHover
          direction="right"
          style={{ paddingBottom: '10px' }}
        >
          <Stack direction="row">
            {Array.from({ length: 2 }).map((_, repeatIndex) =>
              pattern.map((p, i) => {
                const data = p.type === 'discord' ? partners[0] : partners[1];
                return (
                  <Box
                    key={`${p.type}-${i}-${repeatIndex}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: { xs: 3, md: 4 },
                      width: { sm: 300, md: 380, lg: 450 },
                      height: { sm: 180, md: 200, lg: 220 },
                      borderRadius: 4,
                      ml: { sm: 2, md: 3, lg: 4 },
                      my: 2,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      opacity: 0.95,
                      background: p.color,
                      border: `1px solid ${p.color}`,
                      '&:hover': {
                        transform: 'scale(1.05)',
                        opacity: 1,
                        boxShadow: '0 0 25px rgba(255,255,255,0.35)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 4,
                        zIndex: 0,
                      },
                      '& > *': {
                        position: 'relative',
                        zIndex: 1,
                      },
                    }}
                  >
                    {/* Header */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Image
                        src={data.img}
                        alt={data.name}
                        width={35}
                        height={35}
                        style={{ objectFit: 'contain', filter: 'brightness(1.1)' }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: 'white',
                          fontWeight: 600,
                          letterSpacing: 0.5,
                          fontSize: { sm: '1rem', md: '1.2rem' },
                        }}
                      >
                        {data.name}
                      </Typography>
                    </Box>

                    {/* Mô tả */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#fff9',
                        letterSpacing: 0.4,
                        fontSize: { sm: '0.85rem', md: '1rem' },
                        lineHeight: 1.5,
                        flexGrow: 1,
                      }}
                    >
                      {data.text}
                    </Typography>

                    {/* Nút hành động */}
                    {data.link ? (
                      <Button
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          bgcolor: data.color_button,
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: { sm: '0.75rem', md: '0.85rem' },
                          textTransform: 'capitalize',
                          width: '100%',
                          mt: 2,
                          borderRadius: 2,
                          py: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: data.color_button,
                            filter: 'brightness(1.2)',
                          },
                        }}
                      >
                        {data.button}
                      </Button>
                    ) : (
                      <Button
                        disabled
                        sx={{
                          bgcolor: '#555',
                          color: '#ccc',
                          width: '100%',
                          mt: 2,
                          borderRadius: 2,
                          py: 1,
                        }}
                      >
                        {data.button}
                      </Button>
                    )}
                  </Box>
                );
              })
            )}
          </Stack>
        </Marquee>
      </Box>

      {/* 👉 Grid layout cho mobile */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          mt: 1,
          px: 2,
        }}
      >
        {pattern.map((p, i) => {
          const data = p.type === 'discord' ? partners[0] : partners[1];
          return (
            <Grid size={{ xs: 6 }} key={i}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  borderRadius: 3,
                  background: p.color,
                  opacity: 0.9,
                  height: 160,
                  '&:hover': { opacity: 1 },
                }}
              >
                <Image
                  src={data.img}
                  alt={data.name}
                  width={36}
                  height={36}
                  style={{ objectFit: 'contain', filter: 'brightness(1.1)' }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    color: 'white',
                    fontWeight: 500,
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    lineHeight: 1.2,
                  }}
                >
                  {data.text}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
