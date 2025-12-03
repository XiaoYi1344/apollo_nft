

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
//   useMediaQuery,
//   useTheme,
//   Grid,
// } from '@mui/material';
// import Image from 'next/image';

// import GroupsIcon from '@mui/icons-material/Groups';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import GavelIcon from '@mui/icons-material/Gavel';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import SchoolIcon from '@mui/icons-material/School';

// import {
//   events,
//   timeline,
//   type,
//   getButtonLabel,
//   EventType,
//   getTimelineColor,
// } from './data/eventsData';

// const buttonColors: Record<string, string> = {
//   LIVE: '#9333ea',
//   UPCOMING: '#1f2937',
//   ENDED: '#1f2937',
// };

// // 🧠 Icon logic
// const getEventTypeIcon = (type: string) => {
//   switch (type.toUpperCase()) {
//     case 'AMA':
//     case 'MEETUP':
//       return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'DROP':
//       return <AccessTimeFilledIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'AUCTION':
//       return <GavelIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'CONTEST':
//       return <EmojiEventsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'WORKSHOP':
//       return <SchoolIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     default:
//       return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//   }
// };

// // 📊 Text logic
// const getEventTypeText = (type: string, number: string | number) => {
//   switch (type.toUpperCase()) {
//     case 'AMA':
//       return `${number} joined`;
//     case 'MEETUP':
//       return `${number} attended`;
//     case 'DROP':
//       return `in ${number} days`;
//     case 'AUCTION':
//       return `${number} items`;
//     case 'CONTEST':
//       return 'Winner announced';
//     case 'WORKSHOP':
//       return `${number} spots left`;
//     default:
//       return `${number} joined`;
//   }
// };

// export const Up_events: React.FC = () => {
//   const [selectedTimeline, setSelectedTimeline] = useState<number>(1);
//   const [selectedType, setSelectedType] = useState<number>(1);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600–900px
//   const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // >900px

//   // ✅ Filter events
//   const filteredEvents = events.filter((e) => {
//     const timelineName = timeline.find((t) => t.id === selectedTimeline)?.name;
//     const typeName = type.find((t) => t.id === selectedType)?.name;

//     const matchTimeline =
//       (e.timeline === 'UPCOMING' && timelineName === 'Upcoming Events') ||
//       (e.timeline === 'LIVE' && timelineName === 'Live Now') ||
//       (e.timeline === 'ENDED' && timelineName === 'Past Events') ||
//       selectedTimeline === 1;

//     const matchType =
//       e.type.toLowerCase() === typeName?.toLowerCase() || selectedType === 1;

//     return matchTimeline && matchType;
//   });

//   return (
//     <Stack
//       sx={{
//         color: '#fff',
//         px: { xs: 2, sm: 4, md: 6 },
//         py: { xs: 3, sm: 5, md: 8 },
//         background: 'linear-gradient(90deg,#070a12, #0e1637,#230b36)',
//       }}
//     >
//       {/* 🏷️ Title */}
//       <Typography
//         variant="h5"
//         sx={{
//           fontWeight: 700,
//           textAlign: 'center',
//           fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.4rem' },
//           mt: { xs: 8, md: 10 },
//           mb: 1,
//         }}
//       >
//         Event Calendar
//       </Typography>
//       <Typography
//         sx={{
//           color: 'rgba(255,255,255,0.7)',
//           mb: { xs: 5, sm: 8 },
//           mx: 'auto',
//           textAlign: 'center',
//           fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.3rem' },
//           lineHeight: 1.6,
//           fontWeight: 400,
//           width: { xs: '95%', sm: 600, md: 750 },
//         }}
//       >
//         Discover and join exciting events, AMAs, drops, auctions, and workshops
//         in our vibrant community.
//       </Typography>

