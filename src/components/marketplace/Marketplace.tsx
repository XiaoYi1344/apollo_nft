'use client';
import { Box, Grid, Stack, Typography } from '@mui/material';

import FilterPanel from './filter/Filter';
import NFTTable from './table/NFT';
import Image from 'next/image';

const Marketplace = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #18022d, #090011)',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Hiệu ứng glow */}
      <Box
        className="glow"
        sx={{
          '--glow-size': '1000px',
          '--glow-left': '-30%',
          '--glow-top': '10%',
          '--glow-color1': 'rgba(122,47,241,0.5)',
          '--glow-color2': 'rgba(255,0,200,0.1)',
          '--glow-blur': '180px',
          '--glow-opacity': '0.6',
        }}
      />

      <Box sx={{ px: 4, pt: 10 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 5,
            fontWeight: 700,
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              position: 'relative',
              width: 40,
              height: 40,
              mr: 1.5,
            }}
          >
            <Image
              src="/drop/sparkle.png"
              alt="Sparkle"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>

          {/* Text */}
          <Typography variant="h4" component="h1">
            Explore the Marketplace
          </Typography>
        </Box>

        <Stack direction="row">
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 5, md: 3}}>
              <FilterPanel />
          
            </Grid>

            <Grid size={{ xs: 12, sm: 7, md: 9}}>
             
          <Box sx={{ flex: 1 }}>
            <NFTTable />
          </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default Marketplace;
