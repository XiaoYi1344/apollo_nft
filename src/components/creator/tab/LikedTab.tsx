import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NftDetail, ArtistDetail } from '@/types/like';
import Image from 'next/image';

interface LikedTabProps {
  likedNFTs: NftDetail[];
  likedArtists: ArtistDetail[];
}

const LikedTab: React.FC<LikedTabProps> = ({ likedNFTs, likedArtists }) => {
  return (
    <Stack spacing={3} sx={{ width: '100%', px: 4 }}>
      {/* NFT Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Liked NFTs ({likedNFTs.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {likedNFTs.map((nft) => (
              <Grid key={nft.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.03)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 0 20px rgba(0,0,0,0.4)',
                  }}
                >
                  <CardMedia
                    component="img"
                    height={250}
                    image={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
                    alt={nft.name}
                  />
                  <CardContent>
                    <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                      {nft.name}
                    </Typography>
                    <Typography sx={{ color: '#b78eff' }}>
                      Likes: {nft.likeCount} | {nft.isLike ? 'Liked' : 'Not liked'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Artist Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Liked Artists ({likedArtists.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {likedArtists.map((artist) => (
              <Grid key={artist.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.03)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 0 20px rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: 80, height: 80, mr: 2, position: 'relative' }}>
                    <Image
                      src={artist.avatar}
                      alt={artist.fullName}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                      {artist.fullName}
                    </Typography>
                    <Typography sx={{ color: '#b78eff' }}>
                      Likes: {artist.likeCount} | {artist.isLike ? 'Liked' : 'Not liked'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default LikedTab;
