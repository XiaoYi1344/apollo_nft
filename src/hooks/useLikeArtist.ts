import { useMutation } from "@tanstack/react-query";
import { toggleLikeArtist } from "@/services/likeArtist";

export const useLikeArtist = () => {
  return useMutation({
    mutationFn: ({ artistWallet, userWallet }: { artistWallet: string; userWallet: string }) =>
      toggleLikeArtist(artistWallet, userWallet),
  });
};
