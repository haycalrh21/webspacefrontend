"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DiscussDetailDialog from "./Discuss";
import { MessageCircle } from "lucide-react";
import moment from "moment-timezone"; // Impor Moment.js

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

export default function CardDiscuss({ data, updateData }: any) {
  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (data.length > visibleItems) {
      setHasMoreItems(true);
    } else {
      setHasMoreItems(false);
    }
  }, [data, visibleItems]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (bottom && hasMoreItems) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMoreItems, visibleItems, data]);

  const loadMoreItems = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      const newVisibleItems = visibleItems + 3;

      if (newVisibleItems >= data.length) {
        setHasMoreItems(false);
        setVisibleItems(data.length);
      } else {
        setVisibleItems(newVisibleItems);
      }

      setLoading(false);
    }, 200);
  };

  const openDialog = (blog: any) => {
    setSelectedBlog(blog);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedBlog(null);
  };

  // Sort data by createdAt in descending order
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.createAt);
    const dateB = new Date(b.createAt);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0; // Treat invalid dates as equal
    }

    return dateB.getTime() - dateA.getTime(); // Sort in descending order
  });

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {sortedData.slice(0, visibleItems).map((item: any) => (
          <Card key={item.id} onClick={() => openDialog(item)}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <p className="text-sm">@{item.name}</p>
                <p className="text-sm">
                  {moment(item.created_at)
                    .tz("Asia/Jakarta")
                    .format("YYYY-MM-DD HH:mm:ss")}{" "}
                  {/* Menggunakan Moment.js */}
                </p>
              </CardTitle>
              <p className="text-md">{item.title}</p>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-start gap-2">
              <MessageCircle className="w-5 h-5" />
              {/* {item.commentView} */}
            </CardFooter>
          </Card>
        ))}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>

      {/* Dialog untuk menampilkan detail blog */}
      <DiscussDetailDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        blog={selectedBlog}
      />
    </div>
  );
}
