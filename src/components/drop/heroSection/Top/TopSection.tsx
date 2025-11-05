'use client';

import { Box, Typography, Stack } from '@mui/material';
// import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TopSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 10 },
        overflow: 'hidden',
        // background:
        //   "linear-gradient(135deg, #2b006b 0%, #1a0047 40%, #080018 100%)",
        // background: '#080018',
        color: 'white',
        mb: -10,
      }}
    >
      {/* Vầng sáng */}
      <Box
        className="glow"
        sx={{
          '--glow-bottom': '50%',
          '--glow-left': '2%',
          '--glow-width': '2700px',
          '--glow-height': '1400px',
          '--glow-color1': 'rgba(190,74,170,0.7)',
          '--glow-color2': 'rgba(45,161,255,0.1)',
          '--glow-blur': '100px',
          '--glow-opacity': '1',
          '--glow-radius': '0%',
          '--glow-type': ' circle at top',
          transform: 'rotate(200deg)',
        }}
      />

      {/* Text content */}
      <Stack
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        spacing={2}
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: { xs: 300, sm: 780 },
          mt: { xs: 1, sm: -15 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            lineHeight: 1.0,
            fontSize: { xs: '1.6rem', md: '3.5rem' },
            position: 'relative', // 👈 cần để định vị icon
            display: 'inline-block',
          }}
        >
          Create Your Own NFT Dream Gallery
          <Box
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'center',
              position: 'relative',
              top: '-14px',
              left: '20px',
              width: 17,
              height: 17,
              transform: 'scale(2.3)',
              transformOrigin: 'center',
            }}
          >
            <Image
              src="/drop/sparkle.png"
              alt="Sparkle"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            fontSize: { xs: '0.9rem', md: '1.5rem' },
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Welcome to Apollo, the next-generation NFT marketplace. Discover,
          collect, and trade unique digital items from the world&apos;s top
          artists.
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          sx={{
            position: 'relative',
            width: { xs: 280, md: 391 }, // dùng width chính xác của ảnh chính
            height: { xs: 230, md: 494 },
            borderRadius: '24px',
            mx: 'auto', // căn giữa theo parent
            display: { xs: 'block', md: 'none' },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 4,
              left: '56%', // đặt 50% parent width
              transform: 'translateX(-50%)', // căn giữa layer
              width: { xs: 160, md: 391 },
              height: { xs: 220, md: 494 },
              borderRadius: '20px',
              overflow: 'hidden',
              zIndex: 0,
              boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
            }}
          >
            <Image
              src="/drop/top.png"
              alt="NFT Background Left"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Box>

        {/* number */}
        <Stack
          direction="row"
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between', // khoảng cách đều
            alignItems: 'center',
            width: '100%', // chiếm toàn bộ width của parent
            maxWidth: 600, // giới hạn chiều rộng
            px: { xs: 1, sm: 6 },
            mx: 'auto', // căn giữa container
          }}
        >
          {[
            { num: '200K+', label: 'Art Work' },
            { num: '15.6K', label: 'Artist' },
            { num: '10.2K', label: 'Auction' },
          ].map((item) => (
            <Stack key={item.label} alignItems="center">
              <Typography
                variant="h5"
                fontWeight={700}
                fontSize={{ xs: '1.5rem', sm: '2.3rem' }}
              >
                {item.num}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.6)' }}
                fontSize="0.9rem"
              >
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* NFT Image Stack */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        sx={{
          position: 'relative',
          width: 391, // dùng width chính xác của ảnh chính
          height: 494,
          borderRadius: '24px',
          mx: 'auto', // căn giữa theo parent
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            left: '50%', // đặt 50% parent width
            transform: 'translateX(-50%)', // căn giữa layer
            width: { xs: 160, md: 391 },
            height: { xs: 220, md: 494 },
            borderRadius: '20px',
            overflow: 'hidden',
            zIndex: 0,
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/drop/top.png"
            alt="NFT Background Left"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TopSection;
