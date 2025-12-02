// // app/_not-found/page.tsx
// 'use client'
// import NotFoundClient from "@/components/_not-found/NotFoundClient";

// export default function NotFoundPage() {
//   return <NotFoundClient />;
// }

// app/_not-found/page.tsx
import ClientPage from './clientpage';

export const dynamic = 'force-dynamic';

export default function NotFoundPage() {
  return <ClientPage />;
}
