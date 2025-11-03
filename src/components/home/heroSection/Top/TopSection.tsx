// 'use client';

// import { Box, Button, Typography, Stack, Grid } from '@mui/material';
// // import { styled } from '@mui/system';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

// // const GradientText = styled('span')({
// //   // background: 'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
// //   background: 'linear-gradient(90deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
// //   WebkitBackgroundClip: 'text',
// //   WebkitTextFillColor: 'transparent',
// // });

// const TopSection = () => {
//   return (
//     <Box
//       component="section"
//       sx={{
//         position: 'relative',
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         px: { xs: 4, md: 10 },
//         overflow: 'hidden',
//         // background:
//         //   "linear-gradient(135deg, #2b006b 0%, #1a0047 40%, #080018 100%)",
//         // background: '#080018',
//         color: 'white',
//       }}
//     >
//       {/* Vầng sáng */}
//       <Box
//         className="glow"
//         sx={{
//           '--glow-top': '-43%',
//           '--glow-left': '-32%',
//           '--glow-size': '1000px',
//           '--glow-color1': 'rgba(190,74,255,0.7)',
//           '--glow-color2': 'rgba(45,161,255,0.1)',
//           '--glow-blur': '100px',
//           '--glow-opacity': '1',
//         }}
//       />

//       {/* Text content */}
//       <Stack
//         component={motion.div}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         spacing={2}
//         sx={{ position: 'relative', zIndex: 2, maxWidth: { xs: 500, md: 780 } }}
//       >
//         <Typography
//           variant="h2"
//           sx={{
//             fontWeight: 800,
//             lineHeight: 1.0,
//             fontSize: { xs: '2.1rem', md: '5.1rem' },
//             position: 'relative', // 👈 cần để định vị icon
//             display: 'inline-block',
//           }}
//         >
//           Create Your <br />
//           Own{' '}
//           <span
//             style={{
//               background: 'linear-gradient(90deg,#A100EB,#3605FF)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             NFT DREAM
//           </span>{' '}
//           <br />
//           Gallery
//           <Box
//             sx={{
//               display: { xs: 'none', md: 'inline-flex' },
//               alignItems: 'center',
//               position: 'relative',
//               top: '-14px',
//               left: '12px',
//               width: 32,
//               height: 32,
//               transform: 'scale(2.3) rotate(-15deg)',
//               transformOrigin: 'center',
//             }}
//           >
//             <Image
//               src="/home/hero/star.png"
//               alt="Sparkle"
//               fill
//               style={{ objectFit: 'contain' }}
//             />
//           </Box>
//         </Typography>

//         <Box
//           sx={{
//             position: 'relative',
//             mt: 6,
//             px: { xs: 2, md: 8 },
//             display: 'flex',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Grid container spacing={3} alignItems="center">
//             {/* Đoạn mô tả */}
//             <Grid size={{ xs: 12, md: 6 }}>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: 'rgba(255,255,255,0.8)',
//                   lineHeight: 1.6,
//                   fontSize: '0.9rem',
//                   maxWidth: 360,
//                   mx: { xs: -3, md: 0 },
//                   textAlign: 'left',
//                   display: '-webkit-box',
//                   WebkitLineClamp: { xs: 4, md: 3 },
//                   WebkitBoxOrient: 'vertical',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 The Largest NFT Marketplace. Automatic and truly unique digital
//                 creation. Signed and issued by the creator, made possible by
//                 blockchain technology.
//               </Typography>
//             </Grid>

