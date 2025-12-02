'use client';
import { Box, Stack, Typography } from '@mui/material';
import FilterPanel from './filter/Filter';
import NFTTable from './table/NFT';
import Image from 'next/image';
import { useState } from 'react';

const Marketplace = () => {
   const [statusSelected, setStatusSelected] = useState<string[]>([]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: '#110929',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Hiệu ứng glow */}
      <Box
        className="glow"
        sx={{
          '--glow-size': '900px',
          '--glow-left': '-30%',
          '--glow-top': '-1%',
          '--glow-color1': 'rgba(214,34,218,0.6)',
          '--glow-color2': 'rgba(214,34,218,0.4)',
          '--glow-blur': '100px',
          '--glow-opacity': '0.6',
        }}
      />


      <Box sx={{ px: { xs: 2, md: 6 }, pt: 10 }}>
        {/* Tiêu đề */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 5,
            fontWeight: 700,
          }}
        >
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
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
              style={{ objectFit: 'contain' }}
            />
          </Box>

          <Typography variant="h4" component="h1">
            Explore the Marketplace
          </Typography>
        </Box>

        {/* Layout 3:9 */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
  {/* FilterPanel */}
  <Box
    sx={{
      flexBasis: { xs: '100%', sm: '30%', md: '25%' },
      flexShrink: 0,
    }}
  >
   <FilterPanel
              statusSelected={statusSelected}
              setStatusSelected={setStatusSelected}
            />
  </Box>

  {/* NFTTable */}
  <Box
    sx={{
      flexBasis: { xs: '100%', sm: '70%', md: '75%' },
      flexGrow: 1,
    }}
  >
     <NFTTable statusSelected={statusSelected} />
  </Box>
</Stack>


      </Box>
    </Box>
  );
};

export default Marketplace;
