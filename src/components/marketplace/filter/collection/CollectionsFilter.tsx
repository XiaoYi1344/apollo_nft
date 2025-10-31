'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const COLLECTIONS = [
  'ApeCrypto',
  'Space Kitties',
  'Retro Bots',
  'Pixel Worlds',
  'Crypto Punks',
  'Bored Apes',
  'Mecha Monkeys',
  'Alien Cats',
];

interface CollectionsProps {
  selected: string[];
  setSelected: (val: string[]) => void;
}

export default function CollectionsFilter({
  selected,
  setSelected,
}: CollectionsProps) {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState('');

  const displayed = showAll ? COLLECTIONS : COLLECTIONS.slice(0, 4);
  const filtered = displayed.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = (name: string) => {
    if (selected.includes(name))
      setSelected(selected.filter((n) => n !== name));
    else setSelected([...selected, name]);
  };

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
        Collections
      </Typography>
      <TextField
        variant="outlined"
        placeholder=" 🔍Search collections"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          width: '100%',
          mb: 1.5,
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.5,
            background: '#fff',
            input: { p: 0.8 },
          },
        }}
      />
      <FormGroup>
        {filtered.map((name) => (
          <FormControlLabel
            key={name}
            control={
              <Checkbox
                checked={selected.includes(name)}
                onChange={() => handleToggle(name)}
                sx={{
                  transform: 'scale(0.9)',
                  color: '#a78bfa',
                  '&.Mui-checked': { color: '#a78bfa' },
                }}
              />
            }
            label={name}
            sx={{ '& .MuiFormControlLabel-label': { color: '#ffffff' } }}
          />
        ))}
      </FormGroup>
      {COLLECTIONS.length > 4 && (
        <Typography
          sx={{ mt: 1, fontSize: 13, color: '#a78bfa', cursor: 'pointer' }}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'See less...' : 'See more...'}
        </Typography>
      )}
    </Box>
  );
}
