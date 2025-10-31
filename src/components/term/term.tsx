'use client';

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Stack,
  Divider,
  Grid,
  Button,
  IconButton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { TERMS_DATA, TermsSection } from './data/termsData';
import Link from 'next/link';

// ====================== COMPONENT ======================
export default function TermsSlidingPanel() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [prevIdx, setPrevIdx] = useState<number>(0);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelect = (newIdx: number) => {
    if (newIdx === selectedIdx) return;
    setPrevIdx(selectedIdx);
    setSelectedIdx(newIdx);
  };

  const direction = selectedIdx > prevIdx ? 'forward' : 'backward';

  const variants = {
    enterForward: { x: 300, opacity: 0 },
    enterBackward: { x: -300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exitForward: { x: -300, opacity: 0 },
    exitBackward: { x: 300, opacity: 0 },
  };

  const renderContent = (section: TermsSection) => {
    return (
      <Box>
        {/* === CHỈ HIỂN THỊ 1 LẦN === */}
        {section.id !== 1 && section.title && (
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-line',
              color: '#e0e0e0',
              mb: 3,
              fontWeight: 600,
              fontSize: '1.3rem',
              letterSpacing: '0.5px',
            }}
          >
            {section.title}
          </Typography>
        )}

        {section.explan && (
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-line',
              color: '#e0e0e0',
              mb: 6,
              fontWeight: 50,
              letterSpacing: '0.5px',
            }}
          >
            {section.explan}
          </Typography>
        )}

        {/* === MAP ITEMS === */}
        {section.data?.map((item, idx) => (
          <Box key={idx} sx={{ mb: 4 }}>
            {item.subtitle && (
              <Typography
                variant="h6"
                sx={{
                  // mb: -20,
                  // fontWeight: 700,
                  background: 'linear-gradient(to bottom, #60a5fa, #060137)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {item.subtitle}
              </Typography>
            )}

            <Divider sx={{ border: '0.5px solid #fff3', mb: 2 }} />

            {typeof item.content === 'string' ? (
              <Typography
                variant="body1"
                sx={{ whiteSpace: 'pre-line', color: '#e0e0e0', mb: 6 }}
              >
                {item.content}
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ whiteSpace: 'pre-line', color: '#e0e0e0' }}
                  >
                    &bull; Nội dung cần có:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#e0e0e0', ml: 3 }}>
                    {item.content.info.split('\n').map((line, index) => {
                      const trimmed = line.trim();
                      if (!trimmed) return null;
                      const isSubItem =
                        trimmed.startsWith('- ') || trimmed.startsWith('* ');
                      return (
                        <span
                          key={index}
                          style={{
                            display: 'block',
                            marginBottom: '0.4rem',
                            marginLeft: isSubItem ? '2rem' : 0,
                          }}
                        >
                          &bull; {isSubItem ? trimmed.slice(2) : trimmed}
                        </span>
                      );
                    })}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: '#bdbdbd', fontStyle: 'italic' }}
                >
                  &bull; Mục đích: {item.content.intent}
                </Typography>
              </Stack>
            )}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        // height: { xs: '285vh', md: '250vh' },
        mt: 8,
        px: 8,
        pb: 12,
        pt: 15,
        background:
          'linear-gradient(135deg, #080d1a 0%, #182e6f 40%, #45126d 100%)',
      }}
    >
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
        <IconButton
          onClick={() => setSidebarOpen(true)}
          sx={{
            borderRadius: '50%', // luôn tròn
            width: 50, // tăng kích thước
            height: 50,
            backgroundColor: '#6366f1',
            color: 'white',
            '&:hover': {
              backgroundColor: '#4f46e5',
            },
          }}
        >
          ☰
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        {/* Left menu */}
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{
            display: { xs: sidebarOpen ? 'block' : 'none', md: 'block' },
            position: { xs: 'fixed', md: 'static' },
            zIndex: 1200,
            top: { xs: 60, md: 0 },
            left: 0,
            height: { xs: '75vh', md: '100vh' },
            width: { xs: '80%', md: '20%' },
            p: 2,
          }}
        >
          <Paper
            sx={{
              height: '100%',
              overflowY: 'auto',
              borderRadius: 3,
              background: 'linear-gradient(100deg, #311784, #060137)',
              color: '#fff',
            }}
            elevation={3}
          >
            {/* Close button trên mobile */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'flex-end',
                mb: 2,
              }}
            >
              <Button onClick={() => setSidebarOpen(false)}>✕</Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 1, pl: 1, mt: 2 }}>
              Table of Contents
            </Typography>
            <List>
              {/* {TERMS_DATA.map((item, idx) => {
                const selected = idx === selectedIdx;
                
                // return (
                //   <ListItemButton
                //     key={item.id}
                //     selected={selected}
                //     onClick={() => {
                //       handleSelect(idx);
                //       setSidebarOpen(false); // ẩn menu khi chọn trên mobile
                //     }}
                //     sx={{
                //       mb: 0.5,
                //       borderRadius: 3,
                //       transition: 'all 0.3s ease',
                //       bgcolor: selected
                //         ? 'rgba(128, 90, 213, 0.1)'
                //         : 'transparent',
                //       '&:hover': {
                //         bgcolor: 'rgba(128, 90, 213, 0.08)',
                //       },
                //       px: 3,
                //     }}
                //   >
                //     <ListItemText
                //       primary={`${item.title}`}
                //       primaryTypographyProps={{
                //         sx: {
                //           color: selected ? '#6366f1' : 'rgb(255, 255, 255)',
                //           opacity: selected ? 1 : 0.7,
                //           transition: 'all 0.3s ease',
                //         },
                //       }}
                //     />
                //   </ListItemButton>
                // );

                if (item.id === 9 && item.content) {
          return (
            <Link key={item.id} href={item.content} passHref style={{ textDecoration: 'none' }}>
              <ListItemButton
                selected={selected}
                onClick={() => setSidebarOpen(false)}
                sx={{
                  mb: 0.5,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  bgcolor: selected ? 'rgba(128, 90, 213, 0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(128, 90, 213, 0.08)',
                  },
                  px: 3,
                }}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    sx: {
                      color: selected ? '#6366f1' : 'rgb(255, 255, 255)',
                      opacity: selected ? 1 : 0.7,
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          );
        }
              })} */}

              {TERMS_DATA.map((item, idx) => {
                const selected = idx === selectedIdx;

                const listItem = (
                  <ListItemButton
                    selected={selected}
                    onClick={() => {
                      if (item.id !== 9) handleSelect(idx); // chỉ highlight các mục khác
                      setSidebarOpen(false);
                    }}
                    sx={{
                      mb: 0.5,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      bgcolor: selected
                        ? 'rgba(128, 90, 213, 0.1)'
                        : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(128, 90, 213, 0.08)',
                      },
                      px: 3,
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        sx: {
                          color: selected ? '#6366f1' : 'rgb(255, 255, 255)',
                          opacity: selected ? 1 : 0.7,
                          transition: 'all 0.3s ease',
                        },
                      }}
                    />
                  </ListItemButton>
                );

                // Nếu là id 9 thì bọc Link
                if (item.id === 9 && item.content) {
                  return (
                    <Link
                      key={item.id}
                      href={item.content}
                      passHref
                      style={{ textDecoration: 'none' }}
                    >
                      {listItem}
                    </Link>
                  );
                }

                // Các id khác thì render bình thường
                return (
                  <React.Fragment key={item.id}>{listItem}</React.Fragment>
                );
              })}
            </List>
          </Paper>
        </Grid>

        {/* Right content panel */}
        {/* <Grid size={{ xs: 12, md: 9 }}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              color: 'white',
              pb: -1,
           height: 'auto',  // hoặc bỏ hoàn toàn
    width: '100%',
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              {TERMS_DATA[selectedIdx] && (
                <motion.div
                  key={TERMS_DATA[selectedIdx].id}
                  custom={direction}
                  initial={
                    direction === 'forward' ? 'enterForward' : 'enterBackward'
                  }
                  animate="center"
                  exit={
                    direction === 'forward' ? 'exitForward' : 'exitBackward'
                  }
                  variants={variants}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    padding: 24,
                  }}
                >
                  <Paper
                    sx={{
                      height: '100%',
                      p: 3,
                      overflowY: 'auto',
                      background: 'linear-gradient(100deg, #311784, #060137)',
                    }}
                    elevation={6}
                  >
                    {renderContent(TERMS_DATA[selectedIdx])}
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Grid> */}

        <Grid size={{ xs: 12, md: 9 }}>
          <Box sx={{ position: 'relative', width: '100%', color: 'white' }}>
            <AnimatePresence initial={false} custom={direction}>
              {TERMS_DATA[selectedIdx] && (
                <motion.div
                  key={TERMS_DATA[selectedIdx].id}
                  custom={direction}
                  initial={
                    direction === 'forward' ? 'enterForward' : 'enterBackward'
                  }
                  animate="center"
                  exit={
                    direction === 'forward' ? 'exitForward' : 'exitBackward'
                  }
                  variants={variants}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ width: '100%' }}
                  layout
                >
                  <Paper
                    sx={{
                      p: 3,
                      overflowY: 'auto', // scroll khi cần
                      background: 'linear-gradient(100deg, #311784, #060137)',
                    }}
                    elevation={6}
                  >
                    {renderContent(TERMS_DATA[selectedIdx])}
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
