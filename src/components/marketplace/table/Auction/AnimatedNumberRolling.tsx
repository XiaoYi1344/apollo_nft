// components/nft/detail/Auction/AnimatedNumberRolling.tsx
"use client";

import React from "react";
import { Box } from "@mui/material";
import AnimatedDigitCounter from "./AnimatedDigitCounter";

interface AnimatedNumberRollingProps {
  number: number;      // Số muốn hiển thị (0–99, 0–999… tuỳ pad)
  duration?: number;    // Thời gian animation (giây)
  padLength?: number;   // Số chữ số muốn hiển thị, default = 2
}

// Padding số thành chuỗi cố định
const padNumber = (num: number, length: number) => {
  return num.toString().padStart(length, "0");
};

const AnimatedNumberRolling: React.FC<AnimatedNumberRollingProps> = ({
  number,
  duration = 0.4,
  padLength = 2,
}) => {
  const digits = padNumber(number, padLength)
    .split("")
    .map(Number);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {digits.map((digit, idx) => (
        <AnimatedDigitCounter key={idx} value={digit} duration={duration} />
      ))}
    </Box>
  );
};

export default AnimatedNumberRolling;
