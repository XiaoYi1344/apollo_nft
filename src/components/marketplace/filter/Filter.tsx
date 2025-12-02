'use client';
import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import StatusFilter from './status/StatusFilter';
import PriceFilter from './price/PriceFilter';
import CollectionsFilter from './collection/CollectionsFilter';
import PropertiesFilter from './filter/PropertiesFilter';
import { useFilteredProducts, useOwnedProducts } from '@/hooks/useProduct';

interface FilterPanelProps {
  statusSelected: string[];
  setStatusSelected: (val: string[]) => void;
}

export default function FilterPanel({
  statusSelected,
  setStatusSelected,
}: FilterPanelProps) {
  // State chung cho tất cả filter
  const [price, setPrice] = useState({ min: '', max: '' });
  const [collectionsSelected, setCollectionsSelected] = useState<string[]>([]);
  const [propertiesSelected, setPropertiesSelected] = useState<
    Record<string, string[]>
  >({});

  // ====================== FILTER LỌC THEO STATUS ====================
  const { data: products = [] } = useOwnedProducts();
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const filteredProducts = useFilteredProducts(products, selectedStatuses);

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
        width: {xs: '100%', sm: '115%', md: '105%'},
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
