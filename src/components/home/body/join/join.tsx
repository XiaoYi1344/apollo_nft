// 'use client';

// import { Box, Button, Typography } from '@mui/material';
// import Image from 'next/image';
// import React from 'react';

// const JoinSection = () => {
//   return (
//     <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
//       <Box
//         sx={{
//           position: 'relative',
//           background:
//             'linear-gradient(90deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
//           borderRadius: 4,
//           minHeight: 300,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           overflow: 'hidden',
//           boxShadow: '0 0 60px rgba(120, 60, 255, 0.35)',
//         }}
//       >
//         {/* Hiệu ứng nền */}
//         <Box
//           sx={{
//             width: 160,
//             height: 160,
//             borderRadius: '50%',
//             background: 'rgba(255,255,255,0.15)',
//             position: 'absolute',
//             top: -40,
//             left: -40,
//           }}
//         />
//         <Box
//           sx={{
//             width: 450,
//             height: 450,
//             borderRadius: '50%',
//             background: 'rgba(190,74,255,0.5)',
//             position: 'absolute',
//             top: -80,
//             right: -100,
//           }}
//         />

//         {/* Các icon crypto bên phải */}
//         <Box
//           sx={{
//             position: 'absolute',
//             right: 60,
//             top: '50%',
//             transform: 'translateY(-50%)',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: 2,
//           }}
//         >
//           {/* BTC */}
//           <Box
//             sx={{
//               position: 'absolute',
//               right: 100,
//               top: -180,
//             }}
//           >
//             <Box
//               sx={{
//                 width: 200,
//                 height: 200,
//                 background: 'linear-gradient(180deg,#f2c94c, #f5a623)',
//                 clipPath:
//                   'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
//                 borderRadius: '30px',
//                 boxShadow: '0 8px 24px rgba(255, 165, 0, 0.4)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transform: 'rotate(-19deg)',
//               }}
//             >
//               <Box
//                 sx={{
//                   position: 'relative',
//                   width: 400,
//                   height: 400,
//                   transform: 'rotate(19deg)',
//                 }}
//               >
//                 <Image
//                   src="/home/body/image-removebg-preview.png"
//                   alt="BTC"
//                   fill
//                   style={{
//                     objectFit: 'contain',
//                     filter: 'brightness(0) invert(1)', // chữ trắng
//                   }}
//                 />
//               </Box>
//             </Box>
//           </Box>

//           {/* BNB */}
//           <Box
//             sx={{
//               position: 'absolute',
//               right: -30,
//               top: -50,
//               zIndex: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 width: 160,
//                 height: 160,
//                 background: 'linear-gradient(180deg, #f5a623, #f2c94c)',
//                 clipPath:
//                   'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
//                 borderRadius: '20px',
//                 boxShadow: '0 8px 24px rgba(255, 165, 0, 0.4)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transform: 'rotate(-5deg)',
//               }}
//             >
//               <Box
//                 sx={{
//                   position: 'relative',
//                   width: 80,
//                   height: 80,
//                   filter: 'brightness(0) invert(1)',
//                   transform: 'rotate(5deg)',
//                 }}
//               >
//                 <Image
//                   src="/home/body/BNB-removebg-preview.png"
//                   alt="BNB"
//                   fill
//                   style={{ objectFit: 'contain' }}
//                 />
//               </Box>
//             </Box>
//           </Box>
//           {/* ETH */}
//         </Box>
//         <Box
//           sx={{
//             position: 'absolute',
//             right: 200,
//             top: 180,
//             zIndex: 3,
//           }}
//         >
//           <Image
//             src="/home/body/ETH-removebg-preview.png"
//             alt="ETH"
//             width={100}
//             height={100}
//           />
//         </Box>

//         {/* Text + Button */}
//         <Typography
//           sx={{
//             fontSize: { xs: '1.6rem', md: '2.6rem' },
//             fontWeight: 700,
//             color: '#fff',
//             mb: 2,
//             textAlign: 'center',
//           }}
//         >
//           Join Our Community
//         </Typography>

//         <Button
//           variant="contained"
//           sx={{
//             px: 4,
//             py: 1.2,
//             borderRadius: '9999px',
//             textTransform: 'none',
//             background: '#ffffff',
//             color: '#3605FF',
//             fontWeight: 600,
//             boxShadow: '0 0 20px rgba(140,74,255,0.5)',
//             '&:hover': {
//               background: '#fff',
//               boxShadow: '0 0 25px rgba(140,74,255,0.8)',
//             },
//           }}
//         >
//           Get Started
//         </Button>

//         {/* Nửa vòng tròn trắng nhạt */}
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: -350,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             width: 700,
//             height: 500,
//             border: '2px solid rgba(255,255,255,0.5)',
//             borderRadius: '50%',
//             borderTop: 'none',
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default JoinSection;

// 'use client';

// import { Box, Button, Typography } from '@mui/material';
// import Image from 'next/image';
// import React from 'react';

// const JoinSection = () => {
//   return (
//     <Box sx={{ py: 5, px: { md: 8 } }}>
//       <Box
//         sx={{
//           position: 'relative',
//           // background:
//           //   'linear-gradient(90deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
//           background:'#3605FF',
//           borderRadius: 4,
//           minHeight: 180,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           overflow: 'hidden',
//           boxShadow: '0 0 60px rgba(120, 60, 255, 0.35)',
//         }}
//       >
//         {/* Hiệu ứng nền */}
//         <Box
//           sx={{
//             width: 190,
//             height: 190,
//             borderRadius: '50%',
//             background: 'rgba(255,255,255,0.15)',
//             position: 'absolute',
//             top: -30,
//             left: -55,
//           }}
//         />