//       {/* 🎛 Filters */}
//       <Stack
//         direction={{ xs: 'column', sm: 'row' }}
//         spacing={{ xs: 3, sm: 5 }} // 👈 giảm khoảng cách dọc trên mobile
//         justifyContent={{ xs: 'center', sm: 'flex-start' }} // 👈 căn giữa trên mobile
//         alignItems={{ xs: 'center', sm: 'center' }}
//         sx={{
//           mb: { xs: 4, sm: 5 },
//           ml: { sm: 3 },
//           flexWrap: { xs: 'wrap', sm: 'nowrap' }, // 👈 tránh tràn nút trên màn nhỏ
//           textAlign: { xs: 'center', sm: 'left' },
//         }}
//       >
//         {/* Timeline buttons */}
//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap', // 👈 Cho phép xuống dòng khi hẹp
//             justifyContent: { xs: 'center', sm: 'flex-start' },
//             gap: { xs: 1, sm: 1.5 },
//           }}
//         >
//           {timeline.map((t) => (
//             <Button
//               key={t.id}
//               onClick={() => setSelectedTimeline(t.id)}
//               sx={{
//                 color: selectedTimeline === t.id ? '#fff' : '#aaa',
//                 bgcolor: selectedTimeline === t.id ? '#9333ea' : '#1f2937',
//                 textTransform: 'none',
//                 borderRadius: 2,
//                 px: { xs: 1.5, sm: 2 },
//                 py: { xs: 0.5, sm: 0.7 },
//                 fontSize: { xs: '0.75rem', sm: '0.9rem' },
//                 '&:hover': {
//                   bgcolor:
//                     selectedTimeline === t.id
//                       ? '#9333ea'
//                       : 'rgba(147,51,234,0.2)',
//                   opacity: selectedTimeline === t.id ? 0.9 : 1,
//                 },
//               }}
//             >
//               {t.name}
//             </Button>
//           ))}
//         </Box>

//         {/* Type buttons */}
//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: { xs: 'center', sm: 'flex-start' },
//             gap: { xs: 1, sm: 1.5 },
//           }}
//         >
//           {type.map((tp) => (
//             <Button
//               key={tp.id}
//               onClick={() => setSelectedType(tp.id)}
//               sx={{
//                 bgcolor: selectedType === tp.id ? '#6366F1' : '#1f2937',
//                 color: selectedType === tp.id ? '#fff' : '#aaa',
//                 textTransform: 'none',
//                 borderRadius: 2,
//                 px: { xs: 1.5, sm: 2 },
//                 py: { xs: 0.5, sm: 0.7 },
//                 fontSize: { xs: '0.75rem', sm: '0.9rem' },
//                 '&:hover': {
//                   bgcolor:
//                     selectedType === tp.id ? '#6366F1' : 'rgba(99,102,241,0.2)',
//                   opacity: selectedType === tp.id ? 0.9 : 1,
//                 },
//               }}
//             >
//               {tp.name}
//             </Button>
//           ))}
//         </Box>
//       </Stack>

//       {/* Cards Grid */}
//       <Grid container spacing={3} justifyContent="center" alignItems="stretch">
//         {filteredEvents.map((e: EventType) => (
//           <Grid
//             size={{ xs: 12, sm: 6, md: 4 }}
//             key={e.id}
//             // item
//             // xs={12}   // Mobile: 1 cột
//             // sm={6}    // Tablet: 2 cột
//             // md={4}    // Desktop: 3 cột
//           >
//             <Card
//               sx={{
//                 borderRadius: 3,
//                 bgcolor: '#141545',
//                 border: '1px solid rgba(255,255,255,0.08)',
//                 overflow: 'hidden',
//                 position: 'relative',
//                 transition: 'transform 0.3s ease',
//                 '&:hover': { transform: 'translateY(-4px)' },
//                 // opacity:'0.8'
//               }}
//             >
//               {/* 🔹 Image */}
//               <Box sx={{ position: 'relative', height: { xs: 180, sm: 220 } }}>
//                 <Image
//                   src={e.img}
//                   alt={e.name}
//                   fill
//                   sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
//                   style={{ objectFit: 'cover' }}
//                 />
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     inset: 0,
//                     background:
//                       'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9))',
//                   }}
//                 />
//                 {/* 🔴 LIVE pulse badge */}
//                 <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
//                   {e.timeline === 'LIVE' ? (
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 0.8,
//                         bgcolor: '#9333EA',
//                         px: 1.5,
//                         py: 0.4,
//                         borderRadius: '20px',
//                         color: '#fff',
//                         fontWeight: 700,
//                         fontSize: '0.75rem',
//                         textTransform: 'uppercase',
//                         letterSpacing: '0.05em',
//                         zIndex: 2,
//                         boxShadow: '0 0 10px rgba(147, 51, 234, 0.6)',
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           width: 8,
//                           height: 8,
//                           borderRadius: '50%',
//                           backgroundColor: '#fff',
//                           position: 'relative',
//                           '&::before': {
//                             content: '""',
//                             position: 'absolute',
//                             inset: 0,
//                             borderRadius: '50%',
//                             backgroundColor: 'rgba(255, 255, 255, 0.6)',
//                             animation: 'pulseDot 1.4s infinite ease-out',
//                           },
//                           '@keyframes pulseDot': {
//                             '0%': { transform: 'scale(1)', opacity: 1 },
//                             '70%': { transform: 'scale(2)', opacity: 0 },
//                             '100%': { transform: 'scale(1)', opacity: 0 },
//                           },
//                         }}
//                       />
//                       LIVE
//                     </Box>
//                   ) : (
//                     <Chip
//                       label={e.timeline}
//                       sx={{
//                         bgcolor: getTimelineColor(e.timeline),
//                         color: '#fff',
//                         textTransform: 'uppercase',
//                         fontSize: '0.75rem',
//                         borderRadius: '20px',
//                         px: 1.5,
//                       }}
//                     />
//                   )}
//                 </Box>
//               </Box>

