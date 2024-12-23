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
import moment from "moment-timezone";

export default function CardDiscuss({
  data,
  comment = [],
}: {
  data: any;
  comment?: any[];
}) {
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

  // Helper function to truncate text and add ellipsis
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {data.map((item: any) => {
          const match = (comment || []).filter(
            (commentItem: any) => commentItem.postId === item.id
          );

          return (
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
                <CardDescription
                  dangerouslySetInnerHTML={{
                    __html: truncateText(item.description, 100),
                  }}
                  className="text-sm line-clamp-3 overflow-hidden"
                ></CardDescription>
                <span
                  className={`text-sm text-foreground dark:text-gray-300 rounded-md px-2 py-1 ${
                    item.category === "Bug" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {item.category}
                </span>
              </CardContent>

              <CardFooter className="flex justify-start gap-2">
                <MessageCircle className="w-5 h-5" />
                {match.length}{" "}
                {/* Display the number of comments for this post */}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Dialog for displaying discussion details */}
      <DiscussDetailDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        blog={selectedBlog}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";
