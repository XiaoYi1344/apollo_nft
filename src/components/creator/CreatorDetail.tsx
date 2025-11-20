
'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Tooltip,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack,
  Instagram,
  Twitter,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import * as productService from '@/services/productService';
import UserHeader from '@/components/creator/UserHeader';
import CreatedTab from '@/components/creator/tab/CreatedTab';
import OwnedTab from '@/components/creator/tab/OwnedTab';
import CollectionTab from '@/components/creator/tab/collection/CollectionTab';
import EditNFTModal from '@/components/creator/EditNFTModal';
import SellNFT from '@/components/creator/SellNFT';
import EditProfileModal from '@/components/creator/EditProfileModal';
import { OwnedProduct, ProductActivity } from '@/types/product';
import { ProductSummary } from '@/types/user';
import { useUserProfileByWallet } from '@/hooks/useUser';

interface Props {
  onBack: () => void;
  addressWallet: string;
}

const CreatorDetail: React.FC<Props> = ({ onBack }) => {
  const router = useRouter();
  const params = useParams<{ addressWallet: string }>();
  const addressWallet = params?.addressWallet ?? '';

  // === State ===
  const [tab, setTab] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(null);
  const [selectedProductIsMinted, setSelectedProductIsMinted] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [sellProductId, setSellProductId] = useState<number | null>(null);
  const [sellProductPrice, setSellProductPrice] = useState<string>('0');
  const [openEditProfile, setOpenEditProfile] = useState(false);

    const [allActivities, setAllActivities] = useState<ProductActivity[][]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  // === Hooks ===
  const { data: user, isLoading, isError, refetch } = useUserProfileByWallet(addressWallet);


  // === Convert ProductSummary -> OwnedProduct ===
  const ownedProducts = user?.ownedProducts ?? [];
// Luôn gọi trước mọi return
const ownedProductsConverted: OwnedProduct[] = (user?.ownedProducts || []).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    image: p.image,
    externalLink: p.externalLink,
    properties: p.properties.map((prop) => ({ type: prop.type, name: prop.name })),
    tokenURI: p.properties[0]?.tokenURI || '',
    isFreeze: p.properties[0]?.isFreeze || false,
    type: p.type || 'buyNow',
    price: p.price,
    likeCount: p.likeCount,
    isLike: p.isLike,
    listingId: p.listingId ?? null,
    creator: [],
    collections: [],
  }));

  // === Fetch activities with useEffect instead of useQueries ===
  useEffect(() => {
    let isMounted = true;

    const fetchActivities = async () => {
      setActivitiesLoading(true);
      try {
        const results = await Promise.all(
          ownedProductsConverted.map(async (product) => {
            const data = await productService.getProductActivity(product.id);
            return data.map((a) => ({ ...a, eventType: a.evenType }));
          })
        );
        if (isMounted) setAllActivities(results);
      } catch (error) {
        console.error(error);
        if (isMounted) setAllActivities([]);
      } finally {
        if (isMounted) setActivitiesLoading(false);
      }
    };

    if (ownedProductsConverted.length > 0) fetchActivities();

    return () => {
      isMounted = false;
    };
  }, [ownedProductsConverted]);
// Chỉ sau khi khai báo tất cả hooks mới return JSX
if (isLoading) return <CircularProgress />;
if (isError || !user) return <Typography>User not found</Typography>;


