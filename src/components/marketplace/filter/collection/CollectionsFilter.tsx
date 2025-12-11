'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
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
    // Kiểm tra tên nằm trong danh sách cứng
    if (COLLECTIONS.includes(name)) {
      alert('Đây là collection mẫu. Bạn không thể chọn.');
      return;
    }

    // Logic toggle bình thường
    if (selected.includes(name)) {
      setSelected(selected.filter((n) => n !== name));
    } else {
      setSelected([...selected, name]);
    }
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
        {/* {filtered.map((name) => (
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
        ))} */}
        {filtered.map((name) => {
          const isHardCoded = COLLECTIONS.includes(name);

          return (
            <FormControlLabel
              key={name}
              control={
                <Tooltip title={isHardCoded ? 'Đây là sản phẩm mẫu' : ''}>
                  <span>
                    <Checkbox
                      checked={selected.includes(name)}
                      disabled={isHardCoded}
                      onChange={() => handleToggle(name)}
                      sx={{
                        transform: 'scale(0.9)',
                        color: '#a78bfa',
                        '&.Mui-checked': { color: '#a78bfa' },
                      }}
                    />
                  </span>
                </Tooltip>
              }
              label={name}
              sx={{ '& .MuiFormControlLabel-label': { color: '#ffffff' } }}
            />
          );
        })}
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

// 'use client';
// import { useState, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
// } from '@mui/material';
// import { useGetAllCollections } from '@/hooks/useCollection';

// interface CollectionsProps {
//   selected: string[];
//   setSelected: (val: string[]) => void;
// }

// export default function CollectionsFilter({ selected, setSelected }: CollectionsProps) {
//   const [showAll, setShowAll] = useState(false);
//   const [search, setSearch] = useState('');

//   const { data: collections = [] } = useGetAllCollections();

//   // --- Lọc collection hợp lệ ---
//   const validCollections = useMemo(() => {
//     return collections.filter((col) => {
//       if (!col.isPublic) return false;
//       if (!col.isActive) return false;
//       if (!col.products || col.products.length === 0) return false;

//       const hasProductsForSale = col.products.some((p) => {
//         const isListing = p.listingId != null && p.listingId > 0;
//         const isAuction = p.auctionId != null && p.auctionId > 0;
//         return isListing || isAuction;
//       });

//       return hasProductsForSale;
//     });
//   }, [collections]);

//   // --- Apply search ---
//   const visibleCollections = showAll ? validCollections : validCollections.slice(0, 4);
//   const searchFiltered = visibleCollections.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   const handleToggle = (colName: string) => {
//     if (selected.includes(colName))
//       setSelected(selected.filter((n) => n !== colName));
//     else setSelected([...selected, colName]);
//   };

//   return (
//     <Box
//       sx={{
//         background: 'linear-gradient(125deg, #1C0370, #0B041C)',
//         p: 2.5,
//         borderRadius: 2,
//         mb: 3,
//       }}
//     >
//       <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '1.2rem' }}>
//         Collections
//       </Typography>

//       {/* Search */}
//       <TextField
//         variant="outlined"
//         placeholder=" 🔍Search collections"
//         size="small"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         sx={{
//           width: '100%',
//           mb: 1.5,
//           '& .MuiOutlinedInput-root': {
//             borderRadius: 1.5,
//             background: '#fff',
//             input: { p: 0.8 },
//           },
//         }}
//       />

//       {/* List collections */}
//       <FormGroup>
//         {searchFiltered.map((c) => (
//           <FormControlLabel
//             key={c.id}
//             control={
//               <Checkbox
//                 checked={selected.includes(c.name)}
//                 onChange={() => handleToggle(c.name)}
//                 sx={{
//                   transform: 'scale(0.9)',
//                   color: '#a78bfa',
//                   '&.Mui-checked': { color: '#a78bfa' },
//                 }}
//               />
//             }
//             label={c.name}
//             sx={{ '& .MuiFormControlLabel-label': { color: '#ffffff' } }}
//           />
//         ))}
//       </FormGroup>

//       {/* Toggle show more */}
//       {validCollections.length > 4 && (
//         <Typography
//           sx={{ mt: 1, fontSize: 13, color: '#a78bfa', cursor: 'pointer' }}
//           onClick={() => setShowAll(!showAll)}
//         >
//           {showAll ? 'See less...' : 'See more...'}
//         </Typography>
//       )}
//     </Box>
//   );
// }
