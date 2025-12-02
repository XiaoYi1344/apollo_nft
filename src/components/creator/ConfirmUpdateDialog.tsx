// 'use client';

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Stack,
//   Typography,
//   CircularProgress,
//   Link,
// } from '@mui/material';
// import toast from 'react-hot-toast';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   data: {
//     tokenId: number;
//     tokenURI: string;
//     price: string;
//   };
//   onConfirm: () => Promise<void>;
// }

// const ConfirmUpdateDialog: React.FC<Props> = ({ open, onClose, data, onConfirm }) => {
//   const [loading, setLoading] = useState(false);
//   const [txHash, setTxHash] = useState<string | null>(null);

//   const handleConfirm = async () => {
//     setLoading(true);
//     setTxHash(null);
//     try {
//       await onConfirm();
//       // Nếu onConfirm trả về tx hash thì setTxHash ở đây
//       toast.success('Cập nhật NFT trên blockchain thành công!');
//       onClose();
//     } catch (err: unknown) {
//       console.error(err);
//       toast.error(err instanceof Error ? err.message : 'Cập nhật thất bại!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={loading ? () => {} : onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Cập nhật NFT trên Smart Contract</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2}>
//           <Typography>
//             Bạn sắp cập nhật NFT đã mint với:
//           </Typography>
//           <Typography><strong>Token ID:</strong> {data.tokenId}</Typography>
//           <Typography><strong>Price:</strong> {data.price}</Typography>
//           <Typography>
//             <strong>Token URI:</strong> {data.tokenURI}
//           </Typography>

//           {loading && (
//             <Stack direction="row" spacing={1} alignItems="center">
//               <CircularProgress size={20} />
//               <Typography>Đang xử lý trên blockchain...</Typography>
//             </Stack>
//           )}

//           {txHash && (
//             <Typography>
//               Giao dịch thành công: {' '}
//               <Link
//                 href={`https://etherscan.io/tx/${txHash}`}
//                 target="_blank"
//                 rel="noopener"
//               >
//                 {txHash}
//               </Link>
//             </Typography>
//           )}
//         </Stack>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose} disabled={loading}>
//           Hủy
//         </Button>
//         <Button onClick={handleConfirm} variant="contained" disabled={loading}>
//           {loading ? 'Đang cập nhật...' : 'Xác nhận'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ConfirmUpdateDialog;

'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Link,
} from '@mui/material';
import toast from 'react-hot-toast';
import { OwnedProduct } from '@/types/product';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  data?: {
    tokenId?: number;
    tokenURI?: string;
    price?: string | number;
    name?: string;
    description?: string;
  };
  ownedProduct?: OwnedProduct;
}

const ConfirmUpdateDialog: React.FC<Props> = ({
  open,
  onClose,
  data,
  ownedProduct,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setTxHash(null);
    try {
      await onConfirm();
      toast.success('Cập nhật NFT trên blockchain thành công!');
      onClose();
    } catch (err: unknown) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Cập nhật thất bại!');
    } finally {
      setLoading(false);
    }
  };

  if (!data && !ownedProduct) return null;

  // Fallback: ưu tiên data, nếu không có thì lấy từ ownedProduct
  const tokenId =
    data?.tokenId ?? Number(ownedProduct?.tokenId ?? 0) ?? 'N/A';
  const name = data?.name ?? ownedProduct?.name ?? 'N/A';
  const description = data?.description ?? ownedProduct?.description ?? 'N/A';
  const tokenURI =
    data?.tokenURI ??
    ownedProduct?.ownerships?.[0]?.tokenURI ??
    ownedProduct?.tokenURI ??
    'N/A';
  const price = data?.price ?? ownedProduct?.price ?? 'N/A';

  return (
    <Dialog open={open} onClose={loading ? () => {} : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cập nhật NFT trên Smart Contract</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography>Bạn sắp cập nhật NFT đã mint với:</Typography>
          <Typography><strong>Token ID:</strong> {tokenId}</Typography>
          <Typography><strong>Name:</strong> {name}</Typography>
          <Typography><strong>Description:</strong> {description}</Typography>
          <Typography><strong>Token URI:</strong> {tokenURI}</Typography>
          <Typography><strong>Price:</strong> {price} ETH</Typography>

          {loading && (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={20} />
              <Typography>Đang xử lý trên blockchain...</Typography>
            </Stack>
          )}

          {txHash && (
            <Typography>
              Giao dịch thành công:{' '}
              <Link href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener">
                {txHash}
              </Link>
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Hủy
        </Button>
        <Button onClick={handleConfirm} variant="contained" disabled={loading}>
          {loading ? 'Đang cập nhật...' : 'Xác nhận'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUpdateDialog;
