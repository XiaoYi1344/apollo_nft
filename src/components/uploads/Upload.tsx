// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Stack,
//   Typography,
//   Divider,
//   Grid,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   Switch,
//   // FormControlLabel,
//   InputLabel,
//   FormControl,
//   FormHelperText,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { FaCloudUploadAlt } from 'react-icons/fa';

// // import { SelectChangeEvent } from '@mui/material/Select';

// import PriceDialog from './PriceDialog';
// import { useCreateProduct } from '@/hooks/useCreateProduct';
// import { useRouter } from 'next/navigation';
// import { useAccount } from 'wagmi';

// import toast from 'react-hot-toast';
// import {
//   CreateProductPayload,
//   ProductProperty,
// } from '@/services/product_createService';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// export const Upload = () => {
//   // const [blockchain, setBlockchain] = useState('');

//   const [freezeMetadata, setFreezeMetadata] = React.useState(false);

//   const [isDragging, setIsDragging] = useState(false);
//   const [fileName, setFileName] = useState('');

//   const [file, setFile] = useState<File | null>(null); // lưu file để gửi

//   const { loading, submitProduct } = useCreateProduct();
//   const [name, setName] = useState('');
//   const [externalLink, setExternalLink] = useState('');
//   const [description, setDescription] = useState('');

//   const [propertyType, setPropertyType] = useState('');
//   const [propertyName, setPropertyName] = useState('');
//   const [propertySupply, setPropertySupply] = useState(1);
//   const [propertyBlockchain, setPropertyBlockchain] = useState('');
//   const [properties, setProperties] = useState<ProductProperty[]>([]);

//   const [openPriceDialog, setOpenPriceDialog] = useState(false);
// const [tempPrice, setTempPrice] = useState<string>('');
// const { submitProduct } = useCreateProduct();
// const router = useRouter();
// const { address: account } = useAccount();

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     const files = e.dataTransfer.files;
//     if (files && files.length > 0) {
//       setFileName(files[0].name);
//       console.log('Dropped file:', files[0]);
//     }
//   };

//   // const handleBlockchainChange = (e: SelectChangeEvent<string>) => {
//   //   setBlockchain(e.target.value);
//   // };

//   // const handleBlockchainChange = (e: SelectChangeEvent<string>) => {
//   //   setBlockchain(e.target.value);
//   // };

//   // On "+ ADD PROPERTY" button click
//   const handleAddProperty = () => {
//     if (!propertyType || !propertyName || !propertyBlockchain) {
//       toast.error('Please fill in Type, Name, and Blockchain');
//       return;
//     }

//     const newProperty: ProductProperty = {
//       type: propertyType,
//       name: propertyName,
//       supply: propertySupply,
//       blockchain: propertyBlockchain,
//     };

//     setProperties([...properties, newProperty]);

//     // reset inputs
//     setPropertyType('');
//     setPropertyName('');
//     setPropertySupply(1);
//     setPropertyBlockchain('');
//   };

//   // const handleCreateItem = async () => {
//   //   if (!file) {
//   //     toast.error('Please select a file');
//   //     return;
//   //   }

//   //   try {
//   //     const payload: CreateProductPayload = {
//   //       name,
//   //       description,
//   //       externalLink,
//   //       image: file,
//   //       properties, // ✅ now includes added properties
//   //     };

