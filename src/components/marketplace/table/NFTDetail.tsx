'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, Stack, Chip } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { NFT, nftData } from './data/nftData';

export default function NFTDetail() {
  const { id } = useParams();
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const nft = nftData.find((item) => item.id === Number(id));

  useEffect(() => {
    if (!nft) return;
    if (Array.isArray(nft.img)) {
      const urls = nft.img.map((file) => URL.createObjectURL(file));
      setImgUrls(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setImgUrls([nft.img]);
    }
  }, [nft]);

  if (!nft) return <Typography>Not found</Typography>;

  return (
    <Box sx={{ color: 'white', p: 4, maxWidth: 1400, mx: 'auto' }}>
      <Typography sx={{ opacity: 0.6, mb: 2 }}>
        Cyber Punks Collection
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* Image */}
        <Card
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            width: { xs: '100%', md: '45%' },
          }}
        >
          {imgUrls.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={nft.name}
              width={800}
              height={800}
              style={{ width: '100%', height: 'auto' }}
            />
          ))}
        </Card>

        {/* Right Content */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            {nft.name}
          </Typography>

          {/* Price */}
          <Box
            sx={{
              bgcolor: '#1A1A2E',
              p: 2.5,
              borderRadius: 2,
              mt: 2,
            }}
          >
            <Typography sx={{ opacity: 0.7 }}>Current Price</Typography>
            <Typography variant="h5" fontWeight={700}>
              {nft.price}
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="contained" sx={{ bgcolor: '#9230FF' }}>
                Buy Now
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#9230FF',
                  color: '#9230FF',
                  textTransform: 'none',
                }}
              >
                Make Offer
              </Button>
            </Stack>
          </Box>

          {/* Description */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight={700}>
              Description
            </Typography>
            <Typography sx={{ opacity: 0.8, mt: 1 }}>
              A cyberpunk guardian from the neon-lit streets of Neo Tokyo...
            </Typography>
          </Box>

          {/* Properties */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Properties
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Chip
                label="Neon City"
                sx={{ bgcolor: '#251C37', color: '#B983FF' }}
              />
              <Chip
                label="Cyber Glow"
                sx={{ bgcolor: '#251C37', color: '#B983FF' }}
              />
              <Chip
                label="Neural Crown"
                sx={{ bgcolor: '#251C37', color: '#B983FF' }}
              />
              <Chip
                label="Legendary"
                sx={{ bgcolor: '#251C37', color: '#B983FF' }}
              />
            </Stack>
          </Box>

          {/* Activity */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight={700}>
              Activity
            </Typography>
            <Typography sx={{ opacity: 0.6, mt: 1 }}>
              Listed 1 day ago • Sold 3 days ago
            </Typography>
          </Box>
        </Box>
      </Stack>

      {/* More from this Collection */}
      <Box mt={8}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          More from this Collection
        </Typography>

        <Stack direction="row" spacing={3} overflow="auto">
          {nftData.slice(0, 4).map((item) => {
            // Xử lý imgUrls cho từng item
            const itemImgs = Array.isArray(item.img)
              ? item.img.map((f) => URL.createObjectURL(f))
              : [item.img];

            return (
              <Card
                key={item.id}
                sx={{ width: 230, bgcolor: '#1A1A2E', borderRadius: 2 }}
              >
                {itemImgs.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={item.name}
                    width={230}
                    height={230}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                ))}
                <Box p={1.5}>
                  <Typography fontSize={14}>{item.name}</Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
                    {item.price}
                  </Typography>
                </Box>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
