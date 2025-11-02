'use client';
import React, { useMemo } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { Creator } from './data/creatorsData';

interface Props {
  creator: Creator | null;
  onBack: () => void;
}

const CreatorDetail: React.FC<Props> = ({ creator, onBack }) => {
  if (!creator) return null;

  const handleExport = () => {
    if (!creator) return;

    const csvHeader = [
      'Name',
      'Total Revenue',
      'Followers',
      'Number of Works',
      'Floor Price',
    ];
    const csvRow = [
      creator.name,
      creator.totalVolume,
      creator.followers,
      creator.works,
      creator.floorPrice,
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [csvHeader.join(','), csvRow.join(',')].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `creator_stats.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Box
        component="img"
        src={creator.banner}
        alt="banner"
        sx={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
          filter: 'brightness(0.5)',
          // borderRadius: '0 0 12px 12px',
          display: 'block',
        }}
      />
      <Box sx={{ px: 7, pb: 6 }}>
        <Box sx={{ position: 'relative', mb: 10, mt: -10 }}>
          {/* Banner */}

          {/* Avatar nổi ra khỏi banner */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -48,
              left: 32,
              zIndex: 2,
            }}
          >
            <Avatar
              src={creator.avatar}
              alt={creator.name}
              sx={{
                width: 96,
                height: 96,
                border: '4px solid rgba(255,255,255,0.12)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            />
          </Box>

          {/* Thông tin và nút */}
          <Box
            sx={{
              position: 'absolute',
              left: 150,
              bottom: -45,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {/* Tên và ví */}
            <Box>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800 }}>
                {creator.name}
              </Typography>
              <Typography sx={{ color: '#9b9bbf', fontSize: 13 }}>
                {creator.username}
              </Typography>
            </Box>

            {/* Hàng nút + icon */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
                  fontSize: 13,
                  px: 2.5,
                  py: 0.5,
                }}
              >
                Follow
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: '#cfcfff',
                  borderColor: 'rgba(255,255,255,0.1)',
                  textTransform: 'none',
                  fontSize: 13,
                  px: 2.5,
                  py: 0.5,
                }}
              >
                Chia sẻ
              </Button>

              {/* Icon mạng xã hội */}
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}
              >
                <i
                  className="fa-brands fa-twitter"
                  style={{ color: '#cfcfff' }}
                />
                <i
                  className="fa-brands fa-instagram"
                  style={{ color: '#cfcfff' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Typography sx={{ color: '#cfcfff', mb: 3, pt: 10 }}>
          {creator.bio}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mb: 4,
            px: 15,
            justifyContent: 'space-between',
          }}
        >
          {[
            { label: 'TOTAL REVENUE', value: creator.totalVolume },
            { label: 'FOLLOWERS', value: creator.followers },
            { label: 'NUMBER OF WORKS', value: creator.works },
            { label: 'FLOOR PRICE', value: creator.floorPrice },
          ].map((stat) => (
            <Box key={stat.label}>
              <Typography sx={{ color: '#9b9bbf', fontWeight: 700 }}>
                {stat.value}
              </Typography>
              <Typography sx={{ color: '#9b9bbf', fontSize: 12 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
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

        <Grid container spacing={3}>
          {creator.items.map((it) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={it.id}>
              <Card sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  image={it.img}
                  alt={it.title}
                  sx={{ height: 160, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography sx={{ color: '#fff', fontWeight: 700 }}>
                    {it.title}
                  </Typography>
                  <Typography sx={{ color: '#9b9bbf', fontSize: 12 }}>
                    {it.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', color: '#cfcfff' }}
          >
            Tải Thêm
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreatorDetail;
