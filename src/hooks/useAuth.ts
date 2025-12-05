
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { loginWallet, verifySignature } from '@/services/authService';
import axios from 'axios';

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

  // 🔒 Logout
  const logout = useCallback(() => {
    setAccount('');
    manualDisconnectRef.current = true;

    Cookies.remove('accessToken');
    Cookies.remove('account');
    Cookies.remove('tokenExpiry');
    Cookies.remove('user');

    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }

    console.log('Wallet disconnected 🔒');
  }, []);

  // 🔁 Auto reconnect khi token sắp hết hạn
  const scheduleAutoReconnect = useCallback(() => {
    if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);

    const expiryStr = Cookies.get('tokenExpiry');
    const savedAccount = Cookies.get('account');

    if (!expiryStr || !savedAccount || manualDisconnectRef.current) return;

    const msUntilExpiry = Number(expiryStr) - Date.now();

    reconnectTimeout.current = setTimeout(() => {
      const acc = Cookies.get('account');
      if (acc && !manualDisconnectRef.current) {
        console.log('Access token expired → Auto re-login...');
        authenticateWalletRef.current(acc).catch(() => logout());
      }
    }, msUntilExpiry > 0 ? msUntilExpiry : 0);
  }, [logout]);

  // 🪝 Ref để tránh circular dependency
  const authenticateWalletRef = useRef<(address: string) => Promise<void>>(async () => {});

  // 🔑 Authenticate wallet
  const authenticateWallet = useCallback(
    async (addressWallet: string) => {
      try {
        setLoading(true);

        if (!window.ethereum) throw new Error('MetaMask is not installed!');

        const res = await loginWallet(addressWallet);
        const nonce = res?.nonce || res?.data?.nonce;
        if (!nonce) throw new Error('Không nhận được nonce từ server');

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const signature = await signer.signMessage(nonce);

        const { accessToken, user } = await verifySignature(addressWallet, signature);

        const expiry = Date.now() + 60 * 60 * 1000; // 1 giờ
        Cookies.set('accessToken', accessToken, { expires: 1 / 24, sameSite: 'strict' });
        Cookies.set('account', addressWallet, { expires: 1 / 24, sameSite: 'strict' });
        Cookies.set('tokenExpiry', expiry.toString(), { expires: 1 / 24, sameSite: 'strict' });
        if (user) Cookies.set('user', JSON.stringify(user), { expires: 1 / 24, sameSite: 'strict' });

        setAccount(addressWallet);
        manualDisconnectRef.current = false;
        toast.success('Wallet connected successfully!');

      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message || 'Authentication failed!');
        else toast.error('Authentication failed!');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  authenticateWalletRef.current = authenticateWallet;

  // 🧩 Khi account thay đổi → tự kích hoạt auto reconnect
  useEffect(() => {
    if (account) scheduleAutoReconnect();
  }, [account, scheduleAutoReconnect]);

  // 🔁 Verify token khi reload page
  const verifyTokenOnce = useCallback(async () => {
    const accessToken = Cookies.get('accessToken');
    const savedAccount = Cookies.get('account');

    if (!accessToken || !savedAccount) return;

    try {
      await axios.get('/api/auth/check', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log('Token valid ✅');
      scheduleAutoReconnect();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.warn('Access token invalid → auto re-login...');
        await authenticateWalletRef.current(savedAccount);
      }
    }
  }, [scheduleAutoReconnect]);

  // 🧩 Reload page: giữ login + verify token
  useEffect(() => {
    const savedAccount = Cookies.get('account');
    const savedExpiry = Cookies.get('tokenExpiry');

    if (!savedAccount || !savedExpiry) return;

    if (Date.now() >= Number(savedExpiry)) {
      authenticateWalletRef.current(savedAccount).catch(() => logout());
    } else {
      setAccount(savedAccount);
      verifyTokenOnce();
    }
  }, [logout, verifyTokenOnce]);

  // 🧹 Cleanup timeout khi unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
        reconnectTimeout.current = null;
      }
    };
  }, []);

  return { authenticateWallet, account, loading, logout };
};
