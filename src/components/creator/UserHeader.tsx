

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
