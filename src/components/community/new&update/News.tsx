

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

  // Flatten all pages into a single array
  const newsList = data?.pages.flatMap(page => page.data) || [];

  // Helper: ensure valid thumbnail
  const getThumbnail = (thumbnail?: string) => {
  if (!thumbnail) return '/placeholder.jpg'; // fallback nếu không có thumbnail

  try {
    // Nếu thumbnail là URL tuyệt đối hợp lệ
    new URL(thumbnail);
    return thumbnail;
  } catch {
    // Nếu thumbnail là tên file trên Cloudinary hoặc relative path
    return `https://res.cloudinary.com/dr6cnnvma/image/upload/v1763370298/${thumbnail}.png`;
  }
};


  // Helper: safe category label
  const getCategoryLabel = (category: { name?: string } | undefined) =>
    category?.name?.toUpperCase() || 'UNCATEGORIZED';

  return (
    <Box sx={{ mt: { xs: 3, sm: 4, md: 6 }, pb: { xs: 4, sm: 6 } }}>
      {/* Desktop & Tablet Marquee */}
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
                <Box sx={{ position: 'relative', height: { md: 200, lg: 220 }, overflow: 'hidden' }}>
                  <Image
                    src={getThumbnail(e.thumbnail)}
                    alt={e.title || 'News'}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                    style={{ objectFit: 'cover' }}
                  />
                  <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 12, left: 12 }}>
                    <Chip
                      label={getCategoryLabel(e.category)}
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
                    {e.title || 'Untitled'}
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
                    {e.description || ''}
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
                        '&:hover': { background: 'none', color: '#5f61e7dd' },
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

      {/* Mobile & Tablet Grid */}
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
            <Box sx={{ position: 'relative', height: { xs: 160, sm: 180 } }}>
              <Image
                src={getThumbnail(e.thumbnail)}
                alt={e.title || 'News'}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                style={{ objectFit: 'cover' }}
              />
              <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 8, left: 8 }}>
                <Chip
                  label={getCategoryLabel(e.category)}
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
                sx={{ color: '#fff', fontWeight: 600, mb: 0.5, fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
              >
                {e.title || 'Untitled'}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
              >
                {e.description || ''}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Load more button */}
      {hasNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} variant="contained">
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
