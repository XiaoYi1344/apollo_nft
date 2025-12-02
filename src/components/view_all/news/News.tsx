// 'use client';
// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Stack,
//   Typography,
//   Grid,
//   // useTheme,
//   // useMediaQuery,
//   Pagination,
// } from '@mui/material';
// import Image from 'next/image';
// import { newss, type, newsType } from './data/newsData';

// export const News: React.FC = () => {
//   const [selectedType, setSelectedType] = useState<number>(1);
//   // const theme = useTheme();
//   // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // ✅ Filter logic (chuẩn khớp với data)
//   const filterednewss = newss.filter((e) => {
//     if (selectedType === 1) return true;

//     const selectedName =
//       type
//         .find((t) => t.id === selectedType)
//         ?.name.toLowerCase()
//         .trim() || '';

//     const newsTypeName = e.type.toLowerCase().trim();

//     // Chuẩn hóa để khớp cả số ít & số nhiều
//     return (
//       newsTypeName === selectedName ||
//       newsTypeName === selectedName.replace(/s$/, '')
//     );
//   });

//   // ✅ Pagination setup
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(filterednewss.length / itemsPerPage);
//   const currentNews = filterednewss.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage,
//   );

//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <Stack
//       sx={{
//         color: '#fff',
//         px: { xs: 2, sm: 4, md: 8 },
//         py: { xs: 4, sm: 6, md: 10 },
//         background: 'linear-gradient(180deg, #0f051d 0%, #12093b 100%)',
//         minHeight: '100vh',
//       }}
//     >
//       {/* 🏷️ Section Header */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: 700,
//           textAlign: 'center',
//           fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' },
//           mb: 1.5,
//         }}
//       >
//         News & Updates
//       </Typography>

//       <Typography
//         sx={{
//           color: 'rgba(255,255,255,0.7)',
//           textAlign: 'center',
//           mb: { xs: 5, sm: 7 },
//           mx: 'auto',
//           fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' },
//           width: { xs: '95%', sm: '70%', md: '60%' },
//           lineHeight: 1.6,
//         }}
//       >
//         Stay updated with the latest product releases, artist interviews,
//         community highlights, and comprehensive guides.
//       </Typography>

//       {/* 📰 Featured Article */}
//       {selectedType === 1 &&
//         (() => {
//           const featured = newss.find((n) => n.type === 'FEATURED');
//           if (!featured) return null;

//           return (
//             <Card
//               sx={{
//                 mb: { xs: 5, sm: 8 },
//                 bgcolor: '#000760',
//                 border: '1px solid rgba(255,255,255,0.1)',
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 maxWidth: 900,
//                 mx: 'auto',
//               }}
//             >
//               <Grid container>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                   <CardContent sx={{ p: { xs: 3, md: 4 } }}>
//                     <Chip
//                       label={featured.type}
//                       sx={{
//                         bgcolor: '#D622DA',
//                         color: '#fff',
//                         fontWeight: 600,
//                         fontSize: '0.7rem',
//                         mb: 2,
//                       }}
//                     />
//                     <Typography
//                       sx={{
//                         fontWeight: 700,
//                         fontSize: { xs: '1.1rem', sm: '1.6rem' },
//                         color: '#fff',
//                         mb: 1.5,
//                       }}
//                     >
//                       {featured.name}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         color: '#d1d5db',
//                         fontSize: '0.85rem',
//                         mb: 2,
//                         lineHeight: 1.6,
//                       }}
//                     >
//                       {featured.text}
//                     </Typography>
//                     <Stack
//                       direction="row"
//                       spacing={1.2}
//                       alignItems="center"
//                       sx={{ mb: 1 }}
//                     >
//                       <Typography
//                         sx={{
//                           color: '#9ca3af',
//                           fontSize: '0.8rem',
//                         }}
//                       >
//                         {featured.date}
//                       </Typography>
//                       <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem' }}>
//                         •
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: '#9ca3af',
//                           fontSize: '0.8rem',
//                         }}
//                       >
//                         {featured.time} min read
//                       </Typography>
//                     </Stack>

//                     <Button
//                       variant="contained"
//                       href={featured.link}
//                       sx={{
//                         bgcolor: '#D622DA',
//                         borderRadius: 2,
//                         textTransform: 'none',
//                         fontSize: '0.9rem',
//                         mt: 1,
//                         '&:hover': { bgcolor: '#4f46e5' },
//                       }}
//                     >
//                       Read Full Article
//                     </Button>
//                   </CardContent>
//                 </Grid>

