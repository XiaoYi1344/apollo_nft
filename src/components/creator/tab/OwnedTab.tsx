


'use client';

import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Button,
  CircularProgress,
  Chip,
  Tooltip,
  Typography,
} from '@mui/material';
import { OwnedProduct, ProductActivity } from '@/types/product';
import { useMintState } from '@/hooks/useMintState';

interface Props {
  ownedProducts: OwnedProduct[];
  allActivities: ProductActivity[][];
  activitiesLoading: boolean;
  walletMode: boolean;
  handleOpenEdit: (product: OwnedProduct, activities: ProductActivity[]) => void;
  openSellModal: (product: OwnedProduct) => void;
}

const OwnedTab: React.FC<Props> = ({
  ownedProducts,
  allActivities,
  activitiesLoading,
  walletMode,
  handleOpenEdit,
  openSellModal,
}) => {
  const { ownedList } = useMintState(ownedProducts, allActivities);

  return (
    <Grid container spacing={3} mb={3}>
      {ownedList.map((product) => {
        const idx = ownedProducts.findIndex((p) => p.id === product.id);
        const activities = allActivities[idx] ?? [];
        const isFrozen = product.isFreeze;

        return (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.03)',
                borderRadius: 3,
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
                alt={product.name}
                sx={{
                  height: 280,
                  objectFit: 'cover',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />

              <CardContent sx={{ bgcolor: '#1a1a2e' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {product.name}
                  </Typography>
                </Stack>

                {activitiesLoading ? (
                  <CircularProgress size={16} sx={{ mt: 1 }} />
                ) : (
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {isFrozen && (
                      <Tooltip title="Metadata sản phẩm đã bị khóa (freeze)">
                        <Chip
                          label="Frozen"
                          size="small"
                          sx={{
                            bgcolor: 'rgba(135,206,250,0.15)',
                            color: '#1E90FF',
                            fontWeight: 600,
                          }}
                        />
                      </Tooltip>
                    )}
                  </Stack>
                )}

                <Typography sx={{ color: '#b78eff', mt: 1 }}>
                  Giá: {product.price ?? 'N/A'}
                </Typography>

                {walletMode && (
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: '#7a3bff',
                        color: '#b78eff',
                      }}
                      onClick={() => handleOpenEdit(product, activities)}
                    >
                      Mint
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: '#ff7a3b',
                        color: '#ffb78e',
                      }}
                      onClick={() => openSellModal(product)}
                    >
                      Sell
                    </Button>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default OwnedTab;
