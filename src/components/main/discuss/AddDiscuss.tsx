"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOption";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
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

interface AddDiscussProps {
  onSubmitSuccess: (newDiscuss: Discussion, newComment: CommentsData) => void;
}

export default function AddDiscuss({ onSubmitSuccess }: AddDiscussProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: sessionData } = useSession() as { data: CustomSession | null };
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log(sessionData);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;

      if (!sessionData?.user?.id) {
        return toast.error("Please login first!");
      }
      const response = await axios.post(
        `${API_URL}/discuss`,
        {
          userId: sessionData?.user?.id,
          title,
          description,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${sessionData?.user?.token}`,
          },
        }
      );

      const newDiscuss = {
        ...response.data,
        name: sessionData?.user?.name,
      };

      const newComment = {
        ...response.data,
        name: sessionData?.user?.name,
        userId: sessionData?.user?.id,
      };
      onSubmitSuccess(newDiscuss, newComment); // Panggil fungsi untuk update daftar diskusi
      setDialogOpen(false);
      toast.success("Discuss Successfully Added!");
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

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="btn btn-primary">Add Discuss</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="title">Title</Label>
          <Input name="title" id="title" type="text" className="w-full mb-4" />

          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
            id="description"
            type="text"
            className="w-full mb-4"
          />

          <Label htmlFor="category">Category</Label>
          <Select name="category">
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
