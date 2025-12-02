// 'use client';

// import React, { useState } from 'react';
// import { Grid, Card, CardContent, Typography, Box, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// import { Collection } from '@/types/collection';
// import {
//   useGetAllOwnedCollections,
//   useCreateCollection,
//   useUpdateCollection,
//   useDeleteCollection,
//   useUpdateProductCollection,
// } from '@/hooks/useCollection';

// import CreateCollectionModal from './modal/CreateCollectionModal';
// import EditCollectionModal from './modal/EditCollectionModal';
// import CollectionViewModal from './modal/CollectionViewModal';
// import AddProductsModal from './modal/AddProductsModal';
// import { OwnedProduct, ProductActivity } from '@/types/product';
// import CollectionImage from './CollectionImage';

// interface Props {
//   mintedProducts: OwnedProduct[];
//   allActivities: ProductActivity[][];
// }

// const CollectionTab: React.FC<Props> = ({ mintedProducts, allActivities }) => {
//   const { data: collections = [] } = useGetAllOwnedCollections();

//   const createMutation = useCreateCollection();
//   const updateMutation = useUpdateCollection();
//   const deleteMutation = useDeleteCollection();
//   const updateProductCollectionMutation = useUpdateProductCollection();

//   const [openCreate, setOpenCreate] = useState(false);
//   const [openEdit, setOpenEdit] = useState<{ open: boolean; collection?: Collection }>({ open: false });
//   const [openView, setOpenView] = useState<{ open: boolean; collection?: Collection }>({ open: false });
//   const [openAddProducts, setOpenAddProducts] = useState<{ open: boolean; collection?: Collection }>({ open: false });

//   // State hover cho từng card
// //   const [hoveredCard, setHoveredCard] = useState<number | null>(null);

//   return (
//     <Box>
//       <Grid container spacing={3}>
//         {/* Card tạo Collection mới */}
//         <Grid size={{ xs: 12, sm: 6, md: 4 }}>
//           <Card
//             sx={{
//               height: 220,
//               bgcolor: 'rgba(255,255,255,0.05)',
//               border: '2px dashed #6f42c1',
//               borderRadius: 3,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               transition: '0.25s',
//               '&:hover': {
//                 bgcolor: 'rgba(255,255,255,0.1)',
//                 transform: 'scale(1.02)',
//               },
//             }}
//             onClick={() => setOpenCreate(true)}
//           >
//             <AddIcon sx={{ color: '#ccc', fontSize: 50 }} />
//           </Card>
//         </Grid>

//         {/* Các collection đang có */}
//         {collections.map((col: Collection) => {
//         //   const imageUrl = col.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${col.image}` : null;

//           return (
//             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={col.id} mb={4}>
//               <Card
//   sx={{
//     height: 220,
//     borderRadius: 3,
//     overflow: 'hidden',
//     bgcolor: '#1a1a1a',
//     cursor: 'pointer',
//     position: 'relative',
//     transition: '0.25s',
//     '&:hover': { transform: 'scale(1.02)' },
//     '&:hover .more-btn': { 
//       opacity: 1, 
//       pointerEvents: 'auto' 
//     },
//   }}
//   onClick={() => setOpenView({ open: true, collection: col })}
// >
//   {/* Ảnh collection */}
//   {/* <Box
//     component="img"
//     src={imageUrl || '/placeholder-rect.jpg'}
//     alt={col.name}
//     sx={{
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       filter: 'brightness(0.7)',
//     }}
//   /> */}

// <CollectionImage src={col.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${col.image}` : null} alt={col.name} />

//   {/* Overlay tên collection */}
//   <Box
//     sx={{
//       position: 'absolute',
//       bottom: 0,
//       width: '100%',
//       p: 1.5,
//       background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.0))',
//     }}
//   >
//     <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
//       {col.name}
//     </Typography>
//   </Box>

//   {/* Nút 3 chấm */}
//   <IconButton
//     className="more-btn"
//     sx={{
//       position: 'absolute',
//       top: 8,
//       right: 8,
//       color: '#fff',
//       bgcolor: 'rgba(0,0,0,0.4)',
//       opacity: 0,
//       pointerEvents: 'none',
//       transition: '0.2s',
//       zIndex: 10, // quan trọng để hiển thị trên image
//       '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//     }}
//     onClick={(e) => {
//       e.stopPropagation();
//       setOpenEdit({ open: true, collection: col });
//     }}
//   >
//     <MoreVertIcon />
//   </IconButton>
// </Card>

//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Modals */}
//       {openCreate && (
//         <CreateCollectionModal
//           open={openCreate}
//           onClose={() => setOpenCreate(false)}
//           onSubmit={(data) => createMutation.mutate(data, { onSuccess: () => setOpenCreate(false) })}
//         />
//       )}

