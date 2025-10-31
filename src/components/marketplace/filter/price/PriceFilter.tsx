'use client';
import { Box, Stack, Typography, TextField, Button } from '@mui/material';

interface PriceProps {
  price: { min: string; max: string };
  setPrice: (val: { min: string; max: string }) => void;
}

export default function PriceFilter({ price, setPrice }: PriceProps) {
  const handleChange = (field: 'min' | 'max', value: string) =>
    setPrice({ ...price, [field]: value });

  return (
    <Box
      sx={{
        background: 'linear-gradient(125deg, #1C0370, #0B041C)',
        p: 2.5,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '1.2rem' }}>
        Price
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        {['min', 'max'].map((field) => (
          <Box
            key={field}
            sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
          >
            <Typography sx={{ color: '#ffffff', fontSize: '0.75rem', mt: 0.5 }}>
              {field.toUpperCase()}
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              value={field === 'min' ? price.min : price.max}
              onChange={(e) =>
                handleChange(field as 'min' | 'max', e.target.value)
              }
              placeholder={field === 'min' ? '0' : '50'}
              sx={{
                mt: 0.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  color: '#000',
                  background: '#fff',
                  input: { color: '#7A7A7A', p: 0.8 },
                  '& fieldset': { border: '1px solid rgba(255,255,255,0.1)' },
                },
              }}
            />
          </Box>
        ))}
      </Stack>
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 0.5,
          background: '#a855f7',
          textTransform: 'none',
          borderRadius: 1.5,
          fontWeight: 500,
        }}
      >
        Apply
      </Button>
    </Box>
  );
}
