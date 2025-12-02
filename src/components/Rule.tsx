// 'use client'; 

// // components/Rule.tsx
// import React, { ReactNode, useEffect } from 'react';

// interface RuleProps {
//   children: ReactNode;
// }

// const Rule: React.FC<RuleProps> = ({ children }) => {
//   useEffect(() => {
//     // Ngăn chặn click chuột phải toàn trang
//     const handleContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//     };

//     // Ngăn chặn kéo ảnh
//     const handleDragStart = (e: DragEvent) => {
//       e.preventDefault();
//     };

//     // Ngăn chặn copy text
//     const handleCopy = (e: ClipboardEvent) => {
//       e.preventDefault();
//       alert('Copy nội dung bị cấm!');
//     };

//     document.addEventListener('contextmenu', handleContextMenu);
//     document.addEventListener('dragstart', handleDragStart);
//     document.addEventListener('copy', handleCopy);

//     return () => {
//       document.removeEventListener('contextmenu', handleContextMenu);
//       document.removeEventListener('dragstart', handleDragStart);
//       document.removeEventListener('copy', handleCopy);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         userSelect: 'none', // Không cho chọn text
//       }}
//     >
//       {children}
//     </div>
//   );
// };
'use client';

import React, { ReactNode, useEffect } from 'react';

interface RuleProps {
  children: ReactNode;
}

const Rule: React.FC<RuleProps> = ({ children }) => {
  useEffect(() => {
    // Ngăn menu chuột phải
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // Ngăn kéo ảnh / thả ảnh
    const handleDragStart = (e: DragEvent) => e.preventDefault();

    // Ngăn copy text
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      alert('Copy nội dung bị cấm!');
    };

    // Ngăn Ctrl+C / Cmd+C
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.key === 'c') ||
        (e.metaKey && e.key === 'c') || // Cmd+C trên Mac
        e.key === 'F12' || // DevTools
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U') // View source
      ) {
        e.preventDefault();
        alert('Bạn không được phép sao chép nội dung!');
      }
    };

    // Ngăn kéo ảnh trực tiếp từ <img>
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
      img.setAttribute('draggable', 'false');
      img.style.userSelect = 'none';
      img.oncontextmenu = () => false;
    });

    // Add các event listener
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        userSelect: 'none', // Không cho chọn text
        pointerEvents: 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default Rule;
