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
import { TERMS_DATA, TermsSection } from './data/privacyData';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HardDriveDownload } from 'lucide-react';

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

  // ================= Export logic =================
  const handleExport = () => {
    const exportData = TERMS_DATA.map((section) => ({
      ID: section.id,
      Title: section.title,
      Explanation: section.explan || '',
      Items: section.data
        ?.map((item) => {
          if (typeof item.content === 'string') return item.content;
          if (typeof item.content === 'object') return item.content.info;
          return '';
        })
        .join('\n---\n'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Terms');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Apollo_Privacy_Terms.xlsx');
  };

  // ================= Auto-update Date =================
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
                  color: '#fff',
                }}
              >
                {item.subtitle}
              </Typography>
            )}

            <Divider sx={{ border: '0.5px solid #fff3', mb: 2 }} />

            {typeof item.content === 'string' ? (
              <Typography
                variant="body1"
                sx={{ whiteSpace: 'pre-line', color: '#fff6' }}
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

                      const isBullet =
                        trimmed.startsWith('- ') || trimmed.startsWith('* ');

                      return (
                        <span
                          key={index}
                          style={{
                            display: 'block',
                            marginBottom: '0.4rem',
                            marginLeft: isBullet ? '2rem' : 0,
                          }}
                        >
                          {isBullet ? `• ${trimmed.slice(2)}` : trimmed}
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
        px: 8,
        pb: 12,
        pt: 15,
        background: 'linear-gradient(95deg,#111827, #1E3A8A,#581C87)',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: '#111827',
          opacity: 0.5,
        },
      }}
    >
      <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          Privacy Policy
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#9ca3af',
            mb: 4,
            fontStyle: 'italic',
          }}
        >
          Last updated: {formattedDate}
        </Typography>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
        <IconButton
          onClick={() => setSidebarOpen(true)}
          sx={{
            position: 'relative',
            zIndex: 1,
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
            height: { xs: '92vh', sm: '62vh', md: '70vh' },
            width: { xs: '80%', md: '20%' },
            p: 1,
          }}
        >
          <Paper
            sx={{
              height: '100%',
              overflowY: 'auto',
              borderRadius: 3,
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(100deg, #311784, #060137)',
              color: '#fff',
              px: 2,
            }}
            elevation={3}
          >
            {/* Close button trên mobile */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'flex-end',
                pt: 1,
              }}
            >
              <Button onClick={() => setSidebarOpen(false)}>✕</Button>
            </Box>

            <Typography
              variant="h6"
              sx={{
                mb: 1,
                pl: 3,
                mt: 2,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' },
              }}
            >
              Table of Contents
            </Typography>
            <List>
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
                        // px: 4,
                      },
                      // px: 3,
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        sx: {
                          color: selected ? '#6366f1' : 'rgb(255, 255, 255)',
                          opacity: selected ? 1 : 0.7,
                          transition: 'all 0.3s ease',
                          fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.rem' },
                        },
                      }}
                    />
                  </ListItemButton>
                );

                // Nếu là id 9 thì bọc Link
                if (item.id === 7 && item.content) {
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
              <Button
                fullWidth
                variant="contained"
                onClick={handleExport}
                startIcon={<HardDriveDownload />} // 👈 Tự động căn trái và có khoảng cách
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(90deg,#5b5ce2,#7a3df6)',
                  },
                }}
              >
                Export to Spreadsheet
              </Button>
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              color: 'white',
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
                  style={{ width: '100%' }}
                  layout
                >
                  <Paper
                    sx={{
                      p: 4,
                      overflowY: 'auto', // scroll khi cần
                      background: 'linear-gradient(100deg, #311784, #060137)',
                      borderRadius: 3,
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
