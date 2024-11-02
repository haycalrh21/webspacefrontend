"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import DiscussDetailDialog from "./Discuss";
import { MessageCircle } from "lucide-react";
import moment from "moment-timezone"; // Import Moment.js

export default function CardDiscuss({ data, updateData }: any) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (blog: any) => {
    setSelectedBlog(blog);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedBlog(null);
  };

  // Sort data by created_at in descending order

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {data.map((item: any) => (
          <Card
            key={item.id}
            onClick={() => openDialog(item)}
            className="transition-transform duration-200 hover:scale-105"
          >
            <CardHeader>
              <CardTitle className="flex justify-between">
                <p className="text-sm">@{item.name}</p>
                <p className="text-sm">
                  {moment(item.created_at)
                    .tz("Asia/Jakarta")
                    .format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </CardTitle>
              <p className="text-md">{item.title}</p>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-start gap-2">
              <MessageCircle className="w-5 h-5" />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Dialog untuk menampilkan detail diskusi */}
      <DiscussDetailDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        blog={selectedBlog}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";
