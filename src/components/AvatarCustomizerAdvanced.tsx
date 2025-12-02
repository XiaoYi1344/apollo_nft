'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Slider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage'; // dùng code getCroppedImg từ trước
import Image from 'next/image';

// Frame sample
const avatarFrames = [
  '/frames/frame1.png',
  '/frames/frame2.png',
  '/frames/frame3.png',
  '/frames/frame4.png',
  '/frames/frame5.png',
  '/frames/frame6.png',
  '/frames/frame7.png',
];

// Avatar mặc định
const defaultAvatar = '/avatar.png';

export default function AvatarCustomizerFinal() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState<string>(defaultAvatar);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);

  // Crop states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Xác định kích thước Box dựa vào frame hiện tại
  const boxSize = currentFrame <= 1 ? 295 : 240;
  const avatarSize = currentFrame <= 1 ? 170 : 180;
 // avatar nhỏ hơn frame khoảng 120px

  // Upload avatar
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTempImage(URL.createObjectURL(file));
    setCropModalOpen(true);
  };

  const onCropComplete = useCallback((_area: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = useCallback(async () => {
    if (!croppedAreaPixels || !tempImage) return;
    const croppedFile = await getCroppedImg(
      tempImage,
      croppedAreaPixels,
      'avatar',
    );
    const url = URL.createObjectURL(croppedFile);
    setAvatarPreview(url);
    setCropModalOpen(false);
    setTempImage(null);
  }, [croppedAreaPixels, tempImage]);

  const handleReset = () => {
    setAvatarPreview(defaultAvatar);
    setCurrentFrame(0);
  };

  return (
    <Stack spacing={4} alignItems="center" sx={{ mt: 6 }}>
      <Typography variant="h5">Avatar Customizer Final</Typography>

      {/* Avatar + Frame */}

      <Box
        sx={{
          position: 'relative',
          width: boxSize,
          height: boxSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Avatar */}
        <Image
          src={avatarPreview}
          alt="avatar"
          width={avatarSize}
          height={avatarSize}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />

        {/* Frame */}
        <Image
          src={avatarFrames[currentFrame]}
          alt="frame"
          width={boxSize}
          height={boxSize}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Chọn frame */}
      <Stack direction="row" spacing={1}>
        {avatarFrames.map((_, idx) => (
          <Button
            key={idx}
            variant={currentFrame === idx ? 'contained' : 'outlined'}
            onClick={() => setCurrentFrame(idx)}
            size="small"
          >
            {idx + 1}
          </Button>
        ))}
      </Stack>

      {/* Upload + Reset */}
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" component="label">
          Upload Avatar
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Stack>

      {/* Crop Modal */}
      <Dialog
        open={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Crop Avatar</DialogTitle>
        <DialogContent sx={{ height: 400, position: 'relative' }}>
          {tempImage && (
            <Cropper
              image={tempImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="round"
              showGrid
            />
          )}
          <Stack sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
              Zoom
            </Typography>
            <Slider
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(_, v) => setZoom(v as number)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCropModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCropSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
