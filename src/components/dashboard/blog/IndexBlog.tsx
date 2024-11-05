"use client";
import HtmlContent from "@/components/HtmlContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function IndexBlog({ data }: { data: any }) {
  const handleDelete = async (id: number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Blog berhasil dihapus!");
  };
  return (
    <div className="flex flex-col gap-4 py-4">
      <Accordion type="multiple">
        {data.map((item: any) => (
          <AccordionItem key={item.blogId} value={`item-${item.blogId}`}>
            <AccordionTrigger>
              {item.title} - {item.category}
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <div>
                  <img
                    src={item.imageUrls[0]}
                    alt={item.title}
                    className="h-40 w-full items-center justify-center rounded-full border-4 border-primary-500 object-contain object-center"
                  />
                </div>

                <HtmlContent content={item.content} />
              </div>
              <Button onClick={() => handleDelete(item.blogId)}>
                Lihat Detail
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
