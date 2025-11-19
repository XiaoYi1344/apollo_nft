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
import { PostProductPayload } from '@/types/product';
import { usePostProductForSale } from '@/hooks/useProduct';
import { AxiosError } from 'axios';

interface Props {
  open: boolean;
  onClose: () => void;
  productId: number;
  defaultPrice: string; // ⚡ string
}

const SellNFT: React.FC<Props> = ({
  open,
  onClose,
  productId,
  defaultPrice,
}) => {
  const [price, setPrice] = useState(defaultPrice.toString());
  const [type, setType] = useState<'buyNow' | 'onAuction'>('buyNow');
  const [quantity, setQuantity] = useState(1);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const mutation = usePostProductForSale();

  const handleSell = () => {
    // Validate bắt buộc
    if (!price || !quantity || !type) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Convert price sang number an toàn
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error('Giá phải là số hợp lệ lớn hơn 0');
      return;
    }

    // Nếu là đấu giá, validate ngày
    if (type === 'onAuction' && (!startTime || !endTime)) {
      toast.error('Vui lòng chọn ngày bắt đầu và kết thúc đấu giá');
      return;
    }

    // Payload chuẩn (price gửi dưới dạng string vẫn ok nếu backend chấp nhận)
    const payload: PostProductPayload = {
      id: productId,
      price, // vẫn giữ string nếu API yêu cầu string
      type,
      quantity,
      ...(type === 'onAuction' ? { startTime, endTime } : {}),
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Sản phẩm đã được đăng bán!');
        onClose();
      },
      onError: (err: unknown) => {
        let message = 'Đăng bán thất bại';

        if (err instanceof Error) {
          message = err.message;
        } else if (err instanceof AxiosError) {
          const data = err.response?.data as { message?: string } | undefined;
          if (data?.message) message = data.message;
        }

        toast.error(message);
      },
    });
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
            onChange={(e) => setPrice(e.target.value)} // luôn giữ string
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

          <TextField
            label="Số lượng"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            fullWidth
            inputProps={{ min: 1 }}
          />

          {type === 'onAuction' && (
            <>
              <TextField
                label="Ngày bắt đầu"
                type="date"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="Ngày kết thúc"
                type="date"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSell}>
          Sell
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellNFT;
