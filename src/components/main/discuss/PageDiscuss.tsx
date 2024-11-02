"use client";
import React, { useEffect, useState } from "react";
import AddDiscuss from "./AddDiscuss";
import CardDiscuss from "./CardDiscuss";

interface Discussion {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
}

export default function PageDiscuss({ data }: { data: Discussion[] }) {
  // Inisialisasi discussions dengan data awal dari prop
  const [discussions, setDiscussions] = useState<Discussion[]>(data);

  const handleNewDiscuss = (newDiscuss: Discussion) => {
    setDiscussions((prev) => [newDiscuss, ...prev]); // Tambahkan diskusi baru ke state
  };

  return (
    <div>
      <AddDiscuss onSubmitSuccess={handleNewDiscuss} />
      <CardDiscuss data={discussions} updateData={setDiscussions} />
    </div>
  );
}

export const dynamic = "force-dynamic";
