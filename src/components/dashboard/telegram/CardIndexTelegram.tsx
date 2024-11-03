"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertToWIB } from "@/lib/dateHelpers";
import ReplayMessage from "./ReplayMessage";
import moment from "moment";

export default function CardIndexTelegram({ data }: any) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {data.map(
        (
          update: {
            message: {
              chat: { id: number }; // Mengambil chat_id
              from: {
                first_name: string;
                last_name?: string;
                username?: string;
              }; // Menambahkan last_name jika ada
              text: string;
              date: number;
            };
          },
          index: number
        ) => {
          const { chat, from, text, date } = update.message;
          const senderName = from.username
            ? `@${from.username}` // Tampilkan username dengan simbol '@'
            : from.last_name
            ? `${from.first_name} ${from.last_name}` // Jika ada last_name, tampilkan nama lengkap
            : from.first_name; // Jika tidak, tampilkan first_name

          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-md">{senderName}</CardTitle>
                <CardDescription>{date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{text}</p>
              </CardContent>
              <CardFooter className=""></CardFooter>
              <div className="flex items-center p-2">
                <ReplayMessage id={chat.id} />
              </div>
            </Card>
          );
        }
      )}
    </div>
  );
}
