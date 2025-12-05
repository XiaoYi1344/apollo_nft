
'use client';

import { useArtistsByWeek } from '@/hooks/useArtists';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  useTheme,
  Skeleton,
} from '@mui/material';
import Image from 'next/image';

export default function Creator() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  // Lấy dữ liệu từ API
  const { data: artists, isLoading, error } = useArtistsByWeek();
  const displayedArtists = isXs ? artists?.slice(0, 3) : artists;

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
      <Typography
        variant="h4"
        sx={{ color: 'white', fontWeight: 700, textAlign: 'start', mb: 3 }}
      >
        Creator of The Week
      </Typography>

      {isLoading && (
        <Grid container spacing={3} justifyContent="center">
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Skeleton
                variant="rectangular"
                height={120}
                sx={{ borderRadius: 4 }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {error && (
        <Typography sx={{ color: 'red' }}>Error: {error.message}</Typography>
      )}

      <Grid container spacing={3} justifyContent="center">
  {displayedArtists?.map((artist) => {
  const avatarUrl = artist.avatar
  ? `https://res.cloudinary.com/dr6cnnvma/image/upload/${artist.avatar}.png`
  : '/default-avatar.png';

    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={artist.id}>
        <Card
          sx={{
            borderRadius: 4,
            background: 'linear-gradient(135deg, #2E1A5F, #3B0D7D)',
            color: 'white',
            height: '100%',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
            },
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'start',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Image
                src={avatarUrl}
                alt={artist.fullName}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:600px) 48px, (max-width:900px) 64px, 64px"
              />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: '1.2rem', fontWeight: 600 }}
              >
                {artist.fullName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.8)', pt: 1, fontSize: '1rem' }}
              >
                {artist.followerCount} Followers
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  })}
</Grid>


      {/* === WATCH VIDEO BUTTON === */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          component="a"
          href="https://www.youtube.com/watch?v=example"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '9999px',
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(90deg,#8c4aff,#2da1ff)',
            boxShadow: '0 0 20px rgba(140,74,255,0.5)',
            '&:hover': { boxShadow: '0 0 25px rgba(140,74,255,0.8)' },
          }}
        >
          Watch Video
        </Button>
      </Box>
    </Box>
  );
}
