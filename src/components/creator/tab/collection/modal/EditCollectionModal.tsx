// 'use client';
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
// } from '@mui/material';
// import { Collection, UpdateCollectionRequest } from '@/types/collection';

// interface Props {
//   open: boolean;
//   collection: Collection;
//   onClose: () => void;
//   onSubmit: (data: UpdateCollectionRequest) => void;
//   onDelete: () => void;
// }

// const EditCollectionModal: React.FC<Props> = ({ open, collection, onClose, onSubmit, onDelete }) => {
//   const [name, setName] = useState(collection.name);
//   const [description, setDescription] = useState(collection.description);
//   const [image, setImage] = useState<File | null>(null);

//   const handleSubmit = () => {
//     onSubmit({ id: collection.id, name, description, image: image ?? new File([], '') });
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Chỉnh sửa Collection</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Tên Collection"
//           fullWidth
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           sx={{ mt: 2 }}
//         />
//         <TextField
//           label="Mô tả"
//           fullWidth
//           multiline
//           minRows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           sx={{ mt: 2 }}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] ?? null)}
//           style={{ marginTop: 16 }}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button color="error" onClick={onDelete}>Xóa</Button>
//         <Button onClick={onClose}>Hủy</Button>
//         <Button variant="contained" onClick={handleSubmit}>Lưu</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditCollectionModal;


'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Collection, UpdateCollectionRequest } from '@/types/collection';

interface Props {
  open: boolean;
  collection: Collection;
  onClose: () => void;
  onSubmit: (data: UpdateCollectionRequest) => void;
  onDelete: () => void;
  onTogglePublic: (isPublic: boolean) => void;
}

const EditCollectionModal: React.FC<Props> = ({
  open,
  collection,
  onClose,
  onSubmit,
  onDelete,
  onTogglePublic,
}) => {
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [image, setImage] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(collection.isPublic ?? false);

  const handleSubmit = () => {
    onSubmit({
      id: collection.id,
      name,
      description,
      image: image ?? new File([], ''),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chỉnh sửa Collection</DialogTitle>

      <DialogContent>
        <TextField
          label="Tên Collection"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Mô tả"
          fullWidth
          multiline
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mt: 2 }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          style={{ marginTop: 16 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={(e) => {
                setIsPublic(e.target.checked);
                onTogglePublic(e.target.checked);
              }}
            />
          }
          label="Công khai bộ sưu tập"
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={onDelete}>
          Xóa
        </Button>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionModal;
