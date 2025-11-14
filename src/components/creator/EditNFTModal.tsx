// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Stack,
//   Typography,
//   Checkbox,
//   FormControlLabel,
// } from '@mui/material';
// import toast from 'react-hot-toast';
// import { ethers } from 'ethers';

// import { OwnedProduct, ProductProperty, UpdateProductPayload, ApiResponse } from '@/types/product';
// import { useUpdateProduct } from '@/hooks/useProduct';
// import { landingPageNFTService } from '@/services/landingPageNFTService';

// import ConfirmOnChainDialog from './ConfirmOnChainDialog';
// import PreviewMetadataDialog from './PreviewMetadataDialog';

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

// interface OnChainData {
//   name: string;
//   description: string;
//   tokenURI: string;
//   price: number;
// }

// const EditNFTModal: React.FC<Props> = ({ open, onClose, product, onUpdate, isMinted = false }) => {
//   const frozen = Boolean(product.isFreeze);
//   const updateProductMutation = useUpdateProduct();

//   // Form states
//   const [name, setName] = useState(product.name);
//   const [description, setDescription] = useState(product.description);
//   const [externalLink, setExternalLink] = useState(product.externalLink || '');
//   const [image, setImage] = useState<File | null>(null);
//   const [properties, setProperties] = useState<ProductProperty[]>([...product.properties]);
//   const [supply, setSupply] = useState(product.supply || 0);
//   const [blockchain, setBlockchain] = useState(product.blockchain || '');
//   const [price, setPrice] = useState(product.price);
//   const [isFreezeState, setIsFreezeState] = useState(frozen);

//   // On-chain & preview states
//   const [metadataPreview, setMetadataPreview] = useState<NFTMetadata | null>(null);
//   const [openPreview, setOpenPreview] = useState(false);
//   const [onChainData, setOnChainData] = useState<OnChainData | null>(null);
//   const [openConfirm, setOpenConfirm] = useState(false);

//   useEffect(() => {
//     setName(product.name);
//     setDescription(product.description);
//     setExternalLink(product.externalLink || '');
//     setImage(null);
//     setProperties([...product.properties]);
//     setSupply(product.supply || 0);
//     setBlockchain(product.blockchain || '');
//     setPrice(product.price);
//     setIsFreezeState(frozen);
//   }, [product, frozen]);

//   // ======================== SAVE → BACKEND ========================
// const saveUpdate = () => {
//   const payload: UpdateProductPayload = frozen
//     ? { id: String(product.id), price }
//     : {
//         id: String(product.id),
//         name: name.trim(),
//         description: description.trim(),
//         image: image ?? undefined,
//         externalLink: externalLink.trim(),
//         properties,
//         supply,
//         blockchain: blockchain.trim(),
//         price,
//         isFreeze: isFreezeState,
//       };

//   updateProductMutation.mutate(payload, {
//     onSuccess: (res: ApiResponse<string>) => {
//       toast.success('Cập nhật thành công!');
//       onUpdate?.();
//       onClose();

//       // Lấy tokenURI mới nếu có, nếu không thì lấy tokenURI hiện tại
//       const tokenURI = res?.data || product.tokenURI || '';
      
//       // Bước 2 — tạo preview metadata nếu có tokenURI
//       if (tokenURI) {
//         const metadata: NFTMetadata = {
//           name,
//           description,
//           image: tokenURI,
//           external_url: externalLink,
//           attributes: properties.map(p => ({ trait_type: p.type, value: p.name })),
//         };

//         setMetadataPreview(metadata);
//         setOpenPreview(true);
//       }
//     },
//     onError: (err) => {
//       toast.error(err instanceof Error ? err.message : 'Cập nhật thất bại!');
//     },
//   });
// };

//   // ======================== CONFIRM METADATA → OPEN ON-CHAIN DIALOG ========================
//   const confirmMetadata = (tokenURI: string) => {
//     setOnChainData({
//       name,
//       description,
//       tokenURI,
//       price,
//     });
//     setOpenPreview(false);
//     setOpenConfirm(true);
//   };

//   // ======================== MINT NFT ON-CHAIN ========================
//   const handleMintOnChain = async () => {
//     if (!window.ethereum) {
//       toast.error('Bạn cần ví Web3 để mint NFT!');
//       return;
//     }

//     if (!onChainData) return;

//     try {
//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();

//   if (!onChainData) return;

//   const tx = await landingPageNFTService.mintFullNFT(signer, {
//     nameToken: onChainData.name,
//     tokenURI: onChainData.tokenURI,
//     description: onChainData.description,
//     price: onChainData.price,
//   });

//   await tx.wait();

//   toast.success('Mint NFT thành công!');
//   setOpenConfirm(false);
// } catch (err: unknown) {
//   if (err instanceof Error) {
//     // err.message có kiểu string
//     console.error(err);
//     toast.error(`Mint NFT thất bại: ${err.message}`);
//   } else {
//     console.error(err);
//     toast.error('Mint NFT thất bại: Unknown error');
//   }
// }

//   };

//   // ======================== UI ========================
//   const handleSave = () => {
//     if (!name.trim() || !description.trim() || !blockchain.trim()) {
//       toast.error('Vui lòng điền đầy đủ thông tin!');
//       return;
//     }
//     saveUpdate();
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Update / Create NFT</DialogTitle>
//         <DialogContent>
//           <Stack spacing={2}>
//             <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
//             <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth multiline />
//             <TextField label="External Link" value={externalLink} onChange={e => setExternalLink(e.target.value)} fullWidth />

//             <Button variant="outlined" component="label">
//               Upload Image
//               <input type="file" hidden accept="image/*" onChange={e => e.target.files && setImage(e.target.files[0])} />
//             </Button>

