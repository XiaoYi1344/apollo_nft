// app/api/auth/check/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: Request) {
  try {
    console.log("JWT_SECRET:", JWT_SECRET);

    const auth = req.headers.get("authorization");
    console.log("Authorization header:", auth);

    if (!auth) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const token = auth.replace("Bearer ", "");
    console.log("Token received:", token);

    const decoded = jwt.verify(token, JWT_SECRET!);
    console.log("Decoded JWT:", decoded);

    return NextResponse.json({ valid: true, user: decoded });
  } catch (err) {
    console.error("JWT verify error:", err);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
