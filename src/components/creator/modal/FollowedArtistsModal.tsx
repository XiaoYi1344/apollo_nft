// components/FollowedArtistsModal.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useFollowedArtists } from '@/hooks/useFollowedArtists';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FollowedArtistsModal: React.FC<Props> = ({ open, onClose }) => {
  const { data: artists = [], isLoading } = useFollowedArtists();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Following Artists</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {artists.map((artist) => (
              <ListItem key={artist.id}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      artist.avatar
                        ? `${process.env.NEXT_PUBLIC_API}/api/upload/${artist.avatar}`
                        : undefined
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={artist.fullName}
                  secondary={`@${artist.userName}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowedArtistsModal;
