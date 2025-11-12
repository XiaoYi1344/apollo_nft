'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import toast from 'react-hot-toast';
import { useUpdateProduct } from '@/hooks/useProduct';
import { OwnedProduct, ProductProperty, UpdateProductPayload } from '@/types/product';
import ConfirmOnChainDialog from './ConfirmOnChainDialog';
import { useLandingPageNFT } from '@/hooks/useLandingPageNFT';

const getTextFieldSx = {
  '& .MuiInput-root': {
    color: '#FFF',
    '&:before': { borderBottomColor: '#3b3f6d' },
    '&:hover:not(.Mui-disabled):before': { borderBottomColor: '#6a75ff' },
    '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
  },
  '& .MuiInput-input': {
    color: '#ADAEBC',
    fontSize: '1rem',
    '::placeholder': { color: '#FFF', opacity: 0.7 },
  },
  '& .MuiInputLabel-root': {
    color: '#FFF',
    fontSize: '1rem',
    transform: 'translate(0, -15px) scale(1)',
    '&.Mui-focused': { color: '#FFF', transform: 'translate(0, -18px) scale(0.8)' },
  },
};

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: OwnedProduct;
  onSave?: (data: OwnedProduct) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onClose, product, onSave }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [externalLink, setExternalLink] = useState(product.externalLink || '');
  const [image, setImage] = useState<File | undefined>(undefined);
  const [properties, setProperties] = useState<ProductProperty[]>(product.properties || []);
  const [price, setPrice] = useState(product.price || 0);
  const [isFreeze, setIsFreeze] = useState(product.isFreeze || false);

  const updateProductMutation = useUpdateProduct();
  const { mintFullNFT } = useLandingPageNFT();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState<UpdateProductPayload | null>(null);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setExternalLink(product.externalLink || '');
    setProperties(product.properties || []);
    setPrice(product.price || 0);
    setIsFreeze(product.isFreeze || false);
    setImage(undefined);
  }, [product]);

  const handlePropertyChange = (index: number, field: 'type' | 'name', value: string) => {
    setProperties(prev => {
      const newProps = [...prev];
      newProps[index][field] = value;
      return newProps;
    });
  };

  const addProperty = () => setProperties([...properties, { type: '', name: '' }]);
  const removeProperty = (index: number) => setProperties(prev => prev.filter((_, i) => i !== index));

  const handleSave = () => {
    if (!name.trim() || !description.trim()) return toast.error('Name and description are required');
    const invalidProps = properties.some(p => !p.type || !p.name);
    if (invalidProps) return toast.error('Each property must have type and name');

    const payload: UpdateProductPayload = {
      id: String(product.id),
      name,
      description,
      properties,
      price,
      externalLink,
      isFreeze,
    };
    if (image) payload.image = image;

    updateProductMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Product updated successfully');
        setPendingData(payload);
        setConfirmOpen(true);
        onSave?.({ ...product, name, description, properties, price, externalLink, isFreeze });
      },
      onError: (err: unknown) => {
        if (err instanceof Error) toast.error(err.message);
        else toast.error('Failed to update product');
      },
    });
  };

  const handleCloseOrFreeze = () => {
    const payload: UpdateProductPayload = {
      id: String(product.id),
      name,
      description,
      properties,
      price,
      externalLink,
      isFreeze,
    };
    setPendingData(payload);
    setConfirmOpen(true);
  };

  const handleConfirmMint = async () => {
    if (!pendingData) return;
    try {
      await mintFullNFT(
        pendingData.name,
        product.tokenURI, // lấy từ OwnedProduct
        pendingData.description,
        pendingData.price
      );
      toast.success('NFT minted successfully!');
      setConfirmOpen(false);
      onClose();
    } catch {
      toast.error('Minting failed');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: motion.div,
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.3 },
          sx: { bgcolor: '#0e0a1a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, p: 2, width: 500 },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, color: '#fff' }}>
          {product.isFreeze ? 'View Frozen Metadata' : 'Edit Product'}
        </DialogTitle>

        <DialogContent>
          {product.isFreeze ? (
            <Typography sx={{ color: '#bbb', textAlign: 'center', py: 4 }}>
              Metadata has been frozen. You cannot edit this item.
            </Typography>
          ) : (
            <Stack spacing={2}>
              <TextField
                required
                label="Name"
                placeholder="Enter item name"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={getTextFieldSx}
              />
              <TextField
                required
                label="Description"
                placeholder="Provide a detailed description"
                multiline
                rows={3}
                variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={getTextFieldSx}
              />
              <TextField
                label="External Link"
                placeholder="https://yoursite.io/item/123"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                sx={getTextFieldSx}
              />
              <TextField
                type="number"
                label="Price (ETH)"
                placeholder="0.00"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                sx={getTextFieldSx}
              />

              <FormControlLabel
                control={<Switch checked={isFreeze} onChange={(e) => setIsFreeze(e.target.checked)} color="primary" />}
                label="Freeze Metadata"
                sx={{ color: '#fff' }}
              />

              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
                sx={{ color: '#fff', borderColor: '#fff' }}
              >
                Upload Image
                <input type="file" hidden onChange={(e) => e.target.files && setImage(e.target.files[0])} />
              </Button>

              <Typography sx={{ mt: 2, fontWeight: 600 }}>Properties</Typography>
              {properties.map((prop, idx) => (
                <Stack key={idx} direction="row" spacing={1}>
                  <TextField
                    label="Type"
                    placeholder="Trait type"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    value={prop.type}
                    onChange={(e) => handlePropertyChange(idx, 'type', e.target.value)}
                    sx={getTextFieldSx}
                  />
                  <TextField
                    label="Name"
                    placeholder="Trait name"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    value={prop.name}
                    onChange={(e) => handlePropertyChange(idx, 'name', e.target.value)}
                    sx={getTextFieldSx}
                  />
                  <Button onClick={() => removeProperty(idx)} sx={{ color: '#FF4D4D' }}>
                    Remove
                  </Button>
                </Stack>
              ))}
              <Button onClick={addProperty} sx={{ color: '#01FFCA' }}>
                + Add Property
              </Button>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={product.isFreeze ? handleCloseOrFreeze : onClose}
            sx={{ color: '#ccc', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 2, textTransform: 'none', px: 3, py: 0.8 }}
          >
            Close
          </Button>
          {!product.isFreeze && (
            <Button
              onClick={handleSave}
              sx={{ background: 'linear-gradient(90deg,#7b2fff,#d16bff)', color: '#fff', fontWeight: 600, borderRadius: 2, textTransform: 'none', px: 3, py: 0.8 }}
              disabled={updateProductMutation.status === 'pending'}
            >
              {updateProductMutation.status === 'pending' ? 'Saving...' : 'Save'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {pendingData && (
        <ConfirmOnChainDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmMint}
          data={{
            name: pendingData.name,
            description: pendingData.description,
            tokenURI: product.tokenURI,
            price: pendingData.price,
          }}
        />
      )}
    </>
  );
};

export default EditProductDialog;
