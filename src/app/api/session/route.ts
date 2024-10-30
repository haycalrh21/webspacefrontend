// app/api/session/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Mengambil cookies
  const cookieStore = cookies();
  const token = cookieStore.get("jwt"); // Ganti 'jwt' jika nama cookie berbeda

  if (!token) {
    return NextResponse.json(
      { message: "Token tidak ditemukan" },
      { status: 401 }
    );
  }

  // Jika token ditemukan, bisa melakukan proses lebih lanjut
  return NextResponse.json({ token: token.value }, { status: 200 });
}