//       {openEdit.open && openEdit.collection && (
//         <EditCollectionModal
//           open={openEdit.open}
//           collection={openEdit.collection}
//           onClose={() => setOpenEdit({ open: false })}
//           onSubmit={(data) => updateMutation.mutate(data, { onSuccess: () => setOpenEdit({ open: false }) })}
//           onDelete={() =>
//             deleteMutation.mutate(openEdit.collection!.id, { onSuccess: () => setOpenEdit({ open: false }) })
//           }
//         />
//       )}

//       {openView.open && openView.collection && (
//         <CollectionViewModal
//           open={openView.open}
//           collection={openView.collection}
//           onClose={() => setOpenView({ open: false })}
//           onAddProducts={() => setOpenAddProducts({ open: true, collection: openView.collection })}
//           onRemoveProduct={(productId: number) =>
//             updateProductCollectionMutation.mutate({
//               collectionId: openView.collection!.id,
//               productIds: [productId],
//               type: 'remove',
//             })
//           }
//         />
//       )}

//       {openAddProducts.open && openAddProducts.collection && (
//         <AddProductsModal
//           open={openAddProducts.open}
//           collection={openAddProducts.collection}
//           products={mintedProducts}
//           allActivities={allActivities}
//           onClose={() => setOpenAddProducts({ open: false })}
//           onAdd={(productIds: number[]) =>
//             updateProductCollectionMutation.mutate({
//               collectionId: openAddProducts.collection!.id,
//               productIds,
//               type: 'add',
//             })
//           }
//         />
//       )}
//     </Box>
//   );
// };

// export default CollectionTab;
'use client';

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import dynamic from 'next/dynamic';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Box,
  Card,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Collection } from '@/types/collection';
import {
  useGetAllOwnedCollections,
  useCreateCollection,
  useUpdateCollection,
  useDeleteCollection,
  useUpdateProductCollection,
  useUpdateCollectionVisibility,
} from '@/hooks/useCollection';

import { OwnedProduct, ProductActivity } from '@/types/product';

/* -----------------------------
    Dynamic imports for Modals
------------------------------ */
const CreateCollectionModal = dynamic(
  () => import('./modal/CreateCollectionModal'),
  { ssr: false }
);
const EditCollectionModal = dynamic(
  () => import('./modal/EditCollectionModal'),
  { ssr: false }
);
const CollectionViewModal = dynamic(
  () => import('./modal/CollectionViewModal'),
  { ssr: false }
);
const AddProductsModal = dynamic(
  () => import('./modal/AddProductsModal'),
  { ssr: false }
);


/* -----------------------------
    Lazy Image Component
------------------------------ */
const CollectionImage: React.FC<{ src?: string | null; alt?: string }> =
  React.memo(({ src, alt }) => {
    return (
      <Box
        component="img"
        src={src || '/placeholder-rect.jpg'}
        alt={alt}
        loading="lazy"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    );
  });
CollectionImage.displayName = 'CollectionImage';

/* -----------------------------
    Collection Card
------------------------------ */
const CollectionCard: React.FC<{
  collection: Collection;
  onOpenView: (c: Collection) => void;
  onEdit: (c: Collection) => void;
}> = React.memo(({ collection, onOpenView, onEdit }) => {
const imageUrl = collection.image
  ? `https://res.cloudinary.com/dr6cnnvma/image/upload/v1763461854/${collection.image}.png`
  : null;


  return (
    <Card
      sx={{
        height: 220,
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#1a1a1a',
        cursor: 'pointer',
        position: 'relative',
        transition: '0.25s',
        '&:hover': { transform: 'scale(1.02)' },
      }}
      onClick={() => onOpenView(collection)}
    >
      {imageUrl && <CollectionImage src={imageUrl} alt={collection.name} />}

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          p: 1.5,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.0))',
        }}
      >
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
          {collection.name}
        </Typography>
      </Box>

      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.4)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(collection);
        }}
      >
        <MoreVertIcon />
      </IconButton>
    </Card>
  );
});

CollectionCard.displayName = 'CollectionCard';

/* -----------------------------
          MAIN COMPONENT
------------------------------ */

interface Props {
  mintedProducts: OwnedProduct[];
  allActivities: ProductActivity[][];
}

const ROW_HEIGHT = 240;
const GAP = 5;

