// 'use client';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   Chip,
//   Stack,
// } from '@mui/material';
// import Image from 'next/image';
// import Marquee from 'react-fast-marquee';

// const events = [
//   {
//     name: 'New Feature: Staking and Rewards for NFT Holders',
//     img: '/community/news1.png',
//     text: 'Learn how you can earn passive rewards by staking the NFTs in your collection...',
//     link: '',
//     chips: [{ name: 'PRODUCT UPDATE', color: '#6366f1' }],
//   },
//   {
//     name: 'The Creative Journey of Anang Suryono: From Paintbrush to Pixel',
//     img: '/community/new.png',
//     text: 'We had an in-depth conversation with Anang Suryono, one of the leading artists on our platform...',
//     link: '',
//     chips: [{ name: 'INTERVIEW', color: '#f59e0b' }],
//   },
// ];

// export default function NewsUpdate() {
//   return (
//     <Box sx={{ mt: { xs: 3, sm: 4, md: 6 }, pb: { xs: 4, sm: 6 } }}>
//       {/* 👉 Marquee for desktop & tablet */}
//       <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//         <Marquee gradient={false} speed={35} pauseOnHover>
//           {[...Array(2)].map((_, repeatIndex) =>
//             events.map((e, i) => (
//               <Card
//                 key={`${i}-${repeatIndex}`}
//                 sx={{
//                   width: { md: 480, lg: 560 },
//                   height: { md: 380, lg: 420 },
//                   borderRadius: 4,
//                   my: 1,
//                   mx: 2,
//                   overflow: 'hidden',
//                   bgcolor: '#1a0c45',
//                   border: '1px solid rgba(255,255,255,0.05)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
//                   },
//                 }}
//               >
//                 {/* Hình nền */}
//                 <Box
//                   sx={{
//                     position: 'relative',
//                     height: { md: 200, lg: 220 },
//                     overflow: 'hidden',
//                   }}
//                 >
//                   <Image
//                     src={e.img}
//                     alt={e.name}
//                     fill
//                     sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
//                     style={{ objectFit: 'cover' }}
//                   />

//                   <Stack
//                     direction="row"
//                     spacing={1}
//                     sx={{ position: 'absolute', top: 12, left: 12 }}
//                   >
//                     {e.chips.map((chip, j) => (
//                       <Chip
//                         key={j}
//                         label={chip.name}
//                         sx={{
//                           bgcolor: chip.color,
//                           color: chip.color === '#f59e0b' ? '#000' : '#fff',
//                           fontSize: 11,
//                           fontWeight: 550,
//                           textTransform: 'uppercase',
//                           borderRadius: '50px',
//                         }}
//                       />
//                     ))}
//                   </Stack>
//                 </Box>

//                 {/* Nội dung */}
//                 <CardContent sx={{ p: { md: 2.5, lg: 3 } }}>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: '#fff',
//                       fontWeight: 600,
//                       mb: 1,
//                       fontSize: { md: '1rem', lg: '1.1rem' },
//                       lineHeight: 1.3,
//                     }}
//                   >
//                     {e.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: 'rgba(255,255,255,0.8)',
//                       mb: 2,
//                       fontSize: { md: '0.85rem', lg: '0.9rem' },
//                       lineHeight: 1.5,
//                     }}
//                   >
//                     {e.text}
//                   </Typography>
//                 </CardContent>

//                 <CardActions sx={{ p: 0, px: { md: 2.5, lg: 3 }, pb: 2 }}>
//                   {e.link ? (
//                     <Button
//                       fullWidth
//                       href={e.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       sx={{
//                         justifyContent: 'flex-start',
//                         color: '#5f61e7',
//                         textTransform: 'none',
//                         fontSize: '0.9rem',
//                         fontWeight: 500,
//                         borderRadius: 0,
//                         p: 0,
//                         minWidth: 0,
//                         background: 'none',
//                         boxShadow: 'none',
//                         '&:hover': {
//                           background: 'none',
//                           color: '#5f61e7dd',
//                         },
//                       }}
//                     >
//                       Read more...
//                     </Button>
//                   ) : (
//                     <Typography
//                       sx={{
//                         color: '#ffffff55',
//                         fontSize: '0.9rem',
//                         fontWeight: 400,
//                         fontStyle: 'italic',
//                         pl: 0.5,
//                       }}
//                     >
//                       Coming soon...
//                     </Typography>
//                   )}
//                 </CardActions>
//               </Card>
//             )),
//           )}
//         </Marquee>
//       </Box>

//       {/* 👉 Grid layout for tablet & mobile */}
//       <Box
//         sx={{
//           display: { xs: 'grid', md: 'none' },
//           gridTemplateColumns: {
//             xs: '1fr',
//             sm: '1fr 1fr',
//           },
//           gap: { xs: 2, sm: 3 },
//           mt: 2,
//           px: { xs: 1, sm: 2 },
//         }}
//       >
//         {events.map((e, i) => (
//           <Card
//             key={i}
//             sx={{
//               borderRadius: 3,
//               overflow: 'hidden',
//               bgcolor: '#1a1a2e',
//               border: '1px solid rgba(255,255,255,0.08)',
//             }}
//           >
//             <Box
//               sx={{
//                 position: 'relative',
//                 height: { xs: 160, sm: 180 },
//               }}
//             >
//               <Image
//                 src={e.img}
//                 alt={e.name}
//                 fill
//                 sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
//                 style={{ objectFit: 'cover' }}
//               />

