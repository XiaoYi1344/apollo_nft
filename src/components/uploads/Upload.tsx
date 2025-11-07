'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Switch,
  // FormControlLabel,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { SelectChangeEvent } from '@mui/material/Select';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const Upload = () => {
  const [blockchain, setBlockchain] = useState('');

  const [freezeMetadata, setFreezeMetadata] = React.useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      console.log('Dropped file:', files[0]);
    }
  };

  const handleBlockchainChange = (e: SelectChangeEvent<string>) => {
    setBlockchain(e.target.value);
  };

  // const handleBlockchainChange = (e: SelectChangeEvent<string>) => {
  //   setBlockchain(e.target.value);
  // };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg,#12192b, #182858, #341a57)',
        color: '#fff',
        px: { xs: 3, md: 8 },
        pb: 5,
        pt:{xs:9, md: 8}
      }}
    >
      {/* HEADER */}
      <Stack spacing={1} mb={6}>
        <Typography
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #B235FF, #1C51FE)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '3.5rem' },
          }}
        >
          Load More
        </Typography>
        <Typography sx={{ color: '#8A91C5' }}>
          Bring your digital masterpiece to life on the blockchain.
        </Typography>
      </Stack>

      <Divider
        sx={{
          borderColor: '#fff3',
          borderBottomWidth: '0.25px', // 👈 mảnh hơn 0.5px
          mt: -3,
          mb: 5,
        }}
      />

      <Grid
        container
        spacing={6}
        justifyContent="center"
        sx={{
          maxWidth: '100%',
          mx: 'auto',
          alignItems: 'flex-start',
        }}
      >
        {/* LEFT SIDE: Upload box */}
        <Grid size={{ xs: 12, sm: 6 }}>
          {/* <Box
            sx={{
              border: '2px dashed #333860',
              borderRadius: 4,
              background:
                'linear-gradient(180deg, rgba(28,26,61,0.6) 0%, rgba(18,17,39,0.8) 100%)',
              p: 6,
              textAlign: 'center',
              color: '#C2C2C8',
            }}
          >
            <Button
              sx={{
                bgcolor: '#1C51FE',
                color: '#fff',
                borderRadius: '50%',
                width: 80,
                height: 80,
                mb: 2,
                '&:hover': { bgcolor: '#2E66FF' },
              }}
            >
              <FaCloudUploadAlt size={32} />
            </Button>

            <Typography sx={{ fontSize: '1.1rem', mb: 1 }}>
              Drag & drop file here
            </Typography>
            <Typography sx={{ color: '#8586A1', mb: 2 }}>
              or click to browse
            </Typography>
            <Button
              component="label"
              variant="contained"
              sx={{
                bgcolor: '#7B3FFE',
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: '#8A53FF' },
              }}
            >
              Choose File
              <VisuallyHiddenInput type="file" />
            </Button>
            <Typography sx={{ color: '#6F718D', fontSize: '0.9rem', mt: 2 }}>
              Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV
            </Typography>
          </Box> */}

          <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              border: isDragging ? '2px solid #1C51FE' : '2px dashed #333860',
              borderRadius: 4,
              background:
                'linear-gradient(180deg, rgba(28,26,61,0.6) 0%, rgba(18,17,39,0.8) 100%)',
              p: 6,
              textAlign: 'center',
              color: '#C2C2C8',
              transition: 'border 0.2s ease',
            }}
          >
            <Button
              sx={{
                bgcolor: '#161B44',
                color: '#01FFCA',
                borderRadius: '50%',
                width: 80,
                height: 80,
                mb: 2,
                '&:hover': { bgcolor: '#2E66FF' },
              }}
            >
              <FaCloudUploadAlt size={38} />
            </Button>

            <Typography sx={{ fontSize: '1.1rem', mb: 1 }}>
              {isDragging ? 'Drop file to upload' : 'Drag & drop file here'}
            </Typography>
            <Typography sx={{ color: '#8586A1', mb: 2 }}>
              or click to browse
            </Typography>

            <Button
              component="label"
              variant="contained"
              sx={{
                // bgcolor: '#7B3FFE',
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
                '&:hover': { bgcolor: '#8A53FF' },
              }}
            >
              Choose File
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setFileName(e.target.files[0].name);
                    console.log('Selected file:', e.target.files[0]);
                  }
                }}
              />
            </Button>

            <Typography sx={{ color: '#6F718D', fontSize: '0.9rem', mt: 2 }}>
              {fileName
                ? `Selected: ${fileName}`
                : 'Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV'}
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT SIDE: Form */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={3}>
            {/* DETAILS */}
            <Typography
              sx={{
                color: '#00FFC6',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {'// DETAILS'}
            </Typography>

            <TextField
              required
              id="nft-name"
              label="Name"
              placeholder="Enter item name"
              helperText="This will be displayed as the title of your NFT"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiInput-root': {
                  color: '#FFF',
                  '&:before': { borderBottomColor: '#3b3f6d' },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#6a75ff',
                  },
                  '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                },
                '& .MuiInput-input': {
                  color: '#ADAEBC',
                  fontSize: '1.0rem',
                  '::placeholder': {
                    color: '#FFF',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFF',
                  fontSize: '1.0rem',
                  transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
                  '&.Mui-focused': {
                    color: '#FFF',
                    transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#8A91C5',
                  fontSize: '0.8rem',
                  mt: 0.5,
                },
              }}
            />

            <TextField
              required
              id="nft-external-link"
              label="External Link"
              placeholder="https://yoursite.io/item/123"
              helperText="Link to your website, portfolio, or social media"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiInput-root': {
                  color: '#FFF',
                  '&:before': { borderBottomColor: '#3b3f6d' },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#6a75ff',
                  },
                  '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                },
                '& .MuiInput-input': {
                  color: '#ADAEBC',
                  fontSize: '1rem',
                  '::placeholder': {
                    color: '#FFF',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFF',
                  fontSize: '1rem',
                  transform: 'translate(0, -15px) scale(1)', // ✅ đặt thấp xuống để label hiện
                  transformOrigin: 'top left',
                  '&.Mui-focused': {
                    color: '#FFF',
                    transform: 'translate(0, -18px) scale(0.8)', // ✅ bay lên nhẹ khi focus
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#8A91C5',
                  fontSize: '0.8rem',
                  mt: 0.5,
                },
              }}
            />

            <TextField
              required
              id="nft-description"
              label="Description"
              placeholder="Provide a detailed description of your item"
              multiline
              minRows={4.5}
              helperText="The description will be incloded on the item's detail page"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiInput-root': {
                  color: '#FFF',
                  '&:before': { borderBottomColor: '#3b3f6d' },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#6a75ff',
                  },
                  '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                },
                '& .MuiInput-input': {
                  color: '#ADAEBC',
                  fontSize: '1.0rem',
                  '::placeholder': {
                    color: '#FFF',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFF',
                  fontSize: '1.0rem',
                  transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
                  '&.Mui-focused': {
                    color: '#FFF',
                    transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#8A91C5',
                  fontSize: '0.8rem',
                  mt: 0.5,
                },
              }}
            />

            {/* PROPERTIES */}
            <Typography
              sx={{
                color: '#00FFC6',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {'// PROPERTIES'}
            </Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                id="nft-type"
                label="Type"
                variant="standard"
                fullWidth
                sx={{
                  '& .MuiInput-root': {
                    color: '#FFF',
                    '&:before': { borderBottomColor: '#3b3f6d' },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: '#6a75ff',
                    },
                    '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#ADAEBC',
                    fontSize: '1rem',
                    '&.Mui-focused': {
                      color: '#FFF',
                      transform: 'translate(0, -5px) scale(0.8)', // ✅ bay lên nhẹ khi focus
                    },
                  },
                }}
              />

              <TextField
                id="nft-name-type"
                label="Name"
                variant="standard"
                fullWidth
                sx={{
                  '& .MuiInput-root': {
                    color: '#FFF',
                    '&:before': { borderBottomColor: '#3b3f6d' },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: '#6a75ff',
                    },
                    '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#ADAEBC',
                    fontSize: '1rem',
                    '&.Mui-focused': {
                      color: '#FFF',
                      transform: 'translate(0, -5px) scale(0.8)', // ✅ bay lên nhẹ khi focus
                    },
                  },
                }}
              />
            </Stack>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
                color: '#FFF',
                fontWeight: 700,
                borderRadius: 3,
                textTransform: 'none',
                alignSelf: 'flex-start',
                '&:hover': { bgcolor: '#0DFFC6' },
              }}
            >
              + ADD PROPERTY
            </Button>

            {/* SUPPLY & BLOCKCHAIN */}
            <Typography
              sx={{
                color: '#00FFC6',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {'// SUPPLY & BLOCKCHAIN'}
            </Typography>

            <TextField
              required
              id="nft-supply"
              label="Supply"
              placeholder="1"
              helperText="The number of items that can be minted"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiInput-root': {
                  color: '#FFF',
                  '&:before': { borderBottomColor: '#3b3f6d' },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#6a75ff',
                  },
                  '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                },
                '& .MuiInput-input': {
                  color: '#FFF',
                  fontSize: '1.0rem',
                  '::placeholder': {
                    color: '#FFF',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFF',
                  fontSize: '1.0rem',
                  transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
                  '&.Mui-focused': {
                    color: '#FFF',
                    transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#8A91C5',
                  fontSize: '0.8rem',
                  mt: 0.5,
                },
              }}
            />

            <Box>
              <InputLabel
                id="blockchain-label"
                sx={{
                  color: '#B3B3C2',
                  mb: 1,
                  fontSize: '1rem',
                }}
              >
                Blockchain
              </InputLabel>

              <Select
                labelId="blockchain-label"
                value={blockchain}
                onChange={handleBlockchainChange}
                fullWidth
                displayEmpty
                sx={{
                  bgcolor: '#181B3A',
                  color: '#fff',
                  borderRadius: 2,
                  height: 48,
                  '.MuiSelect-icon': {
                    color: '#B3B3C2',
                  },
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&:hover': {
                    bgcolor: '#1E2146',
                  },
                }}
              >
                <MenuItem disabled value="">
                  Select blockchain
                </MenuItem>
                <MenuItem value="Ethereum">Ethereum</MenuItem>
                <MenuItem value="Polygon">Polygon</MenuItem>
                <MenuItem value="Solana">Solana</MenuItem>
              </Select>

              <FormHelperText sx={{ color: '#8A91C5', mt: 0.5 }}>
                The blockchain your item will be minted on
              </FormHelperText>
            </Box>

            <FormControl
              component="fieldset"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // gap: '1px',
                // background: 'rgba(32, 22, 61, 0.6)',
                padding: '5px',
                borderRadius: '12px',
                // border: '1px solid #2a2350',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                  Freeze Metadata
                </Typography>

                <Switch
                  checked={freezeMetadata}
                  onChange={(e) => setFreezeMetadata(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-thumb': { bgcolor: '#00FFC6' },
                    '& .MuiSwitch-track': { bgcolor: '#3C3F72' },
                  }}
                />
              </Box>

              <Typography sx={{ fontSize: '14px', color: '#9BA0C8' }}>
                Prevent metadata from being changed after minting
              </Typography>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      {/* CREATE BUTTON */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 8,
          py: 1.3,
          background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
          fontWeight: 700,
          fontSize: '1rem',
          borderRadius: 3,
          textTransform: 'none',
          '&:hover': { bgcolor: '#8A53FF' },
          width: {xs:'50%', sm:'30%', md:'15%'},
          mr: 'auto',
          ml: {xs:'25%', sm:'35%', md:'43%'},
          mb: -3,
        }}
      >
        CREATE ITEM
      </Button>
    </Box>
  );
};

export default Upload;
