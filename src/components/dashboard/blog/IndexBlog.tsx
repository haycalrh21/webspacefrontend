import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function IndexBlog({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <Accordion type="single" collapsible>
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
                    className="h-40 w-full object-cover"
                  />
                </div>
                {item.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
