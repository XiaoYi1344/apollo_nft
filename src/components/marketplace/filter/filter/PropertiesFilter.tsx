'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Collapse,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PROPERTIES = [
  {
    category: 'Background',
    items: [
      { name: 'Beanie', percent: 15 },
      { name: 'Crown', percent: 12 },
    ],
  },
  { category: 'Hat', items: [{ name: 'Sunglasses', percent: 20 }] },
  {
    category: 'Eyes',
    items: [
      { name: 'Cap', percent: 35 },
      { name: 'Laser Eyes', percent: 5 },
    ],
  },
];

interface PropertiesProps {
  selected: Record<string, string[]>;
  setSelected: (val: Record<string, string[]>) => void;
}

export default function PropertiesFilter({
  selected,
  setSelected,
}: PropertiesProps) {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(
    PROPERTIES.reduce((acc, p) => ({ ...acc, [p.category]: false }), {}),
  );

  const toggleOpen = (category: string) =>
    setOpenStates((prev) => ({ ...prev, [category]: !prev[category] }));

  const handleToggle = (category: string, item: string) => {
    const current = selected[category] || [];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    setSelected({ ...selected, [category]: updated });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(125deg, #1C0370, #0B041C)',
        p: 2.5,
        borderRadius: 2,
      }}
    >
      <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '1.2rem' }}>
        Properties (ApeCrypto)
      </Typography>
      {PROPERTIES.map((prop) => (
        <Box key={prop.category} sx={{ mb: 1.5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={{ fontSize: '0.95rem' }}>
              {prop.category} ({prop.items.length})
            </Typography>
            <IconButton
              size="small"
              onClick={() => toggleOpen(prop.category)}
              sx={{ color: 'white' }}
            >
              <ExpandMoreIcon
                sx={{
                  transform: openStates[prop.category]
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
                  transition: '0.2s',
                }}
              />
            </IconButton>
          </Stack>
          <Collapse in={openStates[prop.category]} sx={{ mt: 1 }}>
            <FormGroup sx={{ ml: 1 }}>
              {prop.items.map((item) => (
                <FormControlLabel
                  key={item.name}
                  control={
                    <Checkbox
                      checked={(selected[prop.category] || []).includes(
                        item.name,
                      )}
                      onChange={() => handleToggle(prop.category, item.name)}
                      sx={{
                        transform: 'scale(0.9)',
                        color: '#a78bfa',
                        '&.Mui-checked': { color: '#a78bfa' },
                      }}
                    />
                  }
                  label={`${item.name} (${item.percent}%)`}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      color: '#ffffff',
                      fontSize: '0.95rem',
                    },
                  }}
                />
              ))}
            </FormGroup>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}
