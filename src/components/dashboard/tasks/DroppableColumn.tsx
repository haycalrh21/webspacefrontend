import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import { Task } from "@/types/types";

interface DroppableColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  isHighlighted: boolean;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  title,
  tasks,
  isHighlighted,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 flex flex-col bg-gray-100 p-4 rounded-lg mb-4 min-h-[200px] transition-colors duration-200
        ${isHighlighted ? "bg-blue-100 border-2 border-blue-300" : ""}
        ${isOver ? "bg-blue-200" : ""}
      `}
    >
      <h2 className="font-semibold text-lg mb-2 text-center">{title}</h2>
      <div className="flex-1 overflow-y-auto">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
          <div className="h-full min-h-[50px]" /> {/* Increased drop area */}
        </SortableContext>
      </div>
    </div>
  );
};

export default DroppableColumn;
