"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOption";
import HtmlContent from "@/components/HtmlContent";
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
import toast from "react-hot-toast";

interface Blog {
  id: number;
  title: string;
  name: string;
  description: string;
  created_at: string;
  category: string;
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
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const comment = formData.get("comment") as string;

      await axios.post(
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
      fetchComment();
      setLoading(false);
      toast.success("Comment Successfully Added!");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        const errorMessages = error.response.data.error.map(
          (err: any) => err.message
        );

        // Menampilkan pesan error dalam bentuk daftar yang rapi
        toast.custom(
          (t) => (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "250px",
              }}
              onClick={() => toast.dismiss(t.id)}
            >
              <strong style={{ fontSize: "16px" }}>Error:</strong>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                {errorMessages.map((msg: any, index: number) => (
                  <li
                    key={index}
                    style={{ marginBottom: "4px", fontSize: "14px" }}
                  >
                    {msg}
                  </li>
                ))}
              </ul>
            </div>
          ),
          { duration: 2000 }
        );
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  const openForm = () => {
    setIsCommentFormVisible(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1200px] w-full p-6 md:p-10 max-h-[80vh] scroll-hidden">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-start">
            <span className="text-sm text-foreground dark:text-gray-300">
              @{blog.name}
            </span>
            <span className="text-foreground dark:text-gray-300">
              {moment(blog.created_at)
                .tz("Asia/Jakarta")
                .format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </DialogTitle>
          <p className="text-lg font-semibold text-foreground dark:text-gray-300 mt-2 text-left">
            {blog.title}
          </p>
          <DialogDescription className="text-md text-foreground dark:text-gray-300 py-4 text-left">
            {/* <div dangerouslySetInnerHTML={{ __html: blog.description }} /> */}
            <HtmlContent
              content={blog.description}
              className=" w-full  scroll-hidden"
            />
            <span
              className={`text-sm text-foreground dark:text-gray-300 rounded-md px-2 py-1 ${
                blog.category === "Bug" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {blog.category}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col space-y-4">
          <div className="w-full">
            {!isCommentFormVisible ? (
              <Button onClick={openForm}>Comment</Button>
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
                  required
                />
                <Button variant="default" type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            )}
          </div>
        </DialogFooter>

        <div className="w-full mt-4">
          {comment.length > 0 ? (
            comment.map((item: any) => (
              <Card
                key={item.id}
                className="flex flex-col justify-between mt-2"
              >
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    @{item.username}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {item.comment}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="text-xs text-gray-500">
                  {moment(item.created_at)
                    .tz("Asia/Jakarta")
                    .format("YYYY-MM-DD HH:mm:ss")}
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-foreground dark:text-gray-300 text-center">
              Tidak ada komentar
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscussDetailDialog;
