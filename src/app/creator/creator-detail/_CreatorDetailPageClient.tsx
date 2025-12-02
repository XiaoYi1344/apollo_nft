'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProfileDetail from '@/components/creator/ProfileDetail';

export default function CreatorDetailPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const walletModeParam = searchParams?.get('walletMode') === 'true';
  const [walletMode, setWalletMode] = useState(walletModeParam);

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '1rem' }}>
        <button onClick={() => setWalletMode(prev => !prev)}>
          Toggle Wallet Mode (Current: {walletMode ? 'Sell' : 'Buy'})
        </button>
      </div>

      <ProfileDetail
        onBack={() => router.back()}
        isWalletMode={walletMode}
      />
    </div>
  );
}
