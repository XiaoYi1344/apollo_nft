import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newsService from "@/services/newsService";
import {
  News,
  CategoryNews,
  CreateNewsPayload,
  UpdateNewsPayload,
  UpdateViewPayload,
} from "@/types/news";

// ---------------- GET CATEGORIES ----------------
export function useCategories() {
  return useQuery<CategoryNews[]>({
    queryKey: ["categories"],
    queryFn: newsService.getAllCategories,
  });
}

// ---------------- GET ALL NEWS ----------------
export function useNews() {
  return useQuery<News[]>({
    queryKey: ["news"],
    queryFn: newsService.getAllNews,
  });
}

// ---------------- GET OWNED NEWS ----------------
export function useOwnedNews() {
  return useQuery<News[]>({
    queryKey: ["owned-news"],
    queryFn: newsService.getOwnedNews,
  });
}

// ---------------- CREATE NEWS ----------------
export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation<News, Error, CreateNewsPayload>({
    mutationFn: newsService.createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["owned-news"] });
    },
  });
}

// ---------------- UPDATE NEWS ----------------
export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation<News, Error, UpdateNewsPayload>({
    mutationFn: newsService.updateNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["owned-news"] });
    },
  });
}

// ---------------- DELETE NEWS ----------------
export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: newsService.deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["owned-news"] });
    },
  });
}

// ---------------- UPDATE NEWS VIEW ----------------
export function useUpdateNewsView() {
  const queryClient = useQueryClient();

  return useMutation<
    void,                     // T: type data trả về khi mutation thành công
    Error,                    // E: type lỗi
    UpdateViewPayload,         // V: type payload gửi vào mutation
    { previous?: News[] }      // C: type context onMutate trả về
  >({
    mutationFn: newsService.updateNewsView,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["news"] });

      const previous = queryClient.getQueryData<News[]>(["news"]);

      if (previous) {
        queryClient.setQueryData<News[]>(["news"], (old) =>
          old?.map((n) =>
            n.id === payload.newsId
              ? { ...n, views: (n.views || 0) + 1 }
              : n
          )
        );
      }

      return { previous }; // context sẽ có previous
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["news"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}