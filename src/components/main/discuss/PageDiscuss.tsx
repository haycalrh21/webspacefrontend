"use client";
import React, { useState } from "react";
import AddDiscuss from "./AddDiscuss";
import CardDiscuss from "./CardDiscuss";

export default function PageDiscuss({ data }: any) {
  const [discussions, setDiscussions] = useState(data); // State untuk menyimpan data diskusi

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
