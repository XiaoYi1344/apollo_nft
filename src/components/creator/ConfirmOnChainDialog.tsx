'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from '@mui/material';

interface ConfirmOnChainDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    name: string;
    description: string;
    tokenURI: string; // tokenURI của NFT
    price: number;
  };
}

const ConfirmOnChainDialog: React.FC<ConfirmOnChainDialogProps> = ({
  open,
  onClose,
  onConfirm,
  data,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm On-Chain Data</DialogTitle>

      <DialogContent>
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Typography>
            <strong>Name:</strong> {data.name}
          </Typography>
          <Typography>
            <strong>Description:</strong> {data.description}
          </Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>
            <strong>Token URI:</strong> {data.tokenURI}
          </Typography>
          <Typography>
            <strong>Price:</strong> {data.price} ETH
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirm & Mint
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmOnChainDialog;
