import AddDiscuss from "@/components/main/discuss/AddDiscuss";
import CardDiscuss from "@/components/main/discuss/CardDiscuss";
import React from "react";

export default async function page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${API_URL}/discuss`);
  const data = await response.json();
  // console.log(data);
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <AddDiscuss />
      <CardDiscuss data={data} />
    </div>
  );
}
export const dynamic = "force-dynamic";
