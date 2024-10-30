"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: formData.email, // Perbaiki format payload
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Jika login berhasil, Anda bisa melakukan sesuatu seperti menyimpan token atau mengalihkan ke halaman lain
      console.log(response.data);
      router.push("/"); // Misalnya, alihkan ke halaman dashboard
    } catch (error) {
      console.error(error);
      alert("Login gagal!"); // Tampilkan alert jika ada kesalahan
    } finally {
      setLoading(false); // Pastikan loading diatur kembali ke false
    }
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
            required // Validasi agar email tidak kosong
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter your password"
            required // Validasi agar password tidak kosong
          />
        </div>
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

// const res = await loginUser(formData.email, formData.password);
// setLoading(false);

// if (res.success) {
//   alert("Login berhasil!"); // Tampilkan alert jika login berhasil
//   router.push("/"); // Arahkan ke dashboard
// } else {
//   alert(res.message); // Tampilkan pesan error jika login gagal
// }
