import AddBlog from "@/components/dashboard/blog/AddBlog";
import IndexBlog from "@/components/dashboard/blog/IndexBlog";
import HtmlContent from "@/components/HtmlContent";
import myAxios from "@/lib/axios.config";
import axios from "axios";
import React from "react";

export default async function page() {
  const res = await myAxios.get(`/blog`);
  // console.log(res);
  return (
    <div>
      {/* {res.data.map((item: any) => (
        <div key={item.blogId}>
          <h1>{item.title}</h1>
          <p>{item.category}</p>
          <img src={item.imageUrls[0]} alt={item.title} />
          <HtmlContent content={item.content} />
        </div>
      ))} */}
      <AddBlog />
      <IndexBlog data={res.data} />
    </div>
  );
}
export const dynamic = "force-dynamic";
