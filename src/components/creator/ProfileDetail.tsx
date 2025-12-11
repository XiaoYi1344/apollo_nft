
// CreatorDetail.tsx

'use client';

import React, { useState } from 'react';
import {
  Box,
  // Avatar,
  Typography,
  Button,
  Grid,
  // Card,
  // CardMedia,
  // CardContent,
  Stack,
  Tabs,
  Tab,
  CircularProgress,
  // Chip,
  Tooltip,
} from '@mui/material';
import { ArrowBack, Instagram, Twitter } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
// import toast from 'react-hot-toast';
import {
  useOwnedProducts,
  // usePostProductForSale
} from '@/hooks/useProduct';
import {
  OwnedProduct,
  ProductActivity,
  ProductProperty,
} from '@/types/product';
import { useQueries } from '@tanstack/react-query';
import * as productService from '@/services/productService';
import EditNFTModal from './EditNFTModal';
import SellNFT from './SellNFT';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { UserProfile } from '@/types/user';
import EditProfileModal from './EditProfileModal';
import { useUserProfile } from '@/hooks/useUser';
// import Image from 'next/image';
import UserHeader from './UserHeader';
import OwnedTab from './tab/OwnedTab';
import CreatedTab from './tab/CreatedTab';
import CollectionTab from './tab/collection/CollectionTab';

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
// import { UserProfile } from '@/types/user';
interface Props {
  onBack: () => void;
  isWalletMode?: boolean;
}

