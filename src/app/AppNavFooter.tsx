'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import FooterFallback from '@/components/layout/footer/FooterFallback';

const NavbarClient = dynamic(() => import('@/components/layout/navbar/navbar'));
const FooterClient = dynamic(() => import('@/components/layout/footer/footer'));

export default function AppNavFooter() {
  return (
    <>
      <Suspense fallback={null}>
        <NavbarClient />
      </Suspense>

      <Suspense fallback={<FooterFallback />}>
        <FooterClient />
      </Suspense>
    </>
  );
}