// Lọc các sản phẩm mà ví addressWallet là creator
const ownedProductsOfUser = ownedProductsConverted.filter(
  (p) => p.creator.some((c) => c.addressWallet.toLowerCase() === addressWallet.toLowerCase())
);


  // === Utils ===
  const shortenAddress = (addr: string) =>
    addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';

  const stats = [
    {
      label: 'TOTAL REVENUE',
      value: ownedProducts.reduce((sum: number, p: ProductSummary) => sum + Number(p.price || 0), 0),
    },
    { label: 'FOLLOWERS', value: user.followCount },
    { label: 'NUMBER OF WORKS', value: ownedProducts.length },
    {
      label: 'FLOOR PRICE',
      value: ownedProducts.length
        ? Math.min(...ownedProducts.map((p: ProductSummary) => Number(p.price || 0)))
        : 0,
    },
  ];

  return (
    <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
      {/* Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
          zIndex: 1,
          mt: 37.5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />

      <Box sx={{ position: 'relative', width: '100%', color: '#fff' }}>
        {/* Banner */}
        <Box
          sx={{
            width: '100%',
            height: 320,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)',
            zIndex: 12,
          }}
        >
          <UserHeader
            type="banner"
            src={user.background ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}` : null}
          />
        </Box>

        {/* Back button */}
        <Button
          onClick={onBack}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            textTransform: 'none',
            borderRadius: 2,
            zIndex: 14,
            '&:hover': { background: 'rgba(0,0,0,0.6)' },
          }}
        >
          <ArrowBack fontSize="small" sx={{ mr: 1 }} /> Quay lại
        </Button>

        {/* Info Section */}
        <Box sx={{ px: 6, mt: -10, position: 'relative', zIndex: 14 }}>
          <Stack direction="row" spacing={4} alignItems="flex-start" sx={{ mt: -8, px: 7, position: 'relative' }}>
            <UserHeader type="avatar" src={user.avatar ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}` : null} size={120} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff' }}>{user.fullName}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ color: '#A0A0C0', fontSize: '1rem' }}>{shortenAddress(user.addressWallet)}</Typography>
                <Tooltip title="Copy Wallet Address">
                  <ContentCopyIcon sx={{ fontSize: 15, color: '#A0A0C0', cursor: 'pointer', '&:hover': { color: '#fff' } }} onClick={() => navigator.clipboard.writeText(user.addressWallet)} />
                </Tooltip>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button variant="contained" sx={{ textTransform: 'none', background: 'linear-gradient(90deg,#7a3bff,#b78eff)' }}>Follow</Button>
                <Button variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', textTransform: 'none', color: '#fff' }}>Chia sẻ</Button>
                <Button variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', textTransform: 'none', color: '#fff' }} onClick={() => setOpenEditProfile(true)}>Chỉnh sửa Profile</Button>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Twitter sx={{ color: '#cfcfff', cursor: 'pointer' }} />
                  <Instagram sx={{ color: '#cfcfff', cursor: 'pointer' }} />
                </Stack>
              </Stack>

              <Typography sx={{ color: '#CFCFFF', my: 5, maxWidth: 800, ml: -25 }}>{user.bio || 'No bio yet.'}</Typography>
            </Box>
          </Stack>

          {/* Stats */}
          <Grid container spacing={4} sx={{ mt: 6, mb: 4 }}>
            {stats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{stat.value}</Typography>
                <Typography sx={{ color: '#9b9bbf', fontSize: 14 }}>{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>

          {/* Tabs */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Tabs value={tab} onChange={(e, val) => setTab(val)} textColor="secondary" indicatorColor="secondary" sx={{ flex: 1, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }, '& .Mui-selected': { color: 'secondary.main' } }}>
              <Tab label="Đã tạo" />
              <Tab label="Sở hữu" />
              <Tab label="Bộ sưu tập" />
              <Tab label="Yêu thích" />
            </Tabs>
            <Button variant="contained" sx={{ ml: 2 }} onClick={() => router.push('/upload')}>Tải thêm</Button>
          </Box>

          {/* Tab Content */}
          {tab === 0 && (
            <CreatedTab
              ownedProducts={ownedProductsOfUser}
              allActivities={allActivities}
              activitiesLoading={activitiesLoading}
              handleOpenEdit={(product, activities) => {
                setSelectedProduct(product);
                setSelectedProductIsMinted(activities.length > 0);
                setOpenEditDialog(true);
              }}
              openSellModal={(productId, price) => {
                setSellProductId(productId);
                setSellProductPrice(price);
                setOpenSellModal(true);
              }}
              walletMode={false}
            />


          )}
          {tab === 1 && (
            <OwnedTab
              ownedProducts={ownedProductsOfUser}
              allActivities={allActivities}
              activitiesLoading={activitiesLoading}
              handleOpenEdit={(product, activities) => {
                setSelectedProduct(product);
                setSelectedProductIsMinted(activities.length > 0);
                setOpenEditDialog(true);
              }}
              openSellModal={(productId, price) => {
                setSellProductId(productId);
                setSellProductPrice(price);
                setOpenSellModal(true);
              }}
              walletMode={false}
            />
          )}
          {tab === 2 && (
            <CollectionTab
              mintedProducts={ownedProductsOfUser}
              allActivities={allActivities}
            />
          )}
        </Box>
      </Box>

      {/* Modals */}
      {selectedProduct && (
        <EditNFTModal
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          product={selectedProduct}
          onUpdate={refetch}
          isMinted={selectedProductIsMinted}
        />
      )}
      {sellProductId && (
        <SellNFT
          open={openSellModal}
          onClose={() => setOpenSellModal(false)}
          productId={sellProductId}
          defaultPrice={sellProductPrice}
        />
      )}
      {openEditProfile && user && (
        <EditProfileModal
          open={openEditProfile}
          onClose={() => setOpenEditProfile(false)}
          user={user}
        />
      )}
    </Stack>
  );
};

export default CreatorDetail;
