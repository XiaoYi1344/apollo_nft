export const parseTokenId = (tokenId: number | string | null | undefined): number => {
  if (tokenId === null || tokenId === undefined) return 0;
  if (typeof tokenId === 'number') return tokenId;
  if (typeof tokenId === 'string') {
    const n = Number(tokenId.trim());
    return isNaN(n) ? 0 : n;
  }
  return 0;
};
