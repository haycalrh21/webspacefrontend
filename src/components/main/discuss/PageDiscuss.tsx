"use client";
import React, { useEffect, useState } from "react";
import AddDiscuss from "./AddDiscuss";
import CardDiscuss from "./CardDiscuss";
import axios from "axios";

interface Discussion {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
}

export default function PageDiscuss({ data }: any) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  // Fungsi untuk memuat data diskusi dari API
  const fetchDiscussions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/discuss`
      );
      setDiscussions(response.data); // Set data diskusi dari API
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  useEffect(() => {
    // Panggil fungsi fetchDiscussions saat komponen pertama kali dimuat
    fetchDiscussions();
  }, []);

  const handleNewDiscuss = (newDiscuss: Discussion) => {
    setDiscussions((prev) => [newDiscuss, ...prev]); // Tambahkan diskusi baru ke state
    fetchDiscussions(); // Ambil ulang data diskusi dari API setelah penambahan
  };

  return (
    <div>
      <AddDiscuss onSubmitSuccess={handleNewDiscuss} />
      <CardDiscuss data={discussions} updateData={setDiscussions} />
    </div>
  );
}

export const dynamic = "force-dynamic";
