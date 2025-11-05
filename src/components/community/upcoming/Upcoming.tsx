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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Marquee from 'react-fast-marquee';

const events = [
  {
    name: 'Live Chat with artist Ria Prakasa',
    img: '/community/event.png',
    text: 'Discussing her new "Cyber Flora" collection and creative process.',
    time: 'Friday, October 17, 2025 - 8:00 PM (GMT+7)',
    button: 'Set a Reminder',
    link: '/',
    chips: [
      { name: 'AMA', color: '#f59e0b' },
      { name: 'ARTIST SPOTLIGHT', color: '#6366f1' },
    ],
    color_button: '#5146e5',
  },
  {
    name: 'Community Game Night',
    img: '/community/event1.png',
    text: 'Join fun games on Discord and get a chance to win free NFTs!',
    time: 'Sunday, October 19, 2025 - 7:00 PM (GMT+7)',
    button: 'Join Now',
    link: '',
    chips: [
      { name: 'COMMUNITY', color: '#8b5cf6' },
      { name: 'GAME NIGHT', color: '#f59e0b' },
    ],
    color_button: '#6d28d9',
  },
];

export default function UpcomingEvents() {
  return (
    <Box sx={{ mt: 4, pb: 8, overflow: 'hidden' }}>
      {/* 👉 Marquee for tablet, laptop, desktop */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Marquee gradient={false} speed={35} pauseOnHover>
          {Array.from({ length: 2 }).map((_, repeatIndex) =>
            events.map((e, i) => (
              <Card
                key={`${i}-${repeatIndex}`}
                sx={{
                  width: { sm: 400, md: 480, lg: 560 },
                  borderRadius: 4,
                  my: 1,
                  mx: { sm: 1.5, md: 2 },
                  overflow: 'hidden',
                  bgcolor: '#1a0c45',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.15)',
                  },
                }}
              >
                {/* Hình nền */}
                <Box
                  sx={{
                    position: 'relative',
                    height: { sm: 180, md: 200, lg: 220 },
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={e.img}
                    alt={e.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                    style={{ objectFit: 'cover' }}
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ position: 'absolute', top: 12, left: 12 }}
                  >
                    {e.chips.map((chip, j) => (
                      <Chip
                        key={j}
                        label={chip.name}
                        sx={{
                          bgcolor: chip.color,
                          color: chip.color === '#f59e0b' ? '#000' : '#fff',
                          fontSize: { sm: 10, md: 11 },
                          fontWeight: 550,
                          textTransform: 'uppercase',
                          borderRadius: '50px',
                          px: 0.5,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Nội dung */}
                <CardContent sx={{ p: { sm: 2, md: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      mb: 1,
                      fontSize: { sm: '1rem', md: '1.1rem' },
                      lineHeight: 1.3,
                    }}
                  >
                    {e.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      mb: 2,
                      fontSize: { sm: '0.85rem', md: '0.95rem' },
                      lineHeight: 1.4,
                    }}
                  >
                    {e.text}
                  </Typography>

                  {/* Thời gian */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: '#f59e0b', mb: 2 }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#fbbf24',
                        fontSize: { sm: '0.8rem', md: '0.9rem' },
                      }}
                    >
                      {e.time}
                    </Typography>
                  </Stack>
                </CardContent>

                <CardActions sx={{ p: { sm: 2, md: 3 }, pt: 0 }}>
                  {e.link ? (
                    <Button
                      fullWidth
                      href={e.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: e.color_button,
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 700,
                        borderRadius: 2,
                        py: 1,
                        fontSize: { sm: '0.8rem', md: '0.9rem' },
                        '&:hover': {
                          bgcolor: e.color_button + 'dd',
                        },
                      }}
                    >
                      {e.button}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      disabled
                      sx={{
                        bgcolor: '#444',
                        color: '#bbb',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 2,
                        py: 1,
                        fontSize: { sm: '0.8rem', md: '0.9rem' },
                      }}
                    >
                      {e.button}
                    </Button>
                  )}
                </CardActions>
              </Card>
            ))
          )}
        </Marquee>
      </Box>

      {/* 👉 Grid layout cho mobile */}
      <Box
        sx={{
          display: { xs: 'grid', sm: 'none' },
          gridTemplateColumns: '1fr',
          gap: 2,
          mt: 2,
          px: 2,
        }}
      >
        {events.map((e, i) => (
          <Card
            key={i}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: '#1a1a2e',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          >
            <Box sx={{ position: 'relative', height: 140 }}>
              <Image
                src={e.img}
                alt={e.name}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 450px"
                style={{ objectFit: 'cover' }}
              />
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ position: 'absolute', top: 8, left: 8 }}
              >
                {e.chips.map((chip, j) => (
                  <Chip
                    key={j}
                    label={chip.name}
                    sx={{
                      bgcolor: chip.color,
                      color: '#fff',
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      borderRadius: '6px',
                      px: 0.5,
                    }}
                  />
                ))}
              </Stack>
            </Box>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  mb: 0.5,
                  fontSize: '0.85rem',
                }}
              >
                {e.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.7rem',
                }}
              >
                {e.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
