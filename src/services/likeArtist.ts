import { supabase } from "@/lib/supabaseClient";

export async function toggleLikeArtist(artistWallet: string, userWallet: string) {
  // Kiểm tra đã like chưa
  const { data: existing, error: selectErr } = await supabase
    .from("like_artist")
    .select("id")
    .eq("artist_wallet", artistWallet)
    .eq("user_wallet", userWallet)
    .maybeSingle();

  if (selectErr) throw selectErr;

  // Nếu đã tồn tại → UNLIKE (xóa)
  if (existing) {
    const { error: deleteErr } = await supabase
      .from("like_artist")
      .delete()
      .eq("id", existing.id);

    if (deleteErr) throw deleteErr;

    return { liked: false };
  }

  // Nếu chưa tồn tại → LIKE (tạo)
  const { error: insertErr } = await supabase
    .from("like_artist")
    .insert({
      artist_wallet: artistWallet,
      user_wallet: userWallet,
    });

  if (insertErr) throw insertErr;

  return { liked: true };
}
