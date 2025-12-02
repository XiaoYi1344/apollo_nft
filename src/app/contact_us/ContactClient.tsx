// app/contact/ContactClient.tsx
'use client';
import dynamicImport from 'next/dynamic';
import React, { Suspense } from 'react';

// Dynamic import component client-only
const ContactComponent = dynamicImport(
  () => import('@/components/contact_us/contact'),
  { ssr: false }
);

export default function ContactClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactComponent />
    </Suspense>
  );
}
