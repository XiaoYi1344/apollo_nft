'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';

interface Metadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes?: { trait_type: string; value: string }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  metadata: Metadata;
}

const PreviewMetadataDialog: React.FC<Props> = ({
  open,
  onClose,
  onNext,
  metadata,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Metadata Preview</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            p: 2,
            bgcolor: '#F5F5F5',
            borderRadius: 2,
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            fontSize: '0.85rem',
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(metadata, null, 2)}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onNext} variant="contained">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewMetadataDialog;
