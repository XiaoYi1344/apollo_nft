'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { loginWallet, verifySignature } from '@/services/authService';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const useWalletAuth = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<string>('');
  const manualDisconnectRef = useRef(false);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleAutoReconnect = useCallback(async () => {
    if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);

    const expiryStr = localStorage.getItem('tokenExpiry');
    if (!expiryStr) return;

    const msUntilExpiry = Number(expiryStr) - Date.now();
    if (msUntilExpiry <= 0) return;

    reconnectTimeout.current = setTimeout(async () => {
      if (!manualDisconnectRef.current) {
        const savedAccount = localStorage.getItem('account');
        if (savedAccount) await authenticateWallet(savedAccount);
      }
    }, msUntilExpiry);
  }, []);

  const authenticateWallet = useCallback(async (addressWallet: string) => {
  try {
    setLoading(true);
    if (!window.ethereum) throw new Error('MetaMask is not installed!');

    // ✅ Correct extraction of nonce
    const res = await loginWallet(addressWallet);
    const nonce = res.data?.nonce;
    if (!nonce) throw new Error('Không nhận được nonce từ server');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(nonce);

    const { accessToken } = await verifySignature(addressWallet, signature);

    const expiry = Date.now() + 60 * 60 * 1000; // 1h
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('account', addressWallet);
    localStorage.setItem('tokenExpiry', expiry.toString());

    setAccount(addressWallet);
    manualDisconnectRef.current = false;

    toast.success('Wallet connected successfully!');
    scheduleAutoReconnect();
  } catch (err: unknown) {
    if (err instanceof Error) toast.error(err.message || 'Authentication failed!');
    else toast.error('Authentication failed!');
    throw err;
  } finally {
    setLoading(false);
  }
}, [scheduleAutoReconnect]);


  const logout = useCallback(() => {
    setAccount('');
    manualDisconnectRef.current = true;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('account');
    localStorage.removeItem('tokenExpiry');

    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }

    console.log('Wallet disconnected', { icon: '🔒' });
  }, []);

  // Auto reconnect on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    const savedAccount = localStorage.getItem('account');
    const savedExpiry = localStorage.getItem('tokenExpiry');

    if (savedToken && savedAccount && savedExpiry && Date.now() < Number(savedExpiry)) {
      setAccount(savedAccount);
      scheduleAutoReconnect();
    } else {
      logout();
    }
  }, [logout, scheduleAutoReconnect]);

  useEffect(() => {
    const handleBeforeUnload = () => logout();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [logout]);

  return { authenticateWallet, account, loading, logout };
};
