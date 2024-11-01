"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listBlog } from "./listBlog";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BlogDetailDialog from "./BlogDetail";

// Skeleton component to match the Card structure
const SkeletonCard = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-[150px]" />
      <Skeleton className="h-4 w-[200px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[150px] w-full" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[100px]" />
    </CardFooter>
  </Card>
);

export default function CardBlog() {
  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // State untuk menyimpan blog yang dipilih
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State untuk mengatur dialog

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50;

    if (bottom && hasMoreItems) {
      loadMoreItems();
    }
  };

  const loadMoreItems = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const newVisibleItems = visibleItems + 5;

      if (newVisibleItems >= listBlog.length) {
        setHasMoreItems(false);
        setVisibleItems(listBlog.length);
      } else {
        setVisibleItems(newVisibleItems);
      }

      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleItems]);

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
        {listBlog.slice(0, visibleItems).map((item) => (
          <Card key={item.id} onClick={() => openDialog(item)}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={item.image} alt="image" className="w-full h-full" />
            </CardContent>
            <CardFooter>
              <p>{item.date}</p>
              <p>{item.author}</p>
            </CardFooter>
          </Card>
        ))}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
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
