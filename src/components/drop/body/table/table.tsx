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
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';

const categories = ['All Art', 'Music', 'Art', '3D', 'Photography'];

interface NftItem {
  img: string;
  name: string;
  price: string;
  from: string;
  like: string;
}

const nftData: Record<string, NftItem[]> = {
  'All Art': [
    {
      img: '/drop/img.jpg',
      name: 'ApeLord #1024',
      price: '2.4 ETH',
      from: 'by @CryptoPunk',
      like: '1.2k',
    },
    {
      img: '/drop/img1.jpg',
      name: 'HypeApe #3312',
      price: '3.1 ETH',
      from: 'by @BAYC.Collectors',
      like: '2.5k',
    },
    {
      img: '/drop/img2.jpg',
      name: 'AviatorApe #8872',
      price: '1.9 ETH',
      from: 'by @ArtCollector',
      like: '980',
    },
    {
      img: '/drop/img3.jpg',
      name: 'CoolApe #2142',
      price: '2.8 ETH',
      from: 'by @BAYC.Collectors',
      like: '1.8k',
    },
    {
      img: '/drop/img4.jpg',
      name: 'CosmicApe #5011',
      price: '4.5 ETH',
      from: 'by @SpaceArt',
      like: '3.2k',
    },
    {
      img: '/drop/img5.jpg',
      name: 'LeoprardApe #7654',
      price: '2.2 ETH',
      from: 'by @WildNFTs',
      like: '1.1k',
    },
    {
      img: '/drop/img6.jpg',
      name: 'BananaKing #1199',
      price: '3.5 ETH',
      from: 'by @Jungleverse',
      like: '2.9k',
    },
    {
      img: '/drop/img7.jpg',
      name: 'LovelyApe #4321',
      price: '2.7 ETH',
      from: 'by @ArtCollector',
      like: '2.1k',
    },
  ],
  Music: [
    {
      img: '/drop/img9.jpg',
      name: 'ArtMusic',
      price: '0.45 ETH',
      from: '',
      like: '',
    },
    {
      img: '/drop/img10.jpg',
      name: 'ArtMusic',
      price: '0.35 ETH',
      from: '',
      like: '',
    },
  ],
  Art: [
    {
      img: '/drop/img1.jpg',
      name: 'ArtVibe',
      price: '0.3 ETH',
      from: '',
      like: '',
    },
    {
      img: '/drop/img7.jpg',
      name: 'ArtVibe',
      price: '0.4 ETH',
      from: '',
      like: '',
    },
  ],
  ['3D']: [
    {
      img: '/drop/img8.jpg',
      name: 'Fasthope',
      price: '0.5 ETH',
      from: '',
      like: '',
    },
    {
      img: '/drop/img9.jpg',
      name: 'Fasthope',
      price: '0.6 ETH',
      from: '',
      like: '',
    },
  ],

  Photography: [
    {
      img: '/drop/img10.jpg',
      name: 'FineArt',
      price: '0.7 ETH',
      from: '',
      like: '',
    },
    {
      img: 'drop/img11.jpg',
      name: 'FineArt',
      price: '0.8 ETH',
      from: '',
      like: '',
    },
  ],
};

export default function SuperHotDrop() {
  const [selected, setSelected] = useState('All Art');
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
      <Typography
        variant="h4"
        sx={{ color: 'white', fontWeight: 700, mb: 4, textAlign: 'center' }}
      >
        Super Hot Drop
      </Typography>

      {/* === CATEGORY CHIPS === */}
      <Stack
  direction={{ xs: 'row', sm: 'row', md: 'row' }} // vẫn là hàng ngang, nhưng có wrap
  spacing={{ xs: 1, sm: 1.5, md: 2 }} // spacing nhỏ hơn trên mobile
  sx={{
    mb: { xs: 3, md: 6 },
    flexWrap: 'wrap',
    justifyContent: 'center', // mobile: center, desktop: trái
    rowGap: { xs: 1, sm: 1.5 }, // thêm khoảng cách giữa các dòng khi wrap
    px: { xs: 1, sm: 2, md: 0 }, // thêm padding ngang cho mobile
  }}
>
  {categories.map((cat) => (
    <Chip
      key={cat}
      label={cat}
      clickable
      onClick={() => handleSelect(cat)}
      sx={{
        color: selected === cat ? '#fff' : '#000',
        background: selected === cat ? '#A100EB' : '#fff',
        px: { xs: 1.5, sm: 2, md: 2.5 }, // padding thay đổi theo màn hình
        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: '#A100EB',
          color: '#fff',
        },
      }}
    />
  ))}
</Stack>

      {/* === NFT GRID ANIMATION === */}
      <Box
        sx={{ position: 'relative', minHeight: 970, overflow: 'hidden', mt: 1 }}
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
                      width: 330,
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
                        priority={i === 1} // chỉ set priority cho ảnh LCP (ví dụ ảnh thứ 2 trong danh sách)
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 330px"
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                        }}
                      />
                    </Box>

                    {/* === CARD CONTENT === */}
                    <CardContent>
                      <Typography
                        sx={{
                          color: '#1a1432',
                          fontWeight: 600,
                          mb: 0.5,
                          fontSize: '1.2rem',
                        }}
                      >
                        {item.name}
                      </Typography>
                      {/* === PRICE + COUNT === */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          mb: 1,
                        }}
                      >
                        {/* RIGHT: COUNT */}
                        <Typography
                          sx={{ color: '#9E9E9F', fontSize: '0.9rem' }}
                        >
                          {item.from}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mt: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            color: '#A100EB',
                            mt: 0.2,
                            position: 'relative',
                            top: 3,
                            fontWeight: 600,
                          }}
                        >
                          {item.price}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#9E9E9F',
                            cursor: 'pointer',
                            fontSize: '0.96rem',
                            transition: '0.2s',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          <FavoriteIcon sx={{ fontSize: '1.0rem' }} />{' '}
                          {item.like}
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
            background: '#8c4aff',
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
