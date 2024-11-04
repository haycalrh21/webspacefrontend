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

import ReplayMessage from "./ReplayMessage";

export default function CardIndexTelegram({ data }: any) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {data.map((item: any) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="text-md">
              {item.chat_id} - {item.username}
            </CardTitle>
            <CardDescription>{item.createdAt}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.text}</p>
          </CardContent>
          <CardFooter className=""></CardFooter>
          <div className="flex items-center p-2">
            <ReplayMessage id={item.chat_id} />
          </div>
        </Card>
      ))}
    </div>
  );
}
