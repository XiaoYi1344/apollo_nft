import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API + '/api/authentication',
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

// -------- LOGIN --------
export const loginWallet = async (addressWallet: string) => {
  const res = await api.post('/login', { addressWallet });
  return res.data;
};

// -------- VERIFY SIGNATURE --------
export const verifySignature = async (
  addressWallet: string,
  signature: string
) => {
  const res = await api.post('/signature', {
    addressWallet,
    signature,
  });
  return res.data.data;
};
