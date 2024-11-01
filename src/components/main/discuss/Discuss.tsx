// components/BlogDetailDialog.tsx
import { Button } from "@/components/ui/button";
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

const DiscussDetailDialog: React.FC<BlogDetailDialogProps> = ({
  isOpen,
  onClose,
  blog,
}) => {
  if (!blog) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-full p-10">
        <DialogHeader>
          <DialogTitle className="text-foreground dark:text-gray-300 flex justify-between">
            {blog.title}
            <p className="text-foreground dark:text-gray-300">
              Date: {blog.date}
            </p>
          </DialogTitle>
          <p className="text-foreground dark:text-gray-300">
            Author: {blog.author}
          </p>
          <DialogDescription className="text-foreground dark:text-gray-300 text-md py-4">
            {blog.description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col mt-6">
          <form className="w-full" onSubmit={handleSubmit}>
            <Label className="text-foreground dark:text-gray-300 mb-2">
              Comment
            </Label>
            <Input
              type="text"
              className="w-full mb-4"
              name="comment"
              placeholder="Type your comment here..." // Placeholder untuk menunjukkan fungsi input
            />
            <Button className="btn btn-primary w-full">Submit</Button>{" "}
            {/* Tombol penuh untuk memperjelas aksi */}
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscussDetailDialog;
