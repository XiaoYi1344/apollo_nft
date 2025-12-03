'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardMedia,
  Checkbox,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Collection } from '@/types/collection';
import { OwnedProduct, ProductActivity } from '@/types/product';

interface Props {
  open: boolean;
  collection: Collection;
  products: OwnedProduct[];
  allActivities: ProductActivity[][];
  onClose: () => void;
  onAdd: (productIds: number[]) => void;
}

const MotionCard = motion(Card);

const AddProductsModal: React.FC<Props> = ({
  open,
  collection,
  products,
  allActivities,
  onClose,
  onAdd,
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    if (selected.length === 0) return;
    onAdd(selected);
    // setSelected([]);
    // onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: '#0c0c0c',
          background: 'linear-gradient(160deg, #0c0c0c 0%, #1a0f2b 100%)',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
        Thêm NFT vào <span style={{ color: '#7a3bff' }}>{collection.name}</span>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {products.map((prod, idx) => {
            const activities = allActivities[idx] ?? [];
            const isMinted = activities.some((a) => a.evenType === 'Mint');
            if (!isMinted) return null;

            const isSelected = selected.includes(prod.id);

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={prod.id}>
                <Box sx={{ perspective: 800 }}>
                  <MotionCard
                    whileHover={{ scale: 1.06, rotateX: 3, rotateY: 3 }}
                    animate={{ borderColor: isSelected ? '#7a3bff' : '#333' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: '2px solid',
                      borderColor: isSelected ? '#7a3bff' : '#333',
                      boxShadow: isSelected
                        ? '0 0 25px rgba(122,59,255,0.8)'
                        : '0 6px 18px rgba(0,0,0,0.4)',
                      transition: 'box-shadow 0.3s, border-color 0.3s',
                      background: 'linear-gradient(135deg, #111, #1a0f2b)',
                    }}
                    onClick={() => toggleSelect(prod.id)}
                  >
                    <CardMedia
                      component="img"
                      height={220}
                      image={`https://gateway.pinata.cloud/ipfs/${prod.image}`}
                      alt={prod.name}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                        transformOrigin: 'center',
                      }}
                    />

                    {/* Neon Checkbox */}
                    <Checkbox
                      checked={isSelected}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        borderRadius: '50%',
                        '&.Mui-checked': {
                          color: '#7a3bff',
                          '&:hover': { bgcolor: 'rgba(122,59,255,0.3)' },
                        },
                      }}
                    />

                    {/* Name overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        py: 1,
                        px: 1.5,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.0))',
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: '#fff',
                          textShadow: '0 0 8px #7a3bff, 0 0 12px #ff5ca2',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {prod.name}
                      </Typography>
                      {prod.tokenId && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#aaa',
                            textShadow: '0 0 4px #7a3bff',
                          }}
                        >
                          #{prod.tokenId}
                        </Typography>
                      )}
                    </Box>

                    {/* Mirror reflection */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -80,
                        width: '100%',
                        height: 80,
                        overflow: 'hidden',
                        transform: 'scaleY(-1)',
                        opacity: 0.25,
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={220}
                        image={`https://gateway.pinata.cloud/ipfs/${prod.image}`}
                        alt={prod.name}
                        sx={{ objectFit: 'cover', filter: 'blur(2px)' }}
                      />
                    </Box>
                  </MotionCard>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: 'rgba(122,59,255,0.2)' },
          }}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #7a3bff 0%, #ff5ca2 100%)',
            boxShadow: '0 6px 20px rgba(122,59,255,0.5)',
            '&:hover': {
              background: 'linear-gradient(135deg, #6a2adf 0%, #ff4090 100%)',
              boxShadow: '0 8px 25px rgba(122,59,255,0.7)',
            },
          }}
        >
          Thêm NFT
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductsModal;
