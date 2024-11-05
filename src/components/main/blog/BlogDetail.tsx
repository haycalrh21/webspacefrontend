// components/BlogDetailDialog.tsx
import HtmlContent from "@/components/HtmlContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import moment from "moment-timezone";
import { Metadata } from "next";

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
  username: string;
}

interface BlogDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null; // Blog dapat bernilai null jika tidak ada
}

const BlogDetailDialog: React.FC<BlogDetailDialogProps> = ({
  isOpen,
  onClose,
  blog,
}) => {
  if (!blog) return null;

  const metadata: Metadata = {
    title: blog.title,
    description: blog.content,
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-full p-6 md:p-10 max-h-[80vh] scroll-hidden">
        {" "}
        {/* Set width here */}
        <DialogHeader>
          <DialogTitle className="text-foreground dark:text-gray-300 flex justify-between">
            <p>{blog.title}</p>

            <p className="text-foreground dark:text-gray-300">
              {moment
                .tz(blog.createdAt, "Asia/Jakarta")
                .format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </DialogTitle>
          <div>
            <p className=" text-foreground dark:text-gray-300">
              @{blog.username}
            </p>
          </div>
          <DialogDescription className="text-foreground dark:text-gray-300">
            <img
              src={blog.imageUrls[0]}
              alt="Blog image"
              className="w-full h-auto"
            />
          </DialogDescription>
        </DialogHeader>
        <HtmlContent
          content={blog.content}
          className="text-foreground dark:text-gray-300"
        />
        <DialogFooter className="flex justify-between items-center"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDetailDialog;

export const metadata: Metadata = {};
