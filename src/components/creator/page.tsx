// 'use client';
// import React, { useState } from 'react';
// import { Box } from '@mui/material';
// import { AnimatePresence, motion } from 'framer-motion';
// import creators, { Creator } from './data/creatorsData';
// import CreatorLeaderboard from './Creator';
// import ProfileDetail from './ProfileDetail';

// export default function Page() {
//   const [selected, setSelected] = useState<Creator | null>(null);
//   const [direction, setDirection] = useState<'left' | 'right'>('left');

//   const handleSelect = (creator: Creator, dir: 'left' | 'right') => {
//     setDirection(dir);
//     setSelected(creator);
//   };

//   const handleBack = () => {
//     setDirection('right');
//     setSelected(null);
//   };

//   const variants = {
//     enterLeft: { x: '100%', opacity: 0 },
//     enterRight: { x: '-100%', opacity: 0 },
//     center: { x: 0, opacity: 1 },
//     exitLeft: { x: '-100%', opacity: 0 },
//     exitRight: { x: '100%', opacity: 0 },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background:
//           'radial-gradient(1000px 600px at 80% 20%, rgba(183,142,255,0.12), transparent), linear-gradient(180deg, #0f0a1a 0%, #1b1130 100%)',
//         color: '#fff',
//       }}
//     >
//       <AnimatePresence initial={false} mode="wait">
//         {!selected ? (
//           <motion.div
//             key="leaderboard"
//             initial={
//               direction === 'left' ? variants.enterLeft : variants.enterRight
//             }
//             animate={variants.center}
//             exit={direction === 'left' ? variants.exitLeft : variants.exitRight}
//             transition={{ duration: 0.5 }}
//           >
//             <CreatorLeaderboard creators={creators} onSelect={handleSelect} />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="detail"
//             initial={
//               direction === 'left' ? variants.enterLeft : variants.enterRight
//             }
//             animate={variants.center}
//             exit={direction === 'left' ? variants.exitLeft : variants.exitRight}
//             transition={{ duration: 0.5 }}
//           >
//             <ProfileDetail onBack={handleBack} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Box>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import { Artist } from '@/types/artist';
import { getAllArtists } from '@/services/artistService';

import CreatorLeaderboard from './Creator';
import CreatorDetail from './CreatorDetail';

export default function Page() {
  const [selected, setSelected] = useState<Artist | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // GỌI API LẤY ARTISTS
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const result = await getAllArtists({
          timeRange: '24h',
          sortBy: 'all',
        });
        setArtists(result);
      } catch (error) {
        console.error('Failed to load artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleSelect = ({ artist, dir }: { artist: Artist; dir: 'left' | 'right' }) => {
  setDirection(dir);
  setSelected(artist);
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
      {/* LOADING STATE */}
      {loading && (
        <Box sx={{ textAlign: 'center', pt: 10, fontSize: '1.2rem' }}>
          Loading artists...
        </Box>
      )}

      {!loading && (
        <AnimatePresence initial={false} mode="wait">
          {!selected ? (
            <motion.div
              key="leaderboard"
              initial={direction === 'left' ? variants.enterLeft : variants.enterRight}
              animate={variants.center}
              exit={direction === 'left' ? variants.exitLeft : variants.exitRight}
              transition={{ duration: 0.5 }}
            >
              <CreatorLeaderboard artists={artists} onSelect={handleSelect} />
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={direction === 'left' ? variants.enterLeft : variants.enterRight}
              animate={variants.center}
              exit={direction === 'left' ? variants.exitLeft : variants.exitRight}
              transition={{ duration: 0.5 }}
            >
              <CreatorDetail addressWallet={selected.addressWallet} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Box>
  );
}
