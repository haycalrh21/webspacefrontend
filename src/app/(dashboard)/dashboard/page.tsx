import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import NumberTicker from "@/components/ui/number-ticker";
import myAxios from "@/lib/axios.config";
import axios from "axios";
import React from "react";

export default async function Dashboard() {
  const resBot = await myAxios.get(`/bot`);
  const databot = resBot.data;

  const resDiscuss = await myAxios.get(`/discuss`);
  const dataDiscuss = resDiscuss.data;

  const resBlog = await myAxios.get(`/blog`);
  const dataBlog = resBlog.data;

  const resTask = await myAxios.get(`/tasks`);
  const dataTask = resTask.data;

  const lengths = [
    dataBlog.length,
    dataDiscuss.length,
    dataTask.length,
    databot.length,
  ];

  const combinedLengths = lengths.map((length, index) => ({
    type: ["Blog", "Discuss", "Task", "Bot"][index],
    length: length,
  }));

  return (
    <div>
      <h1>Total Data</h1>
      <div className="grid grid-cols-1 gap-4 p-4 sm:p-8 md:grid-cols-2 lg:grid-cols-3">
        {combinedLengths.map(({ type, length }) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle>Total {type}</CardTitle>
              <CardDescription>
                Jumlah total dari {type.toLowerCase()}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
                <NumberTicker value={length} />
              </p>
            </CardContent>
            <CardFooter>
              <p>Menampilkan total {type.toLowerCase()} saat ini.</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
