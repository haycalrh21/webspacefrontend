import AddMessage from "@/components/dashboard/telegram/AddMessage";
import CardIndexTelegram from "@/components/dashboard/telegram/CardIndexTelegram";
import myAxios from "@/lib/axios.config";
import axios from "axios";
import { Suspense } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default async function page() {
  // const res = await axios.get(`${API_URL}/auth/bot`);
  // const res = await axios.get(`${API_URL}/blog`);
  // console.log(res);
  // if (!res.data) {
  //   return <div>error</div>;
  // }
  return (
    <div className="flex flex-col gap-4 py-4">
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <AddMessage />
      {/* <CardIndexTelegram data={res.data} /> */}
      {/* </Suspense> */}
    </div>
  );
}