//               {/* 🔹 Content */}
//               <CardContent sx={{ p: { xs: 2.2, sm: 3 }, pb: 1 }}>
//                 <Typography
//                   sx={{
//                     color: '#A1A1AA',
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     mb: 1,
//                   }}
//                 >
//                   {e.time}
//                 </Typography>

//                 <Typography
//                   sx={{
//                     color: '#fff',
//                     fontWeight: 700,
//                     fontSize: { xs: '1.1rem', sm: '1.3rem' },
//                     fontFamily: `'Poppins', 'Inter', sans-serif`,
//                     mb: 1.2,
//                   }}
//                 >
//                   {e.name}
//                 </Typography>

//                 <Stack
//                   direction="row"
//                   justifyContent="space-between"
//                   spacing={0.7}
//                   //   pt={1}
//                 >
//                   <Chip
//                     label={e.type}
//                     sx={{
//                       bgcolor: '#1f2937',
//                       color: '#fff',
//                       textTransform: 'uppercase',
//                       fontSize: '0.7rem',
//                       borderRadius: '20px',
//                       px: 1,
//                     }}
//                   />
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     {getEventTypeIcon(e.type)}
//                     <Typography
//                       sx={{
//                         color: '#A1A1AA',
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                         mx: 0.7,
//                       }}
//                     >
//                       {getEventTypeText(e.type, e.viewer)}
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </CardContent>

//               {/* 🔹 Button */}
//               <Box sx={{ px: { xs: 2.2, sm: 3 }, pb: 3, mt: -1 }}>
//                 <Button
//                   fullWidth
//                   href={e.link}
//                   sx={{
//                     bgcolor: buttonColors[e.timeline],
//                     color: '#fff',
//                     textTransform: 'none',
//                     borderRadius: 2,
//                     py: 1.2,
//                     fontSize: '0.9rem',
//                     '&:hover': { opacity: 0.9 },
//                   }}
//                 >
//                   {getButtonLabel(e.timeline)}
//                 </Button>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Stack>
//   );
// };

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
// } from '@mui/material';
// import Image from 'next/image';

// import GroupsIcon from '@mui/icons-material/Groups';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import GavelIcon from '@mui/icons-material/Gavel';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import SchoolIcon from '@mui/icons-material/School';

// import {
//   events,
//   timeline,
//   type,
//   getButtonLabel,
//   EventType,
//   getTimelineColor,
// } from './data/eventsData';

// // 🎨 Button color mapping
// const buttonColors: Record<string, string> = {
//   LIVE: '#9333ea',
//   UPCOMING: '#1f2937',
//   ENDED: '#1f2937',
// };

// // 🧠 Get icon by event type
// const getEventTypeIcon = (type: string) => {
//   switch (type.toUpperCase()) {
//     case 'AMA':
//     case 'MEETUP':
//       return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'DROP':
//       return <AccessTimeFilledIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'AUCTION':
//       return <GavelIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'CONTEST':
//       return <EmojiEventsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'WORKSHOP':
//       return <SchoolIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     default:
//       return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//   }
// };

