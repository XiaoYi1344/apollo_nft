
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
import { OwnedProduct } from '@/types/product';

interface ConfirmUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data?: {
    tokenId?: number;
    name?: string;
    description?: string;
    tokenURI?: string;
    price?: number;
  };
  ownedProduct?: OwnedProduct;
}

const ConfirmUpdateDialog: React.FC<ConfirmUpdateDialogProps> = ({
  open,
  onClose,
  onConfirm,
  data,
  ownedProduct,
}) => {
  if (!data && !ownedProduct) return null;

  // Lấy tokenURI ưu tiên từ data, fallback từ ownedProduct
  const tokenURI =
    data?.tokenURI ||
    ownedProduct?.ownerships?.[0]?.tokenURI ||
    ownedProduct?.tokenURI ||
    'N/A';

  const tokenId = data?.tokenId || ownedProduct?.tokenId || 'N/A';
  const name = data?.name || ownedProduct?.name || 'N/A';
  const description = data?.description || ownedProduct?.description || 'N/A';
  const price = data?.price || ownedProduct?.price || 'N/A';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm On-Chain Update</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography><strong>Token ID:</strong> {tokenId}</Typography>
          <Typography><strong>Name:</strong> {name}</Typography>
          <Typography><strong>Description:</strong> {description}</Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>
            <strong>Token URI:</strong> {tokenURI}
          </Typography>
          <Typography><strong>Price:</strong> {price} ETH</Typography>
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
