'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { CreateCollectionRequest } from '@/types/collection';
import CropImageModal from '@/components/creator/CropImageModal';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCollectionRequest) => void;
}

const CreateCollectionModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cropOpen, setCropOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);

  // Khi chọn file, mở CropImageModal với type rectangle
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result as string);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Khi crop xong
  const handleCropDone = (croppedFile: File) => {
    setImage(croppedFile);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(croppedFile);
    setCropOpen(false);
  };

  const handleSubmit = () => {
    if (!name || !image) return;
    onSubmit({ name, description, image });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, bgcolor: '#1a1a1a' } }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
            Tạo Collection NFT
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}
        >
          <TextField
            label="Tên Collection"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mt: 2,
              input: { color: '#fff' },
              label: { color: '#ccc' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#7a3bff' },
                '&.Mui-focused fieldset': { borderColor: '#7a3bff' },
              },
            }}
          />
          <TextField
            label="Mô tả"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              textarea: { color: '#fff' }, // <-- thêm dòng này
              label: { color: '#ccc' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#7a3bff' },
                '&.Mui-focused fieldset': { borderColor: '#7a3bff' },
              },
            }}
          />

          {/* Box chọn & preview ảnh */}

          <Box
            sx={{
              border: '2px dashed #7a3bff',
              borderRadius: 3,
              width: '100%',
              // Chiều cao theo tỷ lệ rectangle 3:2 dựa trên width container
              height: '0',
              pt: '66.66%', // 2/3 = 0.6666 → padding-top để giữ ratio 3:2
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': { backgroundColor: 'rgba(122,59,255,0.1)' },
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            {preview ? (
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#7a3bff',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                Click để chọn & cắt ảnh NFT (rectangle)
              </Typography>
            )}

            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} sx={{ color: '#fff' }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background: 'linear-gradient(135deg, #7a3bff 0%, #ff5ca2 100%)',
              color: '#fff',
              fontWeight: 700,
              '&:hover': {
                background: 'linear-gradient(135deg, #6a2adf 0%, #ff4090 100%)',
              },
            }}
          >
            Tạo Collection
          </Button>
        </DialogActions>
      </Dialog>

      {/* Crop Modal với type rectangle */}
      {cropOpen && rawImage && (
        <CropImageModal
          open={cropOpen}
          onClose={() => setCropOpen(false)}
          image={rawImage}
          onCropDone={handleCropDone}
          type="rectangle"
        />
      )}
    </>
  );
};

export default CreateCollectionModal;
