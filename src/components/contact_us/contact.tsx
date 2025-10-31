'use client';

import React from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

const countries = [
  { code: 'US', label: 'United States', flag: '🇺🇸' },
  { code: 'VN', label: 'Vietnam', flag: '🇻🇳' },
  { code: 'JP', label: 'Japan', flag: '🇯🇵' },
  // thêm các quốc gia khác
];

const ContactPage = () => {
  return (
    <Stack
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #080d1a 0%, #45126d 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* === Glow Effect === */}
      <Box
        className="glow"
        sx={{
          position: 'absolute',
          top: 'var(--glow-top, 14%)',
          left: 'var(--glow-left, -29%)',
          width: 'var(--glow-size, 650px)',
          height: 'var(--glow-size, 1000px)',
          background: `radial-gradient(circle at center,
            var(--glow-color1, rgba(190,74,255,0.7)) 0%,
            var(--glow-color2, rgba(45,161,255,0.1)) 70%)`,
          filter: 'blur(var(--glow-blur, 100px))',
          opacity: 'var(--glow-opacity, 1)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      {/* === Banner Section === */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 280, md: 400 },
        }}
      >
        <Image
  src="/contact/contact.jpg"
  alt="Contact Banner"
  width={1518}
  height={567}
  style={{
    objectFit: 'cover',
    filter: 'brightness(0.8) ', // giảm sáng + làm mờ nhẹ
  }}
/>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '140%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // background: 'rgba(0,0,0,0.4)',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize:"4.3rem",
              textShadow: '0 0 15px rgba(255,255,255,0.6)',
            }}
          >
            Contact Us
          </Typography>
        </Box>
      </Box>

      {/* === Welcome Message === */}
      <Box
        sx={{
          textAlign: 'center',
          py: 2.5,
          backgroundColor: '#070c2b',
          mx: 'auto',
          mt: 27,
          borderRadius: '12px',
          width: 'fit-content',
          px: 10,
        }}
      >
        <Typography sx={{ color: '#fff', fontWeight: 600 }}>
          Welcome to our Contact Us page!
        </Typography>
      </Box>

      {/* === Contact Form Section === */}
      <Grid
        container
        spacing={4}
        sx={{
          mt: 13,
          mb: 10,
          px: { xs: 2, md: 10 },
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        {/* Left - Contact Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={4}
            sx={{
              backgroundColor: '#0d113a',
              color: '#fff',
              borderRadius: '16px',
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, fontSize:"2.3rem" }}>
              Contact
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                placeholder="Name*"
                required
                variant="standard"
                InputProps={{
                  startAdornment: <PersonIcon sx={{ color: '#ccc', mr: 1, ml: 1.7 }} />,
                }}
                sx={{
                  '& .MuiInput-root': {
                    color: '#fff',
                    '&:before': { borderBottomColor: '#3b3f6d' },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: '#6a75ff',
                    },
                    '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                  },
                  '& .MuiInput-input::placeholder': { color: '#ccc' },
                }}
              />
              <TextField
                fullWidth
                placeholder="Email Address*"
                required
                variant="standard"
                InputProps={{
                  startAdornment: <MailIcon sx={{ color: '#ccc', mr: 1, ml: 1.7 }} />,
                }}
                sx={{
                  '& .MuiInput-root': {
                    color: '#fff',
                    '&:before': { borderBottomColor: '#3b3f6d' },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: '#6a75ff',
                    },
                    '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                  },
                  '& .MuiInput-input::placeholder': { color: '#ccc' },
                }}
              />
              <TextField
                fullWidth
                placeholder="Phone Number"
                variant="standard"
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ color: '#ccc', mr: 1, ml: 1.7 }} />,
                }}
                sx={{
                  '& .MuiInput-root': {
                    color: '#fff',
                    '&:before': { borderBottomColor: '#3b3f6d' },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: '#6a75ff',
                    },
                    '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                  },
                  '& .MuiInput-input::placeholder': { color: '#ccc' },
                }}
              />

              <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <span>{option.flag}</span>
                    <Typography>{option.label}</Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Country"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PublicIcon sx={{ color: '#ccc', ml: 1.7 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ position: 'relative', left: -7 }}
                        >
                          <ArrowDropDownIcon sx={{ color: '#fff' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiInput-root': {
                        color: '#fff',
                        '&:before': { borderBottomColor: '#3b3f6d' },
                        '&:hover:not(.Mui-disabled):before': {
                          borderBottomColor: '#6a75ff',
                        },
                        '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                      },
                      '& .MuiInput-input::placeholder': { color: '#ccc' },
                    }}
                  />
                )}
              />

              <TextField
                fullWidth
                placeholder="Details of your Enquiry / Comments"
                variant="outlined"
                multiline  
                rows={4}
                InputProps={{
                  startAdornment: (
                    <ModeCommentIcon sx={{ color: '#ccc', mr: 1, mt: -8 }} />
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#ccc', // label bình thường
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#fff', // label khi focus
                  },
                  '& .MuiOutlinedInput-root': {
                    color: '#fff', // text nhập
                    '& fieldset': {
                      borderColor: '#3b3f6d', // viền bình thường
                    },
                    '&:hover fieldset': {
                      borderColor: '#6a75ff', // viền khi hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8c9eff', // viền khi focus
                    },
                  },
                }}
              />
              <Typography sx={{ color: '#ccc'}}>* - Required fields</Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: '30px',
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  background:
                    'linear-gradient(90deg, #4b6aff 0%, #c86bfa 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(90deg, #6a75ff 0%, #e68dfa 100%)',
                  },
                }}
              >
                Submit
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Right - Illustration */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Image
            src="/contact/contact_icon.png" // 👉 thay bằng ảnh minh họa bạn tải lên
            alt="Support Illustration"
            width={499}
            height={514}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ContactPage;
