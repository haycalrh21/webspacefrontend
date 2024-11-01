import AddBlog from "@/components/dashboard/blog/AddBlog";
import IndexBlog from "@/components/dashboard/blog/IndexBlog";
import myAxios from "@/lib/axios.config";
import axios from "axios";
import React from "react";

export default async function page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await axios.get(`${API_URL}/blog`);

  return (
    <div>
      <AddBlog />
      <IndexBlog data={res.data} />
    </div>
  );
}
