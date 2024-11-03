import AddMessage from "@/components/dashboard/telegram/AddMessage";
import CardIndexTelegram from "@/components/dashboard/telegram/CardIndexTelegram";

import axios from "axios";
import { Suspense } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default async function page() {
  const res = await axios.get(`${API_URL}/bot`);
  const datas = res.data.updates;
  // console.log(datas);

  if (!datas) {
    return <div>Not found</div>;
  }
  return (
    <div className="flex flex-col gap-4 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AddMessage />
        <CardIndexTelegram data={res.data.updates} />
      </Suspense>
    </div>
  );
}
export const dynamic = "force-dynamic";
