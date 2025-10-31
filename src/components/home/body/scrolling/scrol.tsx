import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const Scrol = () => {
  const items = Array(3).fill(0); // nhân bản nội dung 3 lần để lấp đầy

  return (
    <Stack
      sx={{
        ml:-4,
        width: '110%',
        overflow: 'hidden',
        position: 'relative',
        transform: 'rotate(-5deg)',
        background: 'linear-gradient(90deg, #6200EA, #8C50AC)',
        pointerEvents: 'none',
    zIndex: 0,
      }}
    >
      {/* Background nếu muốn có thêm */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '-10%',
          width: '120%',
          height: '100%',
          zIndex: 0,
        }}
      />

      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover
        direction="left"
        style={{ zIndex: 1, display: 'flex', alignItems: 'center' }}
      >
        {items.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'inline-block',
              px: 4,
              py: 2,
              whiteSpace: 'nowrap',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 800,
                fontSize: '6rem',
                letterSpacing: '2px',
                color: 'transparent',
                WebkitTextStroke: '1.5px white',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              LIVE-AUCTION
              {/* Icon phải */}
              <Box
                sx={{
                  position: 'relative',
                  width: 32,
                  height: 32,
                  transform: 'scale(2.4) rotate(-15deg)',
                  ml: 3,
                }}
              >
                <Image
                  src="/home/hero/whitestar.png"
                  alt="Sparkle"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            </Typography>
          </Box>
        ))}
      </Marquee>
    </Stack>
  );
};

export default Scrol;
