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
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  name: string;
  description: string;
  created_at: string;
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
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);

  const fetchComment = async () => {
    const response = await fetch(`${API_URL}/comment`);
    const data = await response.json();
    const match = data.filter((item: any) => item.postId === blog.id);
    setComment(match);
    // console.log(match);
  };

  useEffect(() => {
    fetchComment();
  }, []);
  // console.log(sessionData?.user?.id);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const comment = formData.get("comment") as string;

      const response = await axios.post(
        `${API_URL}/comment`,
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
      setLoading(false);
      fetchComment();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  const openform = () => {
    setIsCommentFormVisible(true); // Reset blog yang dipilih
  };

  // console.log(blog.id);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="scroll-hidden max-w-[800px] w-full p-10 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-foreground dark:text-gray-300 flex justify-between">
            <p className=" text-sm text-foreground dark:text-gray-300">
              @{blog.name}
            </p>
            <p className="text-foreground dark:text-gray-300">
              {moment(blog.created_at)
                .tz("Asia/Jakarta")
                .format("YYYY-MM-DD HH:mm:ss")}
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
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            )}
          </div>
        </DialogFooter>
        <div className="w-full mt-4">
          {comment.length > 0 ? (
            comment.map((item: any) => (
              <Card key={item.id} className="flex justify-between mt-2">
                <CardHeader>
                  <CardTitle className="text-sm">@{item.username}</CardTitle>
                  {item.comment}
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                  {moment(item.created_at)
                    .tz("Asia/Jakarta")
                    .format("YYYY-MM-DD HH:mm:ss")}
                </CardFooter>
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