// // 📊 Viewer label text
// const getEventTypeText = (type: string, number: string | number) => {
//   switch (type.toUpperCase()) {
//     case 'AMA':
//       return `${number} joined`;
//     case 'MEETUP':
//       return `${number} attended`;
//     case 'DROP':
//       return `in ${number} days`;
//     case 'AUCTION':
//       return `${number} items`;
//     case 'CONTEST':
//       return 'Winner announced';
//     case 'WORKSHOP':
//       return `${number} spots left`;
//     default:
//       return `${number} joined`;
//   }
// };

// export const Up_events: React.FC = () => {
//   const [selectedTimeline, setSelectedTimeline] = useState<number>(1);
//   const [selectedType, setSelectedType] = useState<number>(1);

//   // const theme = useTheme();
//   // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // ✅ Filter logic
//   const filteredEvents = events.filter((e) => {
//     const timelineName = timeline.find((t) => t.id === selectedTimeline)?.name;
//     const typeName = type.find((t) => t.id === selectedType)?.name;

//     const matchTimeline =
//       (e.timeline === 'UPCOMING' && timelineName === 'Upcoming Events') ||
//       (e.timeline === 'LIVE' && timelineName === 'Live Now') ||
//       (e.timeline === 'ENDED' && timelineName === 'Past Events') ||
//       selectedTimeline === 1;

//     const matchType =
//       e.type.toLowerCase() === typeName?.toLowerCase() || selectedType === 1;

//     return matchTimeline && matchType;
//   });

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         overflow: 'hidden',
//         background: 'linear-gradient(120deg,#111827, #1E3A8A,#581C87)',
//         '&::after': {
//           content: '""',
//           position: 'absolute',
//           inset: 0,
//           backgroundColor: '#111827',
//           opacity: 0.5,
//         },
//       }}
//     >
//       <Stack
//         sx={{
//           position: 'relative',
//           zIndex: 1,
//           color: '#fff',
//           px: { xs: 2, sm: 4, md: 6 },
//           py: { xs: 3, sm: 5, md: 8 },
//         }}
//       >
//         {/* 🏷 Title */}
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 700,
//             textAlign: 'center',
//             fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.4rem' },
//             mt: { xs: 8, md: 10 },
//             mb: 1,
//           }}
//         >
//           Event Calendar
//         </Typography>
//         <Typography
//           sx={{
//             color: 'rgba(255,255,255,0.7)',
//             mb: { xs: 5, sm: 8 },
//             mx: 'auto',
//             textAlign: 'center',
//             fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.3rem' },
//             lineHeight: 1.6,
//             width: { xs: '95%', sm: 600, md: 750 },
//           }}
//         >
//           Discover and join exciting events, AMAs, drops, auctions, and
//           workshops in our vibrant community.
//         </Typography>

//         {/* 🎛 Filters */}
//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           spacing={{ xs: 3, sm: 5 }}
//           justifyContent={{ xs: 'center', sm: 'flex-start' }}
//           alignItems={{ xs: 'center', sm: 'center' }}
//           sx={{
//             mb: { xs: 4, sm: 5 },
//             ml: { sm: 3 },
//             flexWrap: { xs: 'wrap', sm: 'nowrap' },
//           }}
//         >
//           {/* Timeline filter */}
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
//             {timeline.map((t) => (
//               <Button
//                 key={t.id}
//                 onClick={() => setSelectedTimeline(t.id)}
//                 sx={{
//                   color: selectedTimeline === t.id ? '#fff' : '#aaa',
//                   bgcolor: selectedTimeline === t.id ? '#9333ea' : '#1f2937',
//                   textTransform: 'none',
//                   borderRadius: 2,
//                   px: { xs: 1.5, sm: 2 },
//                   py: { xs: 0.5, sm: 0.7 },
//                   fontSize: { xs: '0.75rem', sm: '0.9rem' },
//                   '&:hover': {
//                     bgcolor:
//                       selectedTimeline === t.id
//                         ? '#9333ea'
//                         : 'rgba(147,51,234,0.2)',
//                   },
//                 }}
//               >
//                 {t.name}
//               </Button>
//             ))}
//           </Box>

