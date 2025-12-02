// app/creator/creator-detail/CreatorDetailClient.tsx
'use client';
import CreatorDetail from '@/components/creator/CreatorDetail';
import { useRouter, useParams } from 'next/navigation';

export default function CreatorDetailClientPage() {
  const router = useRouter();
  const params = useParams<{ addressWallet: string }>();
  const addressWallet = params?.addressWallet ?? '';

  return (
    <CreatorDetail
      onBack={() => router.push('/profile')}
      addressWallet={addressWallet}
    />
  );
}
