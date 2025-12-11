

'use client';

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Button,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import { OwnedProduct, ProductActivity, SoldProduct } from '@/types/product';
import { ethers } from 'ethers';
import { getContract } from '@/services/marketplaceService';
import { toast } from 'react-hot-toast';
import { getAllOwnedProductsWithSold } from '@/services/productService';
import Link from 'next/link';

interface Props {
  ownedProducts: OwnedProduct[];
  allActivities: ProductActivity[][];
  activitiesLoading: boolean;
  walletMode: boolean;
  handleOpenEdit: (
    product: OwnedProduct,
    activities: ProductActivity[],
  ) => void;
  openSellModal: (product: OwnedProduct) => void;
}

// Type guard for OwnedProduct
const isOwnedProduct = (
  product: OwnedProduct | SoldProduct,
): product is OwnedProduct =>
  (product as OwnedProduct).totalInstock !== undefined;

const CreatedTab: React.FC<Props> = ({
  ownedProducts,
  allActivities,
  activitiesLoading,
  walletMode,
  handleOpenEdit,
  openSellModal,
}) => {
  const [soldList, setSoldList] = useState<SoldProduct[]>([]);
  const [withdrawing, setWithdrawing] = useState(false);
  const [pendingEth, setPendingEth] = useState('0');

  // Fetch sold products
  useEffect(() => {
    const fetchSold = async () => {
      try {
        const { soldProducts } = await getAllOwnedProductsWithSold();
        setSoldList(soldProducts || []);
      } catch (err) {
        console.error('Failed to fetch sold products', err);
      }
    };
    fetchSold();
  }, []);

  // Merge owned + sold products
  const mergedProducts = [
    ...ownedProducts.filter((p) => p.tokenId !== null && Number(p.tokenId) > 0),
    ...soldList.filter((sold) => !ownedProducts.some((p) => p.id === sold.id)),
  ];

  // Fetch pending ETH
  useEffect(() => {
    const fetchPendingEth = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const marketplace = getContract(signer);
        const user = await signer.getAddress();
        const raw = await marketplace.pendingWithdrawals(user);
        setPendingEth(ethers.formatEther(raw));
      } catch (err) {
        console.error('Failed to fetch pending ETH', err);
        setPendingEth('0');
      }
    };
    fetchPendingEth();
  }, [mergedProducts]);

  // Withdraw ETH
  const handleWithdraw = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed');
      setWithdrawing(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const marketplace = getContract(signer);

      toast.loading(`Withdrawing ${pendingEth} ETH...`);
      const tx = await marketplace.withdraw();
      await tx.wait();
      toast.dismiss();
      toast.success(`Successfully withdrawn ${pendingEth} ETH`);
      setPendingEth('0');
    } catch (err) {
      toast.error(`Withdraw failed: ${(err as Error).message}`);
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <Grid container spacing={3} mb={3}>
      {mergedProducts.map((product) => {
        const idx = ownedProducts.findIndex((p) => p.id === product.id);
        const activities = allActivities[idx] ?? [];
        const isFrozen = product.isFreeze;

        // Determine if product is sold
        let isSold = false;
        if (isOwnedProduct(product)) {
          isSold =
            Number(product.totalInstock) === 0 ||
            soldList.some((sp) => sp.id === product.id);
        } else {
          isSold = true; // SoldProduct is always sold
        }

        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
            {/* <Card
              sx={{
                position: 'relative',
                bgcolor: 'rgba(255,255,255,0.03)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                },
              }}
            >
              <Link href={`/marketplace/${product.id}`} style={{ textDecoration: 'none' }}>
                {isSold && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
                      color: '#fff',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    SOLD
                  </Box>
                )}

                <CardMedia
                  component="img"
                  image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
                  alt={product.name}
                  sx={{
                    height: 280,
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />

                <CardContent sx={{ bgcolor: '#1a1a2e' }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
                      {product.name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label="Minted"
                      size="small"
                      sx={{ bgcolor: 'rgba(0,255,127,0.15)', color: '#00FA9A' }}
                    />
                    {isFrozen && (
                      <Chip
                        label="Frozen"
                        size="small"
                        sx={{ bgcolor: 'rgba(135,206,250,0.15)', color: '#1E90FF' }}
                      />
                    )}
                  </Stack>

                  <Typography sx={{ color: '#b78eff', mt: 1 }}>
                    Giá: {product.price ?? 'N/A'}
                  </Typography>

                  {walletMode && isOwnedProduct(product) && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button
  size="small"
  variant="contained"
  onClick={(e) => {
    e.stopPropagation(); // NGĂN click lan sang Link
    openSellModal(product);
  }}
>
  Sell
</Button>

<Button
  size="small"
  variant="outlined"
  onClick={(e) => {
    e.stopPropagation();
    handleOpenEdit(product, activities);
  }}
>
  Update
</Button>

                    </Stack>
                  )}
                </CardContent>
              </Link>
            </Card> */}
            <Card sx={{ position: 'relative', cursor: 'pointer' }}>
              {isSold && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
                    color: '#fff',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  SOLD
                </Box>
              )}

              {/* CHỈ BỌC ẢNH + TÊN BẰNG LINK */}
              <Link
                href={`/marketplace/${product.id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
                  alt={product.name}
                  sx={{
                    height: 280,
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent sx={{ bgcolor: '#1a1a2e' }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="subtitle1"
                      sx={{ color: '#fff', fontWeight: 700 }}
                    >
                      {product.name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label="Minted"
                      size="small"
                      sx={{ bgcolor: 'rgba(0,255,127,0.15)', color: '#00FA9A' }}
                    />
                    {isFrozen && (
                      <Chip
                        label="Frozen"
                        size="small"
                        sx={{
                          bgcolor: 'rgba(135,206,250,0.15)',
                          color: '#1E90FF',
                        }}
                      />
                    )}
                  </Stack>

                  <Typography sx={{ color: '#b78eff', mt: 1 }}>
                    Giá: {product.price ?? 'N/A'}
                  </Typography>
                </CardContent>
              </Link>

              {/* Các nút Sell / Update KHÔNG NẰM TRONG LINK */}
              {walletMode && isOwnedProduct(product) && (
                <Stack direction="row" spacing={1} sx={{ px: 2, bgcolor: '#1a1a2e', mt: -1.4, pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => openSellModal(product)}
                  >
                    Sell
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleOpenEdit(product, activities)}
                  >
                    Update
                  </Button>
                </Stack>
              )}
            </Card>
          </Grid>
        );
      })}

      {walletMode && Number(pendingEth) > 0 && (
        <Box mt={3} width="100%" display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="warning"
            onClick={handleWithdraw}
            disabled={withdrawing}
          >
            {withdrawing ? 'Đang rút...' : `Withdraw ${pendingEth} ETH`}
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default CreatedTab;
