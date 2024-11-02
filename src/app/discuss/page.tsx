import PageDiscuss from "@/components/main/discuss/PageDiscuss";
import Meteors from "@/components/ui/meteors";
import React from "react";

export default async function page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${API_URL}/discuss`);
  const data = await response.json();

  return (
    <div className="relative    items-center justify-center overflow-hidden rounded-lg  ">
      <div className="  p-4 max-w-7xl mx-auto">
        <Meteors number={20} />
        <PageDiscuss data={data} />
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
