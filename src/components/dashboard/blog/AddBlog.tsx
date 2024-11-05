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
import TextEditor from "@/components/textEditor";

export default function AddBlog() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: sessionData } = useSession() as { data: CustomSession | null };
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!image) {
      alert("Please select an image.");
      setLoading(false);
      return;
    }

    try {
      // Convert the image to base64
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });

      // Send data to backend
      const response = await axios.post(
        `${API_URL}/blog`,
        {
          userId: sessionData?.user?.id,
          title,
          description,
          category,
          images: [base64Image], // Send array of base64 images
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${sessionData?.user?.token}`,
          },
        }
      );

      alert("Upload berhasil!");
      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
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
              required
            />

            <Label htmlFor="image">Gambar</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
              className="w-full mb-4"
            />

            <Label htmlFor="description">Description</Label>
            <TextEditor
              value={description}
              onChange={setDescription}
              placeholder="Write your blog here..."
            />

            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              value={category}
              onValueChange={setCategory}
            >
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
