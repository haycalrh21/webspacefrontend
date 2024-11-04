"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import myAxios from "@/lib/axios.config";
import axios from "axios";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      setLoading(false);

      if (res?.status === 401) {
        console.log(res);
        toast.error("Email atau password salah");
      } else {
        toast.success("Register success!");
        router.push("/login"); // Arahkan ke dashboard
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Login gagal!"); // Tampilkan alert jika ada kesalahan
    }
  };
  return (
    <div className="flex py-10 items-center justify-center ">
      <div className="bg-slate-300 w-full max-w-md p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-center ">Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="name"
              id="name"
              name="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              required // Menambahkan validasi agar email tidak kosong
            />
          </div>

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
          <div>
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}