const ProfileDetail: React.FC<Props> = ({ onBack, isWalletMode }) => {
  const [tab, setTab] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(
    null,
  );
  const [selectedProductIsMinted, setSelectedProductIsMinted] = useState(false);

  const [openSellModal, setOpenSellModal] = useState(false);
  const [sellProductId, setSellProductId] = useState<number | null>(null);
  const [sellProductPrice, setSellProductPrice] = useState<string>('0');
  const [openEditProfile, setOpenEditProfile] = useState(false);

  // const [bannerError, setBannerError] = useState(false);

  const router = useRouter();

const rawUser = Cookies.get('user');
let canCreateNews = false;

if (rawUser) {
  try {
    const user = JSON.parse(rawUser);

    type Permission = {
      type: string;
      isActive: boolean;
    };

    const permissions: Permission[] = user?.permissions || [];

    canCreateNews = permissions.some(
      (p) => p.type === 'collaborator' && p.isActive
    );
  } catch (e) {
    console.error('Failed to parse user cookie', e);
  }
}

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  const searchParams = useSearchParams();
  const walletMode = isWalletMode ?? searchParams?.get('walletMode') === 'true';

  // const accessToken = Cookies.get('accessToken') || '';
  // const account = Cookies.get('account') ?? '';
  // Queries
  const {
    data: ownedProducts,
    isLoading: ownedLoading,
    isError: ownedError,
    refetch,
  } = useOwnedProducts();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUserProfile();

  // Mutations
  // const postProductMutation = usePostProductForSale();

  // Activity queries
  // const activitiesQueries = useQueries({
  //   queries:
  //     ownedProducts?.map((product) => ({
  //       queryKey: ['productActivity', product.id],
  //       queryFn: () => productService.getProductActivity(product.id),
  //       staleTime: 1000 * 60,
  //     })) || [],
  // });
  const productsArray = Array.isArray(ownedProducts) ? ownedProducts : [];

  const activitiesQueries = useQueries({
    queries: productsArray.map((product) => ({
      queryKey: ['productActivity', product.id],
      queryFn: () => productService.getProductActivity(product.id),
    })),
  });

  const allActivities = activitiesQueries.map(
    (q) =>
      q.data?.map((a) => ({
        ...a,
        eventType: a.evenType ?? a.evenType,
      })) ?? [],
  );
  const activitiesLoading = activitiesQueries.some((q) => q.isLoading);

  // Open modal
  const handleOpenEdit = (
    product: OwnedProduct,
    activities: ProductActivity[],
  ) => {
    const parsedProperties: ProductProperty[] = Array.isArray(
      product.properties,
    )
      ? product.properties
      : (JSON.parse(product.properties || '[]') as ProductProperty[]);

    const mappedProduct = {
      ...product,
      properties: parsedProperties.map((p) => ({
        type: p.type || '',
        name: p.name || '',
      })),
      isFreeze: Boolean(product.isFreeze),
      externalLink: product.externalLink || '',
    };

    // Tính isMinted dựa trên activity
    const selectedProductIsMinted = activities.some(
      (a) => a.evenType === 'Mint',
    );

    setSelectedProduct(mappedProduct);
    setOpenEditDialog(true);

    // Lưu isMinted vào state nếu muốn
    setSelectedProductIsMinted(selectedProductIsMinted);
  };

  if (!user) return null;

  const handleExport = () => {
    const stats = [
      {
        label: 'TOTAL REVENUE',
        value:
          user?.ownedProducts?.reduce(
            (sum, p) => sum + Number(p.price || 0),
            0,
          ) ?? 0,
      },
      { label: 'FOLLOWERS', value: user?.followCount ?? 0 },
      { label: 'NUMBER OF WORKS', value: user?.ownedProducts?.length ?? 0 },
      {
        label: 'FLOOR PRICE',
        value: user?.ownedProducts?.length
          ? Math.min(...user.ownedProducts.map((p) => Number(p.price || 0)))
          : 0,
      },
    ];

    const csvHeader = [
      'Name',
      'Total Revenue',
      'Followers',
      'Number of Works',
      'Floor Price',
    ];
    const csvRow = [
      user?.fullName ?? '',
      stats[0].value,
      stats[1].value,
      stats[2].value,
      stats[3].value,
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [csvHeader.join(','), csvRow.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `creator_stats.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    {
      label: 'TOTAL REVENUE',
      value: (user.ownedProducts ?? []).reduce(
        (sum, p) => sum + Number(p.price || 0),
        0,
      ),
    },
    { label: 'FOLLOWERS', value: user.followCount },
    { label: 'NUMBER OF WORKS', value: user.ownedProducts.length },
    {
      label: 'FLOOR PRICE',
      value: user.ownedProducts.length
        ? Math.min(...user.ownedProducts.map((p) => Number(p.price || 0)))
        : 0,
    },
  ];

  const shortenAddress = (addr: string) => {
    if (!addr) return '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
  };

  // const avatarUrl = user?.avatar
  //   ? `${API_URL}/api/upload/${user.avatar}?t=${Date.now()}`
  //   : '/avatar-default.png';

  // Loading / Error
  if (ownedLoading || userLoading) return <CircularProgress />;
  if (ownedError || userError || !user)
    return <Typography>User not found</Typography>;

  // const bannerUrl =
  //   !bannerError && user?.background
  //     ? `${API_URL}/api/upload/${user.background}`
  //     : '/creator_detail/banner.jpg';

  //   const avatarUrl = user?.avatar
  //   ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}`
  //   : '/avatar-default.png';

  // const bannerUrl = user?.background
  //   ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}`
  //   : '/avatar-default.png';

  // console.log('Avatar URL:', avatarUrl);
  // console.log('Banner URL:', bannerUrl);

  return (
    <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
      {/* Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
          overflow: 'hidden',
          zIndex: 1,
          mt: 37.5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />

      <Box sx={{ position: 'relative', width: '100%', color: '#fff' }}>
        {/* Banner */}
        {/* <Box
          component="img"
          src={creator.banner}
          alt="banner"
          sx={{
            width: '100%',
            height: 320,
            objectFit: 'cover',
            filter: 'brightness(0.4)',
            zIndex: 12,
          }}
        /> */}
        <Box
          sx={{
            width: '100%',
            height: 320,
            // backgroundImage: `url(${bannerUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)',
            zIndex: 12,
          }}
        >
          {/* UserHeader hiển thị banner + avatar */}
          <UserHeader
            type="banner"
            src={
              user.background
                ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}`
                : null
            }
          />
          {/* <Image
            src={
              // user?.background
              //   ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}`
              //   : '/avatar-default.png'
              bannerUrl
            }
            width={3200} // chỉ để Next.js biết tỉ lệ, không hiển thị
            height={320} // chỉ để Next.js biết tỉ lệ, không hiển thị
            style={{ display: 'none' }}
            onError={() => setBannerError(true)}
            alt="check-banner"
          /> */}
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
        <Box
          sx={{
            px: 6,
            mt: -10, // avatar nổi lên từ banner
            position: 'relative',
            zIndex: 14,
          }}
        >
          {/* INFO SECTION */}
          <Stack
            direction="row"
            spacing={4}
            alignItems="flex-start"
            sx={{ mt: -8, px: 7, position: 'relative' }}
          >
            <UserHeader
              type="avatar"
              src={
                user.avatar
                  ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}`
                  : null
              }
              size={120}
            />

            {/* Right Content */}
            <Box>
              {/* Full Name */}
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff' }}>
                {user.fullName}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ color: '#A0A0C0', fontSize: '1rem' }}>
                  {shortenAddress(user.addressWallet)}
                </Typography>
                <Tooltip title="Copy Wallet Address">
                  <ContentCopyIcon
                    sx={{
                      fontSize: 15,
                      color: '#A0A0C0',
                      cursor: 'pointer',
                      '&:hover': { color: '#fff' },
                    }}
                    onClick={() =>
                      navigator.clipboard.writeText(user.addressWallet)
                    }
                  />
                </Tooltip>
              </Stack>

              {/* Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                {/* <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
                  }}
                  disabled={user.addressWallet === account} // disable nếu là chính mình
                >
                  Follow
                </Button> */}

                {/* Nút tạo News chỉ hiển thị nếu có quyền */}
                {canCreateNews && (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
                    }}
                    onClick={() => router.push('/view/news/create')}
                  >
                    Tạo News
                  </Button>
                )}

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    textTransform: 'none',
                    color: '#fff',
                  }}
                >
                  Chia sẻ
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    textTransform: 'none',
                    color: '#fff',
                  }}
                  onClick={() => setOpenEditProfile(true)}
                >
                  Chỉnh sửa Profile
                </Button>

                {/* Social icons */}
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Twitter sx={{ color: '#cfcfff', cursor: 'pointer' }} />
                  <Instagram sx={{ color: '#cfcfff', cursor: 'pointer' }} />
                </Stack>
              </Stack>

              {/* Bio */}
              <Typography
                sx={{
                  color: '#CFCFFF',
                  my: 5,
                  maxWidth: 800,
                  ml: -25,
                }}
              >
                {user.bio || 'No bio yet.'}
              </Typography>
            </Box>
          </Stack>

          {/* Stats */}
          <Grid container spacing={4} sx={{ mt: 6, mb: 4 }}>
            {stats.map((stat) => (
              <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ color: '#9b9bbf', fontSize: 14 }}>
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Export */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button
              variant="text"
              onClick={handleExport}
              sx={{
                textTransform: 'none',
                color: '#fff',
                '&:hover': { color: '#b78eff' },
              }}
            >
              Xuất sang Trang tính
            </Button>
          </Box>

          {/* Tabs */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Tabs
              value={tab}
              onChange={(e, val) => setTab(val)}
              textColor="secondary"
              indicatorColor="secondary"
              sx={{
                flex: 1, // chiếm hết không gian còn lại
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .Mui-selected': {
                  color: 'secondary.main',
                },
              }}
            >
              <Tab label="Đã tạo" />
              <Tab label="Sở hữu" />
              <Tab label="Bộ sưu tập" />
              <Tab label="Yêu thích" />
            </Tabs>

            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={() => handleTabClick('/upload')}
            >
              Tải thêm
            </Button>
          </Box>

          {/* Tab Content */}
          {tab === 0 && (
            <CreatedTab
              ownedProducts={ownedProducts ?? []}
              allActivities={allActivities}
              activitiesLoading={activitiesLoading}
              walletMode={walletMode}
              handleOpenEdit={handleOpenEdit}
              openSellModal={(product) => {
                if (!product.tokenId) {
                  toast.error('NFT chưa mint, không thể bán!');
                  return;
                }

                setSellProductId(Number(product.tokenId)); // ✔ ép kiểu number
                setSellProductPrice(product.price?.toString() || '0');

                setOpenSellModal(true);
              }}
            />
          )}

          {tab === 1 && (
            <OwnedTab
              ownedProducts={ownedProducts ?? []}
              allActivities={allActivities}
              activitiesLoading={activitiesLoading}
              walletMode={walletMode}
              handleOpenEdit={handleOpenEdit}
              openSellModal={(product) => {
                if (!product.tokenId) {
                  toast.error('NFT chưa mint, không thể bán!');
                  return;
                }
                setSellProductId(parseInt(product.tokenId, 10));
                setSellProductPrice(product.price || '0');
                setOpenSellModal(true);
              }}
            />
          )}

          {tab === 2 && (
            <CollectionTab
              mintedProducts={ownedProducts ?? []} // NFT đã mint
              allActivities={allActivities}
            />
          )}
        </Box>
      </Box>

      {/* Modal Edit/Create NFT */}
      {selectedProduct && (
        <EditNFTModal
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          product={selectedProduct}
          onUpdate={refetch}
          isMinted={selectedProductIsMinted} // tính từ activity
        />
      )}

      {sellProductId !== null && (
        <SellNFT
          open={openSellModal}
          onClose={() => setOpenSellModal(false)}
          tokenId={sellProductId}
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

export default ProfileDetail;

