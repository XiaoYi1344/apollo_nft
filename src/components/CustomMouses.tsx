// 'use client';
// import { motion, useMotionValue, useSpring } from 'framer-motion';
// import { useEffect, useState } from 'react';

// export default function CustomCursor() {
//   const [hover, setHover] = useState(false);
//   const [click, setClick] = useState(false);

//   const x = useMotionValue(-100);
//   const y = useMotionValue(-100);
//   const springX = useSpring(x, { stiffness: 200, damping: 25 });
//   const springY = useSpring(y, { stiffness: 200, damping: 25 });

//   useEffect(() => {
//     const move = (e: MouseEvent) => {
//       x.set(e.clientX - 20);
//       y.set(e.clientY - 20);
//     };

//     const handleHover = () => setHover(true);
//     const handleLeave = () => setHover(false);
//     const handleClick = () => {
//       setClick(true);
//       setTimeout(() => setClick(false), 400);
//     };

//     window.addEventListener('mousemove', move);
//     window.addEventListener('mousedown', handleClick);
//     document.querySelectorAll('button, a').forEach((el) => {
//       el.addEventListener('mouseenter', handleHover);
//       el.addEventListener('mouseleave', handleLeave);
//     });

//     return () => {
//       window.removeEventListener('mousemove', move);
//       window.removeEventListener('mousedown', handleClick);
//       document.querySelectorAll('button, a').forEach((el) => {
//         el.removeEventListener('mouseenter', handleHover);
//         el.removeEventListener('mouseleave', handleLeave);
//       });
//     };
//   }, [x, y]);

//   return (
//     <motion.div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         x: springX,
//         y: springY,
//         pointerEvents: 'none',
//         zIndex: 9999,
//       }}
//     >
//       <motion.div
//         className={`neon-crystal ${hover ? 'hover' : ''} ${click ? 'click' : ''}`}
//         animate={{
//           scale: click ? 1.4 : 1,
//           rotateZ: hover ? 360 : 0,
//         }}
//         transition={{
//           rotateZ: { duration: 4, repeat: Infinity, ease: 'linear' },
//           scale: { type: 'spring', stiffness: 300, damping: 10 },
//         }}
//       >
//         {/* Khối tinh thể neon */}
//         <svg
//           width="40"
//           height="40"
//           viewBox="0 0 100 100"
//           style={{ transform: 'rotate(90deg)' }}
//         >
//           <polygon
//             points="50,10 90,50 50,90 10,50"
//             className="crystal-shape"
//           />
//         </svg>
//       </motion.div>
//     </motion.div>
//   );
// }

// 'use client';
// import { motion, useMotionValue, useSpring } from 'framer-motion';
// import { useEffect, useState } from 'react';


// export default function CustomCursor() {
//   const [hover, setHover] = useState(false);
//   const [click, setClick] = useState(false);

//   const x = useMotionValue(-100);
//   const y = useMotionValue(-100);
//   const springX = useSpring(x, { stiffness: 200, damping: 25 });
//   const springY = useSpring(y, { stiffness: 200, damping: 25 });

//   useEffect(() => {
//     const move = (e: MouseEvent) => {
//       x.set(e.clientX - 20);
//       y.set(e.clientY - 20);
//     };

//     const handleHover = () => setHover(true);
//     const handleLeave = () => setHover(false);
//     const handleClick = () => {
//       setClick(true);
//       setTimeout(() => setClick(false), 400);
//     };

//     window.addEventListener('mousemove', move);
//     window.addEventListener('mousedown', handleClick);
//     document.querySelectorAll('button, a').forEach((el) => {
//       el.addEventListener('mouseenter', handleHover);
//       el.addEventListener('mouseleave', handleLeave);
//     });

//     return () => {
//       window.removeEventListener('mousemove', move);
//       window.removeEventListener('mousedown', handleClick);
//       document.querySelectorAll('button, a').forEach((el) => {
//         el.removeEventListener('mouseenter', handleHover);
//         el.removeEventListener('mouseleave', handleLeave);
//       });
//     };
//   }, [x, y]);

//   return (
//     <motion.div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         x: springX,
//         y: springY,
//         pointerEvents: 'none',
        
//         zIndex: 9999,
//       }}
//     >
//       <motion.div
//         className={`neon-crystal ${hover ? 'hover' : ''} ${click ? 'click' : ''}`}
//         animate={{
//           scale: click ? 1.4 : 1,
//           rotateZ: hover ? 360 : 0,
//         }}
//         transition={{
//           rotateZ: { duration: 4, repeat: Infinity, ease: 'linear' },
//           scale: { type: 'spring', stiffness: 300, damping: 10 },
//         }}
//       >
//         {/* SVG tinh thể */}
//         <svg width="40" height="40" viewBox="0 0 100 100" style={{ transform: 'rotate(90deg)' }}>
//           <polygon points="50,10 90,50 50,90 10,50" className="crystal-shape" />
//         </svg>

//         {/* 💡 Chấm sáng trung tâm */}
//         <div className="center-glow"></div>
//       </motion.div>
//     </motion.div>
//   );
// }
