import { useState, useEffect } from 'react';

export function useEthPrice() {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEthPrice() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await res.json();
        setRate(data.ethereum.usd);
      } catch (error) {
        console.error('Failed to fetch ETH price:', error);
      }
    }

    fetchEthPrice();
  }, []);

  return rate;
}
