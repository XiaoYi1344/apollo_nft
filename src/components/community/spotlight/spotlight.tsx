'use client';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const collection = [
  { id: 1, img: '/community/spot.png' },
  { id: 2, img: '/community/spot1.png' },
  { id: 3, img: '/community/spot2.png' },
  { id: 4, img: '/community/spot3.png' },
];

const Spotlight = () => {
  return (
    <Stack
      sx={{
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        mx: { xs: 2, sm: 4, md: 8, lg: 10 },
        borderRadius: 5,
        border: '0.2px solid #fff3',
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 3, sm: 6, md: 9 },
        bgcolor: '#1a1044',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', sm: 'start' },
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2 },
          mt: 2,
          mb: 3,
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Avatar
          src="/creator/avatar2.jpg"
          alt="Spotlight avatar"
          sx={{
            width: { xs: 50, sm: 60, md: 70 },
            height: { xs: 50, sm: 60, md: 70 },
            boxShadow: '0 0 20px rgba(255,255,255,0.3)',
          }}
        />

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: '#ddd',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          }}
        >
          Collector of the Week:{' '}
          <Box
            component="span"
            sx={{
              color: '#66c9c5',
              fontWeight: 700,
            }}
          >
            @NFTCollector123
          </Box>
        </Typography>
      </Box>

      {/* Quote */}
      <Typography
        sx={{
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
          fontWeight: 300,
          color: '#ccc',
          textAlign: { xs: 'center', sm: 'left' },
          px: { xs: 1, sm: 0 },
          pb: { xs: 3, sm: 4, md: 5 },
          lineHeight: 1.6,
        }}
      >
        &quot;I believe every NFT isn&apos;t just an asset, but a piece of a
        larger story. Apollo NFT has helped me find the most unique pieces for
        my own story.&quot;
      </Typography>

      {/* Featured Collection */}
      <Box>
        <Typography
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            fontWeight: 600,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Featured Collection:
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            gap: { xs: 2, sm: 3, md: 4 },
            mt: { xs: 2, sm: 3 },
          }}
        >
          {collection.map((item) => (
            <Box
              key={item.id}
              sx={{
                position: 'relative',
                width: { xs: 130, sm: 200, md: 250, lg: 270 },
                height: { xs: 130, sm: 200, md: 250, lg: 270 },
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <Image
                src={item.img}
                alt={`Spotlight ${item.id}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default Spotlight;
