'use client';

import { Box, Button, Typography, Stack, Grid } from '@mui/material';
// import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

// const GradientText = styled('span')({
//   // background: 'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
//   background: 'linear-gradient(90deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
// });

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
        px: { xs: 4, md: 10 },
        overflow: 'hidden',
        // background:
        //   "linear-gradient(135deg, #2b006b 0%, #1a0047 40%, #080018 100%)",
        // background: '#080018',
        color: 'white',
      }}
    >
      {/* Vầng sáng */}
      <Box
        className="glow"
        sx={{
          '--glow-top': '-43%',
          '--glow-left': '-32%',
          '--glow-size': '1000px',
          '--glow-color1': 'rgba(190,74,255,0.7)',
          '--glow-color2': 'rgba(45,161,255,0.1)',
          '--glow-blur': '100px',
          '--glow-opacity': '1',
        }}
      />

      {/* Text content */}
      <Stack
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        spacing={2}
        sx={{ position: 'relative', zIndex: 2, maxWidth: { xs: 500, md: 780 } }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            lineHeight: 1.0,
            fontSize: { xs: '2.1rem', md: '5.1rem' },
            position: 'relative', // 👈 cần để định vị icon
            display: 'inline-block',
          }}
        >
          Create Your <br />
          Own{' '}
          <span
            style={{
              background: 'linear-gradient(90deg,#A100EB,#3605FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NFT DREAM
          </span>{' '}
          <br />
          Gallery
          <Box
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'center',
              position: 'relative',
              top: '-14px',
              left: '12px',
              width: 32,
              height: 32,
              transform: 'scale(2.3) rotate(-15deg)',
              transformOrigin: 'center',
            }}
          >
            <Image
              src="/home/hero/star.png"
              alt="Sparkle"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Typography>

        <Box
          sx={{
            position: 'relative',
            mt: 6,
            px: { xs: 2, md: 8 },
          }}
        >
          <Grid container spacing={3} alignItems="center">
            {/* Đoạn mô tả */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6,
                  fontSize: { xs: '0.95rem', md: '0.9rem' },
                  maxWidth: 360,
                  mx: { xs: 'auto', md: 0 },
                  textAlign: { xs: 'center', md: 'left' },
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                The Largest NFT Marketplace. Automatic and truly unique digital
                creation. Signed and issued by the creator, made possible by
                blockchain technology.
              </Typography>
            </Grid>

            {/* Nút Discover NFT */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: {xs:'30%', md:'50%'},
                    width: {xs:60, md:100},
                    height: {xs:30, md:100},
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textTransform: 'none',
                    background: {
                      xs: '#3605FF',
                      md: 'linear-gradient(125deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
                    },
                    boxShadow: '0 0 25px rgba(140,74,255,0.5)',
                    display: 'flex',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: '0 0 40px rgba(140,74,255,0.8)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ArrowOutwardIcon
                    sx={{
                      transform: 'rotate(90deg)',
                      fontSize: 28,
                      position: 'absolute',
                      top: {xs:-10, md:29},
                      right: 10,
                      display: { xs: 'none', md: 'block' }, // 👈 ẩn ở mobile, hiện ở tablet/desktop
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.68rem',
                      textAlign: 'center',
                      mt: 2,
                      color: '#fff',
                    }}
                  >
                    Discover NFT
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Stats */}
        <Stack direction="row" spacing={6} sx={{ mt: 4 }}>
          {[
            { num: '25.1k', label: 'Artwork' },
            { num: '15.6k', label: 'Artist' },
            { num: '10.2k', label: 'Auction' },
          ].map((item) => (
            <Stack key={item.label}>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {item.label}
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {item.num}
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
          width: { xs: 280, md: 360 },
          height: { xs: 360, md: 460 },
          borderRadius: '24px',
          display: { xs: 'none', md: 'block' },
        }}
      >
        {/* Layer 1 (Back Left) */}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: 130,
            width: 391,
            height: 494,
            borderRadius: '20px',
            overflow: 'hidden',
            zIndex: 0,
            // transform: 'rotate(-3deg)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 2.jpg"
            alt="NFT Background Left"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {/* Layer 2 (Back Right) */}
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            right: -10,
            width: 391,
            height: 494,
            borderRadius: '20px',
            overflow: 'hidden',
            zIndex: 1,
            // transform: 'rotate(3deg)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 3.jpg"
            alt="NFT Background Right"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {/* Layer 3 (Front/Main Image) */}
        <Box
          sx={{
            top: 0,
            right: 85,
            position: 'relative',
            width: { xs: 280, md: 391 },
            height: { xs: 360, md: 494 },
            borderRadius: '24px',
            overflow: 'hidden',
            zIndex: 2,
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          <Image
            src="/home/hero/top1.jpg"
            alt="NFT Main"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {/* Light Glow Background */}
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 320,
            height: 400,
            borderRadius: '24px',
            background:
              'linear-gradient(180deg, rgba(45,161,255,0.6), rgba(0,240,255,0.2))',
            filter: 'blur(80px)',
            zIndex: -1,
          }}
        />
      </Box>
    </Box>
  );
};

export default TopSection;
