'use client';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';

interface StatusProps {
  selected: string[];
  setSelected: (val: string[]) => void;
}

export default function StatusFilter({ selected, setSelected }: StatusProps) {
  const statuses = ['Buy Now', 'On Auction', 'Has Offers'];

  const handleToggle = (status: string) => {
    if (selected.includes(status))
      setSelected(selected.filter((s) => s !== status));
    else setSelected([...selected, status]);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(100deg, #1C0370, #0B041C)',
        pl: 2,
        py: 1,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '1.2rem' }}>
        Status
      </Typography>
      <FormGroup>
        {statuses.map((status, idx) => (
          <FormControlLabel
            key={status}
            control={
              <Checkbox
                checked={selected.includes(status)}
                onChange={() => handleToggle(status)}
                sx={{
                  transform: 'scale(0.9)',
                  color: '#a78bfa',
                  '&.Mui-checked': { color: '#a78bfa' },
                }}
              />
            }
            label={status}
            sx={{
              marginBottom: idx === statuses.length - 1 ? 0 : '-11px', // chỉ áp dụng cho các status trừ cái cuối
              '& .MuiFormControlLabel-label': {
                fontSize: '0.95rem',
                color: '#ffffff',
              },
            }}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
