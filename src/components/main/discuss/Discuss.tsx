"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOption";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Blog {
  id: number;
  title: string;
  username: string;
  description: string;
  createAt: string;
}

interface BlogDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null; // Blog dapat bernilai null jika tidak ada
}

const DiscussDetailDialog: React.FC<BlogDetailDialogProps> = ({
  isOpen,
  onClose,
  blog,
}) => {
  if (!blog) return null;
  const { data: sessionData } = useSession() as { data: CustomSession | null };

  const [comment, setComment] = useState("");
  console.log(sessionData?.user?.id);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const comment = formData.get("comment") as string;

      const response = await axios.post(
        `${API_URL}/discuss`,
        {
          userId: sessionData?.user?.id,
          postId: blog.id,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    } catch (error) {}
  };

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  const openform = () => {
    setIsCommentFormVisible(true); // Reset blog yang dipilih
  };
  const commentsData = [
    {
      id: 1,
      comment: "This is a comment",
      author: "John Doe",
      date: "2023-01-01",
    },
    {
      id: 2,
      comment: "This is another comment",
      author: "Jane Doe",
      date: "2023-01-02",
    },
    {
      id: 3,
      comment: "This is yet another comment",
      author: "Bob Smith",
      date: "2023-01-03",
    },
    {
      id: 4,
      comment: "This is yet another comment",
      author: "Bob Smith",
      date: "2023-01-03",
    },
    {
      id: 5,
      comment: "This is yet another comment",
      author: "Bob Smith",
      date: "2023-01-03",
    },
  ];

  console.log(blog.id);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-full p-10 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground dark:text-gray-300 flex justify-between">
            <p className=" text-sm text-foreground dark:text-gray-300">
              @{blog.username}
            </p>
            <p className="text-foreground dark:text-gray-300">
              {blog.createAt}
            </p>
          </DialogTitle>
          <p className="text-foreground dark:text-gray-300 text-md">
            {blog.title}
          </p>
          <p className="text-foreground dark:text-gray-300"></p>
          <DialogDescription className="text-foreground dark:text-gray-300 text-md py-4">
            {blog.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="items-start space-y-4">
          <div className="w-full">
            {!isCommentFormVisible ? (
              <Button onClick={openform}>Comment</Button>
            ) : (
              <form className="w-full" onSubmit={handleSubmit}>
                <Label className="text-foreground dark:text-gray-300 mb-2">
                  Comment
                </Label>
                <Input
                  type="text"
                  className="w-full mb-2"
                  name="comment"
                  placeholder="Type your comment here..."
                />
                <Button type="submit" className="btn btn-primary w-full">
                  Submit
                </Button>
              </form>
            )}
          </div>
        </DialogFooter>
        <div className="w-full mt-4">
          {commentsData.length > 0 ? (
            commentsData.map((item) => (
              <Card key={item.id} className="flex justify-between mt-2">
                <CardHeader>
                  <CardTitle className="text-sm">@{item.author}</CardTitle>
                  {item.comment}
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>{item.date}</CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-foreground dark:text-gray-300">
              Tidak ada komentar
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscussDetailDialog;
