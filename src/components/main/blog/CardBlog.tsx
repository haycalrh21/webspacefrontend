"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlogDetailDialog from "./BlogDetail";
import { useState } from "react";

// Komponen utama
export default function CardBlog({ data }: any) {
  const [selectedBlog, setSelectedBlog] = useState(null); // State untuk menyimpan blog yang dipilih
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State untuk mengatur dialog

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const openDialog = (blog: any) => {
    setSelectedBlog(blog); // Set blog yang dipilih
    setIsDialogOpen(true); // Buka dialog
  };

  const closeDialog = () => {
    setIsDialogOpen(false); // Tutup dialog
    setSelectedBlog(null); // Reset blog yang dipilih
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {data.map((item: any) => (
          <Card key={item.blogId} onClick={() => openDialog(item)}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={item.imageUrls} alt="image" className="w-full h-full" />
              <div
                dangerouslySetInnerHTML={{
                  __html: truncateText(item.content, 100),
                }}
              />{" "}
              {/* Truncate here */}
            </CardContent>
            <CardFooter>
              <p>{item.date}</p>
              <p>{item.author}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Dialog untuk menampilkan detail blog */}
      <BlogDetailDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        blog={selectedBlog}
      />
    </div>
  );
}