//           {/* Type filter */}
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
//             {type.map((tp) => (
//               <Button
//                 key={tp.id}
//                 onClick={() => setSelectedType(tp.id)}
//                 sx={{
//                   bgcolor: selectedType === tp.id ? '#6366F1' : '#1f2937',
//                   color: selectedType === tp.id ? '#fff' : '#aaa',
//                   textTransform: 'none',
//                   borderRadius: 2,
//                   px: { xs: 1.5, sm: 2 },
//                   py: { xs: 0.5, sm: 0.7 },
//                   fontSize: { xs: '0.75rem', sm: '0.9rem' },
//                   '&:hover': {
//                     bgcolor:
//                       selectedType === tp.id
//                         ? '#6366F1'
//                         : 'rgba(99,102,241,0.2)',
//                   },
//                 }}
//               >
//                 {tp.name}
//               </Button>
//             ))}
//           </Box>
//         </Stack>

//         {/* 🪩 Cards Grid */}
//         <Grid container spacing={3} justifyContent="center" alignItems="stretch">
//           {filteredEvents.map((e: EventType) => (
//             <Grid size={{ xs: 12, sm: 6, md: 4}} key={e.id}>
//               <Card
//                 sx={{
//                   borderRadius: 3,
//                   bgcolor: '#141545',
//                   border: '1px solid rgba(255,255,255,0.08)',
//                   overflow: 'hidden',
//                   position: 'relative',
//                   transition: 'transform 0.3s ease',
//                   '&:hover': { transform: 'translateY(-4px)' },
//                 }}
//               >
//                 {/* 🖼 Image */}
//                 <Box sx={{ position: 'relative', height: { xs: 180, sm: 220 } }}>
//                   <Image
//                     src={e.img}
//                     alt={e.name}
//                     fill
//                     style={{ objectFit: 'cover' }}
//                   />
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       inset: 0,
//                       background:
//                         'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9))',
//                     }}
//                   />

//                   {/* 🔴 Badge */}
//                   <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
//                     {e.timeline === 'LIVE' ? (
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 0.8,
//                           bgcolor: '#9333EA',
//                           px: 1.5,
//                           py: 0.4,
//                           borderRadius: '20px',
//                           color: '#fff',
//                           fontWeight: 700,
//                           fontSize: '0.75rem',
//                           textTransform: 'uppercase',
//                           letterSpacing: '0.05em',
//                           boxShadow: '0 0 10px rgba(147, 51, 234, 0.6)',
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             width: 8,
//                             height: 8,
//                             borderRadius: '50%',
//                             backgroundColor: '#fff',
//                             position: 'relative',
//                             '&::before': {
//                               content: '""',
//                               position: 'absolute',
//                               inset: 0,
//                               borderRadius: '50%',
//                               backgroundColor: 'rgba(255,255,255,0.6)',
//                               animation: 'pulseDot 1.4s infinite ease-out',
//                             },
//                             '@keyframes pulseDot': {
//                               '0%': { transform: 'scale(1)', opacity: 1 },
//                               '70%': { transform: 'scale(2)', opacity: 0 },
//                               '100%': { transform: 'scale(1)', opacity: 0 },
//                             },
//                           }}
//                         />
//                         LIVE
//                       </Box>
//                     ) : (
//                       <Chip
//                         label={e.timeline}
//                         sx={{
//                           bgcolor: getTimelineColor(e.timeline),
//                           color: '#fff',
//                           textTransform: 'uppercase',
//                           fontSize: '0.75rem',
//                           borderRadius: '20px',
//                           px: 1.5,
//                         }}
//                       />
//                     )}
//                   </Box>
//                 </Box>

//                 {/* 📄 Content */}
//                 <CardContent sx={{ p: { xs: 2.2, sm: 3 }, pb: 1 }}>
//                   <Typography sx={{ color: '#A1A1AA', fontSize: '0.9rem', mb: 1 }}>
//                     {e.time}
//                   </Typography>

//                   <Typography
//                     sx={{
//                       color: '#fff',
//                       fontWeight: 700,
//                       fontSize: '1.3rem',
//                       mb: 1.2,
//                     }}
//                   >
//                     {e.name}
//                   </Typography>

