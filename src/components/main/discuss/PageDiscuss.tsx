"use client";
import React, { useState } from "react";
import AddDiscuss from "./AddDiscuss";
import CardDiscuss from "./CardDiscuss";

interface Discussion {
  id: number; // ID diskusi
  userId: number; // ID pengguna yang membuat diskusi
  title: string; // Judul diskusi
  description: string; // Deskripsi diskusi
  category: string; // Kategori diskusi
  createdAt: Date; // Tanggal dan waktu pembuatan diskusi
}

export default function PageDiscuss({ data }: { data: Discussion[] }) {
  const [discussions, setDiscussions] = useState<Discussion[]>(data || []);
  // Fungsi untuk memperbarui data setelah submit
  const updateData = (newData: any) => {
    setDiscussions((prevState: any) => [newData, ...prevState]); // Menambahkan data baru di depan
  };

  return (
    <div>
      <AddDiscuss onSubmitSuccess={updateData} />
      <CardDiscuss data={discussions} />
    </div>
  );
}

export const dynamic = "force-dynamic";
