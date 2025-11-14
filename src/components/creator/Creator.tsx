'use client';
import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
  Typography,
  Paper,
  Pagination,
  Stack,
  useMediaQuery,
  Skeleton,
  Card,
  CardContent,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import type { Creator as CreatorType } from './data/creatorsData';

interface Props {
  creators?: CreatorType[]; // creators có thể undefined khi đang loading
  onSelect: (creator: CreatorType, dir: 'left' | 'right') => void;
  loading?: boolean; // trạng thái loading
}

const ITEMS_PER_PAGE = 8;
const FILTERS = ['24 Hours', '7 Days', '30 Days', 'All Time'];

const slideVariants = {
  initial: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? 100 : -100,
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1 },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? -100 : 100,
    opacity: 0,
  }),
};

const CreatorLeaderboard: React.FC<Props> = ({ creators = [], onSelect, loading = false }) => {
  const [page, setPage] = useState(1);
  const [selectedRange, setSelectedRange] = useState('7 Days');
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredCreators = useMemo(() => {
    const mapRange: Record<string, CreatorType['timeRange']> = {
      '24 Hours': '24h',
      '7 Days': '7d',
      '30 Days': '30d',
      'All Time': 'all',
    };
    const rangeKey = mapRange[selectedRange];
    if (rangeKey === 'all') return creators;
    return creators.filter((c) => c.timeRange === rangeKey);
  }, [creators, selectedRange]);

  const paginatedCreators = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredCreators.slice(start, start + ITEMS_PER_PAGE);
  }, [page, filteredCreators]);

  const handleExport = () => {
    const csvHeader = ['Rank', 'Creator', 'Total Volume', 'NFTs Sold', 'Followers'];
    const csvRows = filteredCreators.map((c, idx) => [
      idx + 1,
      `${c.name} (${c.username})`,
      c.totalVolume,
      c.nftsSold,
      c.followers,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [csvHeader.join(','), ...csvRows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `creator_leaderboard_${selectedRange.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectRange = (newRange: string) => {
    setDirection('left');
    setSelectedRange(newRange);
    setPage(1);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 6, md: 10 }, py: 10, bgcolor: 'transparent' }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ mb: 3, gap: { xs: 2, sm: 0 } }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{ color: '#fff', fontWeight: 700 }}
        >
          Creator Leaderboard
        </Typography>
      </Stack>

      {/* Time filter */}
      <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ mb: 3 }}>
        {FILTERS.map((f) => (
          <Button
            key={f}
            onClick={() => handleSelectRange(f)}
            sx={{
              textTransform: 'none',
              color: selectedRange === f ? '#fff' : '#cfcfff',
              background:
                selectedRange === f
                  ? 'linear-gradient(90deg,#7a3bff,#b78eff)'
                  : 'transparent',
              borderRadius: 2,
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.3, sm: 0.5 },
              minWidth: 'unset',
              fontSize: { xs: 13, sm: 14 },
              '&:hover': {
                background:
                  selectedRange === f
                    ? 'linear-gradient(90deg,#7a3bff,#b78eff)'
                    : 'rgba(255,255,255,0.05)',
              },
            }}
          >
            {f}
          </Button>
        ))}
      </Stack>

      {/* Table / Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={selectedRange}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{ duration: 0.4 }}
        >
          {loading ? (
            // Skeleton layout
            isMobile ? (
              <Stack spacing={2}>
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                  <Card
                    key={idx}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.05)',
                      borderRadius: 3,
                      p: 2,
                      boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Skeleton variant="circular" width={50} height={50} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton width="60%" height={20} sx={{ mb: 0.5 }} />
                        <Skeleton width="40%" height={15} />
                      </Box>
                      <Skeleton width={30} height={20} />
                    </Stack>
                    <CardContent sx={{ px: 0, pt: 1 }}>
                      <Skeleton width="80%" height={15} sx={{ mb: 0.5 }} />
                      <Skeleton width="60%" height={15} sx={{ mb: 0.5 }} />
                      <Skeleton width="70%" height={15} sx={{ mb: 0.5 }} />
                      <Skeleton variant="rectangular" width="100%" height={30} sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            ) : (
              // Desktop table skeleton
              <TableContainer
                component={Paper}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.03)',
                  borderRadius: 2,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                  overflowX: 'auto',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {['Rank', 'Creator', 'Total Volume', 'NFTs Sold', 'Followers', 'Action'].map(
                        (h) => (
                          <TableCell key={h} sx={{ color: '#cfcfff', fontWeight: 700 }}>
                            {h}
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                      <TableRow key={idx}>
                        {Array.from({ length: 6 }).map((__, cellIdx) => (
                          <TableCell key={cellIdx}>
                            <Skeleton width="80%" height={20} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          ) : (
            // Dữ liệu thực tế
            <>
              {isMobile ? (
                <Stack spacing={2}>
                  {paginatedCreators.map((c, idx) => (
                    <Card
                      key={c.id}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.05)',
                        borderRadius: 3,
                        p: 2,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={c.avatar} alt={c.name} sx={{ width: 50, height: 50 }} />
                        <Box>
                          <Typography sx={{ color: '#fff', fontWeight: 700 }}>
                            {c.name}
                          </Typography>
                          <Typography sx={{ color: '#9b9bbf', fontSize: 12 }}>
                            @{c.username}
                          </Typography>
                        </Box>
                        <Box sx={{ ml: 'auto' }}>
                          <Typography sx={{ color: '#b78eff', fontSize: 12 }}>
                            #{(page - 1) * ITEMS_PER_PAGE + idx + 1}
                          </Typography>
                        </Box>
                      </Stack>
                      <CardContent sx={{ px: 0, pt: 1 }}>
                        <Typography sx={{ color: '#cfcfff', fontSize: 13 }}>
                          💰 Total Volume: {c.totalVolume}
                        </Typography>
                        <Typography sx={{ color: '#cfcfff', fontSize: 13 }}>
                          🖼 NFTs Sold: {c.nftsSold}
                        </Typography>
                        <Typography sx={{ color: '#cfcfff', fontSize: 13 }}>
                          👥 Followers: {c.followers}
                        </Typography>
                        <Box sx={{ mt: 1.5 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
                              textTransform: 'none',
                              fontSize: 13,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelect(c, 'left');
                            }}
                          >
                            View
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <TableContainer
                  component={Paper}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.03)',
                    borderRadius: 2,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                    overflowX: 'auto',
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        {['Rank', 'Creator', 'Total Volume', 'NFTs Sold', 'Followers', 'Action'].map(
                          (h) => (
                            <TableCell key={h} sx={{ color: '#cfcfff', fontWeight: 700 }}>
                              {h}
                            </TableCell>
                          ),
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedCreators.map((c, idx) => (
                        <motion.tr
                          key={c.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                        >
                          <TableCell sx={{ color: '#ddd' }}>
                            {(page - 1) * ITEMS_PER_PAGE + idx + 1}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar src={c.avatar} alt={c.name} sx={{ width: 48, height: 48 }} />
                              <Box>
                                <Typography sx={{ color: '#fff', fontWeight: 700 }}>
                                  {c.name}
                                </Typography>
                                <Typography sx={{ color: '#9b9bbf', fontSize: 12 }}>
                                  {c.username}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: '#cfcfff' }}>{c.totalVolume}</TableCell>
                          <TableCell sx={{ color: '#cfcfff' }}>{c.nftsSold}</TableCell>
                          <TableCell sx={{ color: '#cfcfff' }}>{c.followers}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
                                textTransform: 'none',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelect(c, 'left');
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ mt: 3 }}
      >
        <Button
          variant="text"
          onClick={handleExport}
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontSize: { xs: 13, sm: 14 },
            '&:hover': { color: '#b78eff' },
            alignSelf: { xs: 'flex-end', sm: 'center' },
          }}
        >
          Xuất sang Trang tính
        </Button>

        <Pagination
          count={Math.ceil(filteredCreators.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{
            '& .MuiPaginationItem-root': { color: '#cfcfff' },
            '& .Mui-selected': {
              background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
              color: '#fff',
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CreatorLeaderboard;


// 'use client';
// import React, { useState, useMemo } from 'react';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Avatar,
//   Button,
//   Typography,
//   Paper,
//   Pagination,
//   Stack,
//   useMediaQuery,
//   Card,
//   CardContent,
// } from '@mui/material';
// import { motion, AnimatePresence } from 'framer-motion';
// import type { Creator as CreatorType } from './data/creatorsData';

// interface Props {
//   creators: CreatorType[];
//   onSelect: (creator: CreatorType, dir: 'left' | 'right') => void;
// }

// const ITEMS_PER_PAGE = 8;
// const FILTERS = ['24 Hours', '7 Days', '30 Days', 'All Time'];

// const slideVariants = {
//   initial: (direction: 'left' | 'right') => ({
//     x: direction === 'left' ? 100 : -100,
//     opacity: 0,
//   }),
//   animate: { x: 0, opacity: 1 },
//   exit: (direction: 'left' | 'right') => ({
//     x: direction === 'left' ? -100 : 100,
//     opacity: 0,
//   }),
// };

// const CreatorLeaderboard: React.FC<Props> = ({ creators, onSelect }) => {
//   const [page, setPage] = useState(1);
//   const [selectedRange, setSelectedRange] = useState('7 Days');
//   const [direction, setDirection] = useState<'left' | 'right'>('left');
//   const isMobile = useMediaQuery('(max-width:600px)');

//   const filteredCreators = useMemo(() => {
//     const mapRange: Record<string, CreatorType['timeRange']> = {
//       '24 Hours': '24h',
//       '7 Days': '7d',
//       '30 Days': '30d',
//       'All Time': 'all',
//     };
//     const rangeKey = mapRange[selectedRange];
//     return rangeKey === 'all'
//       ? creators
//       : creators.filter((c) => c.timeRange === rangeKey);
//   }, [creators, selectedRange]);

//   const paginatedCreators = useMemo(() => {
//     const start = (page - 1) * ITEMS_PER_PAGE;
//     return filteredCreators.slice(start, start + ITEMS_PER_PAGE);
//   }, [page, filteredCreators]);

//   const handleExport = () => {
//     const csvHeader = ['Rank', 'Name', 'Username', 'Total Volume', 'NFTs Sold', 'Followers'];
//     const csvRows = filteredCreators.map((c, idx) => [
//       idx + 1,
//       c.name,
//       c.username,
//       c.totalVolume,
//       c.nftsSold,
//       c.followers,
//     ]);
//     const csvContent =
//       'data:text/csv;charset=utf-8,' +
//       [csvHeader.join(','), ...csvRows.map((r) => r.join(','))].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.href = encodedUri;
//     link.download = `creator_leaderboard_${selectedRange.replace(/\s+/g, '_')}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleSelectRange = (newRange: string) => {
//     setDirection('left');
//     setSelectedRange(newRange);
//     setPage(1);
//   };

//   return (
//     <Box sx={{ p: { xs: 2, sm: 6 }, bgcolor: 'transparent' }}>
//       {/* Header */}
//       <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//         <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: 22, sm: 32 } }}>
//           Creator Leaderboard
//         </Typography>
//         {!isMobile && (
//           <Button
//             variant="text"
//             onClick={handleExport}
//             sx={{
//               color: '#fff',
//               textTransform: 'none',
//               '&:hover': { color: '#b78eff' },
//             }}
//           >
//             Xuất sang Trang tính
//           </Button>
//         )}
//       </Stack>

//       {/* Time filter */}
//       <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
//         {FILTERS.map((f) => (
//           <Button
//             key={f}
//             onClick={() => handleSelectRange(f)}
//             sx={{
//               textTransform: 'none',
//               color: selectedRange === f ? '#fff' : '#cfcfff',
//               background:
//                 selectedRange === f
//                   ? 'linear-gradient(90deg,#7a3bff,#b78eff)'
//                   : 'transparent',
//               borderRadius: 2,
//               px: 2,
//               py: 0.5,
//               minWidth: 'unset',
//               '&:hover': {
//                 background:
//                   selectedRange === f
//                     ? 'linear-gradient(90deg,#7a3bff,#b78eff)'
//                     : 'rgba(255,255,255,0.05)',
//               },
//             }}
//           >
//             {f}
//           </Button>
//         ))}
//       </Stack>

//       <AnimatePresence mode="wait" custom={direction}>
//         <motion.div
//           key={selectedRange}
//           variants={slideVariants}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           custom={direction}
//           transition={{ duration: 0.4 }}
//         >
//           {/* 🧭 Mobile: Card layout */}
//           {isMobile ? (
//             <Stack spacing={2}>
//               {paginatedCreators.map((c, idx) => (
//                 <Card
//                   key={c.id}
//                   sx={{
//                     bgcolor: 'rgba(255,255,255,0.05)',
//                     borderRadius: 3,
//                     p: 2,
//                     boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
//                     border: '1px solid rgba(255,255,255,0.1)',
//                   }}
//                   component={motion.div}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Stack direction="row" alignItems="center" spacing={2}>
//                     <Avatar src={c.avatar} alt={c.name} sx={{ width: 50, height: 50 }} />
//                     <Box>
//                       <Typography sx={{ color: '#fff', fontWeight: 700 }}>
//                         {c.name}
//                       </Typography>
//                       <Typography sx={{ color: '#9b9bbf', fontSize: 12 }}>
//                         @{c.username}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ ml: 'auto' }}>
//                       <Typography sx={{ color: '#b78eff', fontSize: 12 }}>
//                         #{(page - 1) * ITEMS_PER_PAGE + idx + 1}
//                       </Typography>
//                     </Box>
//                   </Stack>

//                   <CardContent sx={{ px: 0, pt: 1 }}>
//                     <Typography sx={{ color: '#cfcfff', fontSize: 13 }}>
//                       💰 Total Volume: {c.totalVolume}
//                     </Typography>
//                     <Typography sx={{ color: '#cfcfff', fontSize: 13 }}>
//                       🖼 NFTs Sold: {c.nftsSold}
//                     </Typography>
//                     <Typography sx={{ color: '#cfcfff', fontSize: 13 }}>
//                       👥 Followers: {c.followers}
//                     </Typography>
//                     <Box sx={{ mt: 1.5 }}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
//                           textTransform: 'none',
//                           fontSize: 13,
//                         }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onSelect(c, 'left');
//                         }}
//                       >
//                         View
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))}
//             </Stack>
//           ) : (
//             /* 💻 Desktop: Table layout */
//             <TableContainer
//               component={Paper}
//               sx={{
//                 bgcolor: 'rgba(255,255,255,0.03)',
//                 borderRadius: 2,
//                 boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
//                 overflowX: 'auto',
//               }}
//             >
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     {['Rank', 'Creator', 'Total Volume', 'NFTs Sold', 'Followers', 'Action'].map(
//                       (h) => (
//                         <TableCell key={h} sx={{ color: '#cfcfff', fontWeight: 700 }}>
//                           {h}
//                         </TableCell>
//                       ),
//                     )}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedCreators.map((c, idx) => (
//                     <motion.tr
//                       key={c.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.25 }}
//                     >
//                       <TableCell sx={{ color: '#ddd' }}>
//                         {(page - 1) * ITEMS_PER_PAGE + idx + 1}
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                           <Avatar src={c.avatar} alt={c.name} sx={{ width: 48, height: 48 }} />
//                           <Box>
//                             <Typography sx={{ color: '#fff', fontWeight: 700 }}>
//                               {c.name}
//                             </Typography>
//                             <Typography sx={{ color: '#9b9bbf', fontSize: 12 }}>
//                               {c.username}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ color: '#cfcfff' }}>{c.totalVolume}</TableCell>
//                       <TableCell sx={{ color: '#cfcfff' }}>{c.nftsSold}</TableCell>
//                       <TableCell sx={{ color: '#cfcfff' }}>{c.followers}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           size="small"
//                           sx={{
//                             background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
//                             textTransform: 'none',
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onSelect(c, 'left');
//                           }}
//                         >
//                           View
//                         </Button>
//                       </TableCell>
//                     </motion.tr>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </motion.div>
//       </AnimatePresence>

//       {/* Pagination */}
//       <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: 3 }}>
//         <Pagination
//           count={Math.ceil(filteredCreators.length / ITEMS_PER_PAGE)}
//           page={page}
//           onChange={(_, value) => setPage(value)}
//           sx={{
//             '& .MuiPaginationItem-root': {
//               color: '#cfcfff',
//             },
//             '& .Mui-selected': {
//               background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
//               color: '#fff',
//             },
//           }}
//         />
//       </Stack>
//     </Box>
//   );
// };

// export default CreatorLeaderboard;
