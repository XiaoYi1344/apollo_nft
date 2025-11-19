import { followService } from "@/services/LikeFollowService";
import { FollowRequest } from "@/types/follow";
import { useState, useCallback } from "react";

export function useToggleFollow(initialFollowed: boolean = false) {
  const [followed, setFollowed] = useState(initialFollowed);
  const [loading, setLoading] = useState(false);

  const toggleFollow = useCallback(
    async (payload: FollowRequest) => {
      if (loading) return;

      try {
        setLoading(true);
        const res = await followService.toggleFollow(payload);
        setFollowed(res.followed);
      } catch (err) {
        console.error("Toggle follow failed:", err);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  return { followed, loading, toggleFollow };
}
