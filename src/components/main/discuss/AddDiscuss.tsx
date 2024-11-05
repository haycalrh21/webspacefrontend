// components/AddDiscuss.tsx
"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOption";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { discusscategory } from "./listdiscuss";
import { CommentsData, Discussion } from "@/types/types";
import toast from "react-hot-toast";
import TextEditor from "@/components/textEditor";

interface AddDiscussProps {
  onSubmitSuccess: (newDiscuss: Discussion, newComment: CommentsData) => void;
}

export default function AddDiscuss({ onSubmitSuccess }: AddDiscussProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: sessionData } = useSession() as { data: CustomSession | null };
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!sessionData?.user?.id) {
        return toast.error("Please login first!");
      }

      const response = await axios.post(
        `${API_URL}/discuss`,
        {
          userId: sessionData.user.id,
          title,
          description,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${sessionData.user.token}`,
          },
        }
      );

      const newDiscuss = {
        ...response.data,
        name: sessionData.user.name,
      };

      const newComment = {
        ...response.data,
        name: sessionData.user.name,
        userId: sessionData.user.id,
      };
      onSubmitSuccess(newDiscuss, newComment); // Update daftar diskusi
      setDialogOpen(false);
      toast.success("Discuss Successfully Added!");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="btn btn-primary">Add Discuss</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full p-6 sm:px-4 md:p-10 max-h-[80vh] scroll-hidden">
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            id="title"
            type="text"
            className="w-full mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Label htmlFor="description">Description</Label>
          <TextEditor
            value={description}
            onChange={setDescription}
            placeholder="Write your discussion here..."
          />

          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full mb-4 text-foreground dark:text-gray-300">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {discusscategory.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
