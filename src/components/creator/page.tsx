'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import creators, { Creator } from './data/creatorsData';
import CreatorLeaderboard from './Creator';
import CreatorDetail from './CreatorDetail';

export default function Page() {
  const [selected, setSelected] = useState<Creator | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const handleSelect = (creator: Creator, dir: 'left' | 'right') => {
    setDirection(dir);
    setSelected(creator);
  };

  const handleBack = () => {
    setDirection('right');
    setSelected(null);
  };

  const variants = {
    enterLeft: { x: '100%', opacity: 0 },
    enterRight: { x: '-100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exitLeft: { x: '-100%', opacity: 0 },
    exitRight: { x: '100%', opacity: 0 },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(1000px 600px at 80% 20%, rgba(183,142,255,0.12), transparent), linear-gradient(180deg, #0f0a1a 0%, #1b1130 100%)',
        color: '#fff',
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        {!selected ? (
          <motion.div
            key="leaderboard"
            initial={
              direction === 'left' ? variants.enterLeft : variants.enterRight
            }
            animate={variants.center}
            exit={direction === 'left' ? variants.exitLeft : variants.exitRight}
            transition={{ duration: 0.5 }}
          >
            <CreatorLeaderboard creators={creators} onSelect={handleSelect} />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={
              direction === 'left' ? variants.enterLeft : variants.enterRight
            }
            animate={variants.center}
            exit={direction === 'left' ? variants.exitLeft : variants.exitRight}
            transition={{ duration: 0.5 }}
          >
            <CreatorDetail creator={selected} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
