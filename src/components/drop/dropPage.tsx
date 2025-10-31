import { Box } from '@mui/material';
import React from 'react';
import Hero from './heroSection/Hero';
import SuperHotDrop from './body/table/table';
import NFT from './body/nft/nfft';
import Creator from './body/creator/creator';
import JoinSection from './body/join/join';

const DropPage = () => {
  return (
    <Box>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Nội dung nổi trên glow */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <SuperHotDrop />
          <NFT />
          <Creator />
          <JoinSection />
          
        </Box>
      </Box>
    </Box>
  );
};

export default DropPage;