//                 <Grid size={{ xs: 12, md: 6 }}>
//                   <Box
//                     sx={{
//                       position: 'relative',
//                       width: '100%',
//                       height: { xs: 220, md: 400 },
//                       overflow: 'hidden',
//                       p: 3,
//                     }}
//                   >
//                     <Image
//                       src={featured.img}
//                       alt={featured.name}
//                       width={800}
//                       height={400}
//                       style={{
//                         objectFit: 'cover',
//                         width: '100%',
//                         height: '100%',
//                         borderRadius: 10,
//                       }}
//                       priority
//                     />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Card>
//           );
//         })()}

//       {/* 🎛 Filter Buttons */}
//       <Stack
//         direction="row"
//         justifyContent="center"
//         flexWrap="wrap"
//         gap={1.5}
//         sx={{ mb: { xs: 4, sm: 6 } }}
//       >
//         {type.map((tp) => (
//           <Button
//             key={tp.id}
//             onClick={() => {
//               setSelectedType(tp.id);
//               setPage(1);
//             }}
//             sx={{
//               bgcolor: selectedType === tp.id ? '#D622DA' : '#1f2937',
//               color: selectedType === tp.id ? '#fff' : '#9ca3af',
//               textTransform: 'none',
//               fontSize: { xs: '0.75rem', sm: '0.9rem' },
//               borderRadius: '10px',
//               px: { xs: 1.8, sm: 2.5 },
//               py: { xs: 0.6, sm: 0.8 },
//               fontWeight: 500,
//               '&:hover': {
//                 bgcolor:
//                   selectedType === tp.id ? '#6366F1' : 'rgba(99,102,241,0.2)',
//               },
//             }}
//           >
//             {tp.name}
//           </Button>
//         ))}
//       </Stack>

//       {/* 📚 Grid of Articles */}
//       <Box>
//         <Grid
//           container
//           spacing={3}
//           justifyContent="center"
//           alignItems="stretch"
//           sx={{ maxWidth: 1300, mx: 'auto' }}
//         >
//           {currentNews
//             .filter((e) => e.id !== '1')
//             .map((e: newsType) => (
//               <Grid key={e.id} size={{ xs: 12, sm: 6, md: 4 }}>
//                 <Card
//                   sx={{
//                     bgcolor: '#1B005C',
//                     borderRadius: 3,
//                     overflow: 'hidden',
//                     border: '1px solid rgba(255,255,255,0.1)',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     transition: 'transform 0.3s ease',
//                     '&:hover': { transform: 'translateY(-4px)' },
//                     height: 400,
//                   }}
//                 >
//                   {/* 🔹 Image */}
//                   <Box
//                     sx={{
//                       position: 'relative',
//                       height: { xs: 180, sm: 200 },
//                       overflow: 'hidden',
//                     }}
//                   >
//                     <Image
//                       src={e.img}
//                       alt={e.name}
//                       width={600}
//                       height={200}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover',
//                         display: 'block',
//                       }}
//                     />

//                     {/* 🔹 Overlay gradient */}
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         inset: 0,
//                         // background:
//                         //   'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.7))',
//                       }}
//                     />

//                     {/* 🔹 Category Chip */}
//                     <Chip
//                       label={e.type}
//                       sx={{
//                         position: 'absolute',
//                         top: 10,
//                         left: 10,
//                         fontSize: '0.7rem',
//                         color: '#fff',
//                         textTransform: 'uppercase',
//                         background:
//                           'linear-gradient(90deg, #C026D3 0%, #7C3AED 100%)',
//                         fontWeight: 600,
//                       }}
//                     />
//                   </Box>

//                   {/* 🔹 Content */}
//                   <CardContent sx={{ p: { xs: 2.5, sm: 3 }, flexGrow: 1 }}>
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       spacing={1.2}
//                       sx={{ mb: 1 }}
//                     >
//                       <Typography
//                         sx={{
//                           color: '#A1A1AA',
//                           fontSize: '0.8rem',
//                         }}
//                       >
//                         {e.date}
//                       </Typography>
//                       <Typography sx={{ color: '#A1A1AA', fontSize: '0.8rem' }}>
//                         •
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: '#A1A1AA',
//                           fontSize: '0.8rem',
//                         }}
//                       >
//                         {e.time} min read
//                       </Typography>
//                     </Stack>

