'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import toast from 'react-hot-toast';
import { ethers, TransactionReceipt } from 'ethers';

import nftAbi from '@/abis/NFT.json';
import { marketplaceAddress, nftAddress } from '@/constants/addresses';
import { marketplaceNFTService } from '@/services/marketplaceService';
import { cancelProduct } from '@/services/productService';
import { Product } from '@/types/product';

interface Props {
  open: boolean;
  onClose: () => void;
  tokenId: number;
  defaultPrice: string;
  product?: Product;
}

function extractListingIdFromReceipt(
  receipt: TransactionReceipt | null,
): string | null {
  if (!receipt?.logs) return null;

  const eventSignature = 'ItemListed(uint256,address,address,uint256,uint256)';
  const eventTopic = ethers.id(eventSignature);

  const iface = new ethers.Interface([`event ${eventSignature}`]);
  const abiCoder = new ethers.AbiCoder();

  for (const log of receipt.logs) {
    try {
      if (!log.topics || log.topics.length === 0) continue;
      if (log.topics[0] !== eventTopic) continue;

      try {
        const parsed = iface.parseLog(log);
        if (parsed?.name === 'ItemListed') {
          const listingId = parsed.args.listingId?.toString?.() ?? null;
          if (listingId) return listingId;
        }
      } catch {}

      if (log.topics.length >= 2) {
        try {
          const listingIdFromTopic = BigInt(log.topics[1]).toString();
          if (listingIdFromTopic) return listingIdFromTopic;
        } catch {}
      }

      if (log.data && log.data !== '0x') {
        try {
          const decoded = abiCoder.decode(
            ['uint256', 'address', 'address', 'uint256', 'uint256'],
            log.data,
          );
          if (decoded?.length > 0) return decoded[0]?.toString?.() ?? null;
        } catch {}
      }
    } catch (err) {
      console.warn(
        'extractListingIdFromReceipt error for one log, continuing',
        err,
      );
    }
  }

  return null;
}

function extractAuctionFromReceipt(receipt: TransactionReceipt | null): {
  auctionId: string;
  seller: string;
  nftAddress: string;
  tokenId: string;
  minPrice: string;
  startTime: string;
  endTime: string;
} | null {
  if (!receipt?.logs) return null;

  const iface = new ethers.Interface([
    'event AuctionCreated(uint256 indexed auctionId, address indexed seller, address indexed nftAddress, uint256 tokenId, uint256 minPrice, uint256 startTime, uint256 endTime)',
  ]);

  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog(log);
      if (parsed?.name === 'AuctionCreated') {
        return {
          auctionId: parsed.args.auctionId.toString(),
          seller: parsed.args.seller,
          nftAddress: parsed.args.nftAddress,
          tokenId: parsed.args.tokenId.toString(),
          minPrice: parsed.args.minPrice.toString(),
          startTime: parsed.args.startTime.toString(),
          endTime: parsed.args.endTime.toString(),
        };
      }
    } catch {
      continue;
    }
  }

  return null;
}