//                   <Stack direction="row" justifyContent="space-between" spacing={0.7}>
//                     <Chip
//                       label={e.type}
//                       sx={{
//                         bgcolor: '#1f2937',
//                         color: '#fff',
//                         textTransform: 'uppercase',
//                         fontSize: '0.7rem',
//                         borderRadius: '20px',
//                         px: 1,
//                       }}
//                     />
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       {getEventTypeIcon(e.type)}
//                       <Typography sx={{ color: '#A1A1AA', fontSize: '0.85rem', mx: 0.7 }}>
//                         {getEventTypeText(e.type, e.viewer)}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                 </CardContent>

//                 {/* 🔘 Button */}
//                 <Box sx={{ px: { xs: 2.2, sm: 3 }, pb: 3 }}>
//                   <Button
//                     fullWidth
//                     href={e.link}
//                     sx={{
//                       bgcolor: buttonColors[e.timeline],
//                       color: '#fff',
//                       textTransform: 'none',
//                       borderRadius: 2,
//                       py: 1.2,
//                       fontSize: '0.9rem',
//                       '&:hover': { opacity: 0.9 },
//                     }}
//                   >
//                     {getButtonLabel(e.timeline)}
//                   </Button>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Stack>
//     </Box>
//   );
// };


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
// } from '@mui/material';
// import Image from 'next/image';
// import {
//   events,
//   timeline,
//   type as typeOptions,
//   EventType,
//   getButtonLabel,
//   getTimelineColor,
// } from './data/eventsData';
// import GroupsIcon from '@mui/icons-material/Groups';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import GavelIcon from '@mui/icons-material/Gavel';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import SchoolIcon from '@mui/icons-material/School';

// const buttonColors: Record<string, string> = {
//   LIVE: '#9333ea',
//   UPCOMING: '#1f2937',
//   ENDED: '#1f2937',
// };

// const getEventTypeIcon = (type: string) => {
//   switch (type.toUpperCase()) {
//     case 'AMA':
//     case 'MEETUP':
//       return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'DROP':
//       return <AccessTimeFilledIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'AUCTION':
//       return <GavelIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'CONTEST':
//       return <EmojiEventsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     case 'WORKSHOP':
//       return <SchoolIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//     default:
//       return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
//   }
// };

// const getEventTypeText = (type: string, number: string | number) => {
//   switch (type.toUpperCase()) {
//     case 'AMA':
//       return `${number} joined`;
//     case 'MEETUP':
//       return `${number} attended`;
//     case 'DROP':
//       return `in ${number} days`;
//     case 'AUCTION':
//       return `${number} items`;
//     case 'CONTEST':
//       return 'Winner announced';
//     case 'WORKSHOP':
//       return `${number} spots left`;
//     default:
//       return `${number} joined`;
//   }
// };

// export const Up_events: React.FC = () => {
//   const [selectedTimeline, setSelectedTimeline] = useState<number>(1);
//   const [selectedType, setSelectedType] = useState<number>(1);

//   const filteredEvents = events.filter((e) => {
//     const timelineName = timeline.find((t) => t.id === selectedTimeline)?.name;
//     const typeName = typeOptions.find((t) => t.id === selectedType)?.name;

//     const matchTimeline =
//       selectedTimeline === 1 ||
//       (e.timeline === 'UPCOMING' && timelineName === 'Upcoming Events') ||
//       (e.timeline === 'LIVE' && timelineName === 'Live Now') ||
//       (e.timeline === 'ENDED' && timelineName === 'Past Events');

//     const matchType =
//       selectedType === 1 || e.type.toLowerCase() === typeName?.toLowerCase();

//     return matchTimeline && matchType;
//   });

//   return (
//     <Box sx={{ background: 'linear-gradient(120deg,#111827, #1E3A8A,#581C87)' }}>
//       <Stack sx={{ color: '#fff', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, sm: 5, md: 8 } }}>
//         <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.4rem' }, mb: 1 }}>
//           Event Calendar
//         </Typography>
//         <Typography sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: { xs: 5, sm: 8 }, mx: 'auto', fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.3rem' }, lineHeight: 1.6, width: { xs: '95%', sm: 600, md: 750 } }}>
//           Discover and join exciting events, AMAs, drops, auctions, and workshops in our vibrant community.
//         </Typography>

