
"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Card,
  CardMedia,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { Collection } from "@/types/collection";
import { OwnedProduct } from "@/types/product";
import { useProductsByCollection } from "@/hooks/useProduct";

interface Props {
  open: boolean;
  collection: Collection;
  onClose: () => void;
  onAddProducts: () => void;
  onRemoveProduct: (productId: number) => void;
}

const CollectionViewModal: React.FC<Props> = ({
  open,
  collection,
  onClose,
  onAddProducts,
  onRemoveProduct,
}) => {
  const { data: products = [], isLoading } = useProductsByCollection(
    collection.id,
    open
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "#0f0f0f",
          background: "linear-gradient(160deg, #0f0f0f 0%, #1a0f2b 100%)",
          p: 2,
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
          {collection.name}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(122,59,255,0.7)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent sx={{ minHeight: 350 }}>
        {isLoading ? (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* NFT STYLE SPINNER */}
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                border: "4px solid rgba(122,59,255,0.3)",
                borderTopColor: "#7a3bff",
                animation: "spin 1s linear infinite",
                boxShadow:
                  "0 0 25px #7a3bff, 0 0 45px rgba(122,59,255,0.6), inset 0 0 20px rgba(122,59,255,0.4)",
                "@keyframes spin": {
                  from: { transform: "rotate(0deg)" },
                  to: { transform: "rotate(360deg)" },
                },
              }}
            />

            <Typography
              sx={{
                color: "#c9a3ff",
                fontWeight: 600,
                fontSize: 18,
                textShadow: "0 0 10px #7a3bff",
                letterSpacing: 1.3,
              }}
            >
              Loading NFT items...
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* ADD PRODUCT BUTTON */}
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  perspective: 600,
                }}
                onClick={onAddProducts}
              >
                <Card
                  sx={{
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #7a3bff 0%, #ff5ca2 100%)",
                    boxShadow: "0 8px 25px rgba(122,59,255,0.6)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px) rotateX(10deg)",
                      boxShadow: "0 12px 35px rgba(122,59,255,0.8)",
                    },
                  }}
                >
                  <AddIcon sx={{ color: "#fff", fontSize: 50 }} />
                </Card>

                {/* Mirror effect */}
                <Box
                  sx={{
                    height: 20,
                    transform: "scaleY(-1)",
                    mt: 1,
                    overflow: "hidden",
                    borderRadius: 3,
                    opacity: 0.4,
                    filter: "blur(6px)",
                  }}
                >
                  <Card
                    sx={{
                      height: 180,
                      background:
                        "linear-gradient(135deg, #7a3bff 0%, #ff5ca2 100%)",
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* PRODUCT LIST */}
            {products.map((prod: OwnedProduct) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={prod.id}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    "&:hover img": { transform: "scale(1.08)" },
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 6px 20px rgba(122,59,255,0.5)",
                      transition: "0.3s",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height={180}
                      image={`https://gateway.pinata.cloud/ipfs/${prod.image}`}
                      alt={prod.name}
                      sx={{
                        transition: "transform 0.3s",
                        objectFit: "cover",
                        background:
                          "linear-gradient(135deg, #7a3bff 0%, #ff5ca2 100%)",
                      }}
                    />
                  </Card>

                  {/* REMOVE BUTTON */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      "&:hover": { bgcolor: "rgba(255,0,80,0.8)" },
                      zIndex: 10,
                    }}
                    onClick={() => onRemoveProduct(prod.id)}
                  >
                    <CloseIcon />
                  </IconButton>

                  {/* PRODUCT NAME */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      py: 1,
                      px: 1.5,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.0))",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                        textShadow: "0 0 6px #7a3bff",
                      }}
                    >
                      {prod.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CollectionViewModal;