//             <TextField label="Price (ETH)" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} fullWidth />

//             {!frozen && (
//               <FormControlLabel
//                 control={<Checkbox checked={isFreezeState} onChange={e => setIsFreezeState(e.target.checked)} />}
//                 label="Frozen?"
//               />
//             )}
//           </Stack>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={onClose}>Close</Button>
//           <Button onClick={handleSave} variant="contained" disabled={updateProductMutation.isPending}>
//             {updateProductMutation.isPending ? 'Saving...' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {metadataPreview && (
//         <PreviewMetadataDialog
//           open={openPreview}
//           onClose={() => setOpenPreview(false)}
//           metadata={metadataPreview}
//           onNext={() => confirmMetadata(metadataPreview.image)}
//         />
//       )}

//       {onChainData && (
//         <ConfirmOnChainDialog
//           open={openConfirm}
//           onClose={() => setOpenConfirm(false)}
//           data={onChainData}
//           onConfirm={handleMintOnChain}
//         />
//       )}
//     </>
//   );
// };

// export default EditNFTModal;


'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';

import { OwnedProduct, ProductProperty, UpdateProductPayload, ApiResponse } from '@/types/product';
import { useUpdateProduct } from '@/hooks/useProduct';
import { landingPageNFTService } from '@/services/landingPageNFTService';

import PreviewMetadataDialog from './PreviewMetadataDialog';
import ConfirmUpdateDialog from './ConfirmUpdateDialog'; // modal mới cho update on-chain

import { useLandingPageNFT } from '@/hooks/useLandingPageNFT';

interface Props {
  open: boolean;
  onClose: () => void;
  product: OwnedProduct;
  onUpdate?: () => void;
  isMinted?: boolean;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: { trait_type: string; value: string }[];
}

interface OnChainUpdateData {
  tokenId: number;
  tokenURI: string;
  price: number;
}

const EditNFTModal: React.FC<Props> = ({ open, onClose, product, onUpdate, isMinted = false }) => {
  const frozen = Boolean(product.isFreeze);
  const updateProductMutation = useUpdateProduct();

  // Form states
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [externalLink, setExternalLink] = useState(product.externalLink || '');
  const [image, setImage] = useState<File | null>(null);
  const [properties, setProperties] = useState<ProductProperty[]>([...product.properties]);
  const [price, setPrice] = useState(product.price);

  // On-chain & preview states
  const [metadataPreview, setMetadataPreview] = useState<NFTMetadata | null>(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [onChainData, setOnChainData] = useState<OnChainUpdateData | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const { updateNFT: updateNFTOnChain } = useLandingPageNFT();

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setExternalLink(product.externalLink || '');
    setImage(null);
    setProperties([...product.properties]);
    setPrice(product.price);
  }, [product]);

  // ======================== SAVE → BACKEND ========================
  const saveUpdate = () => {
    const payload: UpdateProductPayload = frozen
      ? { id: String(product.id), price }
      : {
          id: String(product.id),
          name: name.trim(),
          description: description.trim(),
          image: image ?? undefined,
          externalLink: externalLink.trim(),
          properties,
          price,
        };

    updateProductMutation.mutate(payload, {
      onSuccess: (res: ApiResponse<string>) => {
        toast.success('Cập nhật thành công!');
        onUpdate?.();
        onClose();

        const tokenURI = res?.data || product.tokenURI || '';
        if (tokenURI) {
          const metadata: NFTMetadata = {
            name,
            description,
            image: tokenURI,
            external_url: externalLink,
            attributes: properties.map((p) => ({ trait_type: p.type, value: p.name })),
          };
          setMetadataPreview(metadata);
          setOpenPreview(true);
        }
      },
      onError: (err) => {
        toast.error(err instanceof Error ? err.message : 'Cập nhật thất bại!');
      },
    });
  };

  // ======================== CONFIRM → OPEN UPDATE DIALOG ========================
  const confirmUpdate = (tokenURI: string) => {
    setOnChainData({
      tokenId: Number(product.tokenId),
      tokenURI,
      price: price || 0,
    });
    setOpenPreview(false);
    setOpenConfirm(true);
  };

  // ======================== UPDATE NFT ON-CHAIN ========================
  const updateNFT = useCallback(
  async (tokenId: number, tokenURI: string, price: number) => {
    try {
      const tx = await updateNFTOnChain(tokenId, tokenURI, price); // hook handles wallet internally
      if (!tx) throw new Error('Không thể lấy giao dịch');

      toast.success('Cập nhật NFT thành công trên blockchain!');
      onUpdate?.();
      setOpenConfirm(false);

      return tx.hash; // trả về txHash nếu muốn hiển thị Etherscan link
    } catch (err: unknown) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Cập nhật NFT thất bại');
    }
  },
  [updateNFTOnChain, onUpdate]
);

  // ======================== UI ========================
  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    saveUpdate();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isMinted ? 'Update Minted NFT' : 'Update / Create NFT'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
            />
            <TextField
              label="External Link"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              fullWidth
            />

            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
              />
            </Button>

            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleSave} variant="contained" disabled={updateProductMutation.isPending}>
            {updateProductMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {metadataPreview && (
        <PreviewMetadataDialog
          open={openPreview}
          onClose={() => setOpenPreview(false)}
          metadata={metadataPreview}
          onNext={() => confirmUpdate(metadataPreview.image)}
        />
      )}

      {onChainData && (
        <ConfirmUpdateDialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          data={onChainData}
          onConfirm={() => updateNFT(onChainData.tokenId, onChainData.tokenURI, onChainData.price)}
        />
      )}
    </>
  );
};

export default EditNFTModal;