//               <Stack
//                 direction="row"
//                 spacing={1}
//                 sx={{ position: 'absolute', top: 8, left: 8 }}
//               >
//                 {e.chips.map((chip, j) => (
//                   <Chip
//                     key={j}
//                     label={chip.name}
//                     sx={{
//                       bgcolor: chip.color,
//                       color: '#fff',
//                       fontSize: 10,
//                       fontWeight: 700,
//                       textTransform: 'uppercase',
//                       borderRadius: '6px',
//                     }}
//                   />
//                 ))}
//               </Stack>
//             </Box>

//             <CardContent sx={{ p: 2 }}>
//               <Typography
//                 variant="subtitle2"
//                 sx={{
//                   color: '#fff',
//                   fontWeight: 600,
//                   mb: 0.5,
//                   fontSize: { xs: '0.85rem', sm: '0.95rem' },
//                 }}
//               >
//                 {e.name}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: 'rgba(255,255,255,0.8)',
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                 }}
//               >
//                 {e.text}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// }


'use client';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { useNews } from '@/hooks/useNews';

export default function NewsUpdate() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNews();

  // Lấy danh sách news từ tất cả các trang
  const newsList = data?.pages.flatMap(page => page.data) || [];

  return (
    <Box sx={{ mt: { xs: 3, sm: 4, md: 6 }, pb: { xs: 4, sm: 6 } }}>
      {/* 👉 Marquee for desktop & tablet */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Marquee gradient={false} speed={35} pauseOnHover>
          {[...Array(2)].map((_, repeatIndex) =>
            newsList.map((e, i) => (
              <Card
                key={`${i}-${repeatIndex}`}
                sx={{
                  width: { md: 480, lg: 560 },
                  height: { md: 380, lg: 420 },
                  borderRadius: 4,
                  my: 1,
                  mx: 2,
                  overflow: 'hidden',
                  bgcolor: '#1a0c45',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
                  },
                }}
              >
                {/* Hình nền */}
                <Box
                  sx={{
                    position: 'relative',
                    height: { md: 200, lg: 220 },
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={e.thumbnail}
                    alt={e.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                    style={{ objectFit: 'cover' }}
                  />

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ position: 'absolute', top: 12, left: 12 }}
                  >
                    <Chip
                      label={e.category.name.toUpperCase()}
                      sx={{
                        bgcolor: '#6366f1',
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 550,
                        textTransform: 'uppercase',
                        borderRadius: '50px',
                      }}
                    />
                  </Stack>
                </Box>

                {/* Nội dung */}
                <CardContent sx={{ p: { md: 2.5, lg: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      mb: 1,
                      fontSize: { md: '1rem', lg: '1.1rem' },
                      lineHeight: 1.3,
                    }}
                  >
                    {e.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      mb: 2,
                      fontSize: { md: '0.85rem', lg: '0.9rem' },
                      lineHeight: 1.5,
                    }}
                  >
                    {e.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 0, px: { md: 2.5, lg: 3 }, pb: 2 }}>
                  {e.status === 'published' ? (
                    <Button
                      fullWidth
                      href={`/news/${e.id}`}
                      sx={{
                        justifyContent: 'flex-start',
                        color: '#5f61e7',
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        borderRadius: 0,
                        p: 0,
                        minWidth: 0,
                        background: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                          background: 'none',
                          color: '#5f61e7dd',
                        },
                      }}
                    >
                      Read more...
                    </Button>
                  ) : (
                    <Typography
                      sx={{
                        color: '#ffffff55',
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        pl: 0.5,
                      }}
                    >
                      Coming soon...
                    </Typography>
                  )}
                </CardActions>
              </Card>
            )),
          )}
        </Marquee>
      </Box>

      {/* 👉 Grid layout for tablet & mobile */}
      <Box
        sx={{
          display: { xs: 'grid', md: 'none' },
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 2, sm: 3 },
          mt: 2,
          px: { xs: 1, sm: 2 },
        }}
      >
        {newsList.map((e, i) => (
          <Card
            key={i}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: '#1a1a2e',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: { xs: 160, sm: 180 },
              }}
            >
              <Image
                src={e.thumbnail}
                alt={e.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                style={{ objectFit: 'cover' }}
              />

              <Stack
                direction="row"
                spacing={1}
                sx={{ position: 'absolute', top: 8, left: 8 }}
              >
                <Chip
                  label={e.category.name.toUpperCase()}
                  sx={{
                    bgcolor: '#6366f1',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    borderRadius: '6px',
                  }}
                />
              </Stack>
            </Box>

            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  mb: 0.5,
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                }}
              >
                {e.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                }}
              >
                {e.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 👉 Load more button */}
      {hasNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="contained"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
