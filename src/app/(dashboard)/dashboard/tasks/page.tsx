import AddTasks from "@/components/dashboard/tasks/AddTasks";
import KanbanBoard from "@/components/dashboard/tasks/BoardTask";
import React from "react";

export default function page() {
  return (
    <div>
      <AddTasks />
      <KanbanBoard />
    </div>
  );
}

export const dynamic = "force-dynamic";
