"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      setLoading(false);

      if (res?.error) {
        alert(res.error); // Tampilkan pesan error jika login gagal
      } else {
        alert("Login berhasil!"); // Tampilkan alert jika login berhasil
        router.push("/"); // Arahkan ke dashboard
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Login gagal!"); // Tampilkan alert jika ada kesalahan
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
            required // Menambahkan validasi agar email tidak kosong
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
            required // Menambahkan validasi agar password tidak kosong
          />
        </div>
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
