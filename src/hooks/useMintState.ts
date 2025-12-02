import { OwnedProduct, ProductActivity } from '@/types/product';
import { parseTokenId } from '@/utils/parseTokenId';

export const useMintState = (
  ownedProducts: OwnedProduct[] = [],
  allActivities: ProductActivity[][] = []
) => {
  const ownedList = ownedProducts.filter((product, idx) => {
    const activities = allActivities[idx] ?? [];
    const isMinted = activities.some(a => a.evenType === 'Mint');
    return !isMinted && parseTokenId(product.tokenId) === 0;
  });

  const createdList = ownedProducts.filter((product, idx) => {
    const activities = allActivities[idx] ?? [];
    const isMinted = activities.some(a => a.evenType === 'Mint');
    return isMinted || parseTokenId(product.tokenId) > 0;
  });

  return { ownedList, createdList };
};