//         {/* Filters */}
//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 5 }} justifyContent="center" alignItems="center" sx={{ mb: { xs: 4, sm: 5 }, flexWrap: 'wrap' }}>
//           <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
//             {timeline.map((t) => (
//               <Button key={t.id} onClick={() => setSelectedTimeline(t.id)} sx={{ color: selectedTimeline === t.id ? '#fff' : '#aaa', bgcolor: selectedTimeline === t.id ? '#9333ea' : '#1f2937', textTransform: 'none', borderRadius: 2, px: 2, py: 0.7, fontSize: '0.9rem', '&:hover': { bgcolor: selectedTimeline === t.id ? '#9333ea' : 'rgba(147,51,234,0.2)' } }}>
//                 {t.name}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
//             {typeOptions.map((tp) => (
//               <Button key={tp.id} onClick={() => setSelectedType(tp.id)} sx={{ bgcolor: selectedType === tp.id ? '#6366F1' : '#1f2937', color: selectedType === tp.id ? '#fff' : '#aaa', textTransform: 'none', borderRadius: 2, px: 2, py: 0.7, fontSize: '0.9rem', '&:hover': { bgcolor: selectedType === tp.id ? '#6366F1' : 'rgba(99,102,241,0.2)' } }}>
//                 {tp.name}
//               </Button>
//             ))}
//           </Box>
//         </Stack>

//         {/* Cards */}
//         <Grid container spacing={3} justifyContent="center">
//           {filteredEvents.map((e: EventType) => (
//             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={e.id}>
//               <Card sx={{ borderRadius: 3, bgcolor: '#141545', overflow: 'hidden', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
//                 <Box sx={{ position: 'relative', height: { xs: 180, sm: 220 } }}>
//                   <Image src={e.img} alt={e.name} fill style={{ objectFit: 'cover' }} />
//                   <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9))' }} />
//                   <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
//                     <Chip label={e.timeline} sx={{ bgcolor: getTimelineColor(e.timeline), color: '#fff', textTransform: 'uppercase', fontSize: '0.75rem', borderRadius: '20px', px: 1.5 }} />
//                   </Box>
//                 </Box>
//                 <CardContent sx={{ p: 3, pt: 2 }}>
//                   <Typography sx={{ color: '#A1A1AA', fontSize: '0.9rem', mb: 1 }}>{e.time}</Typography>
//                   <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', mb: 1.2 }}>{e.name}</Typography>
//                   <Stack direction="row" justifyContent="space-between" spacing={0.7}>
//                     <Chip label={e.type} sx={{ bgcolor: '#1f2937', color: '#fff', textTransform: 'uppercase', fontSize: '0.7rem', borderRadius: '20px', px: 1 }} />
//                     <Stack direction="row" alignItems="center" spacing={0.5}>
//                       {getEventTypeIcon(e.type)}
//                       <Typography sx={{ color: '#A1A1AA', fontSize: '0.85rem' }}>{getEventTypeText(e.type, e.viewer)}</Typography>
//                     </Stack>
//                   </Stack>
//                   <Box sx={{ mt: 2 }}>
//                     <Button fullWidth href={e.link} sx={{ bgcolor: buttonColors[e.timeline], color: '#fff', textTransform: 'none', borderRadius: 2, py: 1.2, fontSize: '0.9rem', '&:hover': { opacity: 0.9 } }}>
//                       {getButtonLabel(e.timeline)}
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Stack>
//     </Box>
//   );
// };


// Updated Up_events component using new useEvents + new Event structure
'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import Image from 'next/image';
import { EventsResponse, useEvents } from '@/hooks/useEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import { Event } from '@/types/events';

const buttonColors: Record<string, string> = {
  live: '#9333ea',
  upcoming: '#1f2937',
  ended: '#1f2937',
};

const getEventTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'ama':
    case 'meetup':
      return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    case 'drop':
      return <AccessTimeFilledIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    case 'auction':
      return <GavelIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    case 'contest':
      return <EmojiEventsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    case 'workshop':
      return <SchoolIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    default:
      return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
  }
};

const getTimelineColor = (status: string) => {
  switch (status) {
    case 'upcoming': return '#6366F1';
    case 'live': return '#9333EA';
    case 'ended': return '#71717A';
    default: return '#1F2937';
  }
};

