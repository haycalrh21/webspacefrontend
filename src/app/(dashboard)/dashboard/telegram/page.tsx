import AddMessage from "@/components/dashboard/telegram/AddMessage";
import CardIndexTelegram from "@/components/dashboard/telegram/CardIndexTelegram";
import myAxios from "@/lib/axios.config";
import { Suspense } from "react";

export default async function page() {
  const res = await myAxios.get("/auth/bot");

  const data = res.data; // Mengakses data dari respons Axios

  //   console.log(data);
  return (
    <div className="flex flex-col gap-4 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AddMessage />
        <CardIndexTelegram data={data} />
      </Suspense>
    </div>
  );
}
