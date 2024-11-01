// components/BlogDetailDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-full">
        {" "}
        {/* Set width here */}
        <DialogHeader>
          <DialogTitle className="text-foreground dark:text-gray-300">
            {blog.title}
          </DialogTitle>
          <DialogDescription className="text-foreground dark:text-gray-300">
            {blog.description}
          </DialogDescription>
        </DialogHeader>
        <img src={blog.image} alt="Blog image" className="w-full h-auto" />
        <DialogFooter className="flex justify-between items-center">
          <div>
            <p className=" text-foreground dark:text-gray-300">
              Date: {blog.date}
            </p>
          </div>
          <div>
            <p className=" text-foreground dark:text-gray-300">
              Author: {blog.author}
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDetailDialog;