const SellNFT: React.FC<Props> = ({
  open,
  onClose,
  tokenId,
  defaultPrice,
  product,
}) => {
  const now = new Date();
  const defaultStart = new Date(now.getTime() + 60_000) // 1 phút sau
    .toISOString()
    .slice(0, 16); // yyyy-mm-ddThh:mm
  const defaultEnd = new Date(now.getTime() + 3600_000) // 1 giờ sau
    .toISOString()
    .slice(0, 16);

  const [price, setPrice] = useState(defaultPrice);
  const [type, setType] = useState<'buyNow' | 'onAuction'>('buyNow');
  const [startTime, setStartTime] = useState(defaultStart);
  const [endTime, setEndTime] = useState(defaultEnd);
  const [loading, setLoading] = useState(false);

  const handleSell = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const priceNum = Number(price);
      if (!price || isNaN(priceNum) || priceNum <= 0)
        throw new Error('Giá phải là số hợp lệ lớn hơn 0');

      if (type === 'onAuction' && (!startTime || !endTime))
        throw new Error('Vui lòng chọn ngày bắt đầu và kết thúc đấu giá');

      if (!window.ethereum) throw new Error('Vui lòng cài đặt MetaMask');

      const provider = new ethers.BrowserProvider(
        window.ethereum as ethers.Eip1193Provider,
      );
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
      const isApprovedForAll = await nftContract.isApprovedForAll(
        signerAddress,
        marketplaceAddress,
      );
      if (!isApprovedForAll) {
        const approvalTx = await nftContract.setApprovalForAll(
          marketplaceAddress,
          true,
        );
        await approvalTx.wait();
      }

      if (product?.listingId && type === 'onAuction') {
        await cancelProduct({ listingId: product.listingId });
        await marketplaceNFTService.cancelListing(signer, product.listingId);
      }

      if (type === 'buyNow') {
        const receipt = await marketplaceNFTService.listItem(
          signer,
          nftAddress,
          tokenId,
          priceNum,
        );
        const listingId = extractListingIdFromReceipt(receipt);
        toast.success(`NFT đã được list! ListingId: ${listingId ?? 'unknown'}`);
      } else if (type === 'onAuction') {
        const start = Date.parse(startTime);
        const end = Date.parse(endTime);
        const durationSeconds = Math.floor((end - start) / 1000);

        console.log({ startTime, endTime, start, end, durationSeconds });

        if (isNaN(start) || isNaN(end) || durationSeconds <= 0)
          throw new Error('Thời gian đấu giá không hợp lệ');

        const receipt = await marketplaceNFTService.createAuction(
          signer,
          nftAddress,
          tokenId,
          priceNum,
          durationSeconds,
        );

        const auction = extractAuctionFromReceipt(receipt);
        if (!auction) throw new Error('Không thể lấy AuctionId từ transaction');

        toast.success(`Auction created! AuctionId: ${auction.auctionId}`);
        console.log('Auction info:', auction);
      }

      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đăng bán thất bại';
      toast.error(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Đăng bán NFT</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Giá (ETH)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Loại bán"
            value={type}
            onChange={(e) => setType(e.target.value as 'buyNow' | 'onAuction')}
            fullWidth
          >
            <MenuItem value="buyNow">Buy Now</MenuItem>
            <MenuItem value="onAuction">On Auction</MenuItem>
          </TextField>
          {type === 'onAuction' && (
            <>
              <TextField
                label="Ngày và giờ bắt đầu"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Ngày và giờ kết thúc"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSell} disabled={loading}>
          {loading ? 'Processing...' : 'Sell'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellNFT;



// 'use client';

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
//   Stack,
// } from '@mui/material';
// import toast from 'react-hot-toast';
// // import { AxiosError } from 'axios';
// import { ethers } from 'ethers';

// // import { PostProductPayload, ProductResponse } from '@/types/product';
// // import {
// //   postProductForSale,
// //   getAllOwnedProducts,
// // } from '@/services/productService';

// import nftAbi from '@/abis/NFT.json';
// import { marketplaceAddress, nftAddress } from '@/constants/addresses';

// // sử dụng service thay vì tự tạo contract call trực tiếp
// import { marketplaceNFTService } from '@/services/marketplaceService';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   tokenId: number;
//   defaultPrice: string;
//   product?: Product; // ← add this
// }

// // interface ContractReceipt {
// //   logs: Array<{
// //     address: string;
// //     topics: string[];
// //     data: string;
// //   }>;
// // }

// /**
//  * Extract listingId robustly from a tx receipt.
//  */
// // function extractListingIdFromReceipt(receipt: ContractReceipt): string | null {
// //   if (!receipt || !receipt.logs) return null;

// //   const eventSignature = 'ItemListed(uint256,address,address,uint256,uint256)';
// //   const eventTopic = ethers.id(eventSignature);

// //   const iface = new ethers.Interface([`event ${eventSignature}`]);
// //   const abiCoder = new ethers.AbiCoder();

// //   for (const log of receipt.logs) {
// //     try {
// //       if (!log.topics || log.topics.length === 0) continue;
// //       if (log.topics[0] !== eventTopic) continue;

// //       // Try parseLog first
// //       try {
// //         const parsed = iface.parseLog(log);
// //         if (parsed?.name === 'ItemListed') {
// //           const listingId = parsed.args.listingId?.toString?.() ?? null;
// //           if (listingId) return listingId;
// //         }
// //       } catch {}

// //       // Fallback: topics[1] (indexed)
// //       if (log.topics.length >= 2) {
// //         try {
// //           const listingIdFromTopic = BigInt(log.topics[1]).toString();
// //           if (listingIdFromTopic) return listingIdFromTopic;
// //         } catch {}
// //       }

// //       // Fallback: decode first uint256 from data
// //       if (log.data && log.data !== '0x') {
// //         try {
// //           const decoded = abiCoder.decode(
// //             ['uint256', 'address', 'address', 'uint256', 'uint256'],
// //             log.data,
// //           );
// //           if (decoded?.length > 0) return decoded[0]?.toString?.() ?? null;
// //         } catch {}
// //       }
// //     } catch (err) {
// //       console.warn(
// //         'extractListingIdFromReceipt error for one log, continuing',
// //         err,
// //       );
// //     }
// //   }

// //   return null;
// // }

// import { TransactionReceipt } from 'ethers';
// import { cancelProduct } from '@/services/productService';
// import { Product } from '@/types/product';

// function extractListingIdFromReceipt(
//   receipt: TransactionReceipt | null,
// ): string | null {
//   if (!receipt?.logs) return null;

//   const eventSignature = 'ItemListed(uint256,address,address,uint256,uint256)';
//   const eventTopic = ethers.id(eventSignature);

//   const iface = new ethers.Interface([`event ${eventSignature}`]);
//   const abiCoder = new ethers.AbiCoder();

//   for (const log of receipt.logs) {
//     try {
//       if (!log.topics || log.topics.length === 0) continue;
//       if (log.topics[0] !== eventTopic) continue;

//       try {
//         const parsed = iface.parseLog(log);
//         if (parsed?.name === 'ItemListed') {
//           const listingId = parsed.args.listingId?.toString?.() ?? null;
//           if (listingId) return listingId;
//         }
//       } catch {}

//       if (log.topics.length >= 2) {
//         try {
//           const listingIdFromTopic = BigInt(log.topics[1]).toString();
//           if (listingIdFromTopic) return listingIdFromTopic;
//         } catch {}
//       }

//       if (log.data && log.data !== '0x') {
//         try {
//           const decoded = abiCoder.decode(
//             ['uint256', 'address', 'address', 'uint256', 'uint256'],
//             log.data,
//           );
//           if (decoded?.length > 0) return decoded[0]?.toString?.() ?? null;
//         } catch {}
//       }
//     } catch (err) {
//       console.warn(
//         'extractListingIdFromReceipt error for one log, continuing',
//         err,
//       );
//     }
//   }

//   return null;
// }

// // function extractAuctionIdFromReceipt(
// //   receipt: TransactionReceipt | null,
// // ): string | null {
// //   if (!receipt?.logs) return null;

// //   const eventSignature = 'AuctionCreated(uint256,address,uint256,uint256)';
// //   const eventTopic = ethers.id(eventSignature);
// //   // const iface = new ethers.Interface([`event ${eventSignature}`]);
// //   const abiCoder = new ethers.AbiCoder();
// //   const iface = new ethers.Interface([
// //     'event AuctionCreated(uint256 indexed auctionId, address seller, address nftAddress, uint256 tokenId, uint256 minPrice, uint256 startTime, uint256 endTime)',
// //   ]);

// //   for (const log of receipt.logs) {
// //     try {
// //       if (!log.topics?.length) continue;
// //       if (log.topics[0] !== eventTopic) continue;

// //       try {
// //         const parsed = iface.parseLog(log);
// //         if (parsed?.name === 'AuctionCreated') {
// //           return parsed.args.auctionId.toString();
// //         }
// //       } catch {}

// //       if (log.data && log.data !== '0x') {
// //         try {
// //           const decoded = abiCoder.decode(
// //             ['uint256', 'address', 'uint256', 'uint256'],
// //             log.data,
// //           );
// //           if (decoded?.length > 0) return decoded[0]?.toString() ?? null;
// //         } catch {}
// //       }
// //     } catch {}
// //   }

// //   return null;
// // }

// // function extractAuctionFromReceipt(receipt: TransactionReceipt | null): {
// //   auctionId: string;
// //   seller: string;
// //   nftAddress: string;
// //   tokenId: string;
// //   minPrice: string;
// //   startTime: string;
// //   endTime: string;
// // } | null {
// //   if (!receipt?.logs) return null;

// //   const eventSignature =
// //     'AuctionCreated(uint256,address,address,uint256,uint256,uint256,uint256)';
// //   const eventTopic = ethers.id(eventSignature);
// //   const abiCoder = new ethers.AbiCoder();

// //   for (const log of receipt.logs) {
// //     if (!log.topics?.length) continue;
// //     if (log.topics[0] !== eventTopic) continue;

// //     try {
// //       // Indexed fields từ topics
// //       const auctionId = BigInt(log.topics[1]).toString();
// //       const seller = ethers.getAddress(ethers.hexlify(log.topics[2]));
// //       const nftAddress = ethers.getAddress(ethers.hexlify(log.topics[3]));

// //       // Non-indexed fields từ data
// //       const decoded = abiCoder.decode(
// //         ['uint256', 'uint256', 'uint256', 'uint256'], // tokenId, minPrice, startTime, endTime
// //         log.data,
// //       );

// //       return {
// //         auctionId,
// //         seller,
// //         nftAddress,
// //         tokenId: decoded[0].toString(),
// //         minPrice: decoded[1].toString(),
// //         startTime: decoded[2].toString(),
// //         endTime: decoded[3].toString(),
// //       };
// //     } catch (err) {
// //       console.warn('extractAuctionFromReceipt error', err);
// //     }
// //   }

// //   return null;
// // }

// function extractAuctionFromReceipt(receipt: TransactionReceipt | null): {
//   auctionId: string;
//   seller: string;
//   nftAddress: string;
//   tokenId: string;
//   minPrice: string;
//   startTime: string;
//   endTime: string;
// } | null {
//   if (!receipt?.logs) return null;

//   const iface = new ethers.Interface([
//     'event AuctionCreated(uint256 indexed auctionId, address indexed seller, address indexed nftAddress, uint256 tokenId, uint256 minPrice, uint256 startTime, uint256 endTime)',
//   ]);

//   for (const log of receipt.logs) {
//     try {
//       const parsed = iface.parseLog(log); // TS infer parsed: LogDescription
//       if (parsed?.name === 'AuctionCreated') {
//         return {
//           auctionId: parsed.args.auctionId.toString(),
//           seller: parsed.args.seller,
//           nftAddress: parsed.args.nftAddress,
//           tokenId: parsed.args.tokenId.toString(),
//           minPrice: parsed.args.minPrice.toString(),
//           startTime: parsed.args.startTime.toString(),
//           endTime: parsed.args.endTime.toString(),
//         };
//       }
//     } catch (err) {
//       // Log này không phải AuctionCreated, bỏ qua
//       continue;
//     }
//   }

//   return null;
// }

// const SellNFT: React.FC<Props> = ({
//   open,
//   onClose,
//   tokenId,
//   defaultPrice,
//   product,
// }) => {
//   const [price, setPrice] = useState(defaultPrice);
//   const [type, setType] = useState<'buyNow' | 'onAuction'>('buyNow');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSell = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const priceNum = Number(price);
//       if (!price || isNaN(priceNum) || priceNum <= 0)
//         throw new Error('Giá phải là số hợp lệ lớn hơn 0');
//       if (type === 'onAuction' && (!startTime || !endTime))
//         throw new Error('Vui lòng chọn ngày bắt đầu và kết thúc đấu giá');

//       if (!window.ethereum) throw new Error('Vui lòng cài đặt MetaMask');

//       const provider = new ethers.BrowserProvider(
//         window.ethereum as ethers.Eip1193Provider,
//       );
//       const signer = await provider.getSigner();
//       const signerAddress = await signer.getAddress();

//       const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
//       const isApprovedForAll = await nftContract.isApprovedForAll(
//         signerAddress,
//         marketplaceAddress,
//       );
//       if (!isApprovedForAll) {
//         const approvalTx = await nftContract.setApprovalForAll(
//           marketplaceAddress,
//           true,
//         );
//         await approvalTx.wait();
//       }

//       // Nếu sản phẩm đã có listingId, hủy trước khi tạo auction mới
//       if (product?.listingId && type === 'onAuction') {
//         await cancelProduct({ listingId: product.listingId });
//         await marketplaceNFTService.cancelListing(signer, product.listingId);
//       }

//       if (type === 'buyNow') {
//         const receipt = await marketplaceNFTService.listItem(
//           signer,
//           nftAddress,
//           tokenId,
//           priceNum,
//         );
//         const listingId = extractListingIdFromReceipt(receipt);
//         toast.success(`NFT đã được list! ListingId: ${listingId ?? 'unknown'}`);
//       } else if (type === 'onAuction') {
//         const start = new Date(startTime).getTime();
//         const end = new Date(endTime).getTime();
//         const durationSeconds = Math.floor((end - start) / 1000);
//         if (durationSeconds <= 0)
//           throw new Error('Thời gian đấu giá không hợp lệ');

//         const receipt = await marketplaceNFTService.createAuction(
//           signer,
//           nftAddress,
//           tokenId,
//           priceNum,
//           durationSeconds,
//         );

//         // Dùng phiên bản mới extract toàn bộ auction info
//         const auction = extractAuctionFromReceipt(receipt);
//         if (!auction) throw new Error('Không thể lấy AuctionId từ transaction');

//         toast.success(`Auction created! AuctionId: ${auction.auctionId}`);
//         console.log('Auction info:', auction); // xem toàn bộ thông tin auction
//       }

//       onClose();
//     } catch (err: unknown) {
//       const message = err instanceof Error ? err.message : 'Đăng bán thất bại';
//       toast.error(message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
//       <DialogTitle>Đăng bán NFT</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2}>
//           <TextField
//             label="Giá (ETH)"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             select
//             label="Loại bán"
//             value={type}
//             onChange={(e) => setType(e.target.value as 'buyNow' | 'onAuction')}
//             fullWidth
//           >
//             <MenuItem value="buyNow">Buy Now</MenuItem>
//             <MenuItem value="onAuction">On Auction</MenuItem>
//           </TextField>
//           {type === 'onAuction' && (
//             <>
//               <TextField
//                 label="Ngày và giờ bắt đầu"
//                 type="datetime-local"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//               />
//               <TextField
//                 label="Ngày và giờ kết thúc"
//                 type="datetime-local"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//               />
//             </>
//           )}
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Hủy</Button>
//         <Button variant="contained" onClick={handleSell} disabled={loading}>
//           {loading ? 'Processing...' : 'Sell'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default SellNFT;

// const SellNFT: React.FC<Props> = ({ open, onClose, tokenId, defaultPrice }) => {
//   const [price, setPrice] = useState(defaultPrice);
//   const [type, setType] = useState<'buyNow' | 'onAuction'>('buyNow');
//   const [quantity, setQuantity] = useState(1);
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSell = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       // Validate inputs
//       const priceNum = Number(price);
//       if (!price || isNaN(priceNum) || priceNum <= 0)
//         throw new Error('Giá phải là số hợp lệ lớn hơn 0');
//       if (type === 'onAuction' && (!startTime || !endTime))
//         throw new Error('Vui lòng chọn ngày bắt đầu và kết thúc đấu giá');

//       if (!window.ethereum) throw new Error('Vui lòng cài đặt MetaMask');
//       const provider = new ethers.BrowserProvider(
//         window.ethereum as ethers.Eip1193Provider,
//       );
//       const signer = await provider.getSigner();
//       const signerAddress = await signer.getAddress();

//       // Approve marketplace if needed
//       const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
//       const isApprovedForAll = await nftContract.isApprovedForAll(
//         signerAddress,
//         marketplaceAddress,
//       );
//       if (!isApprovedForAll) {
//         const approvalTx = await nftContract.setApprovalForAll(
//           marketplaceAddress,
//           true,
//         );
//         await approvalTx.wait();
//         console.log('Marketplace approved!');
//       } else {
//         console.log('Already approved for marketplace');
//       }

//       // List NFT on-chain
//       const receipt = await marketplaceNFTService.listItem(
//         signer,
//         nftAddress,
//         tokenId,
//         priceNum,
//       );
//       const listingId = extractListingIdFromReceipt(receipt);
//       console.log('TX receipt:', receipt);
//       console.log('Listing ID:', listingId);

//       toast.success(
//         `NFT đã được list on-chain! ListingId: ${listingId ?? 'unknown'}`,
//       );
//       onClose();
//     } catch (err: unknown) {
//       console.error(err);
//       const message = err instanceof Error ? err.message : 'Đăng bán thất bại';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
//       <DialogTitle>Đăng bán NFT</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2}>
//           <TextField
//             label="Giá (ETH)"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             fullWidth
//           />
//           <TextField
//             select
//             label="Loại bán"
//             value={type}
//             onChange={(e) => setType(e.target.value as 'buyNow' | 'onAuction')}
//             fullWidth
//           >
//             <MenuItem value="buyNow">Buy Now</MenuItem>
//             <MenuItem value="onAuction">On Auction</MenuItem>
//           </TextField>
//           {type === 'onAuction' && (
//             <>
//               <TextField
//                 label="Ngày bắt đầu"
//                 type="date"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//               />
//               <TextField
//                 label="Ngày kết thúc"
//                 type="date"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//               />
//             </>
//           )}
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Hủy</Button>
//         <Button variant="contained" onClick={handleSell} disabled={loading}>
//           {loading ? 'Processing...' : 'Sell'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default SellNFT;
