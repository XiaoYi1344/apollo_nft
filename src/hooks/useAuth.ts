// // // 'use client';

// // // import { useState, useEffect, useRef, useCallback } from 'react';
// // // import { ethers } from 'ethers';
// // // import toast from 'react-hot-toast';
// // // import Cookies from 'js-cookie';
// // // import { loginWallet, verifySignature } from '@/services/authService';

// // // interface EthereumProvider {
// // //   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
// // // }

// // // declare global {
// // //   interface Window {
// // //     ethereum?: EthereumProvider;
// // //   }
// // // }

// // // export const useWalletAuth = () => {
// // //   const [loading, setLoading] = useState(false);
// // //   const [account, setAccount] = useState<string>('');
// // //   const manualDisconnectRef = useRef(false);
// // //   const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

// // //   const scheduleAutoReconnect = useCallback(async () => {
// // //     if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);

// // //     const expiryStr = Cookies.get('tokenExpiry');
// // //     if (!expiryStr) return;

// // //     const msUntilExpiry = Number(expiryStr) - Date.now();
// // //     if (msUntilExpiry <= 0) return;

// // //     reconnectTimeout.current = setTimeout(async () => {
// // //       if (!manualDisconnectRef.current) {
// // //         const savedAccount = Cookies.get('account');
// // //         if (savedAccount) await authenticateWallet(savedAccount);
// // //       }
// // //     }, msUntilExpiry);
// // //   }, []);

// // //   const authenticateWallet = useCallback(
// // //     async (addressWallet: string) => {
// // //       try {
// // //         setLoading(true);
// // //         if (!window.ethereum) throw new Error('MetaMask is not installed!');

// // //         // ✅ Lấy nonce từ server
// // //         const res = await loginWallet(addressWallet);
// // //         const nonce = res?.nonce || res?.data?.nonce;
// // //         if (!nonce) throw new Error('Không nhận được nonce từ server');

// // //         const provider = new ethers.BrowserProvider(window.ethereum);
// // //         const signer = await provider.getSigner();
// // //         const signature = await signer.signMessage(nonce);

// // //         const { accessToken, user } = await verifySignature(addressWallet, signature);

// // //         // ✅ Set cookie an toàn hơn localStorage
// // //         const expiry = Date.now() + 60 * 60 * 1000; // 1 giờ
// // //         Cookies.set('accessToken', accessToken, { expires: 1 / 24, secure: true, sameSite: 'strict' }); // 1h
// // //         Cookies.set('account', addressWallet, { expires: 1 / 24, secure: true, sameSite: 'strict' });
// // //         Cookies.set('tokenExpiry', expiry.toString(), { expires: 1 / 24, secure: true, sameSite: 'strict' });

// // //         // Nếu muốn lưu thông tin user
// // //         if (user) Cookies.set('user', JSON.stringify(user), { expires: 1 / 24, secure: true, sameSite: 'strict' });

// // //         setAccount(addressWallet);
// // //         manualDisconnectRef.current = false;

// // //         toast.success('Wallet connected successfully!');
// // //         scheduleAutoReconnect();
// // //       } catch (err: unknown) {
// // //         if (err instanceof Error) toast.error(err.message || 'Authentication failed!');
// // //         else toast.error('Authentication failed!');
// // //         throw err;
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     },
// // //     [scheduleAutoReconnect]
// // //   );

// // //   const logout = useCallback(() => {
// // //     setAccount('');
// // //     manualDisconnectRef.current = true;
// // //     Cookies.remove('accessToken');
// // //     Cookies.remove('account');
// // //     Cookies.remove('tokenExpiry');
// // //     Cookies.remove('user');

// // //     if (reconnectTimeout.current) {
// // //       clearTimeout(reconnectTimeout.current);
// // //       reconnectTimeout.current = null;
// // //     }

// // //     console.log('Wallet disconnected 🔒');
// // //   }, []);

