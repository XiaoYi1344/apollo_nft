'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Tabs,
  Tab,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { ArrowBack, Instagram, Twitter, ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserProfileByWallet, useUserProfile } from '@/hooks/useUser';
import { useToggleFollow } from '@/hooks/useFollow';
import { getWallet } from '@/services/LikeFollowService';
import SellNFT from '@/components/creator/SellNFT';
import EditNFTModal from './EditNFTModal';
import EditProfileModal from './EditProfileModal';
import UserHeader from './UserHeader';
import { ProductSummary, } from '@/types/user';
import { useQueries } from '@tanstack/react-query';
import * as productService from '@/services/productService';
import CreatedTab from './tab/CreatedTab';
import OwnedTab from './tab/OwnedTab';
import CollectionTab from './tab/collection/CollectionTab';
import { OwnedProduct, ProductActivity } from '@/types/product';
// import FavoriteTab from './tab/FavoriteTab';

type TabType = 'created' | 'owned' | 'collection' | 'favorite';

interface CreatorProfilePageProps {
  addressWallet: string;
}

const CreatorProfilePage: React.FC<CreatorProfilePageProps> = ({ addressWallet }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const walletMode = searchParams?.get('walletMode') === 'true';

  const [selectedTab, setSelectedTab] = useState<TabType>('created');
  const [openSellModal, setOpenSellModal] = useState(false);
  const [sellProductId, setSellProductId] = useState<number | null>(null);
  const [sellProductPrice, setSellProductPrice] = useState('0');
  const [openEditNFT, setOpenEditNFT] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSummary | null>(null);
  const [selectedProductIsMinted, setSelectedProductIsMinted] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const { data: userByWallet, isLoading: walletLoading, isError: walletError } = useUserProfileByWallet(addressWallet);
  const { data: currentUser, isLoading: userLoading, isError: userError } = useUserProfile();
  const user = walletMode ? currentUser : userByWallet;
  const isOwnProfile = user?.addressWallet === getWallet();

  const { followed, loading: followLoading, toggleFollow } = useToggleFollow(user?.isFollow || false);

  const products: ProductSummary[] =
    selectedTab === 'owned'
      ? user?.ownedProducts || []
      : user?.collectionProducts?.flatMap(c => c.products) || [];

  const activitiesQueries = useQueries({
    queries: products.map(product => ({
      queryKey: ['productActivity', product.id],
      queryFn: () => productService.getProductActivity(product.id),
    })) || [],
  });
  const allActivities = activitiesQueries.map(q => q.data || []);
  const activitiesLoading = activitiesQueries.some(q => q.isLoading);

  const [bannerSrc, setBannerSrc] = useState(user?.background || '/creator_detail/banner.jpg');
  useEffect(() => {
    if (user?.background) setBannerSrc(user.background);
  }, [user?.background]);

  const shortenAddress = (addr: string) => (addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '');

  const mapProductSummaryToOwnedProduct = (product: ProductSummary): OwnedProduct => ({
  id: product.id,
  name: product.name,
  description: product.description,
  image: product.image,
  externalLink: product.externalLink || '', // đảm bảo là string
  properties: product.properties.map(p => ({
    type: p.type,
    name: p.name,
    supply: p.supply,
    blockchain: p.blockchain,
    tokenId: p.tokenId,
    contractAddress: p.contractAddress,
    tokenURI: p.tokenURI || '',
    isFreeze: p.isFreeze,
  })),
  type: product.type,
  price: product.price,
  likeCount: product.likeCount,
  isLike: product.isLike,
  listingId: product.listingId,
  // Bổ sung các field còn thiếu mặc định nếu cần
  creator: [], // nếu OwnedProduct có creators
  tokenURI: product.properties?.[0]?.tokenURI || '',
  isFreeze: false,
});


  if (walletLoading || userLoading) return <CircularProgress sx={{ color: '#fff', mt: 10 }} />;
  if (walletError || userError || !user) return <Typography sx={{ color: '#fff', mt: 10 }}>User not found</Typography>;

  const avatarUrl = user.avatar
    ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}?t=${Date.now()}`
    : '/avatar-default.png';

//   const handleOpenEditNFT = (product: ProductSummary, activities: any[]) => {
//     const parsedProperties = Array.isArray(product.properties)
//       ? product.properties
//       : (JSON.parse(product.properties || '[]') as any[]);
//     setSelectedProduct({ ...product, properties: parsedProperties });
//     setSelectedProductIsMinted(activities.some(a => a.evenType === 'Mint'));
//     setOpenEditNFT(true);
//   };

const handleOpenEditNFT = (product: OwnedProduct, activities: ProductActivity[]) => {
  interface ParsedProperty {
  type: string;
  name: string;
  supply?: number;
  blockchain?: string;
  tokenId?: string;
  contractAddress?: string;
  tokenURI?: string;
  isFreeze?: boolean;
}

const parsedProperties: ParsedProperty[] = Array.isArray(product.properties)
  ? product.properties
  : JSON.parse(product.properties || '[]') as ParsedProperty[];


  const mappedProduct: ProductSummary = {
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image,
    externalLink: product.externalLink || '',
    type: product.type || 'buyNow',
    price: product.price,
    likeCount: product.likeCount || 0,
    isLike: product.isLike || false,
    listingId: product.listingId || null,
    properties: parsedProperties.map(p => ({
      type: p.type || '',
      name: p.name || '',
      supply: p.supply || 0,
      blockchain: p.blockchain || '',
      tokenId: p.tokenId || '',
      contractAddress: p.contractAddress || '',
      tokenURI: p.tokenURI || '',
      isFreeze: p.isFreeze || false,
    })),
  };

  setSelectedProduct(mappedProduct);
  setSelectedProductIsMinted(activities.some(a => a.evenType === 'Mint'));
  setOpenEditNFT(true);
};

const floorPrice =
  user.collectionProducts
    ?.flatMap(c => c.products.map(p => parseFloat(p.price))) // convert string -> number
    .reduce((a, b) => Math.min(a, b), Infinity) || 0;

  const handleExport = () => {
    const csvHeader = ['Name', 'Total Revenue', 'Followers', 'Number of Works', 'Floor Price'];
    const csvRow = [
  user.fullName,
  user.likeCount || 0,
  user.followCount || 0,
  user.ownedProducts.length,
  floorPrice,
];
    const csvContent = 'data:text/csv;charset=utf-8,' + [csvHeader.join(','), csvRow.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `creator_stats.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
      {/* Banner */}
      <Box
        sx={{
          width: '100%',
          height: 320,
          backgroundImage: `url(${bannerSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)',
          zIndex: 12,
        }}
      />

      {/* Back Button */}
      <Button
        onClick={() => router.back()}
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
      <Box sx={{ px: 4, mt: -10, position: 'relative', zIndex: 14 }}>
        <Stack direction="row" spacing={4} alignItems="flex-start" sx={{ mt: -8, px: 7, position: 'relative' }}>
          <UserHeader type="avatar" src={avatarUrl} size={120} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.7rem', color: '#fff' }}>
              {user.fullName}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ color: '#A0A0C0', fontSize: '1rem' }}>{shortenAddress(user.addressWallet)}</Typography>
              <Tooltip title="Copy Wallet Address">
                <ContentCopyIcon
                  sx={{ fontSize: 15, color: '#A0A0C0', cursor: 'pointer', '&:hover': { color: '#fff' } }}
                  onClick={() => navigator.clipboard.writeText(user.addressWallet)}
                />
              </Tooltip>
            </Stack>

            {/* Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              {!isOwnProfile && (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    background: followed ? 'linear-gradient(90deg,#4b5563,#6b7280)' : 'linear-gradient(90deg,#7a3bff,#b78eff)',
                  }}
                  disabled={followLoading}
                  onClick={() => toggleFollow({ followingAddressWallet: user.addressWallet })}
                >
                  {followed ? 'Following' : 'Follow'}
                </Button>
              )}

              {isOwnProfile && (
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}
                  onClick={() => setOpenEditProfile(true)}
                >
                  Chỉnh sửa Profile
                </Button>
              )}

              <Button variant="outlined" sx={{ textTransform: 'none', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>
                Chia sẻ
              </Button>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Twitter sx={{ color: '#cfcfff', cursor: 'pointer' }} />
                <Instagram sx={{ color: '#cfcfff', cursor: 'pointer' }} />
              </Stack>
            </Stack>

            <Typography sx={{ color: '#CFCFFF', my: 5, maxWidth: 800, textAlign: 'end', ml: -20 }}>
              {user.bio || 'No bio yet.'}
            </Typography>
          </Box>
        </Stack>

        {/* Stats */}
        <Grid container spacing={4} sx={{ mt: 6, mb: 4 }}>
          {[
            { label: 'TOTAL REVENUE', value: user.likeCount || 0 },
  { label: 'FOLLOWERS', value: user.followCount || 0 },
  { label: 'NUMBER OF WORKS', value: user.ownedProducts.length },
  { label: 'FLOOR PRICE', value: user.collectionProducts?.flatMap(c => c.products.map(p => parseFloat(p.price)))?.reduce((a,b)=> Math.min(a,b), Infinity) || 0 },
          ].map(stat => (
            <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
              <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{stat.value}</Typography>
              <Typography sx={{ color: '#9b9bbf', fontSize: 14 }}>{stat.label}</Typography>
            </Grid>
          ))}
        </Grid>

        {/* Export */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button variant="text" onClick={handleExport} sx={{ textTransform: 'none', color: '#fff', '&:hover': { color: '#b78eff' } }}>
            Xuất sang Trang tính
          </Button>
        </Box>

        {/* Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={(e, val) => setSelectedTab(val)}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              flex: 1,
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, color: 'rgba(255,255,255,0.7)' },
              '& .Mui-selected': { color: 'secondary.main' },
            }}
          >
            <Tab label="Đã tạo" value="created" />
            <Tab label="Sở hữu" value="owned" />
            <Tab label="Bộ sưu tập" value="collection" />
            <Tab label="Yêu thích" value="favorite" />
          </Tabs>
          <Button variant="contained" sx={{ ml: 2 }} onClick={() => router.push('/upload')}>
            Tải thêm
          </Button>
        </Box>

        {/* Tab Content */}
        {selectedTab === 'created' && (
          <CreatedTab
  ownedProducts={products.map(mapProductSummaryToOwnedProduct)}
  allActivities={allActivities}
  activitiesLoading={activitiesLoading}
  walletMode={walletMode}
  handleOpenEdit={(product, activities) => handleOpenEditNFT(product, activities)}
  openSellModal={(id, price) => {
    setSellProductId(id);
    setSellProductPrice(price);
    setOpenSellModal(true);
  }}
/>

        )}
        {selectedTab === 'owned' && (
          <OwnedTab
ownedProducts={products.map(mapProductSummaryToOwnedProduct)}
            allActivities={allActivities}
            activitiesLoading={activitiesLoading}
            walletMode={walletMode}
            handleOpenEdit={handleOpenEditNFT}
            openSellModal={(id, price) => {
              setSellProductId(id);
              setSellProductPrice(price);
              setOpenSellModal(true);
            }}
          />
        )}
        {selectedTab === 'collection' && (
  <CollectionTab
    mintedProducts={products.map(mapProductSummaryToOwnedProduct)}
    allActivities={allActivities}
  />
)}

        {/* {selectedTab === 'favorite' && <FavoriteTab products={products ?? []} />} */}
      </Box>

      {/* Modals */}
     {selectedProduct && (
  <EditNFTModal
    open={openEditNFT}
    onClose={() => setOpenEditNFT(false)}
    product={mapProductSummaryToOwnedProduct(selectedProduct)}
    onUpdate={() => {}}
    isMinted={selectedProductIsMinted}
  />
)}



      {sellProductId && (
        <SellNFT open={openSellModal} onClose={() => setOpenSellModal(false)} productId={sellProductId} defaultPrice={sellProductPrice} />
      )}

      {openEditProfile && <EditProfileModal open={openEditProfile} onClose={() => setOpenEditProfile(false)} user={user} />}
    </Stack>
  );
};

export default CreatorProfilePage;
