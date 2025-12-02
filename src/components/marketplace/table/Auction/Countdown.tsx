// components/nft/detail/Auction/AnimatedNFTCountdown.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, keyframes } from "@mui/material";
import AnimatedNumberRolling from "./AnimatedNumberRolling";

// Glow animation khi còn <1 phút
const glow = keyframes`
  0% { text-shadow: 0 0 5px #ff33cc, 0 0 10px #ff33cc; }
  50% { text-shadow: 0 0 20px #ff33cc, 0 0 40px #ff33cc; }
  100% { text-shadow: 0 0 5px #ff33cc, 0 0 10px #ff33cc; }
`;

type AnimatedNFTCountdownProps = {
  endTime?: string | null;
};

export default function AnimatedNFTCountdown({ endTime }: AnimatedNFTCountdownProps) {
  const [timeLeftSec, setTimeLeftSec] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      if (!endTime) return setTimeLeftSec(0);
      const end =
        Number(endTime) > 1e10
          ? Number(endTime) // ms
          : Number(endTime) * 1000; // seconds → ms
      const diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setTimeLeftSec(diff);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeftSec <= 0)
    return <Typography sx={{ color: "#ff33cc", fontWeight: 700 }}>Ended</Typography>;

  const days = Math.floor(timeLeftSec / 86400);
  const hours = Math.floor((timeLeftSec % 86400) / 3600);
  const minutes = Math.floor((timeLeftSec % 3600) / 60);
  const seconds = timeLeftSec % 60;

  const isCritical = timeLeftSec <= 60;
  const glowStyle = isCritical
    ? { animation: `${glow} 1s infinite` }
    : {};

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        alignItems: "center",
        bgcolor: "rgba(10,10,30,0.6)",
        padding: 2,
        borderRadius: 3,
        border: "2px solid #9d00ff",
        boxShadow: "0 0 20px #9d00ff, 0 0 40px #ff00ff",
      }}
    >
      {[{ num: days, label: "days" }, { num: hours, label: "hrs" }, { num: minutes, label: "min" }, { num: seconds, label: "sec" }].map(
        ({ num, label }, idx) => (
          <Box key={idx} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={glowStyle}>
              <AnimatedNumberRolling number={num} />
            </Box>
            <Typography sx={{ fontSize: 12, color: "#ff99ff" }}>{label}</Typography>
          </Box>
        )
      )}
    </Box>
  );
}
