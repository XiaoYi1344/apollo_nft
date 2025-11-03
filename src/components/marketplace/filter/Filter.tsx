'use client';
import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import StatusFilter from './status/StatusFilter';
import PriceFilter from './price/PriceFilter';
import CollectionsFilter from './collection/CollectionsFilter';
import PropertiesFilter from './filter/PropertiesFilter';

export default function FilterPanel() {
  // State chung cho tất cả filter
  const [statusSelected, setStatusSelected] = useState<string[]>([]);
  const [price, setPrice] = useState({ min: '', max: '' });
  const [collectionsSelected, setCollectionsSelected] = useState<string[]>([]);
  const [propertiesSelected, setPropertiesSelected] = useState<
    Record<string, string[]>
  >({});

  // Clear All
  const handleClearAll = () => {
    setStatusSelected([]);
    setPrice({ min: '', max: '' });
    setCollectionsSelected([]);
    setPropertiesSelected({});
  };

  return (
    <Box
      sx={{
        px: 3,
        borderRadius: 3,
        color: 'white',
        width: {xs: 300, sm: 310, md: 340},
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography sx={{ fontWeight: 600 }}>Filters</Typography>
        <Typography
          sx={{ color: '#a78bfa', fontSize: 13, cursor: 'pointer' }}
          onClick={handleClearAll}
        >
          Clear All
        </Typography>
      </Stack>

      <StatusFilter selected={statusSelected} setSelected={setStatusSelected} />
      <PriceFilter price={price} setPrice={setPrice} />
      <CollectionsFilter
        selected={collectionsSelected}
        setSelected={setCollectionsSelected}
      />
      <PropertiesFilter
        selected={propertiesSelected}
        setSelected={setPropertiesSelected}
      />
    </Box>
  );
}