// // //   // 🔁 Tự động khôi phục khi mở lại trang
// // //   useEffect(() => {
// // //     const savedToken = Cookies.get('accessToken');
// // //     const savedAccount = Cookies.get('account');
// // //     const savedExpiry = Cookies.get('tokenExpiry');

// // //     if (savedToken && savedAccount && savedExpiry && Date.now() < Number(savedExpiry)) {
// // //       setAccount(savedAccount);
// // //       // scheduleAutoReconnect();
// // //     } else {
// // //       logout();
// // //     }
// // //   }, [logout]);

// // //   useEffect(() => {
// // //     const handleBeforeUnload = () => logout();
// // //     window.addEventListener('beforeunload', handleBeforeUnload);
// // //     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
// // //   }, [logout]);

// // //   return { authenticateWallet, account, loading, logout };
// // // };

// // 'use client';

// // import { useState, useEffect, useRef, useCallback } from 'react';
// // import { ethers } from 'ethers';
// // import toast from 'react-hot-toast';
// // import Cookies from 'js-cookie';
// // import { loginWallet, verifySignature } from '@/services/authService';

// // interface EthereumProvider {
// //   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
// // }

// // declare global {
// //   interface Window {
// //     ethereum?: EthereumProvider;
// //   }
// // }

// // export const useWalletAuth = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [account, setAccount] = useState<string>('');
// //   const manualDisconnectRef = useRef(false);
// //   const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

// //   const authenticateWallet = useCallback(async (addressWallet: string) => {
// //     try {
// //       setLoading(true);
// //       if (!window.ethereum) throw new Error('MetaMask is not installed!');

// //       // Lấy nonce từ server
// //       const res = await loginWallet(addressWallet);
// //       const nonce = res?.nonce || res?.data?.nonce;
// //       if (!nonce) throw new Error('Không nhận được nonce từ server');

// //       const provider = new ethers.BrowserProvider(window.ethereum);
// //       const signer = await provider.getSigner();
// //       const signature = await signer.signMessage(nonce);

// //       const { accessToken, user } = await verifySignature(addressWallet, signature);

// //       // Lưu cookie (bỏ secure khi dev localhost)
// //       const expiry = Date.now() + 60 * 60 * 1000; // 1h
// //       Cookies.set('accessToken', accessToken, { expires: 1 / 24, sameSite: 'strict' });
// //       Cookies.set('account', addressWallet, { expires: 1 / 24, sameSite: 'strict' });
// //       Cookies.set('tokenExpiry', expiry.toString(), { expires: 1 / 24, sameSite: 'strict' });
// //       if (user) Cookies.set('user', JSON.stringify(user), { expires: 1 / 24, sameSite: 'strict' });