const CollectionTab: React.FC<Props> = ({
  mintedProducts,
  allActivities,
}) => {
  const { data: collections = [] } = useGetAllOwnedCollections();

  const createMutation = useCreateCollection();
  const updateMutation = useUpdateCollection();
  const deleteMutation = useDeleteCollection();
  const updateProductCollectionMutation = useUpdateProductCollection();

  const updateVisibilityMutation = useUpdateCollectionVisibility();
  /* -----------------------------
      Modal States
  ------------------------------ */
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState<{
    open: boolean;
    collection?: Collection;
  }>({ open: false });

  const [openView, setOpenView] = useState<{
    open: boolean;
    collection?: Collection;
  }>({ open: false });

  const [openAddProducts, setOpenAddProducts] = useState<{
    open: boolean;
    collection?: Collection;
  }>({ open: false });

  /* -----------------------------
      Responsive columns
  ------------------------------ */
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const columns = isMd ? 3 : isSm ? 2 : 1;

  /* -----------------------------
      Resize container
  ------------------------------ */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () =>
      setContainerWidth(containerRef.current!.clientWidth);

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  /* -----------------------------
      Build items: insert "create card" at index 0
  ------------------------------ */
  const items = useMemo(() => {
    const fullList: (Collection | { create: true })[] = [
      { create: true },
      ...collections,
    ];

    const rows: (typeof fullList)[] = [];
    for (let i = 0; i < fullList.length; i += columns) {
      rows.push(fullList.slice(i, i + columns));
    }
    return rows;
  }, [collections, columns]);

  const rowCount = items.length;

  const columnWidth = useMemo(() => {
    const totalGap = GAP * (columns - 1);
    return Math.floor((containerWidth - totalGap) / columns);
  }, [containerWidth, columns]);

  /* -----------------------------
      Virtualizer
  ------------------------------ */
  const parentRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  /* -----------------------------
      Handlers
  ------------------------------ */
  const onOpenView = useCallback(
    (c: Collection) => setOpenView({ open: true, collection: c }),
    []
  );

  const onEdit = useCallback(
    (c: Collection) => setOpenEdit({ open: true, collection: c }),
    []
  );

  return (
    <Box ref={containerRef} sx={{ width: '100%', height: 'auto', mb: 4 }}>
      {/* Virtual scroll area */}
      <Box
        ref={parentRef}
        sx={{
          overflowY: 'auto',
          height: '100%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = items[virtualRow.index];

            return (
              <Box
                key={virtualRow.key}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: `${GAP / 2}px 0`,
                }}
              >
                <Box sx={{ display: 'flex', gap: GAP }}>
                  {row.map((item, idx) => {
                    if ('create' in item) {
                      return (
                        <Box
                          key={`create-${virtualRow.index}-${idx}`}
                          sx={{ width: columnWidth }}
                        >
                          <Card
                            sx={{
                              // width:'50%',
                              height: 220,
                              bgcolor: 'rgba(255,255,255,0.05)',
                              border: '2px dashed #6f42c1',
                              borderRadius: 3,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: '0.25s',
                              '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                                transform: 'scale(1.02)',
                              },
                            }}
                            onClick={() => setOpenCreate(true)}
                          >
                            <AddIcon sx={{ color: '#ccc', fontSize: 50 }} />
                          </Card>
                        </Box>
                      );
                    }

                    return (
                      <Box
                        key={`col-${item.id}-${virtualRow.index}-${idx}`}
                        sx={{ width: columnWidth }}
                      >
                        <CollectionCard
                          collection={item}
                          onOpenView={onOpenView}
                          onEdit={onEdit}
                        />
                      </Box>
                    );
                  })}

                  {/* filler */}
                  {row.length < columns &&
                    Array.from({ length: columns - row.length }).map(
                      (_, i) => (
                        <Box key={`empty-${i}`} sx={{ width: columnWidth }} />
                      )
                    )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Modals */}
      {openCreate && (
        <CreateCollectionModal
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onSubmit={(data) =>
            createMutation.mutate(data, {
              onSuccess: () => setOpenCreate(false),
            })
          }
        />
      )}

      {openEdit.open && openEdit.collection && (
        <EditCollectionModal
  open={openEdit.open}
  collection={openEdit.collection}
  onClose={() => setOpenEdit({ open: false })}
  onSubmit={(data) =>
    updateMutation.mutate(data, {
      onSuccess: () => setOpenEdit({ open: false }),
    })
  }
  onDelete={() =>
    deleteMutation.mutate(openEdit.collection!.id, {
      onSuccess: () => setOpenEdit({ open: false }),
    })
  }
  onTogglePublic={(isPublic: boolean) =>
  updateVisibilityMutation.mutate({
    id: openEdit.collection!.id, // ✅ FIXED
    isPublic,
  })
}

/>

      )}

      {openView.open && openView.collection && (
        <CollectionViewModal
          open={openView.open}
          collection={openView.collection}
          onClose={() => setOpenView({ open: false })}
          onAddProducts={() =>
            setOpenAddProducts({
              open: true,
              collection: openView.collection,
            })
          }
          onRemoveProduct={(productId: number) =>
            updateProductCollectionMutation.mutate({
              collectionId: openView.collection!.id,
              productIds: [productId],
              type: 'remove',
            })
          }
        />
      )}

      {openAddProducts.open && openAddProducts.collection && (
        <AddProductsModal
          open={openAddProducts.open}
          collection={openAddProducts.collection}
          products={mintedProducts}
          allActivities={allActivities}
          onClose={() => setOpenAddProducts({ open: false })}
          onAdd={(productIds: number[]) =>
            updateProductCollectionMutation.mutate({
              collectionId: openAddProducts.collection!.id,
              productIds,
              type: 'add',
            })
          }
        />
      )}
    </Box>
  );
};

export default CollectionTab;
