// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Stack,
//   Typography,
// } from '@mui/material';
// import toast from 'react-hot-toast';
// import { ethers } from 'ethers';

// import {
//   OwnedProduct,
//   ProductProperty,
//   UpdateProductPayload,
//   ApiResponse,
// } from '@/types/product';
// import { useUpdateProduct } from '@/hooks/useProduct';
// import PreviewMetadataDialog from './PreviewMetadataDialog';
// import ConfirmUpdateDialog from './ConfirmUpdateDialog';
// import { useLandingPageNFT } from '@/hooks/useLandingPageNFT';
// import { landingPageNFTService } from '@/services/landingPageNFTService';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   product: OwnedProduct;
//   onUpdate?: () => void;
//   isMinted?: boolean;
// }

// interface NFTMetadata {
//   name: string;
//   description: string;
//   image: string;
//   external_url: string;
//   attributes: { trait_type: string; value: string }[];
// }

// interface NFTMetadataWithURI extends NFTMetadata {
//   tokenURI: string;
// }

// interface OnChainUpdateData {
//   tokenId: number;
//   tokenURI: string;
//   price: string;
//   name: string;
//   description: string;
// }

// const EditNFTModal: React.FC<Props> = ({
//   open,
//   onClose,
//   product,
//   onUpdate,
//   isMinted = false,
// }) => {
//   const frozen = Boolean(product.isFreeze);
//   const updateProductMutation = useUpdateProduct();

//   // Form states
//   const [name, setName] = useState(product.name);
//   const [description, setDescription] = useState(product.description);
//   const [externalLink, setExternalLink] = useState(product.externalLink || '');
//   const [image, setImage] = useState<File | null>(null);
//   const [properties, setProperties] = useState<ProductProperty[]>([...product.properties]);
//   const [price, setPrice] = useState(product.price);

//   // On-chain & preview states
//   const [metadataPreview, setMetadataPreview] = useState<NFTMetadataWithURI | null>(null);
//   const [openPreview, setOpenPreview] = useState(false);
//   const [onChainData, setOnChainData] = useState<OnChainUpdateData | null>(null);
//   const [openConfirm, setOpenConfirm] = useState(false);

//   const { updateNFT: updateNFTOnChain } = useLandingPageNFT();

//   useEffect(() => {
//     setName(product.name);
//     setDescription(product.description);
//     setExternalLink(product.externalLink || '');
//     setImage(null);
//     setProperties([...product.properties]);
//     setPrice(product.price);
//   }, [product]);

//   // ======================== SAVE → BACKEND ========================
//   const saveUpdate = () => {
//   const payload: UpdateProductPayload = frozen
//     ? { id: String(product.id), price }
//     : {
//         id: String(product.id),
//         name: name.trim(),
//         description: description.trim(),
//         image: image ?? undefined,
//         externalLink: externalLink.trim(),
//         properties,
//         price,
//       };

//   updateProductMutation.mutate(payload, {
//   onSuccess: (res) => {
//     // Nếu response của bạn là {success, message, data}
//     const tokenURI = res?.data; // ⭐ lấy data bên trong data
//     if (!tokenURI) {
//       toast.error('Không lấy được tokenURI mới!');
//       return;
//     }

//     console.log('TokenURI mới:', tokenURI);

//     const imageURL = image ? URL.createObjectURL(image) : product.image;

//     const metadata: NFTMetadataWithURI = {
//       name,
//       description,
//       image: imageURL,
//       external_url: externalLink,
//       attributes: properties.map((p) => ({ trait_type: p.type, value: p.name })),
//       tokenURI,
//     };

//     setMetadataPreview(metadata);
//     setOpenPreview(true);

//     setOnChainData({
//       tokenId: Number(product.tokenId),
//       tokenURI,
//       price: price || '0',
//       name,
//       description,
//     });
//   },
//   onError: (err) => {
//     toast.error(err instanceof Error ? err.message : 'Cập nhật thất bại!');
//   },
// });

// };

//   // ======================== CONFIRM → ON-CHAIN ========================
//   const confirmUpdate = (metadata: NFTMetadataWithURI) => {
//     setOnChainData({
//       tokenId: Number(product.tokenId), // 0 nếu chưa mint
//       tokenURI: metadata.tokenURI,
//       price: price || '0',
//       name: metadata.name,
//       description: metadata.description,
//     });
//     setOpenPreview(false);
//     setOpenConfirm(true);
//   };

//   // ======================== HANDLE ON-CHAIN CONFIRM ========================
//   const handleConfirmOnChain = async () => {
//     if (!onChainData) return;

