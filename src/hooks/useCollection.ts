import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
  ProductCollectionRequest,
  UpdateCollectionVisibilityRequest,
  Collection,
} from '@/types/collection';
import { collectionService } from '@/services/collectionService';

interface GetAllOwnedCollectionsResponse {
  success: boolean;
  message: string;
  data: Collection[];
}

// === Queries ===
export const useGetAllCollections = () => {
  return useQuery<Collection[]>({
    queryKey: ['collections'],
    queryFn: async () => {
      const res = await collectionService.getAllCollections();
      return res.data.result;
    },
  });
};

export const useGetAllOwnedCollections = () => {
  return useQuery<Collection[]>({
    queryKey: ['collections-owned'],
    queryFn: async () => {
      const res = await collectionService.getAllOwnedCollections();
      // ép kiểu từ unknown -> GetAllOwnedCollectionsResponse
      const data = res.data as unknown as GetAllOwnedCollectionsResponse;
      return data.data;
    },
  });
};

// === Mutations ===
export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCollectionRequest) => collectionService.createCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collections-owned'] });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCollectionRequest) => collectionService.updateCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collections-owned'] });
    },
  });
};

export const useUpdateCollectionVisibility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCollectionVisibilityRequest) => collectionService.updateCollectionVisibility(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collections-owned'] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: number) => collectionService.deleteCollection(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collections-owned'] });
    },
  });
};

export const useUpdateProductCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductCollectionRequest) => collectionService.updateProductCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['collections-owned'] });
    },
  });
};
