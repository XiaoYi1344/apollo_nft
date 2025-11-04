'use client';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Stack,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const nftData = [
  {
    name: 'CosmoCat #123',
    price: '0.75 ETH',
    img: '/marketplace/img.jpg',
    likes: '1.2k',
    collection: 'Space Kitties',
  },
  {
    name: 'TinBot #789',
    price: '1.20 ETH',
    img: '/marketplace/img1.jpg',
    likes: '3.4k',
    collection: 'Retro Bots',
  },
  {
    name: 'ApeCrypto #8821',
    price: '0.95 ETH',
    img: '/marketplace/img2.jpg',
    likes: '5.6k',
    collection: 'ApeCrypto',
  },
  {
    name: 'Sunset Hill #45',
    price: '0.45 ETH',
    img: '/marketplace/img3.jpg',
    likes: '980',
    collection: 'Pixel Worlds',
  },
  {
    name: 'StarGazer #456',
    price: '0.82 ETH',
    img: '/marketplace/img4.jpg',
    likes: '2.1k',
    collection: 'Space Kitties',
  },
  {
    name: 'ApeCrypto #7234',
    price: '1.50 ETH',
    img: '/marketplace/img5.jpg',
    likes: '8.1k',
    collection: 'ApeCrypto',
  },
  {
    name: 'RustyBot #101',
    price: '0.99 ETH',
    img: '/marketplace/img6.jpg',
    likes: '1.8k',
    collection: 'Retro Bots',
  },
  {
    name: 'OracleCat #777',
    price: '2.50 ETH',
    img: '/marketplace/img7.jpg',
    likes: '11.2k',
    collection: 'Space Kitties',
  },
  {
    name: 'Neon Guardian #2847',
    price: '1.50 ETH',
    img: '/marketplace/nft_test.png',
    likes: '8.1k',
    collection: 'ApeCrypto',
  },
  {
    name: 'Sunset Hill #45',
    price: '0.45 ETH',
    img: '/marketplace/img3.jpg',
    likes: '980',
    collection: 'Pixel Worlds',
  },
  {
    name: 'ApeCrypto #8821',
    price: '0.95 ETH',
    img: '/marketplace/img2.jpg',
    likes: '5.6k',
    collection: 'ApeCrypto',
  },
];

const SORT_OPTIONS = ['Latest', 'Price: Low to High', 'Price: High to Low'];

const NFTTable = () => {
  const [visibleCount, setVisibleCount] = useState(8); // số card hiển thị
  const [expanded, setExpanded] = useState(false); // trạng thái xem tất cả

  const handleToggle = () => {
    if (!expanded) {
      setVisibleCount(nftData.length); // hiển thị tất cả
    } else {
      setVisibleCount(8); // trở về mặc định
    }
    setExpanded(!expanded);
  };

  const [sort, setSort] = useState('Latest');
  const [search, setSearch] = useState('');

  return (
    <>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flexWrap: 'wrap',
          mb: 1,
        }}
      >
        <Box sx={{ flexBasis: { xs: '100%', md: '49%' } }}>
          <TextField
            variant="outlined"
            placeholder="Search by name, collection, or creator"
            fullWidth
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: 'rgba(255,255,255,0.6)' }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 1.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                background: 'rgba(255,255,255,0.2)',
                input: { p: 0.8 },
                color: 'white',
                '& .MuiOutlinedInput-input::placeholder': {
                  color: 'rgba(255,255,255,0.6)',
                },
              },
            }}
          />
        </Box>
        <Box sx={{ flexBasis: { xs: '100%', md: '18%' } }}>
          <FormControl fullWidth size="small">
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              sx={{
                bgcolor: 'white',
                borderRadius: 1.5,
                textTransform: 'none',
              }}
            >
              {SORT_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <Grid container spacing={3} marginBottom={14}>
        {nftData.slice(0, visibleCount).map((nft, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255)',
                borderRadius: 3,
                overflow: 'hidden',
                color: 'black',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                },
              }}
            >
              <Image
                src={nft.img}
                alt={nft.name}
                width={400}
                height={300}
                style={{ width: '100%', height: 'auto' }}
              />
              <CardContent>
                <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
                  {nft.collection}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {nft.name}
                </Typography>
                <Box
                  sx={{
                    mt: 1.2,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 549.5, fontSize: '1.0rem' }}
                  >
                    {nft.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      fontSize: '0.82rem',
                      opacity: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.3,
                    }}
                  >
                    <FavoriteBorderIcon
                      sx={{ fontSize: '0.85rem', strokeWidth: 1 }}
                    />
                    {nft.likes}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, bgcolor: '#9230FF', textTransform: 'none' }}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Load More / See Less */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            sx={{
              p: '6px 12px',
              borderRadius: 1.5,
              bgcolor: '#232A33',
              color: 'white',
              width: 125,
              textTransform: 'none',
            }}
            onClick={handleToggle}
          >
            {expanded ? 'See Less' : 'Load More'}
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default NFTTable;