// //       setAccount(addressWallet);
// //       manualDisconnectRef.current = false;
// //       toast.success('Wallet connected successfully!');
// //     } catch (err: unknown) {
// //       if (err instanceof Error) toast.error(err.message || 'Authentication failed!');
// //       else toast.error('Authentication failed!');
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const scheduleAutoReconnect = useCallback(() => {
// //     if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);

// //     const expiryStr = Cookies.get('tokenExpiry');
// //     if (!expiryStr) return;

// //     const msUntilExpiry = Number(expiryStr) - Date.now();
// //     if (msUntilExpiry <= 0) return;

// //     reconnectTimeout.current = setTimeout(async () => {
// //       if (!manualDisconnectRef.current) {
// //         const savedAccount = Cookies.get('account');
// //         if (savedAccount) await authenticateWallet(savedAccount);
// //       }
// //     }, msUntilExpiry);
// //   }, [authenticateWallet]);

// //   const logout = useCallback(() => {
// //     setAccount('');
// //     manualDisconnectRef.current = true;
// //     Cookies.remove('accessToken');
// //     Cookies.remove('account');
// //     Cookies.remove('tokenExpiry');
// //     Cookies.remove('user');

// //     if (reconnectTimeout.current) {
// //       clearTimeout(reconnectTimeout.current);
// //       reconnectTimeout.current = null;
// //     }
// //     console.log('Wallet disconnected 🔒');
// //   }, []);

// //   // Khi reload page: giữ trạng thái nếu token còn hạn
// //   useEffect(() => {
// //     const savedToken = Cookies.get('accessToken');
// //     const savedAccount = Cookies.get('account');
// //     const savedExpiry = Cookies.get('tokenExpiry');

// //     if (savedToken && savedAccount && savedExpiry && Date.now() < Number(savedExpiry)) {
// //       setAccount(savedAccount);
// //       // Chỉ lên lịch reconnect khi token sắp hết hạn
// //       scheduleAutoReconnect();
// //     }
// //   }, [scheduleAutoReconnect]);

// //   // Cleanup khi unload
// //   useEffect(() => {
// //     const handleBeforeUnload = () => logout();
// //     window.addEventListener('beforeunload', handleBeforeUnload);
// //     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
// //   }, [logout]);

// //   return { authenticateWallet, account, loading, logout };
// // };

// // 'use client';

// // import { useState, useEffect, useRef, useCallback } from 'react';
// // import { ethers } from 'ethers';
// // import toast from 'react-hot-toast';
// // import Cookies from 'js-cookie';
// // import { loginWallet, verifySignature } from '@/services/authService';

// // interface EthereumProvider {
// //   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
// // }

// // declare global {
// //   interface Window {
// //     ethereum?: EthereumProvider;
// //   }
// // }

// // export const useWalletAuth = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [account, setAccount] = useState<string>('');
// //   const manualDisconnectRef = useRef(false);
// //   const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

// //   const authenticateWallet = useCallback(async (addressWallet: string) => {
// //     try {
// //       setLoading(true);
// //       if (!window.ethereum) throw new Error('MetaMask is not installed!');

// //       const res = await loginWallet(addressWallet);
// //       const nonce = res?.nonce || res?.data?.nonce;
// //       if (!nonce) throw new Error('Không nhận được nonce từ server');

// //       const provider = new ethers.BrowserProvider(window.ethereum);
// //       const signer = await provider.getSigner();
// //       const signature = await signer.signMessage(nonce);

// //       const { accessToken, user } = await verifySignature(addressWallet, signature);

// //       const expiry = Date.now() + 60 * 60 * 1000; // 1h
// //       Cookies.set('accessToken', accessToken, { expires: 1 / 24, sameSite: 'strict' });
// //       Cookies.set('account', addressWallet, { expires: 1 / 24, sameSite: 'strict' });
// //       Cookies.set('tokenExpiry', expiry.toString(), { expires: 1 / 24, sameSite: 'strict' });
// //       if (user) Cookies.set('user', JSON.stringify(user), { expires: 1 / 24, sameSite: 'strict' });

// //       setAccount(addressWallet);
// //       manualDisconnectRef.current = false;
// //       toast.success('Wallet connected successfully!');
// //     } catch (err: unknown) {
// //       if (err instanceof Error) toast.error(err.message || 'Authentication failed!');
// //       else toast.error('Authentication failed!');
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   // 🔁 Tự động reconnect trong session nếu token hết hạn
// //   const scheduleAutoReconnect = useCallback(() => {
// //     if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);

// //     const expiryStr = Cookies.get('tokenExpiry');
// //     if (!expiryStr) return;

// //     const msUntilExpiry = Number(expiryStr) - Date.now();
// //     if (msUntilExpiry <= 0) {
// //       // Token hết hạn → tự động login lại nếu tab vẫn mở
// //       const savedAccount = Cookies.get('account');
// //       if (savedAccount && !manualDisconnectRef.current) {
// //         authenticateWallet(savedAccount).catch(() => logout());
// //       }
// //       return;
// //     }

// //     reconnectTimeout.current = setTimeout(async () => {
// //       const savedAccount = Cookies.get('account');
// //       if (savedAccount && !manualDisconnectRef.current) {
// //         authenticateWallet(savedAccount).catch(() => logout());
// //       }
// //     }, msUntilExpiry);
// //   }, [authenticateWallet]);

// //   const logout = useCallback(() => {
// //     setAccount('');
// //     manualDisconnectRef.current = true;
// //     Cookies.remove('accessToken');
// //     Cookies.remove('account');
// //     Cookies.remove('tokenExpiry');
// //     Cookies.remove('user');

// //     if (reconnectTimeout.current) {
// //       clearTimeout(reconnectTimeout.current);
// //       reconnectTimeout.current = null;
// //     }
// //     console.log('Wallet disconnected 🔒');
// //   }, []);

// //   // Khi reload page: nếu token còn hạn → giữ nguyên, nếu quá hạn → xóa luôn
// //   useEffect(() => {
// //     const savedToken = Cookies.get('accessToken');
// //     const savedAccount = Cookies.get('account');
// //     const savedExpiry = Cookies.get('tokenExpiry');

// //     if (savedToken && savedAccount && savedExpiry) {
// //       if (Date.now() < Number(savedExpiry)) {
// //         setAccount(savedAccount);
// //         scheduleAutoReconnect();
// //       } else {
// //         // Token hết hạn → xóa cookie luôn
// //         logout();
// //       }
// //     }
// //   }, [scheduleAutoReconnect, logout]);

// //   // Cleanup khi unload
// //   useEffect(() => {
// //     const handleBeforeUnload = () => logout();
// //     window.addEventListener('beforeunload', handleBeforeUnload);
// //     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
// //   }, [logout]);

// //   return { authenticateWallet, account, loading, logout };
// // };

// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { ethers } from 'ethers';
// import toast from 'react-hot-toast';
// import Cookies from 'js-cookie';
// import { loginWallet, verifySignature } from '@/services/authService';
// import axios, { AxiosError } from 'axios';

// interface EthereumProvider {
//   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
// }

// declare global {
//   interface Window {
//     ethereum?: EthereumProvider;
//   }
// }

// export const useWalletAuth = () => {
//   const [loading, setLoading] = useState(false);
//   const [account, setAccount] = useState<string>('');
//   const manualDisconnectRef = useRef(false);
//   const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // 🔒 Logout: xóa cookie và reset state
//   const logout = useCallback(() => {
//     setAccount('');
//     manualDisconnectRef.current = true;

//     Cookies.remove('accessToken');
//     Cookies.remove('account');
//     Cookies.remove('tokenExpiry');
//     Cookies.remove('user');

//     if (reconnectTimeout.current) {
//       clearTimeout(reconnectTimeout.current);
//       reconnectTimeout.current = null;
//     }
//     console.log('Wallet disconnected 🔒');
//   }, []);

//   // 🔑 Authenticate wallet
//   const authenticateWallet = useCallback(async (addressWallet: string) => {
//     try {
//       setLoading(true);
//       if (!window.ethereum) throw new Error('MetaMask is not installed!');

//       const res = await loginWallet(addressWallet);
//       const nonce = res?.nonce || res?.data?.nonce;
//       if (!nonce) throw new Error('Không nhận được nonce từ server');

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const signature = await signer.signMessage(nonce);

//       const { accessToken, user } = await verifySignature(addressWallet, signature);

//       const expiry = Date.now() + 60 * 60 * 1000; // 1h
//       // const expiry = Date.now() + 5 * 60 * 1000; // 5 phút
//       Cookies.set('accessToken', accessToken, { expires: 1 / 24, sameSite: 'strict' });
//       Cookies.set('account', addressWallet, { expires: 1 / 24, sameSite: 'strict' });
//       Cookies.set('tokenExpiry', expiry.toString(), { expires: 1 / 24, sameSite: 'strict' });
//       if (user) Cookies.set('user', JSON.stringify(user), { expires: 1 / 24, sameSite: 'strict' });

//       setAccount(addressWallet);
//       manualDisconnectRef.current = false;
//       toast.success('Wallet connected successfully!');

//       scheduleAutoReconnect();
//     } catch (err: unknown) {
//       if (err instanceof Error) toast.error(err.message || 'Authentication failed!');
//       else toast.error('Authentication failed!');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // 🔁 Auto reconnect khi token sắp hết hạn
//   const scheduleAutoReconnect = useCallback(() => {
//     if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);

//     const expiryStr = Cookies.get('tokenExpiry');
//     if (!expiryStr) return;

//     const msUntilExpiry = Number(expiryStr) - Date.now();
//     if (msUntilExpiry <= 0) {
//       const savedAccount = Cookies.get('account');
//       if (savedAccount && !manualDisconnectRef.current) {
//         authenticateWallet(savedAccount).catch(() => logout());
//       }
//       return;
//     }

//     reconnectTimeout.current = setTimeout(() => {
//       const savedAccount = Cookies.get('account');
//       if (savedAccount && !manualDisconnectRef.current) {
//         console.log('Access token expired → Auto re-login...');
//         authenticateWallet(savedAccount).catch(() => logout());
//       }
//     }, msUntilExpiry);
//   }, [authenticateWallet, logout]);

//   // ✅ Verify token khi reload page
//   const verifyTokenOnce = useCallback(async () => {
//     const accessToken = Cookies.get('accessToken');
//     const savedAccount = Cookies.get('account');

//     if (!accessToken || !savedAccount) return;

//     try {
//       await axios.get('/api/auth/check', {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       // Token hợp lệ → giữ nguyên, setup auto reconnect
//       console.log('Token valid ✅');
//       scheduleAutoReconnect();
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 401) {
//           console.warn('Access token invalid → auto re-login...');
//           await authenticateWallet(savedAccount);
//         } else {
//           console.error('Token check failed:', error.response?.data || error.message);
//         }
//       } else {
//         console.error('Unexpected error:', error);
//       }
//     }
//   }, [authenticateWallet, scheduleAutoReconnect]);

//   // 🧩 Khi reload trang: giữ cookie, verify token
//   useEffect(() => {
//     const accessToken = Cookies.get('accessToken');
//     const savedAccount = Cookies.get('account');
//     const savedExpiry = Cookies.get('tokenExpiry');

//     if (accessToken && savedAccount && savedExpiry) {
//       setAccount(savedAccount);
//       verifyTokenOnce();
//     }
//   }, [verifyTokenOnce]);

//   // 🧹 Cleanup: chỉ clear timeout, không xóa cookie khi reload
//   useEffect(() => {
//     return () => {
//       if (reconnectTimeout.current) {
//         clearTimeout(reconnectTimeout.current);
//         reconnectTimeout.current = null;
//       }
//     };
//   }, []);

//   return { authenticateWallet, account, loading, logout };
// };

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

        // 🔁 Setup auto reconnect
        scheduleAutoReconnect();
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
        authenticateWallet(acc).catch(() => logout());
      }
    }, msUntilExpiry > 0 ? msUntilExpiry : 0);
  }, [authenticateWallet, logout]);

  // ✅ Verify token khi reload page
  const verifyTokenOnce = useCallback(async () => {
    const accessToken = Cookies.get('accessToken');
    const savedAccount = Cookies.get('account');

    if (!accessToken || !savedAccount) return;

    try {
      await axios.get('/api/auth/check', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // Token hợp lệ → setup auto reconnect
      console.log('Token valid ✅');
      scheduleAutoReconnect();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.warn('Access token invalid → auto re-login...');
          await authenticateWallet(savedAccount);
        } else {
          console.error('Token check failed:', error.response?.data || error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }, [authenticateWallet, scheduleAutoReconnect]);

  // 🧩 Khi reload trang: giữ cookie, verify token hoặc login lại nếu token hết hạn
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const savedAccount = Cookies.get('account');
    const savedExpiry = Cookies.get('tokenExpiry');

    if (!savedAccount || !savedExpiry) return;

    if (Date.now() >= Number(savedExpiry)) {
      // Token đã hết hạn → auto login
      authenticateWallet(savedAccount).catch(() => logout());
    } else {
      setAccount(savedAccount);
      verifyTokenOnce();
    }
  }, [authenticateWallet, logout, verifyTokenOnce]);

  // 🧹 Cleanup timeout khi component unmount
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
