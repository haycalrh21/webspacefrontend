import AddMessage from "@/components/dashboard/telegram/AddMessage";
import CardIndexTelegram from "@/components/dashboard/telegram/CardIndexTelegram";
import myAxios from "@/lib/axios.config";

export default async function page() {
  const res = await myAxios.get(`/bot`);
  const datas = res.data;
  // console.log(datas);

  if (!datas) {
    return <div>Not found</div>;
  }
  return (
    <div className="flex flex-col gap-4 py-4">
      <AddMessage />
      <CardIndexTelegram data={res.data} />
    </div>
  );
}
export const dynamic = "force-dynamic";