//                     <Typography
//                       sx={{
//                         color: '#fff',
//                         fontWeight: 700,
//                         fontSize: { xs: '1rem', sm: '1.1rem' },
//                         mb: 1.3,
//                         lineHeight: 1.4,
//                       }}
//                     >
//                       {e.name}
//                     </Typography>

//                     <Typography
//                       sx={{
//                         color: '#d1d5db',
//                         fontSize: '0.85rem',
//                         lineHeight: 1.5,
//                         mb: 2.2,
//                       }}
//                     >
//                       {e.text}
//                     </Typography>

//                     <Button
//                       href={e.link}
//                       sx={{
//                         color: '#A855F7',
//                         fontSize: '0.85rem',
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         '&:hover': { textDecoration: 'underline' },
//                       }}
//                     >
//                       Read More →
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//         </Grid>

//         {/* 🔹 Pagination */}
//         {totalPages > 1 && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={handlePageChange}
//               color="secondary"
//               sx={{
//                 '& .MuiPaginationItem-root': { color: '#fff' },
//               }}
//             />
//           </Box>
//         )}
//       </Box>
//     </Stack>
//   );
// };

// 'use client';

// import dynamic from 'next/dynamic';
// import React, { Suspense, useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Stack,
//   Typography,
//   Grid,
//   Pagination,
// } from '@mui/material';
// import Image from 'next/image';
// import { newss, type as filterOptions, newsType } from './data/newsData';

// // Dynamic import, SSR false để tránh prerender error
// const NewsClient = dynamic(
//   () => import('./News').then(m => m.News),
//   { ssr: false }
// );

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <NewsClient />
//     </Suspense>
//   );
// }

// // ---------------- News component ----------------
// export const News: React.FC = () => {
//   const [selectedType, setSelectedType] = useState<number>(1);
//   const [page, setPage] = useState(1);

//   // Filter chuẩn, map tất cả về uppercase + _ để match
//   const filterednewss = newss.filter((e) => {
//     if (selectedType === 1) return true;

//     const selectedName =
//       filterOptions.find((t) => t.id === selectedType)?.name
//         .toUpperCase()
//         .replace(/\s/g, '_') || '';

//     return e.type.toUpperCase() === selectedName;
//   });

//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(filterednewss.length / itemsPerPage);
//   const currentNews = filterednewss.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//     if (typeof window !== 'undefined') {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <Stack
//       sx={{
//         color: '#fff',
//         px: { xs: 2, sm: 4, md: 8 },
//         py: { xs: 4, sm: 6, md: 10 },
//         background: 'linear-gradient(180deg, #0f051d 0%, #12093b 100%)',
//         minHeight: '100vh',
//       }}
//     >
//       {/* Header */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: 700,
//           textAlign: 'center',
//           fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' },
//           mb: 1.5,
//         }}
//       >
//         News & Updates
//       </Typography>
//       <Typography
//         sx={{
//           color: 'rgba(255,255,255,0.7)',
//           textAlign: 'center',
//           mb: { xs: 5, sm: 7 },
//           mx: 'auto',
//           fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' },
//           width: { xs: '95%', sm: '70%', md: '60%' },
//           lineHeight: 1.6,
//         }}
//       >
//         Stay updated with the latest product releases, artist interviews, community highlights, and comprehensive guides.
//       </Typography>

//       {/* Filter Buttons */}
//       <Stack
//         direction="row"
//         justifyContent="center"
//         flexWrap="wrap"
//         gap={1.5}
//         sx={{ mb: { xs: 4, sm: 6 } }}
//       >
//         {filterOptions.map((tp) => (
//           <Button
//             key={tp.id}
//             onClick={() => {
//               setSelectedType(tp.id);
//               setPage(1);
//             }}
//             sx={{
//               bgcolor: selectedType === tp.id ? '#D622DA' : '#1f2937',
//               color: selectedType === tp.id ? '#fff' : '#9ca3af',
//               textTransform: 'none',
//               fontSize: { xs: '0.75rem', sm: '0.9rem' },
//               borderRadius: '10px',
//               px: { xs: 1.8, sm: 2.5 },
//               py: { xs: 0.6, sm: 0.8 },
//               fontWeight: 500,
//               '&:hover': {
//                 bgcolor:
//                   selectedType === tp.id ? '#6366F1' : 'rgba(99,102,241,0.2)',
//               },
//             }}
//           >
//             {tp.name}
//           </Button>
//         ))}
//       </Stack>

