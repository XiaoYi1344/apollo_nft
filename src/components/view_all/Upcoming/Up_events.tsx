
'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import Image from 'next/image';
import { EventsResponse, useEvents } from '@/hooks/useEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import { Event } from '@/types/events';

const buttonColors: Record<string, string> = {
  live: '#9333ea',
  upcoming: '#1f2937',
  ended: '#1f2937',
};

const getEventTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'ama':
    case 'meetup':
      return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    case 'drop':
      return <AccessTimeFilledIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    case 'auction':
      return <GavelIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    case 'contest':
      return <EmojiEventsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    case 'workshop':
      return <SchoolIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
    default:
      return <GroupsIcon sx={{ fontSize: 16, color: '#A1A1AA' }} />;
  }
};

const getTimelineColor = (status: string) => {
  switch (status) {
    case 'upcoming':
      return '#6366F1';
    case 'live':
      return '#9333EA';
    case 'ended':
      return '#71717A';
    default:
      return '#1F2937';
  }
};

const getButtonLabel = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'View Details';
    case 'live':
      return 'Join Now';
    case 'ended':
      return 'See Summary';
    default:
      return 'View';
  }
};

export const Up_events: React.FC = () => {
  const [selectedTimeline, setSelectedTimeline] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useEvents();

  // Flatten API pages
  // InfiniteData has `.pages`, so ensure typing aligns
const allEvents: Event[] = (data?.pages ?? [])
  .flatMap((page) =>
    (page.data ?? []).filter((item): item is Event => 'id' in item)
  );


const filteredEvents = allEvents.filter((e) => {
  const matchTimeline =
    selectedTimeline === 'all' || e.status === selectedTimeline;
  const matchCategory =
    selectedCategory === 'all' ||
    e.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
  return matchTimeline && matchCategory;
});


  if (isLoading)
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;

  return (
    <Box
      sx={{ background: 'linear-gradient(120deg,#111827, #1E3A8A,#581C87)' }}
    >
      <Stack
        sx={{
          color: '#fff',
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 3, sm: 5, md: 8 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.4rem' },
            mb: 1,
            my: 3,
          }}
        >
          Event Calendar
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            mb: { xs: 5, sm: 8 },
            mx: 'auto',
            fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.3rem' },
            lineHeight: 1.6,
            width: { xs: '95%', sm: 600, md: 750 },
          }}
        >
          Discover and join exciting events happening in our community.
        </Typography>

        {/* Filters */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 5 }}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: { xs: 4, sm: 5 } }}
        >
          {/* Timeline filter */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['all', 'upcoming', 'live', 'ended'].map((v) => (
              <Button
                key={v}
                onClick={() => setSelectedTimeline(v)}
                sx={{
                  color: selectedTimeline === v ? '#fff' : '#aaa',
                  bgcolor: selectedTimeline === v ? '#9333ea' : '#1f2937',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  py: 0.7,
                  fontSize: '0.9rem',
                }}
              >
                {v === 'all'
                  ? 'All Events'
                  : v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </Box>

          {/* Category filter */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              'all',
              'ama',
              'meetup',
              'drop',
              'auction',
              'contest',
              'workshop',
            ].map((c) => (
              <Button
                key={c}
                onClick={() => setSelectedCategory(c)}
                sx={{
                  bgcolor: selectedCategory === c ? '#6366F1' : '#1f2937',
                  color: selectedCategory === c ? '#fff' : '#aaa',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  py: 0.7,
                  fontSize: '0.9rem',
                }}
              >
                {c === 'all' ? 'All Types' : c.toUpperCase()}
              </Button>
            ))}
          </Box>
        </Stack>

        {/* Event Cards */}
        <Grid container spacing={3} justifyContent="center">
          {filteredEvents.map((e) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={e.id ?? `${e.title}-${e.startTime}`}>
              <Card
                sx={{
                  borderRadius: 3,
                  bgcolor: '#141545',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Box
                  sx={{ position: 'relative', height: { xs: 180, sm: 220 } }}
                >
                  <Image
                   

                    src={
                      e.image
                        ? `https://res.cloudinary.com/dr6cnnvma/image/upload/v1763370298/${e.image}.png`
                        : '/placeholder.png'
                    }
                    alt={e.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9))',
                    }}
                  />
                  <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                    <Chip
                      label={e.status}
                      sx={{
                        bgcolor: getTimelineColor(e.status),
                        color: '#fff',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ p: 3, pt: 2 }}>
                  <Typography
                    sx={{ color: '#A1A1AA', fontSize: '0.9rem', mb: 1 }}
                  >
                    {new Date(e.startTime).toLocaleString()}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      mb: 1.2,
                    }}
                  >
                    {e.title}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={0.7}
                  >
                    <Chip
                      label={e.category?.name || 'EVENT'}
                      sx={{
                        bgcolor: '#1f2937',
                        color: '#fff',
                        textTransform: 'uppercase',
                        fontSize: '0.7rem',
                      }}
                    />
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      {getEventTypeIcon(e.category?.name || '')}
                      <Typography
                        sx={{ color: '#A1A1AA', fontSize: '0.85rem' }}
                      >
                        {e.joinCount} joined
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      sx={{
                        bgcolor: buttonColors[e.status],
                        color: '#fff',
                        textTransform: 'none',
                        borderRadius: 2,
                        py: 1.2,
                      }}
                    >
                      {getButtonLabel(e.status)}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More */}
        {hasNextPage && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              sx={{ bgcolor: '#6366F1', color: '#fff', px: 4 }}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
