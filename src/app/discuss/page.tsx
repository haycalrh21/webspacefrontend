import React from "react";
import PageDiscuss from "@/components/main/discuss/PageDiscuss";

import myAxios from "@/lib/axios.config";

export default async function Page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await myAxios.get(`${API_URL}/discuss`);
  const data = await response.data;

  // console.log(data);

  return (
    <div className="relative items-center justify-center overflow-hidden rounded-lg">
      <div className="p-4 max-w-7xl mx-auto">
        <PageDiscuss data={data} />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
