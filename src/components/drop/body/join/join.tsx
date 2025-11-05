'use client';

import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const JoinSection = () => {
  return (
    <Box sx={{ pt: 8 }}>
      <Box
        sx={{
          position: 'relative',
          background:
            'linear-gradient(90deg, #A100EB 0%, #793CDF 25%, #3605FF 90%)',

          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(120, 60, 255, 0.35)',
        }}
      >
        {/* BTC */}
        <Box
          sx={{
            width: 96,
            height: 95,
            position: 'absolute',
            left: 60,
            top: '10%',
          }}
        >
          <Image
            src="/drop/btc.png"
            alt="BTC"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
            style={{
              objectFit: 'contain',
              filter: 'brightness(0)', // chuyển hoàn toàn sang đen
              opacity: 0.2, // độ mờ = 50%
            }}
          />
        </Box>

        {/* BNB */}
        <Box
          sx={{
            width: 60,
            height: 60,
            position: 'absolute',
            right: 60,
            bottom: '10%',
            // transform: 'rotate(19deg)',
          }}
        >
          <Image
            src="/drop/vector.png"
            alt="BTC"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
            style={{
              objectFit: 'contain',
              filter: 'brightness(0)', // chuyển hoàn toàn sang đen
              opacity: 0.2, // độ mờ = 50%
            }}
          />
        </Box>

        {/* Text + Button */}
        <Typography
          sx={{
            fontSize: { xs: '1.6rem', md: '2.6rem' },
            fontWeight: 700,
            color: '#fff',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Join Our Community
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.6rem' },
            color: '#fff',
            mb: 2,
            textAlign: 'center',
            maxWidth: { xs: '90%', md: 630 },
            mx: 'auto',
          }}
        >
          Gặp gỡ đội ngũ của chúng tôi, các nghệ sĩ và những nhà sưu tầm khác.
          Tham gia thảo luận, các cuộc thi và nhiều sự kiện độc quyền khác.
        </Typography>

        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: '9999px',
            textTransform: 'none',
            background: '#ffffff',
            color: '#793CDF',
            fontWeight: 600,
            boxShadow: '0 0 20px rgba(140,74,255,0.5)',
            '&:hover': {
              background: '#fff',
              boxShadow: '0 0 25px rgba(140,74,255,0.8)',
            },
          }}
        >
          Join Our Discord
        </Button>
      </Box>
    </Box>
  );
};

export default JoinSection;
