
// ✅ src/lib/supabaseClient.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// 🧩 Lấy biến môi trường
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🚨 Nếu thiếu biến, dừng build luôn (giúp Netlify báo lỗi sớm)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "❌ Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Netlify."
  );
}

// ✅ Tạo client chính thức (không thể null)
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

// 🧪 Kiểm tra kết nối khi chạy local
// 🧪 Kiểm tra kết nối khi chạy local
if (process.env.NODE_ENV === "development") {
  (async () => {
    try {
      const { data, error } = await supabase.from("auction_bids").select("id").limit(1);
      if (error) console.error("❌ Supabase connection failed:", error.message);
      else console.log("✅ Supabase connected:", data?.length ?? 0, "rows in auction_bids");
    } catch (err) {
      console.error("⚠️ Supabase connection test error:", err);
    }
  })();
}
