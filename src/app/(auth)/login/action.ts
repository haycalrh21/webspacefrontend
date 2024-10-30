"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(email: string, password: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    // credentials: "include",
  });

  const data = await response.json();
  if (response.ok && data.token) {
    // Token sudah ada di cookie, tidak perlu disimpan di sini
    return { success: true, user: data.user }; // Kembalikan status dan user
  } else {
    return { success: false, message: data.message || "Login gagal" };
  }
}

// export async function loginUser(email: string, password: string) {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL; // URL untuk server Express
//   const response = await fetch(`${apiUrl}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await response.json();
//   if (response.ok && data.token) {
//     // // Set cookie untuk menyimpan token
//     // cookies().set("token", data.token, {
//     //   httpOnly: true,
//     //   secure: process.env.NODE_ENV === "production", // Hanya secure di production
//     //   sameSite: "strict", // Mencegah CSRF
//     //   path: "/", // Akses di seluruh aplikasi
//     // });
//     // Redirect setelah login berhasil
//     redirect("/dashboard"); // Ganti dengan halaman tujuan setelah login
//     return { success: true }; // Kembalikan status keberhasilan
//   } else {
//     // Kembalikan pesan kesalahan jika login gagal
//     return { success: false, message: data.message || "Login gagal" };
//   }
// }
