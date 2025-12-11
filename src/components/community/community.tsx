
// components/community/Community.tsx
'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React from 'react';

// Các component con
const Connect = dynamic(() => import('./connect/Connect'), { ssr: false });
const Upcoming = dynamic(() => import('./upcoming/Upcoming'), { ssr: false });
const Spotlight = dynamic(() => import('./spotlight/spotlight'), { ssr: false });
const NewsUpdate = dynamic(() => import('./new&update/News'), { ssr: false });

const Community: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Glow Effects */}
      <Box
        className="glow"
        sx={{
          '--glow-top': '25%',
          '--glow-left': '-42%',
          '--glow-size': '1100px',
          '--glow-color1': 'rgba(190,74,255,0.7)',
          '--glow-color2': 'rgba(45,161,255,0.1)',
          '--glow-blur': '140px',
          '--glow-opacity': '1',
          position: 'absolute',
          zIndex: 2,
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        className="glow"
        sx={{
          '--glow-top': '68%',
          '--glow-left': '70%',
          '--glow-size': '1000px',
          '--glow-color1': 'rgba(190,74,255,0.6)',
          '--glow-color2': 'rgba(45,161,255,0.1)',
          '--glow-blur': '100px',
          '--glow-opacity': '3',
          position: 'absolute',
          zIndex: 2,
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 340, sm: 450, md: 650 },
        }}
      >
        <Box
          component="img"
          src="/community/banner.jpg"
          alt="community banner"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.45)',
            display: 'block',
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          spacing={2}
          sx={{
            position: 'absolute',
            left: { xs: '6%', md: '5%' },
            bottom: { xs: '22%', md: '38%' },
            zIndex: 3,
            textAlign: 'left',
            px: { xs: 2, sm: 3 },
            maxWidth: { xs: 400, sm: 500, md: 900 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              fontSize: { xs: '1.5rem', sm: '2.6rem', md: '4rem' },
              color: '#fff',
            }}
          >
            Welcome to the{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg,#66c9c5,#59f5bb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Apollo
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg,#8e42e6,#7497d2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Community
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#cfcfff',
              maxWidth: { xs: 340, sm: 460, md: 600 },
              fontWeight: 400,
              mt: 1.5,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
            }}
          >
            Where creators, collectors, and Web3 enthusiasts build the future of
            digital art together.
          </Typography>
        </Stack>
      </Box>

      {/* Sections */}
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          pb: 2,
          pt: { xs: 5, md: 7 },
        }}
      >
        Connect With Us
      </Typography>
      <Connect />

      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          pb: 2.5,
          color: '#fff',
          pt: { xs: 5, md: 6 },
          mt: { xs: 3, md: 5 },
        }}
      >
        Community Spotlight
      </Typography>
      <Spotlight />

      <NewsUpdate spaceName="Apollo Space Center" spaceLink="/news/apollo" />

      <Upcoming />
    </Box>
  );
};

export default Community;
