// // 'use client';

// // import React, { useState } from 'react';
// // import { Avatar, Box } from '@mui/material';
// // import Image from 'next/image';

// // interface UserHeaderProps {
// //   src?: string | null;
// //   type?: 'banner' | 'avatar';
// //   alt?: string;
// //   size?: number; // for avatar
// // }

// // const UserHeader: React.FC<UserHeaderProps> = ({
// //   src,
// //   type = 'banner',
// //   alt = 'User',
// //   size = 120,
// // }) => {
// //   const [error, setError] = useState(false);
// //   const API_URL = process.env.NEXT_PUBLIC_API;

// //   const finalUrl = !error && src ? `${API_URL}/api/upload/${src}` : type === 'banner' ? '/banner-default.png' : '/avatar-default.png';

// //   if (type === 'banner') {
// //     return (
// //       <Box
// //         sx={{
// //           width: '100%',
// //           height: 320,
// //           backgroundImage: `url(${finalUrl})`,
// //           backgroundSize: 'cover',
// //           backgroundPosition: 'center',
// //           filter: 'brightness(0.9)',
// //         }}
// //       >
// //         {src && (
// //           <Image
// //             src={finalUrl}
// //             alt={alt}
// //             fill
// //             style={{ display: 'none' }}
// //             onError={() => setError(true)}
// //           />
// //         )}
// //       </Box>
// //     );
// //   }

// //   // type === 'avatar'
// //   return (
// //     <Avatar
// //       src={finalUrl}
// //       alt={alt}
// //       sx={{
// //         width: size,
// //         height: size,
// //         border: '5px solid rgba(255,255,255,0.2)',
// //         boxShadow: '0 4px 25px rgba(0,0,0,0.5)',
// //       }}
// //       onError={() => setError(true)}
// //     />
// //   );
// // };

// // export default UserHeader;

// // 'use client';

// // import React, { useState } from 'react';
// // import { Avatar, Box } from '@mui/material';
// // import Image from 'next/image';

// // interface UserHeaderProps {
// //   src?: string | null;              // link ảnh từ API (avatar hoặc banner)
// //   type?: 'banner' | 'avatar';
// //   alt?: string;
// //   size?: number;                    // kích thước avatar
// // }

// // const UserHeader: React.FC<UserHeaderProps> = ({
// //   src,
// //   type = 'banner',
// //   alt = 'User',
// //   size = 120,
// // }) => {
// //   const [error, setError] = useState(false);

// //   // Fallback image
// //   const fallback = type === 'banner' ? '/banner-default.png' : '/avatar-default.png';

// //   // URL final
// //   const finalUrl = !error && src ? src : fallback;

// //   if (type === 'banner') {
// //     return (
// //       <Box
// //         sx={{
// //           width: '100%',
// //           height: 320,
// //           backgroundImage: `url(${finalUrl})`,
// //           backgroundSize: 'cover',
// //           backgroundPosition: 'center',
// //           filter: 'brightness(0.9)',
// //         }}
// //       >
// //         {/* preload để detect lỗi */}
// //         {src && (
// //           <Image
// //          width={3200} // just to preserve aspect ratio; actual display controlled by CSS
// //   height={320}
// //             src={src}
// //             alt={alt}
// //             style={{ display: 'none' }}
// //             onError={() => setError(true)}
// //           />
// //         )}
// //       </Box>
// //     );
// //   }

// //   // type === 'avatar'
// //   return (
// //     <Avatar
// //       src={finalUrl}
// //       alt={alt}
// //       sx={{
// //         width: size,
// //         height: size,
// //         border: '5px solid rgba(255,255,255,0.2)',
// //         boxShadow: '0 4px 25px rgba(0,0,0,0.5)',
// //       }}
// //       onError={() => setError(true)}
// //     />
// //   );
// // };

// // export default UserHeader;

// 'use client';

// import React, { useMemo, useState } from 'react';
// import { Avatar, Box } from '@mui/material';
// import Image from 'next/image';

// interface UserHeaderProps {
//   src?: string | null;              // link ảnh từ API (avatar hoặc banner)
//   type?: 'banner' | 'avatar';
//   alt?: string;
//   size?: number;                    // kích thước avatar
// }

// const UserHeader: React.FC<UserHeaderProps> = ({
//   src,
//   type = 'banner',
//   alt = 'User',
//   size = 120,
// }) => {
//   const [error, setError] = useState(false);

//   // Fallback image
//   const fallback = type === 'banner' ? '/banner-default.png' : '/avatar-default.png';

//   // Nếu có lỗi hoặc src null => dùng fallback
// //   const finalUrl = !error && src ? `/api/proxy-image?url=${encodeURIComponent(src)}` : fallback;
// const finalUrl = useMemo(() => !error && src
//   ? `/api/proxy-image?url=${encodeURIComponent(src)}`
//   : fallback, [error, src]);

//   if (type === 'banner') {
//     return (
//       <Box
//         sx={{
//           width: '100%',
//           height: 320,
//           backgroundImage: `url(${finalUrl})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           filter: 'brightness(0.98)',
//         }}
//       >
//         {/* preload để detect lỗi */}
//         {src && !error && (
//           <Image
//             src={`/api/proxy-image?url=${encodeURIComponent(src)}`}
//             alt={alt}
//             width={1200}
//             height={320}
//             style={{ display: 'none' }}
//             onError={() => setError(true)}
//           />
//         )}
//       </Box>
//     );
//   }

//   // type === 'avatar'
//   return (
//     <Avatar
//       src={finalUrl}
//       alt={alt}
//       sx={{
//         width: size,
//         height: size,
//         border: '5px solid rgba(255,255,255,0.2)',
//         boxShadow: '0 4px 25px rgba(0,0,0,0.5)',
//       }}
//       onError={() => setError(true)}
//     />
//   );
// };

// export default UserHeader;

'use client';

import React, { useMemo, useState } from 'react';
import { Avatar, Box } from '@mui/material';
import Image from 'next/image';

interface UserHeaderProps {
  src?: string | null; // link ảnh từ API
  type?: 'banner' | 'avatar';
  alt?: string;
  size?: number; // avatar size
}

const UserHeader: React.FC<UserHeaderProps> = ({
  src,
  type = 'banner',
  alt = 'User',
  size = 120,
}) => {
  const [error, setError] = useState(false);

  const fallback =
    type === 'banner' ? '/banner-default.png' : '/avatar-default.png';

  const finalUrl = useMemo(() => {
    if (!error && src) {
      const url = `/api/proxy-image?url=${encodeURIComponent(src)}`;
      return type === 'banner' ? `${url}&banner=true` : url;
    }
    return fallback;
  }, [error, src, type, fallback]);

  if (type === 'banner') {
    return (
      <Box
        sx={{
          width: '100%',
          height: 320,
          backgroundImage: `url(${finalUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.95)',
        }}
      >
        {/* preload nhẹ để detect lỗi */}
        {src && !error && (
          <Image
            src={finalUrl}
            alt={alt}
            width={1000} // chiều rộng resize trên proxy hoặc gần tỉ lệ banner
            height={320} // chiều cao banner
            style={{ display: 'none' }}
            onError={() => setError(true)}
            loading="lazy"
          />
        )}
      </Box>
    );
  }

  // avatar
  return (
    <Avatar
      src={finalUrl}
      alt={alt}
      sx={{
        width: size,
        height: size,
        border: '5px solid rgba(255,255,255,0.2)',
        boxShadow: '0 4px 25px rgba(0,0,0,0.5)',
      }}
      onError={() => setError(true)}
    />
  );
};

export default React.memo(UserHeader);
