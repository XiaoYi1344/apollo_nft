'use client';

import React from 'react';
import { Box, Typography, Stack, Link, Divider } from '@mui/material';
import { Twitter, LinkedIn, Facebook, GitHub } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

// 🔹 Dữ liệu phần link — dễ mở rộng hoặc dịch ngôn ngữ sau này
const FOOTER_LINKS = [
  {
    title: 'Marketplace',
    links: ['Buy Product', 'Sell Product', 'Our Creator'],
  },
  {
    title: 'Resources',
    links: ['About Us', 'Event', 'Tutorial'],
  },
  {
    title: 'Company',
    links: ['Media', 'Blog', 'Pricing'],
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Support'],
  },
];

const Footer = () => {
  const pathname = usePathname();
  const showGlow = pathname === '/';

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        px: { xs: 3, md: 13 },
        py: 6,
        color: '#fff',
        backdropFilter: 'blur(4px)', // mờ nhẹ giống navbar
         bgcolor: showGlow ? 'transparent' : 'rgba(17,9,41,1)',
      }}
    >
      {/* 🔹 Hiệu ứng glow khi ở trang chủ */}
      {showGlow && (
        <Box
          className="glow"
          style={
            {
              '--glow-size': '450px',
              '--glow-bottom': '-60%',
              '--glow-left': '-15%',
              '--glow-color1': 'rgba(140, 74, 255, 0.7)',
              '--glow-color2': 'rgba(45, 161, 255, 0.5)',
              '--glow-blur': '100px',
              '--glow-opacity': 0.8,
            } as React.CSSProperties
          }
        />
      )}

      {/* 🔹 Nội dung chính */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          mb: 4,
        }}
      >
        {/* Cột trái: logo + mô tả + mạng xã hội */}
        <Box sx={{ flexBasis: { xs: '100%', md: '32%' }, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', fontSize: '2.3rem' }}
          >
            <span style={{ color: '#8c4aff' }}>Apollo</span>
            <span style={{ color: '#2da1ff' }}>NFT</span>
          </Typography>

          <Typography sx={{ mt: 1, color: '#aaa', fontSize: '1.2rem' }}>
            This growth plan will help you reach your resolutions and achieve
            the goals you have been striving towards.
          </Typography>

          <Stack direction="row" spacing={1} mt={2}>
            <Twitter fontSize="medium" />
            <LinkedIn fontSize="medium" />
            <Facebook fontSize="medium" />
            <GitHub fontSize="medium" />
          </Stack>
        </Box>

        {/* 🔹 Cột phải: các nhóm liên kết sinh ra từ mảng FOOTER_LINKS */}
        <Box
          sx={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            flexBasis: { xs: '100%', md: '62%' },
            justifyContent: { xs: 'flex-start', md: 'space-between' },
          }}
        >
          {FOOTER_LINKS.map((section) => (
            <Stack key={section.title} spacing={1}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  cursor: 'default',
                }}
              >
                {section.title}
              </Typography>

              {section.links.map((text) => {
                // ✅ tạo link động: "Buy Product" → "/buy_product"
                const link = `/${text.toLowerCase().replace(/\s+/g, '_')}`;

                return (
                  <Link
                    key={text}
                    href={link}
                    color="inherit"
                    underline="none"
                    sx={{
                      '&:hover': {
                        color: '#7230E5',
                      },
                    }}
                  >
                    {text}
                  </Link>
                );
              })}
            </Stack>
          ))}
        </Box>
      </Box>

      {/* 🔹 Đường kẻ và bản quyền */}
      <Divider
        sx={{
          border: 'none',
          height: '1px',
          background: 'rgba(255, 255, 255, 0.09)',
          mb: 5,
        }}
      />

      <Typography
        sx={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 14,
        }}
      >
        © 2077 ApolloNFT. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
