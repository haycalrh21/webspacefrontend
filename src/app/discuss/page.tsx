import AddDiscuss from "@/components/main/discuss/AddDiscuss";
import CardDiscuss from "@/components/main/discuss/CardDiscuss";
import React from "react";

export default function page() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <AddDiscuss />
      <CardDiscuss />
    </div>
  );
}
