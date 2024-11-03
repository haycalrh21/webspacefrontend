"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";

export default function ReplayMessage({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleReply = async (event: React.FormEvent<HTMLFormElement>) => {
    // console.log("Reply");
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const message = formData.get("message") as string;
      const response = await axios.post(
        `${API_URL}/bot/send`,
        {
          chat_id: id,
          text: message,
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
  };
  return (
    <div className="justify-end items-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 btn btn-primary">
            Reply
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleReply}>
            <Label htmlFor="chat id">Chat ID</Label>
            <Input
              name="chat id"
              readOnly
              value={id}
              type="text"
              className="w-full mb-4"
            />
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
