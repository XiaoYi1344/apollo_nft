
'use client';

import { Box, Button, Typography, Stack, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const TopSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '30vh', sm: '60vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 4, md: 10 },
        overflow: 'hidden',
        color: 'white',
        py: { xs: 9 },
        mb: -10,
      }}
    >
      {/* Hiệu ứng vầng sáng */}
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

          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* TEXT CONTENT */}
      <Stack
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        spacing={2}
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: { xs: 500, md: 780 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            lineHeight: 1,
            fontSize: { xs: '2.1rem', md: '5.1rem' },
            position: 'relative',
          }}
        >
          Create Your <br />
          Own <span className="gradient-text">NFT DREAM</span>
          <style jsx>{`
            .gradient-text {
              background: linear-gradient(90deg, #a100eb, #3605ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: blue; /* màu mặc định trên mobile */
              font-weight: 700;
              font-size: 2.1rem; /* xs */
              transition: all 0.3s ease; /* mượt mà khi thay đổi */
            }

            @media (min-width: 600px) {
              .gradient-text {
                -webkit-text-fill-color: transparent;
                font-size: 2.4rem; /* sm */
              }
            }

            @media (min-width: 900px) {
              .gradient-text {
                font-size: 5.1rem; /* md */
              }
            }
          `}</style>
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
              sizes="32px"
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Typography>

        {/* DESCRIPTION + BUTTON */}
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            mt: 4,
            flexDirection: { xs: 'column-reverse', md: 'row' }, // 👈 xs: button dưới, md: button trái
          }}
        >
          {/* Button bên trái ở md, nhưng xuống dưới ở xs */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  borderRadius: { xs: '20px', md: '50%' },
                  width: { xs: '100%', md: 100 },
                  height: { xs: 36, md: 100 },
                  flexDirection: { xs: 'row', md: 'column' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'none',
                  background: {
                    xs: '#3605FF',
                    md: 'linear-gradient(125deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
                  },
                  boxShadow: '0 0 25px rgba(140,74,255,0.5)',
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
                    top: { xs: -10, md: 29 },
                    right: 10,
                    display: { xs: 'none', md: 'block' },
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: { xs: 700, md: 500 },
                    fontSize: { xs: '0.8rem', md: '0.68rem' },
                    color: '#fff',
                    mt: { xs: 0, md: 2 },
                  }}
                >
                  Discover NFT
                </Typography>
              </Button>
            </Box>
          </Grid>

          {/* Text nằm trên ở xs, bên phải ở md */}
          <Grid size={{ xs: 12, md: 10 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                fontSize: '0.9rem',
                maxWidth: 330,
                position: { xs: 'none', md: 'relative' },
                top: { xs: 0, md: '-19px' },
                textAlign: 'left',
              }}
            >
              The Largest NFT Marketplace. Automatic and truly unique digital
              creation. Signed and issued by the creator, made possible by
              blockchain technology.
            </Typography>
          </Grid>
        </Grid>

        {/* NFT IMAGE (MOBILE) */}
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            position: 'relative',
            mx: 'auto',
            mt: 4,
            width: 280,
            height: 360,
            borderRadius: '24px',
          }}
        >
          {['top 2.jpg', 'top 3.jpg', 'top1.jpg'].map((src, i) => (
            <Box
              key={src}
              sx={{
                position: 'absolute',
                top: ['25px', '105px', '60px'][i],
                right: ['70px', '-25px', '17px'][i],
                width: ['208px', '210px', '210px'][i],
                height: ['251px', '253px', '257px'][i],
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
              }}
            >
              <Image
                src={`/home/hero/${src}`}
                alt={`NFT ${i}`}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Stack>

        {/* STATS */}
        <Stack direction="row" spacing={6} sx={{ pt: 4 }}>
          {[
            { num: '25.1k', label: 'Artwork' },
            { num: '15.6k', label: 'Artist' },
            { num: '10.2k', label: 'Auction' },
          ].map((item) => (
            <Stack key={item.label}>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: { xs: '0.9rem', md: '1.4rem' },
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: '1.7rem', md: '2.0rem' } }}
              >
                {item.num}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* NFT IMAGE (tablet) */}
      <Stack
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        sx={(theme) => ({
          display: { xs: 'none', sm: 'block' },
          [theme.breakpoints.up('md')]: {
            display: 'none', // 👈 ẩn khi lên md+
          },
          position: 'relative',
          width: 400,
          height: 500,
        })}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            right: 85,
            width: 200,
            height: 300,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 2.jpg"
            alt="NFT Back Left"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
            style={{ objectFit: 'cover' }}
            priority={true}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '24%',
            right: '2%',
            width: 200,
            height: 300,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 3.jpg"
            alt="NFT Back Right"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: '15%',
            right: '-35%',
            width: 200,
            height: 300,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          <Image
            src="/home/hero/top1.jpg"
            alt="NFT Main"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Stack>

      {/* NFT IMAGE (DESKTOP) */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          width: 400,
          height: 520,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: 140,
            width: 340,
            height: 440,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 2.jpg"
            alt="NFT Back Left"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
            style={{ objectFit: 'cover' }}
            priority={true}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 50,
            right: 10,
            width: 340,
            height: 440,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 3.jpg"
            alt="NFT Back Right"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: 0,
            right: 10,
            width: 340,
            height: 440,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          <Image
            src="/home/hero/top1.jpg"
            alt="NFT Main"
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
