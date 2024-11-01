"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOption";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryItems } from "./category";

export default function AddBlog() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: sessionData } = useSession() as { data: CustomSession | null };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;
      const files = formData.getAll("image") as File[];

      if (files.length === 0) {
        console.error("At least one file is required");
        return;
      }

      // Convert each file to base64
      const base64Images = await Promise.all(
        files.map(
          (file) =>
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            })
        )
      );

      // Kirim data ke backend
      const response = await axios.post(
        `${API_URL}/blog`,
        {
          userId: sessionData?.user?.id,
          title,
          description,
          category,
          images: base64Images, // Send array of base64 images
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${sessionData?.user?.token}`,
          },
        }
      );

      //   console.log(response.data);
      alert("Upload berhasil!");
    } catch (error) {
      console.error("Error:", error);
      alert("Upload gagal!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="justify-end items-end">
      <div>
        <h1 className="text-center text-3xl font-bold"> Blog</h1>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="btn btn-primary">Add Blog</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              id="title"
              type="text"
              className="w-full mb-4"
            />
            <Label htmlFor="name">Gambar</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full mb-4"
            />
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
                {categoryItems.map((item) => (
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
    </div>
  );
}
