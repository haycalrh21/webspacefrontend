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

interface AddDiscussProps {
  onSubmitSuccess: (newDiscuss: any) => void; // Define the function to accept the new discussion data
}

interface Discuss {
  id: number;
  title: string;
  description: string;
  createAt: string;
  category: string;
  userId: number;
  name: string; // Menambahkan name sesuai dengan response yang diharapkan
}

export default function AddDiscuss({ onSubmitSuccess }: AddDiscussProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: sessionData } = useSession() as { data: CustomSession | null };
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State untuk dialog

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;

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
        name: sessionData?.user?.name, // Tambahkan nama pengguna di sini
      };

      alert("Diskusi berhasil ditambahkan!");
      setDialogOpen(false); // Tutup dialog setelah berhasil
      onSubmitSuccess(newDiscuss);
    } catch (error) {
      console.error("Error:", error);
      alert("Upload gagal!");
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
