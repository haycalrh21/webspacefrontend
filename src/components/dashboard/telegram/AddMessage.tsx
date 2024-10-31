"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";

export default function AddMessage() {
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const message = formData.get("message") as string;
      const response = await axios.post(
        `${API_URL}/auth/bot`,
        {
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error");
      console.error(error);
    }
    // setLoading(true);
  };
  return (
    <div className="justify-end items-end">
      <div>
        <h1 className="text-center text-3xl font-bold"> Telegram</h1>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="btn btn-primary">Add Message</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="message">Message</Label>
            <Input
              name="message"
              id="message"
              type="text"
              className="w-full mb-4"
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
