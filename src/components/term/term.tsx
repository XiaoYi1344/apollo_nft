'use client';

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// ====================== DATA ======================
const TERMS_DATA = [
  {
    id: 1,
    title: 'Introduction',
    content: `Welcome to Apollo NFT. This section is a placeholder. Replace with your real Terms text.`,
  },
  {
    id: 2,
    title: 'Account and Wallet',
    content: `
2. Account and Wallet

Mục tiêu chính: Làm rõ rằng "tài khoản" trên nền tảng chính là "ví điện tử" của người dùng, và mọi trách nhiệm bảo mật liên quan đến ví đó hoàn toàn thuộc về người dùng, không thuộc về nền tảng.

2.1. Tạo Tài khoản (Account Creation)

- Để sử dụng các tính năng của Apollo NFT, người dùng phải kết nối một ví điện tử của bên thứ ba được hỗ trợ (ví dụ: MetaMask, Coinbase Wallet).
- "Tài khoản" trên Apollo NFT được liên kết trực tiếp và định danh bởi địa chỉ ví công khai (public wallet address).
- Không có quy trình đăng ký bằng email/mật khẩu truyền thống. Việc kết nối ví đồng nghĩa với việc tạo một tài khoản.

Mục đích: Giúp người dùng mới hiểu rõ cơ chế hoạt động của Web3, phân biệt rõ ràng với các nền tảng Web2 truyền thống.

2.2. Ví của Bên Thứ Ba (Third-Party Wallets)

- Apollo NFT không sở hữu, kiểm soát hay chịu trách nhiệm về bất kỳ ví điện tử nào của bên thứ ba.
- Nền tảng chỉ cung cấp giao diện để tương tác; mọi giao dịch đều do người dùng ký và xác nhận qua nhà cung cấp ví.
- Apollo NFT miễn trừ trách nhiệm đối với lỗi, lỗ hổng bảo mật hay tổn thất phát sinh từ phần mềm ví của bên thứ ba.

Mục đích: Vạch ra ranh giới trách nhiệm pháp lý rõ ràng.

2.3. Trách nhiệm Bảo mật của Bạn (Your Security Responsibilities)

- Bạn là người duy nhất chịu trách nhiệm về việc bảo mật ví của mình.
- Trách nhiệm bao gồm:
  • Bảo vệ an toàn cho các thiết bị truy cập ví.
  • Giữ bí mật tuyệt đối khóa riêng tư (private keys) và cụm từ khôi phục (seed phrase).
  • Không chia sẻ khóa riêng tư hoặc seed phrase — Apollo NFT sẽ không bao giờ yêu cầu bạn cung cấp chúng.
- Người dùng chấp nhận mọi rủi ro nếu thông tin bảo mật bị lộ.
- Apollo NFT miễn trừ hoàn toàn trách nhiệm đối với bất kỳ tổn thất tài sản nào do ví bị xâm phạm.

Mục đích: Giáo dục người dùng và bảo vệ nền tảng khỏi khiếu nại.

2.4. Hoạt động Tài khoản (Account Activity)

- Người dùng chịu trách nhiệm cho mọi hoạt động diễn ra từ ví của họ (mua, bán, niêm yết, tương tác hợp đồng).
- Mọi giao dịch đã được ký bởi ví được coi là hành động hợp lệ của người dùng.

2.5. Tạm ngưng hoặc Chấm dứt (Suspension or Termination)

- Apollo NFT có quyền tạm ngưng hoặc cấm vĩnh viễn quyền truy cập đối với tài khoản vi phạm Điều khoản Dịch vụ (ví dụ: rửa tiền, nội dung bất hợp pháp, vi phạm bản quyền).
- Mục đích: Duy trì môi trường hoạt động lành mạnh và an toàn.
    `,
  },
  {
    id: 3,
    title: 'Fees, Payments, and Transactions',
    content: 'Placeholder for Content & IP. Replace with your real terms.',
  },
  {
    id: 4,
    title: 'Intellectual Property Rights',
    content: 'Placeholder for Transactions section.',
  },
  {
    id: 5,
    title: 'User Conduct',
    content: 'Placeholder for Fees & Payments.',
  },
  {
    id: 6,
    title: 'Disclaimers',
    content: 'Placeholder for Contact information.',
  },
    {
    id: 7,
    title: 'Linitation of Liability',
    content: 'Placeholder for Contact information.',
  },
    {
    id: 8,
    title: 'Governing Law',
    content: 'Placeholder for Contact information.',
  },
    {
    id: 9,
    title: 'Contract Us',
    content: 'Placeholder for Contact information.',
  },
];

// ====================== COMPONENT ======================
export default function TermsSlidingPanel() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [prevIdx, setPrevIdx] = useState<number>(0);

  const handleSelect = (newIdx: number) => {
    if (newIdx === selectedIdx) return;
    setPrevIdx(selectedIdx);
    setSelectedIdx(newIdx);
  };

  const getDirection = (
    current: number,
    previous: number,
  ): 'forward' | 'backward' => (current > previous ? 'forward' : 'backward');

  const direction = getDirection(selectedIdx, prevIdx);

  const variants = {
    enterForward: { x: 300, opacity: 0 },
    enterBackward: { x: -300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exitForward: { x: -300, opacity: 0 },
    exitBackward: { x: 300, opacity: 0 },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        height: '290vh',
        background:
          'linear-gradient(135deg, #080d1a 0%, #182e6f 40%, #45126d 100%)',
          mt: 8,
          px: 8,
          pb:8,
          pt: 15
      }}
    >
      {/* Left menu */}
      <Paper
        sx={{
          width: 290,
          p: 1,
          background:
            'linear-gradient(100deg, #311784, #060137)',
          color: 'white',
          borderRadius: 3,
          height: '26%',
        }}
        elevation={3}
      >
        <Typography variant="h6" sx={{ mb: 1, pl: 1, mt: 2 }}>
          Table of Contents
        </Typography>
        <List>
          {TERMS_DATA.map((item, idx) => {
            const selected = idx === selectedIdx;
            return (
              <ListItemButton
                key={item.id}
                selected={selected}
                onClick={() => handleSelect(idx)}
                sx={{
                  mb: 0.5,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  bgcolor: selected ? 'rgba(128, 90, 213, 0.1)' : 'transparent', // nền nhẹ khi chọn
                  '&:hover': {
                    bgcolor: 'rgba(128, 90, 213, 0.08)', // tím nhạt khi hover
                  },
                  px: 3
                }}
              >
                <ListItemText
                  primary={`${item.id}. ${item.title}`}
                  primaryTypographyProps={{
                    sx: {
                      color: selected ? '#6366f1' : 'rgb(255, 255, 255)',
                      opacity: selected ? 1 : 0.5,
                    //   fontWeight: selected ? 600 : 400,
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>

      {/* Right content panel */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={TERMS_DATA[selectedIdx].id}
            custom={direction}
            initial={direction === 'forward' ? 'enterForward' : 'enterBackward'}
            animate="center"
            exit={direction === 'forward' ? 'exitForward' : 'exitBackward'}
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
              sx={{ height: '100%', p: 3, overflowY: 'auto' }}
              elevation={6}
            >
              <Typography variant="h4" gutterBottom>
                {TERMS_DATA[selectedIdx].title}
              </Typography>

              <Typography
                variant="body1"
                component="div"
                sx={{ whiteSpace: 'pre-line' }}
              >
                {TERMS_DATA[selectedIdx].content}
              </Typography>
            </Paper>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