//       {/* News Grid */}
//       <Grid container spacing={3} justifyContent="center">
//         {currentNews.map((e: newsType) => (
//           <Grid size={{ xs: 12, sm: 6, md: 4 }} key={e.id}>
//             <Card
//               sx={{
//                 bgcolor: '#1B005C',
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 border: '1px solid rgba(255,255,255,0.1)',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'transform 0.3s ease',
//                 '&:hover': { transform: 'translateY(-4px)' },
//                 height: 400,
//               }}
//             >
//               <Box sx={{ position: 'relative', height: { xs: 180, sm: 200 }, overflow: 'hidden' }}>
//                 <Image
//                   src={e.img || '/news/news.png'}
//                   alt={e.name}
//                   width={600}
//                   height={200}
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                 />
//                 <Chip
//                   label={e.type}
//                   sx={{
//                     position: 'absolute',
//                     top: 10,
//                     left: 10,
//                     fontSize: '0.7rem',
//                     color: '#fff',
//                     textTransform: 'uppercase',
//                     background: 'linear-gradient(90deg, #C026D3 0%, #7C3AED 100%)',
//                     fontWeight: 600,
//                   }}
//                 />
//               </Box>
//               <CardContent sx={{ p: { xs: 2.5, sm: 3 }, flexGrow: 1 }}>
//                 <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 1 }}>
//                   <Typography sx={{ color: '#A1A1AA', fontSize: '0.8rem' }}>{e.date}</Typography>
//                   <Typography sx={{ color: '#A1A1AA', fontSize: '0.8rem' }}>•</Typography>
//                   <Typography sx={{ color: '#A1A1AA', fontSize: '0.8rem' }}>{e.time} min read</Typography>
//                 </Stack>
//                 <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1.3, lineHeight: 1.4 }}>
//                   {e.name}
//                 </Typography>
//                 <Typography sx={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: 1.5, mb: 2.2 }}>
//                   {e.text}
//                 </Typography>
//                 <Button
//                   href={e.link}
//                   sx={{ color: '#A855F7', fontSize: '0.85rem', textTransform: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
//                 >
//                   Read More →
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
//           <Pagination count={totalPages} page={page} onChange={handlePageChange} color="secondary" sx={{ '& .MuiPaginationItem-root': { color: '#fff' } }} />
//         </Box>
//       )}
//     </Stack>
//   );
// };
'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Grid,
  Pagination,
} from '@mui/material';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import newsService from '@/services/newsService';
import { News as NewsType, CategoryNews } from '@/types/news';