const getButtonLabel = (status: string) => {
  switch (status) {
    case 'upcoming': return 'View Details';
    case 'live': return 'Join Now';
    case 'ended': return 'See Summary';
    default: return 'View';
  }
};

export const Up_events: React.FC = () => {
  const [selectedTimeline, setSelectedTimeline] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useEvents();

  // Flatten API pages
  // InfiniteData has `.pages`, so ensure typing aligns
  const allEvents: Event[] = (data?.pages ?? []).flatMap((page: EventsResponse) => page.data);

  // Filter events by status & category
  const filteredEvents = allEvents.filter((e) => {
    const matchTimeline = selectedTimeline === 'all' || e.status === selectedTimeline;
    const matchCategory = selectedCategory === 'all' || e.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
    return matchTimeline && matchCategory;
  });

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;

  return (
    <Box sx={{ background: 'linear-gradient(120deg,#111827, #1E3A8A,#581C87)' }}>
      <Stack sx={{ color: '#fff', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, sm: 5, md: 8 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.4rem' }, mb: 1 }}>
          Event Calendar
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: { xs: 5, sm: 8 }, mx: 'auto', fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.3rem' }, lineHeight: 1.6, width: { xs: '95%', sm: 600, md: 750 } }}>
          Discover and join exciting events happening in our community.
        </Typography>

        {/* Filters */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 5 }} justifyContent="center" alignItems="center" sx={{ mb: { xs: 4, sm: 5 } }}>
          {/* Timeline filter */}
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['all','upcoming','live','ended'].map((v) => (
              <Button key={v} onClick={() => setSelectedTimeline(v)} sx={{ color: selectedTimeline === v ? '#fff' : '#aaa', bgcolor: selectedTimeline === v ? '#9333ea' : '#1f2937', textTransform: 'none', borderRadius: 2, px: 2, py: 0.7, fontSize: '0.9rem' }}>
                {v === 'all' ? 'All Events' : v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </Box>

          {/* Category filter */}
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['all','ama','meetup','drop','auction','contest','workshop'].map((c) => (
              <Button key={c} onClick={() => setSelectedCategory(c)} sx={{ bgcolor: selectedCategory === c ? '#6366F1' : '#1f2937', color: selectedCategory === c ? '#fff' : '#aaa', textTransform: 'none', borderRadius: 2, px: 2, py: 0.7, fontSize: '0.9rem' }}>
                {c === 'all' ? 'All Types' : c.toUpperCase()}
              </Button>
            ))}
          </Box>
        </Stack>

        {/* Event Cards */}
        <Grid container spacing={3} justifyContent="center">
          {filteredEvents.map((e) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={e.id}>
              <Card sx={{ borderRadius: 3, bgcolor: '#141545', overflow: 'hidden', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
                <Box sx={{ position: 'relative', height: { xs: 180, sm: 220 } }}>
                  <Image src={e.image} alt={e.title} fill style={{ objectFit: 'cover' }} />
                  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9))' }} />
                  <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                    <Chip label={e.status} sx={{ bgcolor: getTimelineColor(e.status), color: '#fff', textTransform: 'uppercase', fontSize: '0.75rem' }} />
                  </Box>
                </Box>
                <CardContent sx={{ p: 3, pt: 2 }}>
                  <Typography sx={{ color: '#A1A1AA', fontSize: '0.9rem', mb: 1 }}>{new Date(e.startTime).toLocaleString()}</Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', mb: 1.2 }}>{e.title}</Typography>
                  <Stack direction="row" justifyContent="space-between" spacing={0.7}>
                    <Chip label={e.category?.name || 'EVENT'} sx={{ bgcolor: '#1f2937', color: '#fff', textTransform: 'uppercase', fontSize: '0.7rem' }} />
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      {getEventTypeIcon(e.category?.name || '')}
                      <Typography sx={{ color: '#A1A1AA', fontSize: '0.85rem' }}>{e.joinCount} joined</Typography>
                    </Stack>
                  </Stack>
                  <Box sx={{ mt: 2 }}>
                    <Button fullWidth sx={{ bgcolor: buttonColors[e.status], color: '#fff', textTransform: 'none', borderRadius: 2, py: 1.2 }}>
                      {getButtonLabel(e.status)}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More */}
        {hasNextPage && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} sx={{ bgcolor: '#6366F1', color: '#fff', px: 4 }}>
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