//         {/* Text + Button */}
//         <Typography
//           sx={{
//             position: 'absolute',
//             top: 30,
//             fontSize: { xs: '1.6rem', md: '2.6rem' },
//             fontWeight: 550,
//             color: '#fff',
//             mb: 2,
//             textAlign: 'center',
//           }}
//         >
//           Join Our Community
//         </Typography>

//         <Button
//           variant="contained"
//           sx={{
//              position: 'absolute',
//             bottom: 35,
//             px: 16,
//             py: 1.2,
//             borderRadius: '9999px',
//             textTransform: 'none',
//             background: '#ffffff',
//             color: '#3605FF',
//             fontWeight: 600,
//             boxShadow: '0 0 20px rgba(140,74,255,0.5)',
//             '&:hover': {
//               background: '#fff',
//               boxShadow: '0 0 25px rgba(140,74,255,0.8)',
//             },
//           }}
//         >
//           Get Started
//         </Button>

//         {/* Nửa vòng tròn trắng nhạt */}
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translateX(-50%) rotate(180deg)',
//             width: 300,
//             height: 300,
//             border: '1px solid rgba(255,255,255,1)',
//             borderRadius: '50%',
//             borderTop: 'none',
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default JoinSection;

'use client';

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

const JoinSection = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  if (isXs) {
    // Phiên bản rút gọn cho XS
    return (
      <Box sx={{ py: 5, px: { xs: 2, md: 8 } }}>
        <Box
          sx={{
            position: 'relative',
            background: '#3605FF',
            borderRadius: 4,
            minHeight: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(120,60,255,0.35)',
          }}
        >
          <Box
            sx={{
              width: 190,
              height: 190,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              position: 'absolute',
              top: -30,
              left: -55,
            }}
          />
          <Typography
            sx={{
              position: 'absolute',
              top: 30,
              fontSize: '1.6rem',
              fontWeight: 550,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Join Our Community
          </Typography>
          <Button
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: 35,
              px: 16,
              py: 1.2,
              borderRadius: '9999px',
              textTransform: 'none',
              background: '#ffffff',
              color: '#3605FF',
              fontWeight: 600,
              boxShadow: '0 0 20px rgba(140,74,255,0.5)',
              '&:hover': {
                boxShadow: '0 0 25px rgba(140,74,255,0.8)',
              },
            }}
          >
            Get Started
          </Button>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%) rotate(180deg)',
              width: 300,
              height: 300,
              border: '1px solid rgba(255,255,255,1)',
              borderRadius: '50%',
              borderTop: 'none',
            }}
          />
        </Box>
      </Box>
    );
  }

  // Phiên bản cho md+
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
      <Box
        sx={{
          position: 'relative',
          background:
            'linear-gradient(90deg, #A100EB 0%, #793CDF 40%, #3605FF 100%)',
          borderRadius: 4,
          minHeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(120,60,255,0.35)',
        }}
      >
        {/* Glow lớn */}
        <Box
          sx={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            position: 'absolute',
            top: -40,
            left: -40,
          }}
        />
        <Box
          sx={{
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'rgba(190,74,255,0.5)',
            position: 'absolute',
            top: -80,
            right: -100,
          }}
        />

        {/* Icon crypto */}
        <Box
          sx={{
            position: 'absolute',
            right: 60,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* BTC */}
          <Box
            sx={{
              position: 'absolute',
              right: 100,
              top: -180,
            }}
          >
            <Box
              sx={{
                width: 200,
                height: 200,
                background: 'linear-gradient(180deg,#f2c94c, #f5a623)',
                clipPath:
                  'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                borderRadius: '30px',
                boxShadow: '0 8px 24px rgba(255,165,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-19deg)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 400,
                  height: 400,
                  transform: 'rotate(19deg)',
                }}
              >
                <Image
                  src="/home/body/image-removebg-preview.png"
                  alt="BTC"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                  style={{
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* BNB */}
          <Box
            sx={{
              position: 'absolute',
              right: -30,
              top: -50,
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: 160,
                height: 160,
                background: 'linear-gradient(180deg,#f5a623,#f2c94c)',
                clipPath:
                  'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                borderRadius: '20px',
                boxShadow: '0 8px 24px rgba(255,165,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-5deg)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 80,
                  height: 80,
                  filter: 'brightness(0) invert(1)',
                  transform: 'rotate(5deg)',
                }}
              >
                <Image
                  src="/home/body/BNB-removebg-preview.png"
                  alt="BNB"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            right: 200,
            top: 180,
            zIndex: 3,
          }}
        >
          <Box
            component="img"
            src="/home/body/ETH-removebg-preview.png"
            alt="ETH"
            sx={{
              width: 100,
              height: 'auto', // duy trì tỉ lệ gốc
            }}
          />
        </Box>

        {/* Text + Button */}
        <Typography
          sx={{
            fontSize: { xs: '1.6rem', md: '2.6rem' },
            fontWeight: 700,
            color: '#fff',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Join Our Community
        </Typography>
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: '9999px',
            textTransform: 'none',
            background: '#ffffff',
            color: '#3605FF',
            fontWeight: 600,
            boxShadow: '0 0 20px rgba(140,74,255,0.5)',
            '&:hover': {
              background: '#fff',
              boxShadow: '0 0 25px rgba(140,74,255,0.8)',
            },
          }}
        >
          Get Started
        </Button>

        {/* Nửa vòng tròn trắng nhạt */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -350,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 500,
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '50%',
            borderTop: 'none',
          }}
        />
      </Box>
    </Box>
  );
};

export default JoinSection;
