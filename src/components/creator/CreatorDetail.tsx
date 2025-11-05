'use client';
import React from 'react';
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
import toast from 'react-hot-toast';
import { ArrowBack, Instagram, Twitter } from '@mui/icons-material';

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
      <Box
        sx={{
          px: 7,
          pb: 6,
          background: 'linear-gradient(90deg,#070a12, #0e1637,#230b36)',
        }}
      >
        {/* <Box sx={{ position: 'relative', mb: 10, mt: -10 }}>
    
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

            <Box>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800 }}>
                {creator.name}
              </Typography>
              <Typography sx={{ color: '#9b9bbf', fontSize: 13 }}>
                {creator.username}
              </Typography>
            </Box>

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

              <Button
                variant="outlined"
                onClick={onBack}
                sx={{
                  color: '#cfcfff',
                  borderColor: 'rgba(255,255,255,0.1)',
                  textTransform: 'none',
                  fontSize: 13,
                  px: 2.5,
                  py: 0.5,
                }}
              >
                <ArrowCircleLeftIcon />
              </Button>


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
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // căn giữa ngang
            alignItems: 'center', // nếu muốn giữa dọc luôn
            width: '100%',
            my: 4,
          }}
        >
          <Button
            variant="text"
            onClick={handleExport}
            sx={{
              color: '#fff',
              textTransform: 'none',
              fontSize: { xs: 13, sm: 14 },
              '&:hover': { color: '#b78eff' },
            }}
          >
            Xuất sang Trang tính
          </Button>
        </Box> */}
        <Box
          sx={{
            position: 'relative',
            mb: { xs: 6, md: 10 },
            mt: { xs: -6, md: -10 },
          }}
        >
          {/* Avatar nổi ra khỏi banner */}
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 130, md: -48 },
              left: { xs: '50%', md: 32 },
              transform: { xs: 'translateX(-50%)', md: 'none' }, // căn giữa avatar trên mobile
              zIndex: 2,
            }}
          >
            <Avatar
              src={creator.avatar}
              alt={creator.name}
              sx={{
                width: { xs: 80, md: 96 },
                height: { xs: 80, md: 96 },
                border: '4px solid rgba(255,255,255,0.12)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            />
          </Box>

          {/* Thông tin và nút */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: '50%', md: 150 },
              bottom: { xs: 40, md: -45 },
              transform: { xs: 'translateX(-50%)', md: 'none' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {/* Tên và ví */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                }}
              >
                {creator.name}
              </Typography>
              <Typography
                sx={{ color: '#9b9bbf', fontSize: { xs: 12, sm: 13 } }}
              >
                {creator.username}
              </Typography>
            </Box>

            {/* Hàng nút + icon */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
                mt: 0.5,
                // flexWrap: 'wrap', // cho phép xuống dòng nếu hẹp
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
                  fontSize: { xs: 12, sm: 13 },
                  px: { xs: 2, sm: 2.5 },
                  py: { xs: 0.4, sm: 0.5 },
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
                  fontSize: { xs: 12, sm: 13 },
                  px: { xs: 2, sm: 2.5 },
                  py: { xs: 0.4, sm: 0.5 },
                  whiteSpace: 'nowrap', // 👈 đảm bảo không xuống dòng
                  minWidth: 'auto', // 👈 cho phép co giãn vừa nội dung
                }}
              >
                Chia sẻ
              </Button>

              {/* Icon mạng xã hội */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  ml: { xs: 0.5, sm: 1 },
                }}
              >
                <Twitter sx={{ color: '#cfcfff' }} />
                <Instagram sx={{ color: '#cfcfff' }} />
              </Box>
            </Box>
          </Box>

          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#cfcfff',
              border: 'none',
              textTransform: 'none',
              fontSize: { xs: 12, sm: 13 },
              px: { xs: 2, sm: 2.5 },
              py: { xs: 0.4, sm: 0.5 },
              ml: { xs: -6, sm: 1 },
              mt: { xs: 0.5, sm: 0 },
              minWidth: 'auto',
            }}
          >
            <ArrowBack fontSize="small" /> Quay lại
          </Button>
        </Box>

        {/* Bio */}
        <Typography
          sx={{
            color: '#cfcfff',
            mb: { xs: 2, md: 3 },
            pt: { xs: 3, md: 10 },
            textAlign: { xs: 'left', md: 'left' },
            px: { md: 0 },
            mx: { xs: -3 },
          }}
        >
          {creator.bio}
        </Typography>

        {/* Stats */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)', // 👈 2 cột trên mobile
              sm: 'repeat(4, 1fr)', // 👈 4 cột từ sm trở lên
            },
            gap: { xs: 2, sm: 3 },
            mb: { xs: 3, md: 4 },
            px: { sm: 6, md: 15 },
            mx:{ xs: -6 },
            justifyItems: 'center', // căn giữa nội dung trong từng ô
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {[
            { label: 'TOTAL REVENUE', value: creator.totalVolume },
            { label: 'FOLLOWERS', value: creator.followers },
            { label: 'NUMBER OF WORKS', value: creator.works },
            { label: 'FLOOR PRICE', value: creator.floorPrice },
          ].map((stat) => (
            <Box key={stat.label}>
              <Typography
                sx={{
                  color: '#9b9bbf',
                  fontWeight: 700,
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  color: '#9b9bbf',
                  fontSize: { xs: 11, md: 12 },
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Button giữa màn hình */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            my: 4,
            px: { xs: 2, md: 0 },
          }}
        >
          <Button
            variant="text"
            onClick={handleExport}
            sx={{
              color: '#fff',
              textTransform: 'none',
              fontSize: { xs: 13, sm: 14 },
              '&:hover': { color: '#b78eff' },
            }}
          >
            Xuất sang Trang tính
          </Button>
        </Box>

        <Grid container spacing={3}>
          {creator.items.map((it) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={it.id}>
              <Card
                sx={{
                  bgcolor: 'rgba(255,255,255,0.03)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={it.img}
                  alt={it.title}
                  sx={{
                    height: 300,
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ bgcolor: '#1a1a2e' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: '#fff', fontWeight: 700 }}
                  >
                    {it.title}
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: 15,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    Giá:{' '}
                    <Typography
                      component="span"
                      sx={{ color: '#b78eff', ml: 0.5, fontWeight: 600 }}
                    >
                      {it.price}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => toast.success('Đã thêm vào giỏ hàng')}
                      sx={{
                        textTransform: 'none',
                        fontSize: 13,
                        ml: -1,
                        // py: 0.3,
                        // px: 1.2,
                        borderRadius: 2,
                        background: 'transparent',
                        boxShadow: 'none',
                        '&:hover': { opacity: 0.9 },
                        color: '#05F500',
                      }}
                    >
                      (Mua ngay)
                    </Button>
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