//     try {
//       if (!window.ethereum) throw new Error('Cần kết nối ví Web3!');

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       if (onChainData.tokenId === 0) {
//         // Mint mới
//         const tx = await landingPageNFTService.mintFullNFT(signer, {
//           nameToken: onChainData.name,
//           tokenURI: onChainData.tokenURI,
//           description: onChainData.description,
//           price: Number(onChainData.price),
//         });
//         const receipt = await tx.wait();
//         const newTokenId = receipt.events?.[0]?.args?.tokenId?.toNumber() || 0;
//         toast.success('Mint NFT thành công!');
//         onUpdate?.();
//         setOpenConfirm(false);
//         setOnChainData({ ...onChainData, tokenId: newTokenId });
//       } else {
//         // Update NFT đã mint
//         const tx = await updateNFTOnChain(onChainData.tokenId, onChainData.tokenURI, Number(onChainData.price));
//         await tx.wait();
//         toast.success('Cập nhật NFT trên blockchain thành công!');
//         onUpdate?.();
//         setOpenConfirm(false);
//       }
//     } catch (err: unknown) {
//       console.error(err);
//       toast.error(err instanceof Error ? err.message : 'Cập nhật thất bại!');
//     }
//   };

//   const handleSaveClick = () => {
//     if (!name.trim() || !description.trim()) {
//       toast.error('Vui lòng điền đầy đủ thông tin!');
//       return;
//     }
//     saveUpdate();
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//         <DialogTitle>{isMinted ? 'Update Minted NFT' : 'Update / Create NFT'}</DialogTitle>
//         <DialogContent>
//           <Stack spacing={2}>
//             <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
//             <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline />
//             <TextField label="External Link" value={externalLink} onChange={(e) => setExternalLink(e.target.value)} fullWidth />
//             <Button variant="outlined" component="label">
//               Upload Image
//               <input type="file" hidden accept="image/*" onChange={(e) => e.target.files && setImage(e.target.files[0])} />
//             </Button>
//             <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Close</Button>
//           <Button onClick={handleSaveClick} variant="contained" disabled={updateProductMutation.isPending}>
//             {updateProductMutation.isPending ? 'Saving...' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {metadataPreview && (
//         <>
//         <PreviewMetadataDialog
//           open={openPreview}
//           onClose={() => setOpenPreview(false)}
//           metadata={metadataPreview}
//           onNext={() => confirmUpdate(metadataPreview)}
//         />
//         <Typography sx={{ mt: 2, wordBreak: 'break-all' }}>
//     TokenURI mới: {metadataPreview.tokenURI}
//   </Typography>
//         </>
//       )}

//       {onChainData && (
//         <ConfirmUpdateDialog
//           open={openConfirm}
//           onClose={() => setOpenConfirm(false)}
//           data={onChainData}
//           onConfirm={handleConfirmOnChain}
//         />
//       )}
//     </>
//   );
// };

// export default EditNFTModal;

'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Chip,
  Box,
} from '@mui/material';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';

import {
  OwnedProduct,
  ProductProperty,
  UpdateProductPayload,
  NFTMetadataWithURI,
} from '@/types/product';
import { useUpdateProduct } from '@/hooks/useProduct';
import PreviewMetadataDialog from './PreviewMetadataDialog';
import ConfirmUpdateDialog from './ConfirmUpdateDialog';
import { useLandingPageNFT } from '@/hooks/useLandingPageNFT';
import { landingPageNFTService } from '@/services/landingPageNFTService';

interface Props {
  open: boolean;
  onClose: () => void;
  product: OwnedProduct;
  onUpdate?: () => void;
  isMinted?: boolean;
}

interface OnChainUpdateData {
  tokenId: number;
  tokenURI: string;
  price: string;
  name: string;
  description: string;
}

