'use client';

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';

interface Props {
  open: boolean;
  onClose: () => void;
  image: string;
  onCropDone: (file: File) => void;
  type?: 'avatar' | 'background' | 'rectangle';
}

export default function CropImageModal({
  open,
  onClose,
  image,
  onCropDone,
  type = 'avatar',
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // thêm rotation
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const aspect = (() => {
    switch (type) {
      case 'avatar':
        return 1 / 1;
      case 'background':
        return 3 / 1;
      case 'rectangle':
        return 3 / 2;
      default:
        return 1 / 1;
    }
  })();

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropSave = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedFile = await getCroppedImg(image, croppedAreaPixels, type, rotation);
      onCropDone(croppedFile);
    } catch (err) {
      console.error(err);
    }
  }, [croppedAreaPixels, image, onCropDone, type, rotation]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 20, textAlign: 'center' }}>
        Crop {type === 'avatar' ? 'Avatar' : type === 'background' ? 'Banner' : 'Rectangle'} Image
      </DialogTitle>

      <DialogContent
        sx={{
          position: 'relative',
          height: 400,
          background: '#1e1e1e',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation} // truyền rotation
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          cropShape={type === 'avatar' ? 'round' : 'rect'}
          showGrid={true}
        />
      </DialogContent>

      <Box sx={{ px: 4, py: 2 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1, textAlign: 'center' }}>
              Zoom
            </Typography>
            <Slider
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(_, value) => setZoom(value as number)}
              sx={{
                '& .MuiSlider-thumb': { bgcolor: '#7a3bff', border: '2px solid #fff' },
                '& .MuiSlider-track': { bgcolor: '#7a3bff' },
                '& .MuiSlider-rail': { bgcolor: '#555' },
              }}
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1, textAlign: 'center' }}>
              Rotation
            </Typography>
            <Slider
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(_, value) => setRotation(value as number)}
              sx={{
                '& .MuiSlider-thumb': { bgcolor: '#7a3bff', border: '2px solid #fff' },
                '& .MuiSlider-track': { bgcolor: '#7a3bff' },
                '& .MuiSlider-rail': { bgcolor: '#555' },
              }}
            />
          </Box>
        </Stack>
      </Box>

      <DialogActions sx={{ px: 4, pb: 3, justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            color: '#fff',
            bgcolor: '#333',
            '&:hover': { bgcolor: '#444' },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCropSave}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #7a3bff 0%, #ff5ca2 100%)',
            color: '#fff',
            px: 4,
            py: 1.2,
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(122,59,255,0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #6a2adf 0%, #ff4090 100%)',
              boxShadow: '0px 6px 16px rgba(122,59,255,0.6)',
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
