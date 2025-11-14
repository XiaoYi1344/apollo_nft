'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from '@mui/material';

interface ConfirmUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    tokenId: number;       // lấy trực tiếp từ sản phẩm
    name: string;
    description: string;
    tokenURI: string;
    price: number;
  };
}

const ConfirmUpdateDialog: React.FC<ConfirmUpdateDialogProps> = ({
  open,
  onClose,
  onConfirm,
  data,
}) => {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm On-Chain Update</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography><strong>Token ID:</strong> {data.tokenId}</Typography>
          <Typography><strong>Name:</strong> {data.name}</Typography>
          <Typography><strong>Description:</strong> {data.description}</Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>
            <strong>Token URI:</strong> {data.tokenURI}
          </Typography>
          <Typography><strong>Price:</strong> {data.price} ETH</Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm & Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUpdateDialog;
