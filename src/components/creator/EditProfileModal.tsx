'use client';

import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { UpdateUserPayload, UserProfile } from '@/types/user';
import { useUpdateUser, useUpdateUserBackground } from '@/hooks/useUser';
import CropImageModal from './CropImageModal';

interface Props {
  open: boolean;
  onClose: () => void;
  user: UserProfile;
}

export default function EditProfileModal({ open, onClose, user }: Props) {
  const { register, handleSubmit } = useForm<UpdateUserPayload>({
    defaultValues: {
      fullName: user.fullName,
      userName: user.userName,
      bio: user.bio,
    },
  });

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatar ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}` : null,
  );
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

  // Banner state
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    user.background ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}` : null,
  );
  const [bannerFile, setBannerFile] = useState<File | undefined>(undefined);

  // Crop modal
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [cropType, setCropType] = useState<'avatar' | 'background'>('avatar');

  const updateUser = useUpdateUser();
const updateUserBackground = useUpdateUserBackground();

  // Open crop modal for avatar
  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setTempImage(URL.createObjectURL(f));
    setCropType('avatar');
    setCropModalOpen(true);
  };

  // Open crop modal for banner
  const handleBannerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setTempImage(URL.createObjectURL(f));
    setCropType('background');
    setCropModalOpen(true);
  };

  // Receive cropped file
  const handleCropped = (croppedFile: File) => {
    if (cropType === 'avatar') {
      setAvatarFile(croppedFile);
      setAvatarPreview(URL.createObjectURL(croppedFile));
    } else {
      setBannerFile(croppedFile);
      setBannerPreview(URL.createObjectURL(croppedFile));
    }
    setCropModalOpen(false);
  };

  // Submit
  const onSubmit = (data: UpdateUserPayload) => {
  // Nếu có bannerFile mới → update banner riêng
  if (bannerFile) {
    updateUserBackground.mutate(
      { image: bannerFile },
      { onSuccess: () => onClose() }
    );
  }

  // Nếu có avatarFile hoặc các field text → update user
  if (avatarFile || data.fullName || data.userName || data.bio) {
    updateUser.mutate(
      { ...data, avatar: avatarFile },
      { onSuccess: () => onClose() }
    );
  }
};


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Banner Section */}
        <Stack direction="column" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Avatar
            key={bannerPreview || tempImage}
            src={bannerPreview || tempImage || '/banner-default.png'}
            variant="square"
            sx={{ width: '100%', height: 180 }}
          />
          <Button component="label" variant="outlined">
            Change Banner
            <input type="file" hidden accept="image/*" onChange={handleBannerFile} />
          </Button>
        </Stack>

        {/* Avatar Section */}
        <Stack direction="column" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Avatar
            key={avatarPreview || tempImage}
            src={avatarPreview || tempImage || '/avatar-default.png'}
            sx={{ width: 110, height: 110 }}
          />
          <Button component="label" variant="outlined">
            Change Avatar
            <input type="file" hidden accept="image/*" onChange={handleAvatarFile} />
          </Button>
        </Stack>

        {/* Full Name */}
        <TextField
          label="Full Name"
          fullWidth
          sx={{ mt: 2 }}
          {...register('fullName')}
        />

        {/* Username */}
        <TextField
          label="Username"
          fullWidth
          sx={{ mt: 2 }}
          {...register('userName')}
        />

        {/* Bio */}
        <TextField
          label="Bio"
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
          {...register('bio')}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={updateUser.isPending}
        >
          Save
        </Button>
      </DialogActions>

      {/* Crop Modal */}
      {cropModalOpen && tempImage && (
        <CropImageModal
          open={cropModalOpen}
          onClose={() => setCropModalOpen(false)}
          image={tempImage}
          onCropDone={handleCropped}
          type={cropType} // avatar | background
        />
      )}
    </Dialog>
  );
}
