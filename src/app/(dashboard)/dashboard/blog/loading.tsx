import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function Loading() {
  return (
    <div>
      <Accordion type="single" collapsible className="animate-pulse">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-300 rounded" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
