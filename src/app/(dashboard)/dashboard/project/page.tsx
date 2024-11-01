import AddProject from "@/components/dashboard/project/AddProject";
import CardIndexProject from "@/components/dashboard/project/CardIndexProject";

export default function page() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <AddProject />
      <CardIndexProject />
    </div>
  );
}

export const dynamic = "force-dynamic";
