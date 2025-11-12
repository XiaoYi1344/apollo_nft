'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface PriceDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (price: string) => void;
}

const PriceDialog: React.FC<PriceDialogProps> = ({ open, onClose, onConfirm }) => {
  const [price, setPrice] = useState('');

  const handleConfirm = () => {
    if (!price || parseFloat(price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    onConfirm(price);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: motion.div,
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.3 },
        sx: {
          bgcolor: '#0e0a1a',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>
        Set Your Price
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            Enter your selling price (in ETH):
          </Typography>
          <TextField
            type="number"
            placeholder="0.05"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            InputProps={{
              sx: {
                bgcolor: '#1a1333',
                color: '#fff',
                borderRadius: '10px',
                '& input': { textAlign: 'center' },
              },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#ccc',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            textTransform: 'none',
            px: 3,
            py: 0.8,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          sx={{
            background: 'linear-gradient(90deg,#7b2fff,#d16bff)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '12px',
            textTransform: 'none',
            px: 3,
            py: 0.8,
            boxShadow: '0 0 12px rgba(140,74,255,0.5)',
            '&:hover': { opacity: 0.9 },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceDialog;