//             {/* Nút Discover NFT */}
//             <Grid size={{ xs: 12, md: 6 }}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: { xs: 'center', md: 'flex-start' },
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   sx={{
//                     borderRadius: { xs: '20px', md: '50%' },
//                     width: { xs: '100%', md: 100 },
//                     height: { xs: 36, md: 100 },
//                     flexDirection: { xs: 'row', md: 'column' },
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     textTransform: 'none',
//                     background: {
//                       xs: '#3605FF',
//                       md: 'linear-gradient(125deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
//                     },
//                     boxShadow: '0 0 25px rgba(140,74,255,0.5)',
//                     display: 'flex',
//                     position: 'relative',
//                     '&:hover': {
//                       boxShadow: '0 0 40px rgba(140,74,255,0.8)',
//                       transform: 'scale(1.05)',
//                     },
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   <ArrowOutwardIcon
//                     sx={{
//                       transform: 'rotate(90deg)',
//                       fontSize: 28,
//                       position: 'absolute',
//                       top: { xs: -10, md: 29 },
//                       right: 10,
//                       display: { xs: 'none', md: 'block' }, // ẩn ở mobile
//                     }}
//                   />

//                   <Typography
//                     sx={{
//                       fontWeight: { xs: 700, md: 500 },
//                       fontSize: { xs: '0.8rem', md: '0.68rem' },
//                       textAlign: 'center',
//                       mt: { xs: 0, md: 2 }, // bỏ margin trên ở mobile
//                       color: '#fff',
//                     }}
//                   >
//                     Discover NFT
//                   </Typography>
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Hình NFT cho mobile */}
// <Box
//   component={motion.div}
//   initial={{ opacity: 0, y: 30 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 1.2 }}
//   sx={{
//     display: { xs: 'block', md: 'none' }, // 👉 chỉ hiện ở mobile
//     position: 'relative',
//     mx: 'auto',
//     mt: 4,
//     width: 280,
//     height: 360,
//     borderRadius: '24px',
//   }}
// >
//   <Box
//     sx={{
//       position: 'absolute',
//       top: 30,
//       right: 60,
//       width: 208,
//       height: 251,
//       borderRadius: '20px',
//       overflow: 'hidden',
//       boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
//     }}
//   >
//     <Image
//       src="/home/hero/top 2.jpg"
//       alt="NFT Background Left"
//       fill
//       style={{ objectFit: 'cover' }}
//     />
//   </Box>

//   <Box
//     sx={{
//       position: 'absolute',
//       top: 115,
//       right: -20,
//       width: 213,
//       height: 223,
//       borderRadius: '20px',
//       overflow: 'hidden',
//       boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
//     }}
//   >
//     <Image
//       src="/home/hero/top 3.jpg"
//       alt="NFT Background Right"
//       fill
//       style={{ objectFit: 'cover' }}
//     />
//   </Box>

//   <Box
//     sx={{
//       top: 60,
//       right: -55,
//       position: 'relative',
//       width: 210,
//       height: 257,
//       borderRadius: '24px',
//       overflow: 'hidden',
//       boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
//     }}
//   >
//     <Image
//       src="/home/hero/top1.jpg"
//       alt="NFT Main"
//       fill
//       style={{ objectFit: 'cover' }}
//     />
//   </Box>
// </Box>

//         {/* Stats */}
//         <Stack direction="row" spacing={6} sx={{ mt: 4 }}>
//           {[
//             { num: '25.1k', label: 'Artwork' },
//             { num: '15.6k', label: 'Artist' },
//             { num: '10.2k', label: 'Auction' },
//           ].map((item) => (
//             <Stack key={item.label}>
//               <Typography
//                 variant="body2"
//                 sx={{ color: 'rgba(255,255,255,0.6)' }}
//               >
//                 {item.label}
//               </Typography>
//               <Typography variant="h5" fontWeight={700}>
//                 {item.num}
//               </Typography>
//             </Stack>
//           ))}
//         </Stack>
//       </Stack>
//       <Box>
//           {/* NFT Image Stack */}
//           <Box
//             component={motion.div}

//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1.2 }}
//             sx={{

//               position: 'relative',
//               width: { xs: 280, md: 360 },
//               height: { xs: 360, md: 460 },
//               borderRadius: '24px',
//               display: { xs: 'block', md: 'none' },
//             }}
//           >
//             {/* Layer 1 (Back Left) */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: { xs: 30, md: -80 },
//                 right: { xs: 60, md: 130 },
//                 width: { xs: 208, md: 391 },
//                 height: { xs: 251, md: 494 },
//                 borderRadius: '20px',
//                 overflow: 'hidden',
//                 zIndex: 0,
//                 // transform: 'rotate(-3deg)',
//                 boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
//               }}
//             >
//               <Image
//                 src="/home/hero/top 2.jpg"
//                 alt="NFT Background Left"
//                 fill
//                 style={{ objectFit: 'cover' }}
//               />
//             </Box>

//             {/* Layer 2 (Back Right) */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: { xs: 115, md: 80 },
//                 right: { xs: -20, md: -10 },
//                 width: { xs: 213, md: 391 },
//                 height: { xs: 223, md: 494 },
//                 borderRadius: '20px',
//                 overflow: 'hidden',
//                 zIndex: 1,
//                 // transform: 'rotate(3deg)',
//                 boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
//               }}
//             >
//               <Image
//                 src="/home/hero/top 3.jpg"
//                 alt="NFT Background Right"
//                 fill
//                 style={{ objectFit: 'cover' }}
//               />
//             </Box>

//             {/* Layer 3 (Front/Main Image) */}
//             <Box
//               sx={{
//                 top: { xs: 60, md: 0 },
//                 right: { xS: -55, md: 85 },
//                 position: 'relative',
//                 width: { xs: 210, md: 391 },
//                 height: { xs: 257, md: 494 },
//                 borderRadius: '24px',
//                 overflow: 'hidden',
//                 zIndex: 2,
//                 boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
//               }}
//             >
//               <Image
//                 src="/home/hero/top1.jpg"
//                 alt="NFT Main"
//                 fill
//                 style={{ objectFit: 'cover' }}
//               />
//             </Box>

//             {/* Light Glow Background */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: -40,
//                 right: -40,
//                 width: 320,
//                 height: 400,
//                 borderRadius: '24px',
//                 background:
//                   'linear-gradient(180deg, rgba(45,161,255,0.6), rgba(0,240,255,0.2))',
//                 filter: 'blur(80px)',
//                 zIndex: -1,
//               }}
//             />
//           </Box>
//         </Box>

//     </Box>
//   );
// };

// export default TopSection;

'use client';

import { Box, Button, Typography, Stack, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const TopSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: {xs: '30vh', sm:'60vh', md: '100vh'},
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 4, md: 10 },
        overflow: 'hidden',
        color: 'white',
        py: { xs: 9 },
        mb:-10
      }}
    >
      {/* Hiệu ứng vầng sáng */}
      <Box
        className="glow"
        sx={{
          '--glow-top': '-43%',
          '--glow-left': '-32%',
          '--glow-size': '1000px',
          '--glow-color1': 'rgba(190,74,255,0.7)',
          '--glow-color2': 'rgba(45,161,255,0.1)',
          '--glow-blur': '100px',
          '--glow-opacity': '1',

          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* TEXT CONTENT */}
      <Stack
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        spacing={2}
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: { xs: 500, md: 780 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            lineHeight: 1,
            fontSize: { xs: '2.1rem', md: '5.1rem' },
            position: 'relative',
          }}
        >
          Create Your <br />
          Own{' '}
          <span
            style={{
              background: 'linear-gradient(90deg,#A100EB,#3605FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NFT DREAM
          </span>{' '}
          <br />
          Gallery
          <Box
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'center',
              position: 'relative',
              top: '-14px',
              left: '12px',
              width: 32,
              height: 32,
              transform: 'scale(2.3) rotate(-15deg)',
              transformOrigin: 'center',
            }}
          >
            <Image
              src="/home/hero/star.png"
              alt="Sparkle"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Typography>

        {/* DESCRIPTION + BUTTON */}
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            mt: 4,
            flexDirection: { xs: 'column-reverse', md: 'row' }, // 👈 xs: button dưới, md: button trái
          }}
        >
          {/* Button bên trái ở md, nhưng xuống dưới ở xs */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  borderRadius: { xs: '20px', md: '50%' },
                  width: { xs: '100%', md: 100 },
                  height: { xs: 36, md: 100 },
                  flexDirection: { xs: 'row', md: 'column' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  textTransform: 'none',
                  background: {
                    xs: '#3605FF',
                    md: 'linear-gradient(125deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
                  },
                  boxShadow: '0 0 25px rgba(140,74,255,0.5)',
                  '&:hover': {
                    boxShadow: '0 0 40px rgba(140,74,255,0.8)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ArrowOutwardIcon
                  sx={{
                    transform: 'rotate(90deg)',
                    fontSize: 28,
                    position: 'absolute',
                    top: { xs: -10, md: 29 },
                    right: 10,
                    display: { xs: 'none', md: 'block' },
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: { xs: 700, md: 500 },
                    fontSize: { xs: '0.8rem', md: '0.68rem' },
                    color: '#fff',
                    mt: { xs: 0, md: 2 },
                  }}
                >
                  Discover NFT
                </Typography>
              </Button>
            </Box>
          </Grid>

          {/* Text nằm trên ở xs, bên phải ở md */}
          <Grid size={{ xs: 12, md: 10 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                fontSize: '0.9rem',
                maxWidth: 330,
                position: { xs: 'none', md: 'relative' },
                top: { xs: 0, md: '-19px' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              The Largest NFT Marketplace. Automatic and truly unique digital
              creation. Signed and issued by the creator, made possible by
              blockchain technology.
            </Typography>
          </Grid>
        </Grid>

        {/* STATS */}
        <Stack direction="row" spacing={6} sx={{ pt: 4, }}>
          {[
            { num: '25.1k', label: 'Artwork' },
            { num: '15.6k', label: 'Artist' },
            { num: '10.2k', label: 'Auction' },
          ].map((item) => (
            <Stack key={item.label}>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize:{xs:'0.7rem', md:'1.4rem'} }}>
                {item.label}
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ fontSize:{xs:'1.3rem', md:'2.0rem'} }}>
                {item.num}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* NFT IMAGE (MOBILE) */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            position: 'relative',
            mx: 'auto',
            mt: 4,
            width: 280,
            height: 360,
            borderRadius: '24px',
          }}
        >
          {['top 2.jpg', 'top 3.jpg', 'top1.jpg'].map((src, i) => (
            <Box
              key={src}
              sx={{
                position: 'absolute',
                top: ['25px', '105px','60px'][i],
                right: ['70px','-25px','17px'][i],
                width: ['208px', '210px', '210px'][i],
                height: ['251px', '253px', '257px'][i],
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
              }}
            >
              <Image
                src={`/home/hero/${src}`}
                alt={`NFT ${i}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>
      </Stack>

       {/* NFT IMAGE (tablet) */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
         sx={(theme) => ({
    display: { xs: 'none', sm: 'block' },
    [theme.breakpoints.up('md')]: {
      display: 'none', // 👈 ẩn khi lên md+
    },
    position: 'relative',
    width: 400,
    height: 500,
  })}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            right: 85,
            width: 200,
            height: 300,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 2.jpg"
            alt="NFT Back Left"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '24%',
            right: '2%',
            width: 200,
            height: 300,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 3.jpg"
            alt="NFT Back Right"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: '15%',
            right: '-35%',
           width: 200,
            height: 300,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          <Image
            src="/home/hero/top1.jpg"
            alt="NFT Main"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>

      {/* NFT IMAGE (DESKTOP) */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          width: 400,
          height: 520,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: 140,
            width: 340,
            height: 440,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 2.jpg"
            alt="NFT Back Left"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 50,
            right: 10,
            width: 340,
            height: 440,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/home/hero/top 3.jpg"
            alt="NFT Back Right"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: 0,
            right: 10,
            width: 340,
            height: 440,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          <Image
            src="/home/hero/top1.jpg"
            alt="NFT Main"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>

      
    </Box>
  );
};

export default TopSection;
