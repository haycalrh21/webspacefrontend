//server component
import PageDiscuss from "@/components/main/discuss/PageDiscuss";

import Meteors from "@/components/ui/meteors";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Discuss",
  description: "Discuss",
};

export default async function Page() {
  return (
    <div className="relative items-center justify-center overflow-hidden rounded-lg">
      <div className="p-4 max-w-7xl mx-auto">
        <PageDiscuss />
        <Meteors number={20} />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
