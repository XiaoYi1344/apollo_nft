import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API + '/api/authentication';

export const loginWallet = async (addressWallet: string) => {
  const res = await axios.post(`${API_URL}/login`, { addressWallet });
  return res.data; // { nonce }
};

export const verifySignature = async (addressWallet: string, signature: string) => {
  const res = await axios.post(`${API_URL}/signature`, {
    addressWallet,
    signature,
  });
  return res.data.data; // { accessToken, user }
};
