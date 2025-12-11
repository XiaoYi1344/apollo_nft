

// hooks/useNews.ts
import { useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import newsService from '@/services/newsService';
import {
  News,
  CreateNewsPayload,
  UpdateNewsPayload,
  UpdateViewPayload,
} from '@/types/news';

interface NewsResponse {
  data: News[];
  limit: number;
  total: number;
  totalPages: number;
}

// ---------------- GET ALL NEWS ----------------
export function useNews() {
  return useInfiniteQuery<NewsResponse, Error>({
    queryKey: ['news'],
    queryFn: ({ pageParam }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1;
      return newsService.getAllNews(page);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.totalPages > allPages.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

// ---------------- GET OWNED NEWS ----------------
export function useOwnedNews() {
  return useInfiniteQuery<NewsResponse, Error>({
    queryKey: ['owned-news'],
    queryFn: ({ pageParam }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1;
      return newsService.getOwnedNews(page);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.totalPages > allPages.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

// ---------------- CREATE NEWS ----------------
// export function useCreateNews() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: newsService.createNews,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['news'] });
//       queryClient.invalidateQueries({ queryKey: ['owned-news'] });
//     },
//   });
// }
export function useCreateNews() {
  const queryClient = useQueryClient();
  return useMutation<News, Error, CreateNewsPayload>({
    mutationFn: newsService.createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['owned-news'] });
    },
  });
}

// ---------------- UPDATE NEWS ----------------
// export function useUpdateNews() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: newsService.updateNews,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['news'] });
//       queryClient.invalidateQueries({ queryKey: ['owned-news'] });
//     },
//   });
// }
export function useUpdateNews() {
  const queryClient = useQueryClient();
  return useMutation<News, Error, UpdateNewsPayload>({
    mutationFn: newsService.updateNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['owned-news'] });
    },
  });
}

// ---------------- DELETE NEWS ----------------
export function useDeleteNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: newsService.deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['owned-news'] });
    },
  });
}

// ---------------- PUBLISH NEWS ----------------
export function usePublishNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: newsService.publishNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['owned-news'] });
    },
  });
}

// ---------------- UPDATE NEWS VIEW ----------------
export function useUpdateNewsView() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: newsService.updateNewsView,
    onMutate: async (payload: UpdateViewPayload) => {
      await queryClient.cancelQueries({ queryKey: ['news'] });
      const previous = queryClient.getQueryData<News[]>(['news']);
      if (previous) {
        queryClient.setQueryData<News[]>(['news'], old =>
          old?.map(n =>
            n.id === payload.newsId ? { ...n, views: (n.views || 0) + 1 } : n
          )
        );
      }
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['news'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
}