const EditNFTModal: React.FC<Props> = ({
  open,
  onClose,
  product,
  onUpdate,
  isMinted = false,
}) => {
  const frozen = Boolean(product.isFreeze);
  const updateProductMutation = useUpdateProduct();

  // Form states
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [externalLink, setExternalLink] = useState(product.externalLink || '');
  const [image, setImage] = useState<File | null>(null);
  const [properties, setProperties] = useState<ProductProperty[]>([
    ...product.properties,
  ]);
  const [supply, setSupply] = useState(product.supply || 1);
  const [blockchain, setBlockchain] = useState(product.blockchain || '');
  const [price, setPrice] = useState(product.price);

  // On-chain & preview states
  const [metadataPreview, setMetadataPreview] =
    useState<NFTMetadataWithURI | null>(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [onChainData, setOnChainData] = useState<OnChainUpdateData | null>(
    null,
  );
  const [openConfirm, setOpenConfirm] = useState(false);

  const { updateNFT: updateNFTOnChain } = useLandingPageNFT();

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setExternalLink(product.externalLink || '');
    setImage(null);
    setProperties([...product.properties]);
    setSupply(product.supply || 1);
    setBlockchain(product.blockchain || '');
    setPrice(product.price);
  }, [product]);

  // ======================== SAVE → BACKEND ========================
  const saveUpdate = () => {
    // Kiểm tra bắt buộc các trường nếu chưa frozen
    if (!frozen) {
      if (
        !name.trim() ||
        !description.trim() ||
        (!image && !product.image) ||
        !externalLink.trim() ||
        !properties.length ||
        !supply ||
        !blockchain.trim() ||
        !price
      ) {
        toast.error('Vui lòng điền đầy đủ tất cả các thông tin NFT!');
        return;
      }
    }

    // Nếu frozen chỉ update price
    const payload: UpdateProductPayload = frozen
      ? { id: String(product.id), price }
      : {
          id: String(product.id),
          name: name.trim(),
          description: description.trim(),
          image: image ?? undefined,
          externalLink: externalLink.trim(),
          properties,
          supply,
          blockchain,
          price,
          isFreeze: product.isFreeze,
        };

    updateProductMutation.mutate(payload, {
      onSuccess: (res) => {
        const tokenURI = res?.data;
        if (!tokenURI) {
          toast.error('Không lấy được tokenURI mới!');
          return;
        }

        const imageURL = image ? URL.createObjectURL(image) : product.image;

        const metadata: NFTMetadataWithURI = {
          name,
          description,
          image: imageURL,
          external_url: externalLink,
          attributes: properties.map((p) => ({
            trait_type: p.type,
            value: p.name,
          })),
          tokenURI,
        };

        setMetadataPreview(metadata);
        setOpenPreview(true);

        setOnChainData({
          tokenId: Number(product.tokenId),
          tokenURI,
          price: price || '0',
          name,
          description,
        });
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : 'Cập nhật thất bại!');
      },
    });
  };

  // ======================== CONFIRM → ON-CHAIN ========================
  const confirmUpdate = (metadata: NFTMetadataWithURI) => {
    setOnChainData({
      tokenId: Number(product.tokenId),
      tokenURI: metadata.tokenURI,
      price: price || '0',
      name: metadata.name,
      description: metadata.description,
    });
    setOpenPreview(false);
    setOpenConfirm(true);
  };

  const handleConfirmOnChain = async () => {
    if (!onChainData) return;

    try {
      if (!window.ethereum) throw new Error('Cần kết nối ví Web3!');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      if (onChainData.tokenId === 0) {
        const tx = await landingPageNFTService.mintFullNFT(signer, {
          nameToken: onChainData.name,
          tokenURI: onChainData.tokenURI,
          description: onChainData.description,
          price: Number(onChainData.price),
        });
        const receipt = await tx.wait();
        const newTokenId = receipt.events?.[0]?.args?.tokenId?.toNumber() || 0;
        toast.success('Mint NFT thành công!');
        onUpdate?.();
        setOpenConfirm(false);
        setOnChainData({ ...onChainData, tokenId: newTokenId });
      } else {
        const tx = await updateNFTOnChain(
          onChainData.tokenId,
          onChainData.tokenURI,
          Number(onChainData.price),
        );
        await tx.wait();
        toast.success('Cập nhật NFT trên blockchain thành công!');
        onUpdate?.();
        setOpenConfirm(false);
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Cập nhật thất bại!');
    }
  };

  return (
    <>
      {/* <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isMinted ? 'Update Minted NFT' : 'Update / Create NFT'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} pt={2}>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth disabled={frozen} />
            <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline disabled={frozen} />
            <TextField label="External Link" value={externalLink} onChange={(e) => setExternalLink(e.target.value)} fullWidth disabled={frozen} />
            <Button variant="outlined" component="label" disabled={frozen}>
              Upload Image
              <input type="file" hidden accept="image/*" onChange={(e) => e.target.files && setImage(e.target.files[0])} />
            </Button>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {properties.map((p, idx) => (
                <Chip key={idx} label={`${p.type}: ${p.name}`} color="secondary" size="small" sx={{ mb: 0.5 }} />
              ))}
            </Stack>
            <TextField label="Supply" type="number" value={supply} onChange={(e) => setSupply(Number(e.target.value))} fullWidth disabled={frozen} />
            <TextField label="Blockchain" value={blockchain} onChange={(e) => setBlockchain(e.target.value)} fullWidth disabled={frozen} />
            <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={saveUpdate} variant="contained" disabled={updateProductMutation.isPending}>
            {updateProductMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(160deg, #0f0f0f 0%, #1a0f2b 100%)',
            border: '1px solid #7a3bff',
            boxShadow: '0 0 25px rgba(122,59,255,0.6)',
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: '#fff',
            fontWeight: 700,
            textAlign: 'center',
            textShadow: '0 0 6px #7a3bff',
          }}
        >
          {isMinted ? 'Update Minted NFT' : 'Update / Create NFT'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} pt={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              disabled={frozen}
              sx={{
                input: { color: '#fff' },
                label: { color: '#aaa' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#7a3bff' },
                  '&:hover fieldset': { borderColor: '#ff5ca2' },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff5ca2',
                    boxShadow: '0 0 8px #ff5ca2',
                  },
                },
              }}
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              disabled={frozen}
              sx={{
                textarea: { color: '#fff' },
                label: { color: '#aaa' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#7a3bff' },
                  '&:hover fieldset': { borderColor: '#ff5ca2' },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff5ca2',
                    boxShadow: '0 0 8px #ff5ca2',
                  },
                },
              }}
            />

            <TextField
              label="External Link"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              fullWidth
              disabled={frozen}
              sx={{
                input: { color: '#fff' },
                label: { color: '#aaa' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#7a3bff' },
                  '&:hover fieldset': { borderColor: '#ff5ca2' },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff5ca2',
                    boxShadow: '0 0 8px #ff5ca2',
                  },
                },
              }}
            />

            <Button
              variant="outlined"
              component="label"
              disabled={frozen}
              sx={{
                color: '#fff',
                borderColor: '#7a3bff',
                '&:hover': {
                  borderColor: '#ff5ca2',
                  boxShadow: '0 0 12px #ff5ca2',
                },
              }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
              />
            </Button>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {properties.map((p, idx) => (
                <Chip
                  key={idx}
                  label={`${p.type}: ${p.name}`}
                  color="secondary"
                  size="small"
                  sx={{
                    border: '1px solid #7a3bff',
                    color: '#fff',
                    background: 'rgba(122,59,255,0.1)',
                    textShadow: '0 0 4px #7a3bff',
                  }}
                />
              ))}
            </Box>

            <TextField
              label="Supply"
              type="number"
              value={supply}
              onChange={(e) => setSupply(Number(e.target.value))}
              fullWidth
              disabled={frozen}
              sx={{
                input: { color: '#fff' },
                label: { color: '#aaa' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#7a3bff' },
                  '&:hover fieldset': { borderColor: '#ff5ca2' },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff5ca2',
                    boxShadow: '0 0 8px #ff5ca2',
                  },
                },
              }}
            />

            <TextField
              label="Blockchain"
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value)}
              fullWidth
              disabled={frozen}
              sx={{
                input: { color: '#fff' },
                label: { color: '#aaa' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#7a3bff' },
                  '&:hover fieldset': { borderColor: '#ff5ca2' },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff5ca2',
                    boxShadow: '0 0 8px #ff5ca2',
                  },
                },
              }}
            />

            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              sx={{
                input: { color: '#fff', fontWeight: 700 },
                label: { color: '#fff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ff5ca2' },
                  '&.Mui-focused fieldset': { boxShadow: '0 0 10px #ff5ca2' },
                },
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={onClose}
            sx={{
              color: '#fff',
              border: '1px solid #7a3bff',
              '&:hover': { boxShadow: '0 0 12px #7a3bff' },
            }}
          >
            Close
          </Button>
          <Button
            onClick={saveUpdate}
            variant="contained"
            disabled={updateProductMutation.isPending}
            sx={{
              background: 'linear-gradient(90deg,#7a3bff,#ff5ca2)',
              boxShadow: '0 0 12px #ff5ca2',
              '&:hover': { boxShadow: '0 0 20px #ff5ca2' },
            }}
          >
            {updateProductMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {metadataPreview && (
        <PreviewMetadataDialog
          open={openPreview}
          onClose={() => setOpenPreview(false)}
          metadata={metadataPreview}
          onNext={() => confirmUpdate(metadataPreview)}
        />
      )}

      {onChainData && (
        <ConfirmUpdateDialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          data={onChainData}
          onConfirm={handleConfirmOnChain}
        />
      )}
    </>
  );
};

export default EditNFTModal;

