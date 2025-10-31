'use client';
import { useState } from 'react';
import {
  Box,
  Chip,
  Stack,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = ['Hope Ape', 'Abstract', 'Monkey', 'Cars', 'Art'];

interface NftItem {
  img: string;
  name: string;
  price: string;
}

const nftData: Record<string, NftItem[]> = {
  'Hope Ape': [
    { img: '/home/hero/hope1.jpg', name: 'ArtCrypto', price: '0.25 ETH' },
    { img: '/home/hero/hope2.jpg', name: 'ArtCrypto', price: '0.25 ETH' },
    { img: '/home/hero/hope3.jpg', name: 'ArtCrypto', price: '0.25 ETH' },
    { img: '/home/hero/hope4.jpg', name: 'ArtCrypto', price: '0.25 ETH' },
    { img: '/home/hero/hope5.jpg', name: 'ArtCrypto', price: '0.25 ETH' },
    { img: '/home/hero/hope6.jpg', name: 'ArtCrypto', price: '0.25 ETH' },
    { img: '/home/hero/hope7.jpg', name: 'ArtCrypto', price: '0.25 ETH' },
    { img: '/home/hero/hope8.jpg', name: 'ArtCrypto', price: '0.25 ETH' },
  ],
  Abstract: [
    { img: '/home/hero/hope9.jpg', name: 'ArtAbstract', price: '0.45 ETH' },
    { img: '/home/hero/hope10.jpg', name: 'ArtAbstract', price: '0.35 ETH' },
  ],
  Monkey: [
    { img: '/home/hero/hope1.jpg', name: 'MonkeyVibe', price: '0.3 ETH' },
    { img: '/home/hero/hope7.jpg', name: 'MonkeyVibe', price: '0.4 ETH' },
  ],
  Cars: [
    { img: '/home/hero/hope8.jpg', name: 'Fasthope', price: '0.5 ETH' },
    { img: '/home/hero/hope9.jpg', name: 'Fasthope', price: '0.6 ETH' },
  ],
  Art: [
    { img: '/home/hero/hope10.jpg', name: 'FineArt', price: '0.7 ETH' },
    { img: '/home/hero/hope11.jpg', name: 'FineArt', price: '0.8 ETH' },
  ],
};

export default function SuperHotDrop() {
  const [selected, setSelected] = useState('Hope Ape');
  const [direction, setDirection] = useState(1);
  const router = useRouter();

  const handleSelect = (cat: string) => {
    if (cat !== selected) {
      const currentIndex = categories.indexOf(selected);
      const newIndex = categories.indexOf(cat);
      setDirection(newIndex > currentIndex ? 1 : -1);
      setSelected(cat);
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 8 },
      }}
    >
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 4 }}>
        Super Hot Drop
      </Typography>

      {/* === CATEGORY CHIPS === */}
      <Stack direction="row" spacing={2} sx={{ mb: 6, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            onClick={() => handleSelect(cat)}
            sx={{
              color: selected === cat ? '#fff' : '#aaa',
              background:
                selected === cat
                  ? 'linear-gradient(90deg, #A100EB, #3605FF)'
                  : '#793CDF',
              px: 2,
              fontWeight: 600,
              transition: '0.3s',
              '&:hover': {
                background:
                  'linear-gradient(90deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
                color: '#fff',
              },
            }}
          />
        ))}
      </Stack>

      {/* === NFT GRID ANIMATION === */}
      <Box
        sx={{ position: 'relative', minHeight: 970, overflow: 'hidden', mt:1}}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selected}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir < 0 ? 100 : -100, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <Grid container spacing={2}>
              {nftData[selected].map((item, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      },
                      width:330
                    }}
                  >
                    {/* === IMAGE === */}
                    <Box
                      sx={{
                        position: 'relative',
                        height: 320,
                        mx: 1,
                        mt: 1,
                        borderRadius: 3,
                        overflow: 'hidden', // 👈 Giúp bo góc thật, không bị tràn ảnh
                        // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                      }}
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                        }}
                      />
                    </Box>

                    {/* === CARD CONTENT === */}
                    <CardContent>
                      <Typography
                        sx={{ color: '#1a1432', fontWeight: 600, mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                      {/* === PRICE + COUNT === */}
                      <Box
                        sx={{
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          mb: 1,
                        }}
                      >
                        {/* LEFT: ETH + PRICE */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 0.8,
                          }}
                        >
                          <Box
                            sx={{
                              width: 45,
                              height: 22,
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              position: 'relative',
                              top: 3,
                              left: -12,
                              transition: 'filter 0.3s ease',
                              '&:hover': {
                                filter: 'drop-shadow(0 2px 2px #8C50AC)',
                              },
                            }}
                          >
                            <Image
                              src="/home/hero/ETH.png"
                              alt="ETH"
                              width={45}
                              height={22}
                              style={{ objectFit: 'contain' }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              color: '#0DD108',
                              mt: 0.2,
                              position: 'relative',
                              top: 3,
                              left: -24,
                            }}
                          >
                            {item.price}
                          </Typography>
                        </Box>

                        {/* RIGHT: COUNT */}
                        <Typography sx={{ color: '#9E9E9F' }}>
                          1 of 32
                        </Typography>
                      </Box>

                      <Divider sx={{ borderColor: '#CBCBD0', my: 1 }} />

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mt: 1,
                        }}
                      >
                        <Chip
                          label="3h 25m 3s"
                          sx={{
                            color: '#0522FF',
                            backgroundColor: '#DDC8FF',
                            // fontWeight: 600,
                            borderRadius: '10',
                          }}
                        />
                        <Typography
                          sx={{
                            color: '#0522FF',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: '0.2s',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          Place a bid
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* === VIEW MORE BUTTON === */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => router.push('/explore')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '9999px',
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(90deg,#8c4aff,#2da1ff)',
            boxShadow: '0 0 20px rgba(140,74,255,0.5)',
            '&:hover': {
              boxShadow: '0 0 25px rgba(140,74,255,0.8)',
            },
          }}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
}
