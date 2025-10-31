import { Box } from '@mui/material';
import React from 'react';
import Hero from './heroSection/Hero';
import SuperHotDrop from './body/table/table';
import Scrol from './body/scrolling/scrol';
import NFT from './body/nft/nfft';
import Creator from './body/creator/creator';
import JoinSection from './body/join/join';

const HomePage = () => {
  return (
    <Box>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Glow dưới nền */}
        <Box
          className="glow"
          style={
            {
              '--glow-size': '600px',
              '--glow-color1': 'rgba(190,74,255,0.7)',
              '--glow-color2': 'rgba(45,161,255,0.1)',
              '--glow-blur': '100px',
              '--glow-opacity': 0.8,
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              zIndex: 0,
              top: '70%',
              left: '100%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            } as React.CSSProperties
          }
        />

        {/* Nội dung nổi trên glow */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <SuperHotDrop />
          <Scrol />
          <NFT />
          <Creator />
          <JoinSection />
          
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
