// components/nft/detail/Auction/AnimatedDigitCounter.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

interface AnimatedDigitCounterProps {
  value: number;       // chữ số 0–9
  duration?: number;    // thời gian animation (giây)
}

const DIGIT_HEIGHT = 40; // chiều cao mỗi số (px)
const DIGIT_WIDTH = 28;  // chiều rộng mỗi số (px)

const AnimatedDigitCounter: React.FC<AnimatedDigitCounterProps> = ({
  value,
  duration = 0.4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (!containerRef.current) return;

    const startY = -prevValue * DIGIT_HEIGHT;
    const endY = -value * DIGIT_HEIGHT;

    animate(startY, endY, {
      duration,
      ease: [0.4, 0, 0.2, 1], // cubic bezier easing
      onUpdate: (latest) => {
        if (containerRef.current) {
          containerRef.current.style.transform = `translateY(${latest}px)`;
        }
      },
    });

    setPrevValue(value);
  }, [value, duration, prevValue]);

  return (
    <div
      style={{
        overflow: "hidden",
        height: DIGIT_HEIGHT,
        width: DIGIT_WIDTH,
        perspective: 400, // tạo hiệu ứng 3D
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          transformStyle: "preserve-3d",
        }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              height: DIGIT_HEIGHT,
              width: DIGIT_WIDTH,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 700,
              fontSize: 28,
              color: "#ff33cc",
              backfaceVisibility: "hidden",
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedDigitCounter;