export const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const { data: categories, isLoading: loadingCategories } = useQuery<
    CategoryNews[],
    Error
  >({
    queryKey: ['categories'],
    queryFn: newsService.getAllCategories,
  });

  const { data: allNews, isLoading: loadingNews } = useQuery<NewsType[], Error>(
    {
      queryKey: ['news'],
      queryFn: newsService.getAllNews,
    },
  );

  const filteredNews = allNews?.filter((n) =>
    selectedCategory ? n.category?.id === selectedCategory : true,
  );

  const totalPages = Math.ceil((filteredNews?.length || 0) / itemsPerPage);
  const currentNews = filteredNews?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loadingNews || loadingCategories) {
    return <Typography sx={{ color: '#fff' }}>Loading...</Typography>;
  }

  return (
    <Stack
      sx={{
        color: '#fff',
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, sm: 6, md: 10 },
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}
      >
        News & Updates
      </Typography>

      {/* Featured News */}
      {currentNews && currentNews.length > 0 && (
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <Grid size={{ xs: 12 }}>
            {(() => {
              const featured = currentNews[0];
              const thumbnailUrl = featured.thumbnail
                ? `https://res.cloudinary.com/dr6cnnvma/image/upload/${featured.thumbnail}.png`
                : '/news/news.png';

              return (
                <Card
                  sx={{
                    bgcolor: '#1B005C',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)' },
                    height: { xs: 300, sm: 400 },
                  }}
                >
                  <Box
                    sx={{ position: 'relative', height: { xs: 180, sm: 250 } }}
                  >
                    <Image
                      src={thumbnailUrl}
                      alt={featured.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="100vw"
                    />
                    <Chip
                      label={featured.category?.name || 'Unknown'}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        fontSize: '0.7rem',
                        color: '#fff',
                        textTransform: 'uppercase',
                        background:
                          'linear-gradient(90deg, #C026D3 0%, #7C3AED 100%)',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        mb: 1.3,
                      }}
                    >
                      {featured.title}
                    </Typography>
                    <Typography
                      sx={{ color: '#d1d5db', fontSize: '0.9rem', mb: 2.2 }}
                    >
                      {featured.description}
                    </Typography>
                    <Button
                      href={`/news/${featured.id}`}
                      sx={{
                        color: '#A855F7',
                        fontSize: '0.85rem',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              );
            })()}
          </Grid>
        </Grid>
      )}

      {/* Filter Buttons */}
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={1.5}
        sx={{ mb: 5 }}
      >
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setPage(1);
          }}
          sx={{
            bgcolor: selectedCategory === null ? '#D622DA' : '#1f2937',
            color: selectedCategory === null ? '#fff' : '#9ca3af',
            textTransform: 'none',
            borderRadius: '10px',
            px: 2.5,
            py: 0.8,
          }}
        >
          All
        </Button>
        {categories?.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setPage(1);
            }}
            sx={{
              bgcolor: selectedCategory === cat.id ? '#D622DA' : '#1f2937',
              color: selectedCategory === cat.id ? '#fff' : '#9ca3af',
              textTransform: 'none',
              borderRadius: '10px',
              px: 2.5,
              py: 0.8,
            }}
          >
            {cat.name}
          </Button>
        ))}
      </Stack>

      {/* Remaining News Grid */}
      <Grid container spacing={3} justifyContent="center">
        {currentNews?.slice(1).map((e) => {
          const thumbnailUrl = e.thumbnail
            ? `https://res.cloudinary.com/dr6cnnvma/image/upload/${e.thumbnail}.png`
            : '/news/news.png';

          return (
            <Grid key={e.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  bgcolor: '#1B005C',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)' },
                  height: 400,
                }}
              >
                <Box
                  sx={{ position: 'relative', height: { xs: 180, sm: 200 } }}
                >
                  <Image
                    src={thumbnailUrl}
                    alt={e.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
                  />
                  <Chip
                    label={e.category?.name || 'Unknown'}
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      fontSize: '0.7rem',
                      color: '#fff',
                      textTransform: 'uppercase',
                      background:
                        'linear-gradient(90deg, #C026D3 0%, #7C3AED 100%)',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      mb: 1.3,
                    }}
                  >
                    {e.title}
                  </Typography>
                  <Typography
                    sx={{ color: '#d1d5db', fontSize: '0.85rem', mb: 2.2 }}
                  >
                    {e.description}
                  </Typography>
                  <Button
                    href={`/news/${e.id}`}
                    sx={{
                      color: '#A855F7',
                      fontSize: '0.85rem',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="secondary"
            sx={{ '& .MuiPaginationItem-root': { color: '#fff' } }}
          />
        </Box>
      )}
    </Stack>
  );
};

// src/components/view_all/news/NewsClient.tsx
// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Stack,
//   Typography,
//   Grid,
//   Pagination,
// } from '@mui/material';
// import Image from 'next/image';
// import { newss, type, newsType } from './data/newsData';

// export const NewsClient: React.FC = () => {
//   const [selectedType, setSelectedType] = useState<number>(1);
//   const [page, setPage] = useState(1);

//   // Filter logic
//   const filterednewss = newss.filter((e) => {
//     if (selectedType === 1) return true;
//     const selectedName = type.find((t) => t.id === selectedType)?.name.toLowerCase().trim() || '';
//     const newsTypeName = e.type.toLowerCase().trim();
//     return newsTypeName === selectedName || newsTypeName === selectedName.replace(/s$/, '');
//   });

//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(filterednewss.length / itemsPerPage);
//   const currentNews = filterednewss.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <Stack sx={{ color: '#fff', px: { xs: 2, sm: 4, md: 8 }, py: { xs: 4, sm: 6, md: 10 }, background: 'linear-gradient(180deg, #0f051d 0%, #12093b 100%)', minHeight: '100vh' }}>

//       {/* Header */}
//       <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' }, mb: 1.5 }}>
//         News & Updates
//       </Typography>
//       <Typography sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: { xs: 5, sm: 7 }, mx: 'auto', fontSize: { xs: '0.9rem', sm: '1.05rem', md: '1.2rem' }, width: { xs: '95%', sm: '70%', md: '60%' }, lineHeight: 1.6 }}>
//         Stay updated with the latest product releases, artist interviews, community highlights, and comprehensive guides.
//       </Typography>

//       {/* Featured */}
//       {selectedType === 1 && (() => {
//         const featured = newss.find((n) => n.type === 'FEATURED');
//         if (!featured) return null;

