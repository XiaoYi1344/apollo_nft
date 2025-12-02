'use client';

import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useParams } from 'next/navigation';
import {
  ContentCopy as ContentCopyIcon,
  Instagram,
  Twitter,
  ArrowBack,
} from '@mui/icons-material';
import { useUserProfileByWallet } from '@/hooks/useUser';
import { useToggleFollow } from '@/hooks/useFollow';
import { getWallet } from '@/services/LikeFollowService';
// import SellNFT from '@/components/creator/SellNFT';
import UserHeader from './UserHeader';
import { ProductSummary } from '@/types/user';

import { useUpdateListing } from '@/hooks/useProduct';
import { getProductsByCollection } from '@/services/productService';
import { useQueries } from '@tanstack/react-query';
// import { ProductSummary } from '@/types/product';
import { useToggleLike } from '@/hooks/useLike';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

type TabType = 'owned' | 'created' | 'collection';

interface CreatorDetailProps {
  onBack?: () => void;
  addressWallet?: string;
}

const CreatorDetail: React.FC<CreatorDetailProps> = ({
  onBack,
  addressWallet: walletProp,
}) => {
  const params = useParams<{ addressWallet: string }>();
  const addressWallet = walletProp ?? params?.addressWallet;

  const { mutate: toggleLike, isPending: liking } = useToggleLike();

  const {
    data: user,
    isLoading,
    isError,
  } = useUserProfileByWallet(addressWallet!);
  const [selectedTab, setSelectedTab] = useState<TabType>('created');
  const [tabIndex, setTabIndex] = useState(0);
  // const [openBuyModal, setOpenBuyModal] = useState(false);
  // const [selectedId, setSelectedId] = useState<number | null>(null);
  // const [selectedPrice, setSelectedPrice] = useState<string>('0');

  const [bannerSrc, setBannerSrc] = useState<string>(
    user?.background || '/creator_detail/banner.jpg',
  );

  const [isFollow, setIsFollow] = useState<boolean>(false);

 const [isLikeUser, setIsLikeUser] = useState(false);
const [likeUserCount, setLikeUserCount] = useState(user?.likeCount || 0);

useEffect(() => {
  if (user) {
    setIsFollow(user.isFollow);
    setLikeUserCount(user.likeCount); // <-- rất quan trọng
  }
}, [user]);

  const updateListing = useUpdateListing();

  const {
    followed,
    loading: followLoading,
    toggleFollow,
  } = useToggleFollow(user?.isFollow || false);

  const shortenAddress = (addr: string) =>
    addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';

  useEffect(() => {
    if (user?.background) setBannerSrc(user.background);
  }, [user?.background]);

  // === FETCH COLLECTION PRODUCTS FROM API ===
  // Luôn tạo mảng collection cố định
  const collections = user?.collectionProducts ?? [];

  // Gọi useQueries đúng kiểu
  const collectionQueries = useQueries({
    queries: collections.map((col) => ({
      queryKey: ['collection-products', col.id],
      queryFn: () => getProductsByCollection(col.id),
      enabled: selectedTab === 'collection', // query chỉ chạy khi chọn tab collection
      refetchOnWindowFocus: false,
    })),
  });

const handleToggleLikeUser = () => {
  if (!user) return; // <- tránh undefined

  const previous = {
    isLike: isLikeUser,
    count: likeUserCount,
  };

  setIsLikeUser(!isLikeUser);
  setLikeUserCount(isLikeUser ? likeUserCount - 1 : likeUserCount + 1);

  toggleLike(
    { targetId: user.id, targetType: 'artist' }, // <-- lỗi targetType ở đây
    {
      onError: () => {
        setIsLikeUser(previous.isLike);
        setLikeUserCount(previous.count);
      },
    }
  );
};

  if (isLoading)
    return (
      <Typography sx={{ color: '#fff', textAlign: 'center', py: 10 }}>
        Loading...
      </Typography>
    );
  if (isError || !user)
    return (
      <Typography sx={{ color: '#fff', textAlign: 'center', py: 10 }}>
        User not found
      </Typography>
    );

  const API_URL = process.env.NEXT_PUBLIC_API;
  const avatarUrl = user.avatar
    ? `${API_URL}/api/upload/${user.avatar}?t=${Date.now()}`
    : '/avatar-default.png';

  // --- Products per tab ---
  // Created products: những NFT có tokenId hợp lệ trong properties
  const createdProducts: ProductSummary[] = user.ownedProducts.filter((p) =>
    p.properties.some((prop) => prop.tokenId != null && prop.tokenId !== '0'),
  );

  // Owned products: tất cả NFT mà user sở hữu
  const ownedProducts: ProductSummary[] = user.ownedProducts;

  // Collection products: gộp tất cả products từ các collection
  //   const collectionProducts: ProductSummary[] = [];

  // if (user.collectionProducts) {
  //   user.collectionProducts.forEach((collection) => {
  //     collectionProducts.push(...collection.products);
  //   });
  // }

  // Flatten tất cả sản phẩm từ các collection
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

      // ---- properties chuẩn cho ProductSummary ----
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

      // ---- required field ----
      creator: Array.isArray(p.creator) ? p.creator : [],

      // ---- optional fields ----
      tokenURI: p.tokenURI ?? null,
      isFreeze: p.isFreeze ?? false,
      creators: Array.isArray(p.creator)
        ? p.creator.map((c) => c.addressWallet)
        : [],
    })),
  );


  let products: ProductSummary[] = [];
  if (selectedTab === 'owned') products = ownedProducts;
  if (selectedTab === 'created') products = createdProducts;
  if (selectedTab === 'collection') products = collectionProducts;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    if (newValue === 0) setSelectedTab('created');
    if (newValue === 1) setSelectedTab('owned');
    if (newValue === 2) setSelectedTab('collection');
  };

  const handleBuy = (product: ProductSummary) => {
    updateListing.mutate(
      {
        listingId: product.listingId!,
        quantity: 1,
        sellerAddress: 'buyNow',
        paymentToken: 'ETH',
        highestBidder: '',
        finalPrice: '',
        winnerAddress: '',
        endTime: undefined, // không cần khi buyNow
      },
      {
        onSuccess: () => {
          console.log('Buy success');
        },
        onError: (err) => {
          console.error('Buy failed', err);
        },
      },
    );
  };

  const handleFollowClick = () => {
    if (!user || user.addressWallet === getWallet()) return;

    // Lưu trạng thái cũ để rollback nếu cần
    const previousFollow = isFollow;

    // Optimistic update
    setIsFollow(!isFollow);

    toggleFollow({ followingAddressWallet: user.addressWallet }).catch(() => {
      // rollback nếu API fail
      setIsFollow(previousFollow);
    });
  };

  return (
    <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
      {/* Gradient background */}
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

      {/* Banner */}
      <Box sx={{ position: 'relative', width: '100%', color: '#fff' }}>
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
            src={
              user.background
                ? `${API_URL}/api/upload/${user.background}`
                : null
            }
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

            {/* Right Content */}
            <Box>
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

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                {/* <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
                  }}
                  disabled={user.addressWallet === getWallet()}
                  onClick={() =>
                    toggleFollow({ followingAddressWallet: user.addressWallet })
                  }
                >
                  {followed ? 'Following' : 'Follow'}
                </Button> */}
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    background: isFollow
                      ? 'linear-gradient(90deg, #ccc, #aaa)' // Following màu xám
                      : 'linear-gradient(90deg,#7a3bff,#b78eff)', // Follow màu tím
                  }}
                  disabled={user.addressWallet === getWallet() || followLoading}
                  onClick={handleFollowClick}
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
                {/* LIKE BUTTON (giống NFTDetail) */}
