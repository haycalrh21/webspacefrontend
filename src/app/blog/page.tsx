import CardBlog from "@/components/main/blog/CardBlog";
import myAxios from "@/lib/axios.config";
import axios from "axios";
import { Metadata } from "next";
import React from "react";

export default async function page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await myAxios.get(`/blog`);
  const datas = res.data;
  // console.log(datas);
  if (!datas) {
    return <div>Not found</div>;
  }
  return (
    <div>
      <CardBlog data={datas} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
};

export const dynamic = "force-dynamic";