//         return (
//           <Card sx={{ mb: { xs: 5, sm: 8 }, bgcolor: '#000760', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', maxWidth: 900, mx: 'auto' }}>
//             <Grid container>
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <CardContent sx={{ p: { xs: 3, md: 4 } }}>
//                   <Chip label={featured.type} sx={{ bgcolor: '#D622DA', color: '#fff', fontWeight: 600, fontSize: '0.7rem', mb: 2 }} />
//                   <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.6rem' }, color: '#fff', mb: 1.5 }}>{featured.name}</Typography>
//                   <Typography sx={{ color: '#d1d5db', fontSize: '0.85rem', mb: 2, lineHeight: 1.6 }}>{featured.text}</Typography>
//                   <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
//                     <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem' }}>{featured.date}</Typography>
//                     <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem' }}>•</Typography>
//                     <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem' }}>{featured.time} min read</Typography>
//                   </Stack>
//                   <Button variant="contained" href={featured.link} sx={{ bgcolor: '#D622DA', borderRadius: 2, textTransform: 'none', fontSize: '0.9rem', mt: 1, '&:hover': { bgcolor: '#4f46e5' } }}>
//                     Read Full Article
//                   </Button>
//                 </CardContent>
//               </Grid>
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <Box sx={{ position: 'relative', width: '100%', height: { xs: 220, md: 400 }, overflow: 'hidden', p: 3 }}>
//                   <Image src={featured.img} alt={featured.name} width={800} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 10 }} priority />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Card>
//         );
//       })()}

//       {/* Filter */}
//       <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={1.5} sx={{ mb: { xs: 4, sm: 6 } }}>
//         {type.map((tp) => (
//           <Button key={tp.id} onClick={() => { setSelectedType(tp.id); setPage(1); }} sx={{ bgcolor: selectedType === tp.id ? '#D622DA' : '#1f2937', color: selectedType === tp.id ? '#fff' : '#9ca3af', textTransform: 'none', fontSize: { xs: '0.75rem', sm: '0.9rem' }, borderRadius: '10px', px: { xs: 1.8, sm: 2.5 }, py: { xs: 0.6, sm: 0.8 }, fontWeight: 500, '&:hover': { bgcolor: selectedType === tp.id ? '#6366F1' : 'rgba(99,102,241,0.2)' } }}>{tp.name}</Button>
//         ))}
//       </Stack>

//       {/* News Grid */}
//       <Box>
//         <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ maxWidth: 1300, mx: 'auto' }}>
//           {currentNews.filter((e) => e.id !== '1').map((e: newsType) => (
//             <Grid key={e.id} size={{ xs: 12, sm: 6, md: 4 }}>
//               <Card sx={{ bgcolor: '#1B005C', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-4px)' }, height: 400 }}>
//                 <Box sx={{ position: 'relative', height: { xs: 180, sm: 200 }, overflow: 'hidden' }}>
//                   <Image src={e.img} alt={e.name} width={600} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
//                   <Chip label={e.type} sx={{ position: 'absolute', top: 10, left: 10, fontSize: '0.7rem', color: '#fff', textTransform: 'uppercase', background: 'linear-gradient(90deg, #C026D3 0%, #7C3AED 100%)', fontWeight: 600 }} />
//                 </Box>
//                 <CardContent sx={{ p: { xs: 2.5, sm: 3 }, flexGrow: 1 }}>
//                   <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 1 }}>
//                     <Typography sx={{ color: '#A1A1AA', fontSize: '0.8rem' }}>{e.date}</Typography>
//                     <Typography sx={{ color: '#A1A1AA', fontSize: '0.8rem' }}>•</Typography>
//                     <Typography sx={{ color: '#A1A1AA', fontSize: '0.8rem' }}>{e.time} min read</Typography>
//                   </Stack>
//                   <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1.3, lineHeight: 1.4 }}>{e.name}</Typography>
//                   <Typography sx={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: 1.5, mb: 2.2 }}>{e.text}</Typography>
//                   <Button href={e.link} sx={{ color: '#A855F7', fontSize: '0.85rem', textTransform: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>Read More →</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {totalPages > 1 && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
//             <Pagination count={totalPages} page={page} onChange={handlePageChange} color="secondary" sx={{ '& .MuiPaginationItem-root': { color: '#fff' } }} />
//           </Box>
//         )}
//       </Box>
//     </Stack>
//   );
// };