<Box
  sx={{
    cursor: 'pointer',
    background: isLikeUser ? '#fff' : 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
    padding: 1,
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
              sx={{
                flex: 1,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .Mui-selected': { color: 'secondary.main' },
              }}
            >
              <Tab label="Đã tạo" />
              <Tab label="Sở hữu" />
              <Tab label="Bộ sưu tập" />
            </Tabs>
          </Box>

          {/* Products Grid */}
          <Grid
            container
            spacing={3}
            sx={{ mt: 3, px: 4, position: 'relative', zIndex: 14 }}
          >
            {products.map((product) => (
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
                    sx={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <CardContent>
                    <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                    <Typography sx={{ color: '#b78eff', mt: 1 }}>
                      Price: {product.price} ETH
                    </Typography>
                    <Typography sx={{ color: '#A0A0C0', mt: 0.5 }}>
                      Likes: {product.likeCount} |{' '}
                      {product.isLike ? 'Liked' : 'Not liked'}
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        background: 'linear-gradient(90deg,#8b5cf6,#7c3aed)',
                        textTransform: 'none',
                        borderRadius: 2,
                      }}
                      onClick={() => {
                        // setSelectedId(product.id);
                        // setSelectedPrice(String(product.price));
                        // setOpenBuyModal(true);
                        handleBuy(product);
                      }}
                    >
                      Buy
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* BUY MODAL */}
      {/* {selectedId != null && (
        <SellNFT
          open={openBuyModal}
          onClose={() => setOpenBuyModal(false)}
          productId={selectedId}
          defaultPrice={selectedPrice}
        />
      )} */}
    </Stack>
  );
};

export default CreatorDetail;
// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import {
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import { useParams, useRouter } from 'next/navigation';
// import { ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';

// import * as productService from '@/services/productService';
// import { collectionService } from '@/services/collectionService';
// import { OwnedProduct, Product } from '@/types/product';
// import { Collection } from '@/types/collection';
// import { ProductSummary, UserProfile } from '@/types/user';
// import {
//   followService,
//   likeService,
//   getWallet,
// } from '@/services/LikeFollowService';
// import { useUpdateListing } from '@/hooks/useProduct';
// import userApi from '@/services/userService';
// import Image from 'next/image';
// import { AxiosError } from 'axios';

// type TabType = 'owned' | 'created' | 'collection';

// interface UserProductsState {
//   createdProducts: Product[];
//   ownedProducts: OwnedProduct[];
//   collectionProducts: Product[];
//   publicCollections: Collection[];
//   loading: boolean;
//   error: string | null;
// }

// const useUserProducts = (addressWallet: string) => {
//   const [state, setState] = useState<UserProductsState>({
//     createdProducts: [],
//     ownedProducts: [],
//     collectionProducts: [],
//     publicCollections: [],
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       setState((prev) => ({ ...prev, loading: true, error: null }));

//       try {
//         // GET ALL PRODUCTS
//         const allProductsRes = await productService.getAllProducts(1);

//         const allProducts = allProductsRes.products.slice(1);

//         const createdProducts = allProducts.filter((p) =>
//           p.creator?.some((c) => c.addressWallet === addressWallet),
//         );
//         // OWNED
//         const ownedRes = await productService.getAllOwnedProducts(
//           1,
//           addressWallet,
//         );
//         const ownedProducts = Array.isArray(ownedRes.ownedProducts)
//           ? ownedRes.ownedProducts.slice(1) // remove page object
//           : [];

//         // COLLECTIONS
//         const collectionsRes = await collectionService.getAllCollections();
//         const publicCollections = collectionsRes.data.result.filter(
//           (c) => c.creator.addressWallet === addressWallet && c.isPublic,
//         );

//         let collectionProducts: Product[] = [];

//         if (publicCollections.length > 0) {
//           const productsByCollection = await Promise.all(
//             publicCollections.map(
//               (c) =>
//                 productService
//                   .getProductsByCollection(c.id, addressWallet)
//                   .then((r) => r.products.slice(1)), // remove page object
//             ),
//           );
//           collectionProducts = productsByCollection.flat();
//         }

//         setState({
//           createdProducts,
//           ownedProducts,
//           collectionProducts,
//           publicCollections,
//           loading: false,
//           error: null,
//         });
//       } catch (err) {
//         let message = 'Something went wrong';

//         if (err instanceof AxiosError) {
//           message = err.response?.data?.message || err.message;
//         } else if (err instanceof Error) {
//           message = err.message;
//         }

//         setState((prev) => ({
//           ...prev,
//           loading: false,
//           error: message,
//         }));
//       }
//     };

//     fetchData();
//   }, [addressWallet]);

//   return state;
// };

// const mapToProductSummary = (p: Product | OwnedProduct): ProductSummary => ({
//   id: p.id,
//   name: p.name,
//   description: p.description,
//   image: p.image,
//   externalLink: p.externalLink ?? '',
//   type: p.type ?? 'buyNow',
//   price: p.price,
//   likeCount: p.likeCount,
//   isLike: p.isLike,
//   listingId: p.listingId ?? null,
//   properties: Array.isArray(p.properties)
//     ? p.properties
//     : typeof p.properties === 'string'
//       ? JSON.parse(p.properties)
//       : [],
//   creator: Array.isArray(p.creator) ? p.creator : p.creator ? [p.creator] : [],
//   tokenURI: p.tokenURI,
//   isFreeze: p.isFreeze,
//   creators: Array.isArray(p.creator)
//     ? p.creator.map((c) => c.addressWallet)
//     : [],
//   supply: p.supply,
//   blockchain: p.blockchain,
//   tokenId: p.tokenId,
//   contractAddress: p.contractAddress,
// });

// interface CreatorDetailProps {
//   onBack?: () => void;
//   addressWallet?: string;
// }

// const CreatorDetail: React.FC<CreatorDetailProps> = ({
//   onBack,
//   addressWallet: walletProp,
// }) => {
//   const params = useParams<{ addressWallet: string }>();
//   const router = useRouter();
//   const addressWallet = walletProp ?? params?.addressWallet ?? '';
//   const updateListing = useUpdateListing();

//   const [user, setUser] = useState<UserProfile | null>(null);
//   // placeholder
//   const [isFollow, setIsFollow] = useState(false);
//   const [isLikeUser, setIsLikeUser] = useState(false);
//   const [likeUserCount, setLikeUserCount] = useState(0);
//   const [selectedTab, setSelectedTab] = useState<TabType>('created');
//   const [tabIndex, setTabIndex] = useState(0);

//   const { createdProducts, ownedProducts, collectionProducts, loading } =
//     useUserProducts(addressWallet);

//   const productsByTab: Record<TabType, ProductSummary[]> = useMemo(
//     () => ({
//       created: createdProducts.map(mapToProductSummary),
//       owned: ownedProducts.map(mapToProductSummary),
//       collection: collectionProducts.map(mapToProductSummary),
//     }),
//     [createdProducts, ownedProducts, collectionProducts],
//   );

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await userApi.getUserProfileByWallet(addressWallet); // giả sử bạn có API
//         setUser(userData);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchUser();
//   }, [addressWallet]);

//   const products = productsByTab[selectedTab] || [];

//   // Handle follow toggle
//   const handleFollowClick = async () => {
//     if (!user || user.addressWallet === getWallet()) return;
//     try {
//       setIsFollow(!isFollow);
//       await followService.toggleFollow({
//         followingAddressWallet: user.addressWallet,
//       });
//     } catch {
//       setIsFollow(isFollow); // revert
//     }
//   };

//   // Handle like artist
//   const handleToggleLikeUser = async () => {
//     if (!user) return;
//     const prev = { isLike: isLikeUser, count: likeUserCount };
//     setIsLikeUser(!isLikeUser);
//     setLikeUserCount(isLikeUser ? likeUserCount - 1 : likeUserCount + 1);
//     try {
//       await likeService.toggleLike({ targetId: user.id, targetType: 'artist' });
//     } catch {
//       setIsLikeUser(prev.isLike);
//       setLikeUserCount(prev.count);
//     }
//   };

//   const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
//     setTabIndex(newValue);
//     setSelectedTab(
//       newValue === 0 ? 'created' : newValue === 1 ? 'owned' : 'collection',
//     );
//   };

//   const handleBuy = (product: ProductSummary) => {
//     if (!product.listingId) return;
//     updateListing.mutate({
//       listingId: product.listingId,
//       quantity: 1,
//       sellerAddress: 'buyNow',
//       paymentToken: 'ETH',
//     });
//   };

//   if (loading)
//     return (
//       <Typography sx={{ color: '#fff', textAlign: 'center', py: 10 }}>
//         Loading...
//       </Typography>
//     );

//   const API_URL = process.env.NEXT_PUBLIC_API;
//   const avatarUrl = user?.avatar
//     ? `${API_URL}/api/upload/${user.avatar}?t=${Date.now()}`
//     : '/avatar-default.png';

//   return (
//     <Stack
//       position="relative"
//       sx={{ overflow: 'hidden', minHeight: '100vh', p: 2 }}
//     >
//       {/* Back button */}
//       <Button
//         startIcon={<ArrowBack />}
//         onClick={() => router.push('/marketplace')}
//       >
//         Back to Marketplace
//       </Button>

//       {/* Header: avatar, name, follow & like */}
//       <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 2 }}>
//         <Image
//           src={avatarUrl}
//           alt={user?.userName ?? 'User avatar'}
//           width={60}
//           height={60}
//           style={{ borderRadius: '50%' }}
//         />

//         <Stack>
//           <Typography variant="h6">{user?.userName}</Typography>
//           <Stack direction="row" spacing={1}>
//             <Button
//               variant={isFollow ? 'contained' : 'outlined'}
//               onClick={handleFollowClick}
//             >
//               {isFollow ? 'Following' : 'Follow'}
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={
//                 isLikeUser ? <Favorite color="error" /> : <FavoriteBorder />
//               }
//               onClick={handleToggleLikeUser}
//             >
//               {likeUserCount}
//             </Button>
//           </Stack>
//         </Stack>
//       </Stack>

//       {/* Tabs */}
//       <Tabs value={tabIndex} onChange={handleTabChange}>
//         <Tab label="Created" />
//         <Tab label="Owned" />
//         <Tab label="Collections" />
//       </Tabs>

//       {/* Products grid */}
//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         {products.map((p) => (
//           <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="250"
//                 image={`https://gateway.pinata.cloud/ipfs/${p.image}`}
//                 alt={p.name}
//               />
//               <CardContent>
//                 <Typography>{p.name}</Typography>
//                 <Typography>Price: {p.price} ETH</Typography>
//                 <Typography>
//                   Likes: {p.likeCount} | {p.isLike ? 'Liked' : 'Not liked'}
//                 </Typography>
//                 <Button onClick={() => handleBuy(p)}>Buy</Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Stack>
//   );
// };

// export default CreatorDetail;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Stack,
//   Tooltip,
//   CircularProgress,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import {
//   ArrowBack,
//   Instagram,
//   Twitter,
//   ContentCopy as ContentCopyIcon,
// } from '@mui/icons-material';
// import { useRouter, useParams } from 'next/navigation';
// import Cookies from 'js-cookie';
// import { useUserProfileByWallet } from '@/hooks/useUser';
// import { useQueries } from '@tanstack/react-query';
// import * as productService from '@/services/productService';
// import UserHeader from '@/components/creator/UserHeader';
// import CreatedTab from '@/components/creator/tab/CreatedTab';
// import OwnedTab from '@/components/creator/tab/OwnedTab';
// import CollectionTab from '@/components/creator/tab/collection/CollectionTab';
// import EditNFTModal from '@/components/creator/EditNFTModal';
// import SellNFT from '@/components/creator/SellNFT';
// import EditProfileModal from '@/components/creator/EditProfileModal';
// import { OwnedProduct, ProductActivity } from '@/types/product';
// import { ProductSummary } from '@/types/user';

// interface Props {
//   onBack: () => void;
// }

// const CreatorDetail: React.FC<Props> = ({ onBack }) => {
//   const router = useRouter();
//   const params = useParams<{ addressWallet: string }>();
//   const addressWallet = params?.addressWallet;

//   const [tab, setTab] = useState(0);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(
//     null,
//   );
//   const [selectedProductIsMinted, setSelectedProductIsMinted] = useState(false);
//   const [openSellModal, setOpenSellModal] = useState(false);
//   const [sellProductId, setSellProductId] = useState<number | null>(null);
//   const [sellProductPrice, setSellProductPrice] = useState<string>('0');
//   const [openEditProfile, setOpenEditProfile] = useState(false);

//   const {
//     data: user,
//     isLoading,
//     isError,
//     refetch,
//   } = useUserProfileByWallet(addressWallet!);
//   const ownedProducts = user?.ownedProducts || [];
//   const ownedProductsConverted: OwnedProduct[] = ownedProducts.map((p) => ({
//     id: p.id,
//     name: p.name,
//     description: p.description,
//     image: p.image,
//     externalLink: p.externalLink,
//     properties: p.properties.map((prop) => ({
//       type: prop.type,
//       name: prop.name,
//     })),
//     tokenURI: p.properties[0]?.tokenURI || '', // tokenURI từ property đầu tiên
//     isFreeze: p.properties[0]?.isFreeze || false,
//     type: p.type || 'buyNow',
//     price: p.price,
//     likeCount: p.likeCount,
//     isLike: p.isLike,
//     listingId: p.listingId ?? null,
//     creator: [], // API ProductSummary không có creator, để mặc định rỗng
//     collections: [], // nếu muốn map bộ sưu tập
//   }));

//   // Activity queries
//   const activitiesQueries = useQueries({
//     queries:
//       ownedProductsConverted?.map((product: OwnedProduct) => ({
//         queryKey: ['productActivity', product.id],
//         queryFn: () => productService.getProductActivity(product.id),
//       })) || [],
//   });

//   const allActivities = activitiesQueries.map(
//     (q) =>
//       q.data?.map((a) => ({
//         ...a,
//         eventType: a.evenType ?? a.evenType,
//       })) ?? [],
//   );
//   const activitiesLoading = activitiesQueries.some((q) => q.isLoading);

//   // Convert ProductSummary[] => OwnedProduct[]

//   const shortenAddress = (addr: string) =>
//     addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';

//   if (isLoading) return <CircularProgress />;
//   if (isError || !user) return <Typography>User not found</Typography>;

//   const stats = [
//     {
//       label: 'TOTAL REVENUE',
//       value: ownedProducts.reduce(
//         (sum: number, p: ProductSummary) => sum + Number(p.price || 0),
//         0,
//       ),
//     },
//     { label: 'FOLLOWERS', value: user.followCount },
//     { label: 'NUMBER OF WORKS', value: ownedProducts.length },
//     {
//       label: 'FLOOR PRICE',
//       value: ownedProducts.length
//         ? Math.min(
//             ...ownedProducts.map((p: ProductSummary) => Number(p.price || 0)),
//           )
//         : 0,
//     },
//   ];

//   return (
//     <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
//       {/* Background */}
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
//           zIndex: 1,
//           mt: 37.5,
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//         }}
//       />

//       <Box sx={{ position: 'relative', width: '100%', color: '#fff' }}>
//         {/* Banner */}
//         <Box
//           sx={{
//             width: '100%',
//             height: 320,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'brightness(0.6)',
//             zIndex: 12,
//           }}
//         >
//           <UserHeader
//             type="banner"
//             src={
//               user.background
//                 ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}`
//                 : null
//             }
//           />
//         </Box>

//         {/* Back button */}
//         <Button
//           onClick={onBack}
//           sx={{
//             position: 'absolute',
//             top: 20,
//             left: 20,
//             background: 'rgba(0,0,0,0.4)',
//             color: '#fff',
//             textTransform: 'none',
//             borderRadius: 2,
//             zIndex: 14,
//             '&:hover': { background: 'rgba(0,0,0,0.6)' },
//           }}
//         >
//           <ArrowBack fontSize="small" sx={{ mr: 1 }} /> Quay lại
//         </Button>

//         {/* Info Section */}
//         <Box sx={{ px: 6, mt: -10, position: 'relative', zIndex: 14 }}>
//           <Stack
//             direction="row"
//             spacing={4}
//             alignItems="flex-start"
//             sx={{ mt: -8, px: 7, position: 'relative' }}
//           >
//             <UserHeader
//               type="avatar"
//               src={
//                 user.avatar
//                   ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}`
//                   : null
//               }
//               size={120}
//             />

//             <Box>
//               <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff' }}>
//                 {user.fullName}
//               </Typography>

//               <Stack direction="row" spacing={1} alignItems="center">
//                 <Typography sx={{ color: '#A0A0C0', fontSize: '1rem' }}>
//                   {shortenAddress(user.addressWallet)}
//                 </Typography>
//                 <Tooltip title="Copy Wallet Address">
//                   <ContentCopyIcon
//                     sx={{
//                       fontSize: 15,
//                       color: '#A0A0C0',
//                       cursor: 'pointer',
//                       '&:hover': { color: '#fff' },
//                     }}
//                     onClick={() =>
//                       navigator.clipboard.writeText(user.addressWallet)
//                     }
//                   />
//                 </Tooltip>
//               </Stack>

//               <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     textTransform: 'none',
//                     background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
//                   }}
//                 >
//                   Follow
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderColor: 'rgba(255,255,255,0.1)',
//                     textTransform: 'none',
//                     color: '#fff',
//                   }}
//                 >
//                   Chia sẻ
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderColor: 'rgba(255,255,255,0.1)',
//                     textTransform: 'none',
//                     color: '#fff',
//                   }}
//                   onClick={() => setOpenEditProfile(true)}
//                 >
//                   Chỉnh sửa Profile
//                 </Button>
//                 <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                   <Twitter sx={{ color: '#cfcfff', cursor: 'pointer' }} />
//                   <Instagram sx={{ color: '#cfcfff', cursor: 'pointer' }} />
//                 </Stack>
//               </Stack>

//               <Typography
//                 sx={{ color: '#CFCFFF', my: 5, maxWidth: 800, ml: -25 }}
//               >
//                 {user.bio || 'No bio yet.'}
//               </Typography>
//             </Box>
//           </Stack>

//           {/* Stats */}
//           <Grid container spacing={4} sx={{ mt: 6, mb: 4 }}>
//             {stats.map((stat) => (
//               <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
//                 <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
//                   {stat.value}
//                 </Typography>
//                 <Typography sx={{ color: '#9b9bbf', fontSize: 14 }}>
//                   {stat.label}
//                 </Typography>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Tabs */}
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//             <Tabs
//               value={tab}
//               onChange={(e, val) => setTab(val)}
//               textColor="secondary"
//               indicatorColor="secondary"
//               sx={{
//                 flex: 1,
//                 '& .MuiTab-root': {
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   color: 'rgba(255,255,255,0.7)',
//                 },
//                 '& .Mui-selected': { color: 'secondary.main' },
//               }}
//             >
//               <Tab label="Đã tạo" />
//               <Tab label="Sở hữu" />
//               <Tab label="Bộ sưu tập" />
//               <Tab label="Yêu thích" />
//             </Tabs>
//             <Button
//               variant="contained"
//               sx={{ ml: 2 }}
//               onClick={() => router.push('/upload')}
//             >
//               Tải thêm
//             </Button>
//           </Box>

//           {/* Tab Content */}
//           {tab === 0 && (
//             <CreatedTab
//               ownedProducts={ownedProductsConverted}
//               allActivities={allActivities}
//               activitiesLoading={activitiesLoading}
//               handleOpenEdit={(
//                 product: OwnedProduct,
//                 activities: ProductActivity[],
//               ) => {
//                 // activities là mảng activity liên quan đến product
//                 setSelectedProduct(product);
//                 setSelectedProductIsMinted(activities.length > 0); // nếu có activity thì coi là đã mint
//                 setOpenEditDialog(true);
//               }}
//               openSellModal={(productId: number, price: string) => {
//                 setSellProductId(productId);
//                 setSellProductPrice(price);
//                 setOpenSellModal(true);
//               }}
//               walletMode={false}
//             />
//           )}
//           {tab === 1 && (
//             <OwnedTab
//               ownedProducts={ownedProductsConverted}
//               allActivities={allActivities}
//               activitiesLoading={activitiesLoading}
//               handleOpenEdit={(
//                 product: OwnedProduct,
//                 activities: ProductActivity[],
//               ) => {
//                 setSelectedProduct(product);
//                 setSelectedProductIsMinted(activities.length > 0);
//                 setOpenEditDialog(true);
//               }}
//               openSellModal={(productId: number, price: string) => {
//                 setSellProductId(productId);
//                 setSellProductPrice(price);
//                 setOpenSellModal(true);
//               }}
//               walletMode={false}
//             />
//           )}
//           {tab === 2 && (
//             <CollectionTab
//               mintedProducts={ownedProductsConverted}
//               allActivities={allActivities}
//             />
//           )}
//         </Box>
//       </Box>

//       {selectedProduct && (
//         <EditNFTModal
//           open={openEditDialog}
//           onClose={() => setOpenEditDialog(false)}
//           product={selectedProduct}
//           onUpdate={refetch}
//           isMinted={selectedProductIsMinted}
//         />
//       )}
//       {sellProductId && (
//         <SellNFT
//           open={openSellModal}
//           onClose={() => setOpenSellModal(false)}
//           productId={sellProductId}
//           defaultPrice={sellProductPrice}
//         />
//       )}
//       {openEditProfile && user && (
//         <EditProfileModal
//           open={openEditProfile}
//           onClose={() => setOpenEditProfile(false)}
//           user={user}
//         />
//       )}
//     </Stack>
//   );
// };

// export default CreatorDetail;