//   //     await submitProduct(payload); // ✅ đúng type
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   const handleFreezeToggle = (checked: boolean) => {
//   if (checked) setOpenPriceDialog(true);
// };

// // Khi user xác nhận giá
// const handleConfirmPrice = (price: string) => {
//   setTempPrice(price);
//   localStorage.setItem('pendingPrice', price);
//   setOpenPriceDialog(false);
//   toast.success('Price saved successfully!');
// };

// // Hàm tạo sản phẩm
// const handleCreateItem = async (formData: any) => {
//   try {
//     const freeze = formData.freezeMetadata;
//     const price = freeze ? localStorage.getItem('pendingPrice') || '0' : '0';

//     const payload = {
//       ...formData,
//       price: parseFloat(price),
//       freezeMetadata: freeze,
//     };

//     const result = await submitProduct(payload);

//     if (result) {
//       toast.success('NFT created successfully!');
//       localStorage.removeItem('pendingPrice');
//       router.push(
//         `/creator/creator-detail?walletMode=true&address=${account}`
//       );
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(120deg,#12192b, #182858, #341a57)',
//         color: '#fff',
//         px: { xs: 3, md: 8 },
//         pb: 5,
//         pt: { xs: 9, md: 8 },
//       }}
//     >
//       {/* HEADER */}
//       <Stack spacing={1} mb={6}>
//         <Typography
//           sx={{
//             fontWeight: 700,
//             background: 'linear-gradient(90deg, #B235FF, #1C51FE)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             fontSize: { xs: '2rem', md: '3.5rem' },
//           }}
//         >
//           Load More
//         </Typography>
//         <Typography sx={{ color: '#8A91C5' }}>
//           Bring your digital masterpiece to life on the blockchain.
//         </Typography>
//       </Stack>

//       <Divider
//         sx={{
//           borderColor: '#fff3',
//           borderBottomWidth: '0.25px', // 👈 mảnh hơn 0.5px
//           mt: -3,
//           mb: 5,
//         }}
//       />

//       <Grid
//         container
//         spacing={6}
//         justifyContent="center"
//         sx={{
//           maxWidth: '100%',
//           mx: 'auto',
//           alignItems: 'flex-start',
//         }}
//       >
//         {/* LEFT SIDE: Upload box */}
//         <Grid size={{ xs: 12, sm: 6 }}>
//           <Box
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//             sx={{
//               border: isDragging ? '2px solid #1C51FE' : '2px dashed #333860',
//               borderRadius: 4,
//               background:
//                 'linear-gradient(180deg, rgba(28,26,61,0.6) 0%, rgba(18,17,39,0.8) 100%)',
//               p: 6,
//               textAlign: 'center',
//               color: '#C2C2C8',
//               transition: 'border 0.2s ease',
//             }}
//           >
//             <Button
//               sx={{
//                 bgcolor: '#161B44',
//                 color: '#01FFCA',
//                 borderRadius: '50%',
//                 width: 80,
//                 height: 80,
//                 mb: 2,
//                 '&:hover': { bgcolor: '#2E66FF' },
//               }}
//             >
//               <FaCloudUploadAlt size={38} />
//             </Button>

//             <Typography sx={{ fontSize: '1.1rem', mb: 1 }}>
//               {isDragging ? 'Drop file to upload' : 'Drag & drop file here'}
//             </Typography>
//             <Typography sx={{ color: '#8586A1', mb: 2 }}>
//               or click to browse
//             </Typography>

//             <Button
//               component="label"
//               variant="contained"
//               sx={{
//                 // bgcolor: '#7B3FFE',
//                 borderRadius: 3,
//                 textTransform: 'none',
//                 fontWeight: 600,
//                 background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
//                 '&:hover': { bgcolor: '#8A53FF' },
//               }}
//             >
//               Choose File
//               <VisuallyHiddenInput
//                 type="file"
//                 onChange={(e) => {
//                   if (e.target.files?.length) {
//                     setFileName(e.target.files[0].name);
//                     setFile(e.target.files[0]); // lưu file
//                   }
//                 }}
//               />
//             </Button>

//             <Typography sx={{ color: '#6F718D', fontSize: '0.9rem', mt: 2 }}>
//               {fileName
//                 ? `Selected: ${fileName}`
//                 : 'Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV'}
//             </Typography>
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE: Form */}
//         <Grid size={{ xs: 12, sm: 6 }}>
//           <Stack spacing={3}>
//             {/* DETAILS */}
//             <Typography
//               sx={{
//                 color: '#00FFC6',
//                 fontWeight: 700,
//                 fontSize: '1rem',
//               }}
//             >
//               {'// DETAILS'}
//             </Typography>

// <TextField
//   required
//   id="nft-name"
//   label="Name"
//   placeholder="Enter item name"
//   helperText="This will be displayed as the title of your NFT"
//   variant="standard"
//   InputLabelProps={{ shrink: true }}
//   fullWidth
//   value={name} // ✅ bind state
//   onChange={(e) => setName(e.target.value)} // ✅ update state
//   sx={{
//     '& .MuiInput-root': {
//       color: '#FFF',
//       '&:before': { borderBottomColor: '#3b3f6d' },
//       '&:hover:not(.Mui-disabled):before': {
//         borderBottomColor: '#6a75ff',
//       },
//       '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
//     },
//     '& .MuiInput-input': {
//       color: '#ADAEBC',
//       fontSize: '1.0rem',
//       '::placeholder': {
//         color: '#FFF',
//         opacity: 0.7,
//       },
//     },
//     '& .MuiInputLabel-root': {
//       color: '#FFF',
//       fontSize: '1.0rem',
//       transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
//       '&.Mui-focused': {
//         color: '#FFF',
//         transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
//       },
//     },
//     '& .MuiFormHelperText-root': {
//       color: '#8A91C5',
//       fontSize: '0.8rem',
//       mt: 0.5,
//     },
//   }}
// />

// <TextField
//   required
//   id="nft-external-link"
//   label="External Link"
//   placeholder="https://yoursite.io/item/123"
//   helperText="Link to your website, portfolio, or social media"
//   variant="standard"
//   InputLabelProps={{ shrink: true }}
//   value={externalLink}
//   onChange={(e) => setExternalLink(e.target.value)}
//   fullWidth
//   sx={{
//     '& .MuiInput-root': {
//       color: '#FFF',
//       '&:before': { borderBottomColor: '#3b3f6d' },
//       '&:hover:not(.Mui-disabled):before': {
//         borderBottomColor: '#6a75ff',
//       },
//       '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
//     },
//     '& .MuiInput-input': {
//       color: '#ADAEBC',
//       fontSize: '1rem',
//       '::placeholder': {
//         color: '#FFF',
//         opacity: 0.7,
//       },
//     },
//     '& .MuiInputLabel-root': {
//       color: '#FFF',
//       fontSize: '1rem',
//       transform: 'translate(0, -15px) scale(1)', // ✅ đặt thấp xuống để label hiện
//       transformOrigin: 'top left',
//       '&.Mui-focused': {
//         color: '#FFF',
//         transform: 'translate(0, -18px) scale(0.8)', // ✅ bay lên nhẹ khi focus
//       },
//     },
//     '& .MuiFormHelperText-root': {
//       color: '#8A91C5',
//       fontSize: '0.8rem',
//       mt: 0.5,
//     },
//   }}
// />

// <TextField
//   required
//   id="nft-description"
//   label="Description"
//   placeholder="Provide a detailed description of your item"
//   multiline
//   minRows={4.5}
//   helperText="The description will be included on the item's detail page"
//   variant="standard"
//   InputLabelProps={{ shrink: true }}
//   fullWidth
//   value={description} // ✅ bind state
//   onChange={(e) => setDescription(e.target.value)} // ✅ update state
//   sx={{
//     '& .MuiInput-root': {
//       color: '#FFF',
//       '&:before': { borderBottomColor: '#3b3f6d' },
//       '&:hover:not(.Mui-disabled):before': {
//         borderBottomColor: '#6a75ff',
//       },
//       '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
//     },
//     '& .MuiInput-input': {
//       color: '#ADAEBC',
//       fontSize: '1.0rem',
//       '::placeholder': {
//         color: '#FFF',
//         opacity: 0.7,
//       },
//     },
//     '& .MuiInputLabel-root': {
//       color: '#FFF',
//       fontSize: '1.0rem',
//       transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
//       '&.Mui-focused': {
//         color: '#FFF',
//         transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
//       },
//     },
//     '& .MuiFormHelperText-root': {
//       color: '#8A91C5',
//       fontSize: '0.8rem',
//       mt: 0.5,
//     },
//   }}
// />

//             {/* PROPERTIES */}
//             <Typography
//               sx={{
//                 color: '#00FFC6',
//                 fontWeight: 700,
//                 fontSize: '1rem',
//               }}
//             >
//               {'// PROPERTIES'}
//             </Typography>
//             <Stack direction="row" spacing={2}>
// <TextField
//   id="nft-type"
//   label="Type"
//   variant="standard"
//   fullWidth
//   value={propertyType}
//   onChange={(e) => setPropertyType(e.target.value)}
//   sx={{
//     '& .MuiInput-root': {
//       color: '#FFF',
//       '&:before': { borderBottomColor: '#3b3f6d' },
//       '&:hover:not(.Mui-disabled):before': {
//         borderBottomColor: '#6a75ff',
//       },
//       '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
//     },
//     '& .MuiInputLabel-root': {
//       color: '#ADAEBC',
//       fontSize: '1rem',
//       '&.Mui-focused': {
//         color: '#FFF',
//         transform: 'translate(0, -5px) scale(0.8)', // ✅ bay lên nhẹ khi focus
//       },
//     },
//   }}
// />

// <TextField
//   id="nft-name-type"
//   label="Name"
//   variant="standard"
//   fullWidth
//   value={propertyName}
//   onChange={(e) => setPropertyName(e.target.value)}
//   sx={{
//     '& .MuiInput-root': {
//       color: '#FFF',
//       '&:before': { borderBottomColor: '#3b3f6d' },
//       '&:hover:not(.Mui-disabled):before': {
//         borderBottomColor: '#6a75ff',
//       },
//       '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
//     },
//     '& .MuiInputLabel-root': {
//       color: '#ADAEBC',
//       fontSize: '1rem',
//       '&.Mui-focused': {
//         color: '#FFF',
//         transform: 'translate(0, -5px) scale(0.8)', // ✅ bay lên nhẹ khi focus
//       },
//     },
//   }}
// />
//             </Stack>
// <Button
//   variant="contained"
//   onClick={handleAddProperty}
//   sx={{
//     background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
//     color: '#FFF',
//     fontWeight: 700,
//     borderRadius: 3,
//     textTransform: 'none',
//     alignSelf: 'flex-start',
//     '&:hover': { bgcolor: '#0DFFC6' },
//   }}
// >
//   + ADD PROPERTY
// </Button>

//             {/* SUPPLY & BLOCKCHAIN */}
//             <Typography
//               sx={{
//                 color: '#00FFC6',
//                 fontWeight: 700,
//                 fontSize: '1rem',
//               }}
//             >
//               {'// SUPPLY & BLOCKCHAIN'}
//             </Typography>

// <TextField
//   required
//   id="nft-supply"
//   label="Supply"
//   placeholder="1"
//   helperText="The number of items that can be minted"
//   variant="standard"
//   InputLabelProps={{ shrink: true }}
//   fullWidth
//   value={propertySupply}
//   onChange={(e) => setPropertySupply(Number(e.target.value))}
//   sx={{
//     '& .MuiInput-root': {
//       color: '#FFF',
//       '&:before': { borderBottomColor: '#3b3f6d' },
//       '&:hover:not(.Mui-disabled):before': {
//         borderBottomColor: '#6a75ff',
//       },
//       '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
//     },
//     '& .MuiInput-input': {
//       color: '#FFF',
//       fontSize: '1.0rem',
//       '::placeholder': {
//         color: '#FFF',
//         opacity: 0.7,
//       },
//     },
//     '& .MuiInputLabel-root': {
//       color: '#FFF',
//       fontSize: '1.0rem',
//       transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
//       '&.Mui-focused': {
//         color: '#FFF',
//         transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
//       },
//     },
//     '& .MuiFormHelperText-root': {
//       color: '#8A91C5',
//       fontSize: '0.8rem',
//       mt: 0.5,
//     },
//   }}
// />

//             <Box>
//               <InputLabel
//                 id="blockchain-label"
//                 sx={{
//                   color: '#B3B3C2',
//                   mb: 1,
//                   fontSize: '1rem',
//                 }}
//               >
//                 Blockchain
//               </InputLabel>

// <Select
//   labelId="blockchain-label"
//   value={propertyBlockchain}
//   onChange={(e) => setPropertyBlockchain(e.target.value)}
//   fullWidth
//   displayEmpty
//   sx={{
//     bgcolor: '#181B3A',
//     color: '#fff',
//     borderRadius: 2,
//     height: 48,
//     '.MuiSelect-icon': {
//       color: '#B3B3C2',
//     },
//     '.MuiOutlinedInput-notchedOutline': { border: 0 },
//     '&:hover': {
//       bgcolor: '#1E2146',
//     },
//   }}
// >
//   <MenuItem disabled value="">
//     Select blockchain
//   </MenuItem>
//   <MenuItem value="Ethereum">Ethereum</MenuItem>
//   <MenuItem value="Polygon">Polygon</MenuItem>
//   <MenuItem value="Solana">Solana</MenuItem>
// </Select>

//               <FormHelperText sx={{ color: '#8A91C5', mt: 0.5 }}>
//                 The blockchain your item will be minted on
//               </FormHelperText>
//             </Box>

// <FormControl
//   component="fieldset"
//   sx={{
//     display: 'flex',
//     flexDirection: 'column',
//     // gap: '1px',
//     // background: 'rgba(32, 22, 61, 0.6)',
//     padding: '5px',
//     borderRadius: '12px',
//     // border: '1px solid #2a2350',
//   }}
// >
//   <Box
//     sx={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     }}
//   >
//     <Typography sx={{ color: '#fff', fontWeight: 600 }}>
//       Freeze Metadata
//     </Typography>

//     <Switch
//       checked={freezeMetadata}
//       onChange={(e) => setFreezeMetadata(e.target.checked)}
//       sx={{
//         '& .MuiSwitch-thumb': { bgcolor: '#00FFC6' },
//         '& .MuiSwitch-track': { bgcolor: '#3C3F72' },
//       }}
//     />
//   </Box>

//   <Typography sx={{ fontSize: '14px', color: '#9BA0C8' }}>
//     Prevent metadata from being changed after minting
//   </Typography>
// </FormControl>
//           </Stack>
//         </Grid>
//       </Grid>
//       {/* CREATE BUTTON */}
// <Button
//   variant="contained"
//   onClick={handleCreateItem}
//   disabled={loading}
//   fullWidth
//   sx={{
//     mt: 8,
//     py: 1.3,
//     background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
//     fontWeight: 700,
//     fontSize: '1rem',
//     borderRadius: 3,
//     textTransform: 'none',
//     '&:hover': { bgcolor: '#8A53FF' },
//     width: { xs: '50%', sm: '30%', md: '15%' },
//     mr: 'auto',
//     ml: { xs: '25%', sm: '35%', md: '43%' },
//     mb: -3,
//   }}
// >
//   {loading ? 'Creating...' : 'CREATE ITEM'}
// </Button>

//       <PriceDialog
//   open={openPriceDialog}
//   onClose={() => setOpenPriceDialog(false)}
//   onConfirm={handleConfirmPrice}
// />;
//     </Box>
//   );
// };

// export default Upload;

'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaCloudUploadAlt } from 'react-icons/fa';
import PriceDialog from './PriceDialog';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import { CreateProductPayload, ProductProperty } from '@/types/product';
import { useCreateProduct } from '@/hooks/useProduct';
import Image from 'next/image';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Upload: React.FC = () => {
  const [freezeMetadata, setFreezeMetadata] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [name, setName] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [properties, setProperties] = useState<ProductProperty[]>([]);
  const [propertySupply, setPropertySupply] = useState(1);
  const [propertyBlockchain, setPropertyBlockchain] = useState('');
  const [openPriceDialog, setOpenPriceDialog] = useState(false);
  const [tempPrice, setTempPrice] = useState<string>('');

  const router = useRouter();
  const { address: account } = useAccount();

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files?.length) {
      setFile(files[0]);
      setFileName(files[0].name);
    }
  };

  // Add Property
  const handleAddProperty = () => {
    if (!propertyType || !propertyName) {
      toast.error('Please fill in Type and Name');
      return;
    }
    setProperties([...properties, { type: propertyType, name: propertyName }]);
    setPropertyType('');
    setPropertyName('');
  };

  // Freeze toggle
  const handleFreezeToggle = (checked: boolean) => {
    setFreezeMetadata(checked);
    if (checked) {
      setOpenPriceDialog(true);
    } else {
      localStorage.removeItem(`pendingPrice_${name || 'temp'}`);
      setTempPrice('');
    }
  };

  const handleConfirmPrice = (price: string) => {
    setTempPrice(price);
    localStorage.setItem(`pendingPrice_${name || 'temp'}`, price);
    setOpenPriceDialog(false);
    toast.success('Price saved successfully!');
  };

  // Create NFT
  const createProductMutation = useCreateProduct();

  const handleCreateItem = async () => {
    if (!file) return toast.error('Please select a file');
    if (!name.trim()) return toast.error('Please enter a name');
    if (!propertyBlockchain) return toast.error('Please select a blockchain');
    if (propertySupply <= 0)
      return toast.error('Supply must be greater than 0');
    if (
  externalLink &&
  !/^(https?:\/\/)?([\w.-]+|\blocalhost\b)(:\d+)?(\/[\w\-./?%&=]*)?$/.test(externalLink)
)
  return toast.error('Invalid external link');


    const price = freezeMetadata
      ? Number(localStorage.getItem(`pendingPrice_${name || 'temp'}`) || '0')
      : 0;

    if (freezeMetadata && price <= 0)
      return toast.error('Please set a valid price before creating the item');

    const payload: CreateProductPayload = {
      name,
      description,
      externalLink,
      image: file,
      properties,
      isFreeze: freezeMetadata,
      price,
      supply: propertySupply,
      blockchain: propertyBlockchain,
    };

    try {
      await createProductMutation.mutateAsync(payload);
      toast.success('NFT created successfully!');
      localStorage.removeItem(`pendingPrice_${name || 'temp'}`);

      // Reset form
      setFile(null);
      setFileName('');
      setName('');
      setExternalLink('');
      setDescription('');
      setPropertyType('');
      setPropertyName('');
      setProperties([]);
      setFreezeMetadata(false);
      setPropertySupply(1);
      setPropertyBlockchain('');
      setTempPrice('');

      router.push(`/creator/creator-detail?walletMode=true&address=${account}`);
    } catch (err: unknown) {
      // kiểm tra err có phải Error hay không
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Failed to create NFT');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
        color: '#fff',
        px: { xs: 3, md: 8 },
        pb: 5,
        pt: { xs: 9, md: 8 },
      }}
    >
      {/* HEADER */}
      <Stack spacing={1} mb={6}>
        <Typography
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #B235FF, #1C51FE)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '3.5rem' },
          }}
        >
          Load More
        </Typography>
        <Typography sx={{ color: '#8A91C5' }}>
          Bring your digital masterpiece to life on the blockchain.
        </Typography>
      </Stack>

      <Divider
        sx={{
          borderColor: '#fff3',
          borderBottomWidth: '0.25px',
          mt: -3,
          mb: 5,
        }}
      />

      <Grid container spacing={6} justifyContent="center">
        {/* LEFT SIDE: Upload */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              border: isDragging ? '2px solid #1C51FE' : '2px dashed #333860',
              borderRadius: 4,
              background:
                'linear-gradient(180deg, rgba(28,26,61,0.6), rgba(18,17,39,0.8))',
              p: 6,
              textAlign: 'center',
              color: '#C2C2C8',
              transition: 'border 0.2s ease',
            }}
          >
            <Button
              sx={{
                bgcolor: '#161B44',
                color: '#01FFCA',
                borderRadius: '50%',
                width: 80,
                height: 80,
                mb: 2,
                '&:hover': { bgcolor: '#2E66FF' },
              }}
            >
              <FaCloudUploadAlt size={38} />
            </Button>

            <Typography sx={{ fontSize: '1.1rem', mb: 1 }}>
              {isDragging ? 'Drop file to upload' : 'Drag & drop file here'}
            </Typography>
            <Typography sx={{ color: '#8586A1', mb: 2 }}>
              or click to browse
            </Typography>

            <Button
              component="label"
              variant="contained"
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
                '&:hover': { bgcolor: '#8A53FF' },
              }}
            >
              Choose File
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setFile(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
            </Button>

            <Typography sx={{ color: '#6F718D', fontSize: '0.9rem', mt: 2 }}>
              {fileName
                ? `Selected: ${fileName}`
                : 'Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV'}
            </Typography>

            {/* PREVIEW */}
            {file && file.type.startsWith('image/') && (
              <Box
                mt={2}
                sx={{ position: 'relative', width: '100%', height: 300 }}
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ borderRadius: 8, objectFit: 'contain' }}
                  fill
                />
              </Box>
            )}
          </Box>
        </Grid>

        {/* RIGHT SIDE: Form */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={3}>
            {/* DETAILS */}
            <Typography
              sx={{
                color: '#00FFC6',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {'// DETAILS'}
            </Typography>

            <TextField
              required
              id="nft-name"
              label="Name"
              placeholder="Enter item name"
              helperText="This will be displayed as the title of your NFT"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={name} // ✅ bind state
              onChange={(e) => setName(e.target.value)} // ✅ update state
              sx={{
                '& .MuiInput-root': {
                  color: '#FFF',
                  '&:before': { borderBottomColor: '#3b3f6d' },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#6a75ff',
                  },
                  '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                },
                '& .MuiInput-input': {
                  color: '#ADAEBC',
                  fontSize: '1.0rem',
                  '::placeholder': {
                    color: '#FFF',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFF',
                  fontSize: '1.0rem',
                  transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
                  '&.Mui-focused': {
                    color: '#FFF',
                    transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#8A91C5',
                  fontSize: '0.8rem',
                  mt: 0.5,
                },
              }}
            />

            <TextField
              required
              id="nft-external-link"
              label="External Link"
              placeholder="https://yoursite.io/item/123"
              helperText="Link to your website, portfolio, or social media"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              fullWidth
              sx={{
                '& .MuiInput-root': {
                  color: '#FFF',
                  '&:before': { borderBottomColor: '#3b3f6d' },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#6a75ff',
                  },
                  '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                },
                '& .MuiInput-input': {
                  color: '#ADAEBC',
                  fontSize: '1rem',
                  '::placeholder': {
                    color: '#FFF',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFF',
                  fontSize: '1rem',
                  transform: 'translate(0, -15px) scale(1)', // ✅ đặt thấp xuống để label hiện
                  transformOrigin: 'top left',
                  '&.Mui-focused': {
                    color: '#FFF',
                    transform: 'translate(0, -18px) scale(0.8)', // ✅ bay lên nhẹ khi focus
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#8A91C5',
                  fontSize: '0.8rem',
                  mt: 0.5,
                },
              }}
            />

            <TextField
              required
              id="nft-description"
              label="Description"
              placeholder="Provide a detailed description of your item"
              multiline
              minRows={4.5}
              helperText="The description will be included on the item's detail page"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={description} // ✅ bind state
              onChange={(e) => setDescription(e.target.value)} // ✅ update state
              sx={{
                '& .MuiInput-root': {
                  color: '#FFF',
                  '&:before': { borderBottomColor: '#3b3f6d' },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#6a75ff',
                  },
                  '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                },
                '& .MuiInput-input': {
                  color: '#ADAEBC',
                  fontSize: '1.0rem',
                  '::placeholder': {
                    color: '#FFF',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFF',
                  fontSize: '1.0rem',
                  transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
                  '&.Mui-focused': {
                    color: '#FFF',
                    transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#8A91C5',
                  fontSize: '0.8rem',
                  mt: 0.5,
                },
              }}
            />

            {/* PROPERTIES */}
            <Typography
              sx={{
                color: '#00FFC6',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {'// PROPERTIES'}
            </Typography>

            <Stack direction="row" spacing={2}>
              <TextField
                id="nft-type"
                label="Type"
                variant="standard"
                fullWidth
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                sx={{
                  '& .MuiInput-root': {
                    color: '#FFF',
                    '&:before': { borderBottomColor: '#3b3f6d' },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: '#6a75ff',
                    },
                    '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#ADAEBC',
                    fontSize: '1rem',
                    '&.Mui-focused': {
                      color: '#FFF',
                      transform: 'translate(0, -5px) scale(0.8)',
                    },
                  },
                }}
              />
              <TextField
                id="nft-name-type"
                label="Name"
                variant="standard"
                fullWidth
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                sx={{
                  '& .MuiInput-root': {
                    color: '#FFF',
                    '&:before': { borderBottomColor: '#3b3f6d' },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: '#6a75ff',
                    },
                    '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#ADAEBC',
                    fontSize: '1rem',
                    '&.Mui-focused': {
                      color: '#FFF',
                      transform: 'translate(0, -5px) scale(0.8)',
                    },
                  },
                }}
              />
            </Stack>

            <Button
              variant="contained"
              onClick={handleAddProperty}
              sx={{
                background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
                color: '#FFF',
                fontWeight: 700,
                borderRadius: 3,
                textTransform: 'none',
                alignSelf: 'flex-start',
                '&:hover': { bgcolor: '#0DFFC6' },
              }}
            >
              + ADD PROPERTY
            </Button>

            {/* HIỂN THỊ DANH SÁCH PROPERTIES */}
            {properties.length > 0 && (
              <Stack spacing={1} mt={2}>
                {properties.map((prop, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      bgcolor: '#1E2146',
                      p: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    <Typography sx={{ color: '#fff' }}>
                      Type: {prop.type} | Name: {prop.name}
                    </Typography>
                    <Button
                      size="small"
                      sx={{ color: '#FF4D4D' }}
                      onClick={() =>
                        setProperties(properties.filter((_, i) => i !== index))
                      }
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Stack>
            )}

            {/* SUPPLY & BLOCKCHAIN */}
            <Typography
              sx={{
                color: '#00FFC6',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {'// SUPPLY & BLOCKCHAIN'}
            </Typography>

            <TextField
              required
              id="nft-supply"
              label="Supply"
              placeholder="1"
              helperText="The number of items that can be minted"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={propertySupply}
              onChange={(e) => setPropertySupply(Number(e.target.value))}
              sx={{
                '& .MuiInput-root': {
                  color: '#FFF',
                  '&:before': { borderBottomColor: '#3b3f6d' },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#6a75ff',
                  },
                  '&.Mui-focused:after': { borderBottomColor: '#8c9eff' },
                },
                '& .MuiInput-input': {
                  color: '#FFF',
                  fontSize: '1.0rem',
                  '::placeholder': {
                    color: '#FFF',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFF',
                  fontSize: '1.0rem',
                  transform: 'translate(0, -15px) scale(1)', // 👈 cách input ~3px
                  '&.Mui-focused': {
                    color: '#FFF',
                    transform: 'translate(0, -18px) scale(0.8)', // giữ animation khi focus
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: '#8A91C5',
                  fontSize: '0.8rem',
                  mt: 0.5,
                },
              }}
            />

            <Box>
              <InputLabel
                id="blockchain-label"
                sx={{
                  color: '#B3B3C2',
                  mb: 1,
                  fontSize: '1rem',
                }}
              >
                Blockchain
              </InputLabel>

              <Select
                labelId="blockchain-label"
                value={propertyBlockchain}
                onChange={(e) => setPropertyBlockchain(e.target.value)}
                fullWidth
                displayEmpty
                sx={{
                  bgcolor: '#181B3A',
                  color: '#fff',
                  borderRadius: 2,
                  height: 48,
                  '.MuiSelect-icon': {
                    color: '#B3B3C2',
                  },
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&:hover': {
                    bgcolor: '#1E2146',
                  },
                }}
              >
                <MenuItem disabled value="">
                  Select blockchain
                </MenuItem>
                <MenuItem value="Ethereum">Ethereum</MenuItem>
                <MenuItem value="Polygon">Polygon</MenuItem>
                <MenuItem value="Solana">Solana</MenuItem>
              </Select>

              <FormHelperText sx={{ color: '#8A91C5', mt: 0.5 }}>
                The blockchain your item will be minted on
              </FormHelperText>
            </Box>

            <FormControl
              component="fieldset"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // gap: '1px',
                // background: 'rgba(32, 22, 61, 0.6)',
                padding: '5px',
                borderRadius: '12px',
                // border: '1px solid #2a2350',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                  Freeze Metadata
                </Typography>

                <Switch
                  checked={freezeMetadata}
                  onChange={(e) => handleFreezeToggle(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-thumb': { bgcolor: '#00FFC6' },
                    '& .MuiSwitch-track': { bgcolor: '#3C3F72' },
                  }}
                />
              </Box>

              <Typography sx={{ fontSize: '14px', color: '#9BA0C8' }}>
                Prevent metadata from being changed after minting
              </Typography>

              <Typography sx={{ color: '#FFF', mt: 1 }}>
                {freezeMetadata && tempPrice
                  ? `Price set: ${tempPrice} ETH`
                  : ''}
              </Typography>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>

      {/* CREATE ITEM BUTTON */}
      <Button
        variant="contained"
        onClick={handleCreateItem}
        disabled={createProductMutation.status === 'pending'}
        fullWidth
        sx={{
          mt: 8,
          py: 1.3,
          background: 'linear-gradient(90deg, #8D1CFE, #01FFCA)',
          fontWeight: 700,
          fontSize: '1rem',
          borderRadius: 3,
          textTransform: 'none',
          '&:hover': { bgcolor: '#8A53FF' },
          width: { xs: '50%', sm: '30%', md: '15%' },
          mr: 'auto',
          ml: { xs: '25%', sm: '35%', md: '43%' },
          mb: -3,
        }}
      >
        {createProductMutation.status === 'pending'
          ? 'Creating...'
          : 'CREATE ITEM'}
      </Button>

      <PriceDialog
        open={openPriceDialog}
        onClose={() => setOpenPriceDialog(false)}
        onConfirm={handleConfirmPrice}
      />
    </Box>
  );
};

export default Upload;
