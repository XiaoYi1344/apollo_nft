

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Tooltip,
  Tabs,
  Tab,
  Skeleton,
  CircularProgress,
} from '@mui/material';

import { useParams, useRouter } from 'next/navigation';

import {
  ContentCopy as ContentCopyIcon,
  Instagram,
  Twitter,
  ArrowBack,
} from '@mui/icons-material';

import { useUserProfileByWallet } from '@/hooks/useUser';
import { useToggleFollow } from '@/hooks/useFollow';
import { getWallet } from '@/services/LikeFollowService';
import UserHeader from './UserHeader';

import { ProductSummary } from '@/types/user';
import { useAllProducts, useUpdateListing } from '@/hooks/useProduct';
import { getProductsByCollection } from '@/services/productService';
import { useQueries } from '@tanstack/react-query';
import { useToggleLike } from '@/hooks/useLike';

import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { ProductProperty, RawProduct } from '@/types/product';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useBuyNFT } from './useBuyNFT';

type TabType = 'owned' | 'created' | 'collection';

interface CreatorDetailProps {
  onBack?: () => void;
  addressWallet?: string;
}

const CreatorDetail: React.FC<CreatorDetailProps> = ({
  onBack,
  addressWallet: walletProp,
}) => {
  const { buyNFT, loadingIds } = useBuyNFT();

  const [page, setPage] = useState(1);
  const router = useRouter();

  const params = useParams<{ addressWallet: string }>();
  const addressWallet = walletProp ?? params?.addressWallet;

  const API_URL = process.env.NEXT_PUBLIC_API;

  const { mutate: toggleLike } = useToggleLike();

  const {
    data: user,
    isLoading,
    isError,
  } = useUserProfileByWallet(addressWallet!);

  const [selectedTab, setSelectedTab] = useState<TabType>('created');
  const [tabIndex, setTabIndex] = useState(0);

  const { data: allProducts, isLoading: loadingAll } = useAllProducts(page);

  const {
    followed,
    loading: followLoading,
    toggleFollow,
  } = useToggleFollow(user?.isFollow || false);

  const [isFollow, setIsFollow] = useState(followed);
  const [isLikeUser, setIsLikeUser] = useState(false);
  const [likeUserCount, setLikeUserCount] = useState(0);

  useEffect(() => {
    if (user) {
      setIsFollow(user.isFollow);
      setLikeUserCount(user.likeCount);
    }
  }, [user, followed]);

  const updateListing = useUpdateListing();

  const shortenAddress = (addr: string) =>
    addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';

  const ownedProducts: ProductSummary[] = user?.ownedProducts || [];

  const collections = user?.collectionProducts ?? [];
  const collectionQueries = useQueries({
    queries: collections.map((col) => ({
      queryKey: ['collection-products', col.id],
      queryFn: () => getProductsByCollection(col.id),
      enabled: selectedTab === 'collection',
      refetchOnWindowFocus: false,
    })),
  });

  const collectionProducts: ProductSummary[] = collectionQueries
    .filter((q) => q.data && Array.isArray(q.data.products))
    .flatMap((q) =>
      (q.data!.products || []).map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.image,
        externalLink: p.externalLink ?? '',
        type: p.type ?? 'buyNow',
        price: p.price,
        likeCount: p.likeCount,
        isLike: p.isLike,
        listingId: p.listingId ?? null,
        properties: (p.properties || []).map((prop) => ({
          type: prop.type,
          name: prop.name,
          supply: prop.supply ?? 0,
          blockchain: prop.blockchain ?? '',
          tokenId: prop.tokenId ?? '',
          contractAddress: prop.contractAddress ?? '',
          tokenURI: prop.tokenURI ?? null,
          isFreeze: prop.isFreeze ?? false,
        })),
        creator: Array.isArray(p.creator) ? p.creator : [],
        tokenURI: p.tokenURI ?? null,
        isFreeze: p.isFreeze ?? false,
        creators: Array.isArray(p.creator)
          ? p.creator.map((c) => c.addressWallet)
          : [],
      })),
    );

  const allProductsFiltered: ProductSummary[] = (
    (allProducts as RawProduct[]) || []
  ).map((p) => {
    // Chuẩn hóa creators thành string[]
    let creators: string[] = [];
    if (Array.isArray(p.creator)) {
      creators = p.creator.map((c) => c.addressWallet);
    } else if (p.creator) {
      creators = [p.creator.addressWallet];
    }

    return {
      id: p.id,
      name: p.name,
      description: p.description,
      image: p.image,
      externalLink: p.externalLink ?? '',
      properties: (Array.isArray(p.properties) ? p.properties : []).map(
        (prop: ProductProperty) => ({
          type: prop.type,
          name: prop.name,
          supply: prop.supply ?? 0,
          blockchain: prop.blockchain ?? '',
          tokenId: prop.tokenId ?? '',
          contractAddress: prop.contractAddress ?? '',
          tokenURI: prop.tokenURI ?? null,
          isFreeze: prop.isFreeze ?? false,
        }),
      ),
      type: p.type ?? 'buyNow',
      price: p.price,
      likeCount: p.likeCount,
      isLike: p.isLike,
      listingId: p.listingId ?? null,
      creator: Array.isArray(p.creator)
        ? p.creator
        : [p.creator].filter(Boolean),
      tokenURI: p.tokenURI ?? null,
      isFreeze: p.isFreeze ?? false,
      creators, // dùng mảng chuẩn string[]
    };
  });

  // -------------------------------------------
  // -------- LỌC SẢN PHẨM ĐÃ TẠO ---------------
  // -------------------------------------------

  const createdProducts: ProductSummary[] = user
    ? allProductsFiltered.filter((p) =>
        p.creators?.includes(user.addressWallet),
      )
    : [];

  let products: ProductSummary[] = [];

  if (selectedTab === 'created') products = createdProducts;
  if (selectedTab === 'owned') products = ownedProducts;
  if (selectedTab === 'collection') products = collectionProducts;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    if (newValue === 0) setSelectedTab('created');
    if (newValue === 1) setSelectedTab('owned');
    if (newValue === 2) setSelectedTab('collection');
  };

  const handleFollowClick = () => {
    if (!user || user.addressWallet === getWallet()) return;
    const prev = isFollow;
    setIsFollow(!isFollow);
    toggleFollow({ followingAddressWallet: user.addressWallet }).catch(() =>
      setIsFollow(prev),
    );
  };

  const handleToggleLikeUser = () => {
    if (!user) return;
    const prev = { isLike: isLikeUser, count: likeUserCount };
    setIsLikeUser(!isLikeUser);
    setLikeUserCount(isLikeUser ? likeUserCount - 1 : likeUserCount + 1);
    toggleLike(
      { targetId: user.id, targetType: 'artist' },
      {
        onError: () => {
          setIsLikeUser(prev.isLike);
          setLikeUserCount(prev.count);
        },
      },
    );
  };

  // Số sản phẩm mỗi trang
  const ITEMS_PER_PAGE = 6;

  // Tổng số trang
  const totalPages = Math.ceil(createdProducts.length / ITEMS_PER_PAGE);

  // Hiển thị chỉ các sản phẩm của trang hiện tại
  const displayedProducts = createdProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (isLoading && loadingAll)
    return (
      <Stack
        sx={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Stack>
    );

  if (isError || !user)
    return (
      <Typography sx={{ color: '#fff', textAlign: 'center', py: 10 }}>
        User not found
      </Typography>
    );

  return (
    <Stack position="relative" sx={{ minHeight: '100vh' }}>
      {/* Banner */}
      <Box sx={{ width: '100%', height: 320 }}>
        <UserHeader
          type="banner"
          src={
            user.background ? `${API_URL}/api/upload/${user.background}` : null
          }
        />
      </Box>

      <Button
        onClick={onBack}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(0,0,0,0.4)',
          color: '#fff',
        }}
      >
        <ArrowBack sx={{ mr: 1 }} /> Quay lại
      </Button>

      <Box sx={{ px: 6, mt: 0, position: 'relative', zIndex: 14 }}>
        {/* User Info */}
        <Stack
          direction="row"
          spacing={4}
          alignItems="flex-start"
          sx={{ mt: -8, px: 7, position: 'relative' }}
        >
          <UserHeader
            type="avatar"
            src={user.avatar ? `${API_URL}/api/upload/${user.avatar}` : null}
            size={120}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff' }}>
              {user.fullName}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ color: '#CFCFFF', fontSize: '1rem' }}>
                {shortenAddress(user.addressWallet)}
              </Typography>
              <Tooltip title="Copy Wallet Address">
                <ContentCopyIcon
                  sx={{
                    fontSize: 15,
                    color: '#fff',
                    cursor: 'pointer',
                    '&:hover': { color: '#CFCFFF' },
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText(user.addressWallet)
                  }
                />
              </Tooltip>
            </Stack>

            {/* Buttons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 3, alignItems: 'center' }}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  background: isFollow
                    ? 'linear-gradient(90deg, #ccc, #aaa)'
                    : 'linear-gradient(90deg,#7a3bff,#b78eff)',
                }}
                disabled={user.addressWallet === getWallet() || followLoading}
                onClick={handleFollowClick} // <- dùng function
              >
                {isFollow ? 'Following' : 'Follow'}
              </Button>

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

              <Box
                sx={{
                  cursor: 'pointer',
                  background: isLikeUser ? '#fff' : 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  p: 1,
                  '&:hover': { transform: 'scale(1.1)' },
                }}
                onClick={handleToggleLikeUser}
              >
                {isLikeUser ? (
                  <Favorite sx={{ color: '#FF4CFD' }} />
                ) : (
                  <FavoriteBorder sx={{ color: '#fff' }} />
                )}
              </Box>
              <Typography sx={{ color: '#fff', ml: 1 }}>
                {likeUserCount}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Twitter sx={{ color: '#cfcfff', cursor: 'pointer' }} />
                <Instagram sx={{ color: '#cfcfff', cursor: 'pointer' }} />
              </Stack>
            </Stack>

            <Typography
              sx={{ color: '#CFCFFF', my: 5, maxWidth: 800, ml: -25 }}
            >
              {user.bio || 'No bio yet.'}
            </Typography>
          </Box>
        </Stack>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              color: '#CFCFFF', // màu chữ mặc định
            },
            '& .Mui-selected': {
              color: '#9c27b0', // màu chữ khi tab được chọn
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#9c27b0', // màu underline của tab
            },
          }}
        >
          <Tab label="Đã tạo" />
          <Tab label="Sở hữu" />
          <Tab label="Bộ sưu tập" />
        </Tabs>
        {/* PRODUCTS GRID */}
        <Grid container spacing={3} sx={{ mt: 3, mb: 6 }}>
          {products.length > 0
            ? displayedProducts.map((product) => {
                const isOwner = product.creators?.includes(getWallet());
                const ownerWallet = product.creators?.[0];

                return (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.03)',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 0 20px rgba(0,0,0,0.4)',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
                        alt={product.name}
                      />

                      <CardContent>
                        <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                          {product.name}
                        </Typography>

                        <Typography sx={{ color: '#b78eff', mt: 1 }}>
                          Price: {product.price} ETH
                        </Typography>

                        <Typography sx={{ color: '#A0A0C0' }}>
                          Likes: {product.likeCount}
                        </Typography>

                        {isOwner ? (
                          <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 2 }}
                            onClick={() =>
                              router.push(`/creator/${ownerWallet}`)
                            }
                          >
                            View Owner
                          </Button>
                        ) : (
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2 }}
                            disabled={loadingIds.has(product.id)}
                            onClick={() => buyNFT(product)} // có thể là ProductSummary trực tiếp
                          >
                            {loadingIds.has(product.id)
                              ? 'Processing...'
                              : 'Buy'}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            : [...Array(6)].map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Skeleton height={250} />
                </Grid>
              ))}
        </Grid>
        <InfiniteScroll
          dataLength={products.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={products.length < totalPages}
          loader={<CircularProgress />}
        >
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                {/* Card product */}
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Box>
    </Stack>
  );
};

export default CreatorDetail;
